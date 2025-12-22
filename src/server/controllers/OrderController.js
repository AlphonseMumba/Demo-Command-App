const OrderService = require('../services/OrderService');
const { asyncErrorHandler } = require('../middleware/errorHandler');

class OrderController {
    static createOrder = asyncErrorHandler(async (req, res) => {
        const userId = req.user.id;
        const orderData = req.body;

        const order = await OrderService.createOrder(userId, orderData);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: { order }
        });
    });

    static getUserOrders = asyncErrorHandler(async (req, res) => {
        const userId = req.user.id;
        const { page, limit, status } = req.query;

        const result = await OrderService.getAllOrders({
            userId,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            status
        });

        res.json({
            success: true,
            data: result
        });
    });

    static getOrderById = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';

        const order = await OrderService.getOrderById(id, userId, isAdmin);

        res.json({
            success: true,
            data: { order }
        });
    });

    static getAllOrders = asyncErrorHandler(async (req, res) => {
        // Admin only
        const { page, limit, status, userId } = req.query;

        const result = await OrderService.getAllOrders({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            status,
            userId
        });

        res.json({
            success: true,
            data: result
        });
    });

    static updateOrderStatus = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';

        const order = await OrderService.updateOrderStatus(id, status, userId, isAdmin);

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: { order }
        });
    });

    static cancelOrder = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';

        const order = await OrderService.cancelOrder(id, userId, isAdmin);

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: { order }
        });
    });

    static getOrderStatuses = asyncErrorHandler(async (req, res) => {
        const statuses = OrderService.getOrderStatuses();

        res.json({
            success: true,
            data: { statuses }
        });
    });
}

module.exports = OrderController;