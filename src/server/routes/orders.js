const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authenticateToken, requireAdmin } = require('../middleware/security');

const router = express.Router();

// User routes (authenticated users)
router.post('/', authenticateToken, OrderController.createOrder);
router.get('/my-orders', authenticateToken, OrderController.getUserOrders);
router.get('/statuses', authenticateToken, OrderController.getOrderStatuses);
router.get('/:id', authenticateToken, OrderController.getOrderById);
router.patch('/:id/cancel', authenticateToken, OrderController.cancelOrder);

// Admin only routes
router.get('/', authenticateToken, requireAdmin, OrderController.getAllOrders);
router.patch('/:id/status', authenticateToken, requireAdmin, OrderController.updateOrderStatus);

module.exports = router;