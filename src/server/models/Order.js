const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class Order {
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.userId = data.userId;
        this.items = data.items || []; // Array of { productId, quantity, price }
        this.total = parseFloat(data.total) || 0;
        this.status = data.status || 'pending'; // pending, confirmed, shipped, delivered, cancelled
        this.shippingAddress = data.shippingAddress;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    static async findAll() {
        try {
            const ordersPath = path.join(__dirname, '../../../database/seeds/orders.json');
            let data;
            try {
                data = await fs.readFile(ordersPath, 'utf8');
            } catch (error) {
                // If file doesn't exist, create it with empty array
                await fs.writeFile(ordersPath, '[]');
                return [];
            }
            const orders = JSON.parse(data);
            return orders.map(order => new Order(order));
        } catch (error) {
            console.error('Error reading orders:', error);
            return [];
        }
    }

    static async findById(id) {
        const orders = await this.findAll();
        return orders.find(order => order.id === id);
    }

    static async findByUserId(userId) {
        const orders = await this.findAll();
        return orders.filter(order => order.userId === userId);
    }

    async save() {
        try {
            const orders = await this.constructor.findAll();
            const existingIndex = orders.findIndex(order => order.id === this.id);

            if (existingIndex >= 0) {
                orders[existingIndex] = this;
            } else {
                orders.push(this);
            }

            await fs.writeFile(
                path.join(__dirname, '../../../database/seeds/orders.json'),
                JSON.stringify(orders, null, 2)
            );
            return this;
        } catch (error) {
            console.error('Error saving order:', error);
            throw error;
        }
    }

    async updateStatus(status) {
        this.status = status;
        this.updatedAt = new Date().toISOString();
        return await this.save();
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return this.total;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = Order;