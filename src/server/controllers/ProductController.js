const ProductService = require('../services/ProductService');
const { asyncErrorHandler } = require('../middleware/errorHandler');

class ProductController {
    static getAllProducts = asyncErrorHandler(async (req, res) => {
        const { page, limit, category, search, sort } = req.query;

        const result = await ProductService.getAllProducts({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            category,
            search,
            sort
        });

        res.json({
            success: true,
            data: result
        });
    });

    static getProductById = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;

        const product = await ProductService.getProductById(id);

        res.json({
            success: true,
            data: { product }
        });
    });

    static createProduct = asyncErrorHandler(async (req, res) => {
        const productData = req.body;

        const product = await ProductService.createProduct(productData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    });

    static updateProduct = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        const product = await ProductService.updateProduct(id, updateData);

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: { product }
        });
    });

    static deleteProduct = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;

        const result = await ProductService.deleteProduct(id);

        res.json({
            success: true,
            message: result.message
        });
    });

    static getCategories = asyncErrorHandler(async (req, res) => {
        const categories = await ProductService.getCategories();

        res.json({
            success: true,
            data: { categories }
        });
    });

    static updateStock = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;

        if (typeof quantity !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a number'
            });
        }

        const product = await ProductService.updateStock(id, quantity);

        res.json({
            success: true,
            message: 'Stock updated successfully',
            data: { product }
        });
    });
}

module.exports = ProductController;