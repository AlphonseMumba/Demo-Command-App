const Order = require('../models/Order');
const Product = require('../models/Product');
const ProductService = require('./ProductService');
const { ValidationError, NotFoundError, AuthorizationError } = require('../middleware/errorHandler');

class OrderService {
    static async createOrder(userId, orderData) {
        try {
            // Validate order data
            if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                throw new ValidationError('Order must contain at least one item');
            }

            if (!orderData.shippingAddress) {
                throw new ValidationError('Shipping address is required');
            }

            // Validate and calculate order items
            const orderItems = [];
            let total = 0;

            for (const item of orderData.items) {
                if (!item.productId || !item.quantity || item.quantity <= 0) {
                    throw new ValidationError('Invalid item data');
                }

                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new ValidationError(`Product ${item.productId} not found`);
                }

                if (product.stock < item.quantity) {
                    throw new ValidationError(`Insufficient stock for ${product.name}`);
                }

                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    name: product.name
                });

                total += product.price * item.quantity;

                // Update product stock
                await ProductService.updateStock(item.productId, -item.quantity);
            }

            // Create order
            const newOrder = new Order({
                userId,
                items: orderItems,
                total,
                shippingAddress: orderData.shippingAddress
            });

            await newOrder.save();

            return newOrder.toJSON();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            throw new Error('Failed to create order');
        }
    }

    static async getUserOrders(userId) {
        try {
            const orders = await Order.findByUserId(userId);
            return orders.map(order => order.toJSON());
        } catch (error) {
            console.error('Error getting user orders:', error);
            throw new Error('Failed to retrieve orders');
        }
    }

    static async getOrderById(orderId, userId, isAdmin = false) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new NotFoundError('Order not found');
            }

            // Check if user owns the order or is admin
            if (order.userId !== userId && !isAdmin) {
                throw new AuthorizationError('Access denied');
            }

            return order.toJSON();
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error;
            }
            throw new Error('Failed to retrieve order');
        }
    }

    static async getAllOrders(filters = {}) {
        try {
            let orders = await Order.findAll();

            // Apply filters
            if (filters.status) {
                orders = orders.filter(order => order.status === filters.status);
            }

            if (filters.userId) {
                orders = orders.filter(order => order.userId === filters.userId);
            }

            // Apply sorting (newest first by default)
            orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Apply pagination
            const page = parseInt(filters.page) || 1;
            const limit = parseInt(filters.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedOrders = orders.slice(startIndex, endIndex);
            const totalPages = Math.ceil(orders.length / limit);

            return {
                orders: paginatedOrders.map(order => order.toJSON()),
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalOrders: orders.length,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        } catch (error) {
            console.error('Error getting orders:', error);
            throw new Error('Failed to retrieve orders');
        }
    }

    static async updateOrderStatus(orderId, status, userId, isAdmin = false) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new NotFoundError('Order not found');
            }

            // Check permissions
            if (order.userId !== userId && !isAdmin) {
                throw new AuthorizationError('Access denied');
            }

            // Validate status transition
            const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status)) {
                throw new ValidationError('Invalid order status');
            }

            // Prevent certain status changes for non-admin users
            if (!isAdmin && status === 'cancelled' && order.status !== 'pending') {
                throw new ValidationError('Cannot cancel order that is already processed');
            }

            await order.updateStatus(status);

            return order.toJSON();
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error;
            }
            throw new Error('Failed to update order status');
        }
    }

    static async cancelOrder(orderId, userId, isAdmin = false) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new NotFoundError('Order not found');
            }

            // Check permissions
            if (order.userId !== userId && !isAdmin) {
                throw new AuthorizationError('Access denied');
            }

            // Check if order can be cancelled
            if (!['pending', 'confirmed'].includes(order.status)) {
                throw new ValidationError('Order cannot be cancelled at this stage');
            }

            // Restore product stock
            for (const item of order.items) {
                await ProductService.updateStock(item.productId, item.quantity);
            }

            await order.updateStatus('cancelled');

            return order.toJSON();
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error;
            }
            throw new Error('Failed to cancel order');
        }
    }

    static getOrderStatuses() {
        return ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    }
}

module.exports = OrderService;