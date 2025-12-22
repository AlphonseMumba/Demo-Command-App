const Product = require('../models/Product');
const { ValidationError, NotFoundError } = require('../middleware/errorHandler');

class ProductService {
    static async getAllProducts(query = {}) {
        try {
            let products = await Product.findAll();

            // Apply filters
            if (query.category) {
                products = products.filter(product => product.category === query.category);
            }

            if (query.search) {
                const searchTerm = query.search.toLowerCase();
                products = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }

            // Apply sorting
            if (query.sort) {
                products.sort((a, b) => {
                    switch (query.sort) {
                        case 'price_asc':
                            return a.price - b.price;
                        case 'price_desc':
                            return b.price - a.price;
                        case 'name_asc':
                            return a.name.localeCompare(b.name);
                        case 'name_desc':
                            return b.name.localeCompare(a.name);
                        default:
                            return 0;
                    }
                });
            }

            // Apply pagination
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedProducts = products.slice(startIndex, endIndex);
            const totalPages = Math.ceil(products.length / limit);

            return {
                products: paginatedProducts.map(product => product.toJSON()),
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalProducts: products.length,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        } catch (error) {
            console.error('Error getting products:', error);
            throw new Error('Failed to retrieve products');
        }
    }

    static async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }
            return product.toJSON();
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new Error('Failed to retrieve product');
        }
    }

    static async createProduct(productData) {
        try {
            // Validate required fields
            if (!productData.name || !productData.price) {
                throw new ValidationError('Name and price are required');
            }

            if (productData.price <= 0) {
                throw new ValidationError('Price must be greater than 0');
            }

            const newProduct = new Product(productData);
            await newProduct.save();

            return newProduct.toJSON();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            throw new Error('Failed to create product');
        }
    }

    static async updateProduct(id, updateData) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            // Validate price if provided
            if (updateData.price !== undefined && updateData.price <= 0) {
                throw new ValidationError('Price must be greater than 0');
            }

            // Update product properties
            Object.assign(product, updateData);
            product.updatedAt = new Date().toISOString();

            await product.save();

            return product.toJSON();
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }
            throw new Error('Failed to update product');
        }
    }

    static async deleteProduct(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            await product.delete();
            return { message: 'Product deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new Error('Failed to delete product');
        }
    }

    static async getCategories() {
        try {
            const products = await Product.findAll();
            const categories = [...new Set(products.map(product => product.category))];
            return categories.filter(category => category); // Remove empty categories
        } catch (error) {
            console.error('Error getting categories:', error);
            throw new Error('Failed to retrieve categories');
        }
    }

    static async updateStock(id, quantity) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            product.stock = Math.max(0, product.stock + quantity); // Prevent negative stock
            product.updatedAt = new Date().toISOString();

            await product.save();

            return product.toJSON();
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new Error('Failed to update stock');
        }
    }
}

module.exports = ProductService;