const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authenticateToken, requireAdmin } = require('../middleware/security');

const router = express.Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/categories', ProductController.getCategories);
router.get('/:id', ProductController.getProductById);

// Admin only routes
router.post('/', authenticateToken, requireAdmin, ProductController.createProduct);
router.put('/:id', authenticateToken, requireAdmin, ProductController.updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, ProductController.deleteProduct);
router.patch('/:id/stock', authenticateToken, requireAdmin, ProductController.updateStock);

module.exports = router;