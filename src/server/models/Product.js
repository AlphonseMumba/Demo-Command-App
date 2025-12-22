const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class Product {
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.description = data.description;
        this.price = parseFloat(data.price);
        this.category = data.category;
        this.image = data.image;
        this.stock = parseInt(data.stock) || 0;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    static async findAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../../../database/seeds/products.json'), 'utf8');
            const jsonData = JSON.parse(data);
            const products = jsonData.products || [];
            return products.map(product => new Product(product));
        } catch (error) {
            console.error('Error reading products:', error);
            return [];
        }
    }

    static async findById(id) {
        const products = await this.findAll();
        return products.find(product => product.id === id);
    }

    static async findByCategory(category) {
        const products = await this.findAll();
        return products.filter(product => product.category === category);
    }

    static async search(query) {
        const products = await this.findAll();
        const lowerQuery = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }

    async save() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../../../database/seeds/products.json'), 'utf8');
            const jsonData = JSON.parse(data);
            const products = jsonData.products || [];

            const existingIndex = products.findIndex(product => product.id === this.id);

            if (existingIndex >= 0) {
                products[existingIndex] = this;
            } else {
                products.push(this);
            }

            const updatedData = {
                ...jsonData,
                products
            };

            await fs.writeFile(
                path.join(__dirname, '../../../database/seeds/products.json'),
                JSON.stringify(updatedData, null, 2)
            );
            return this;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async delete() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../../../database/seeds/products.json'), 'utf8');
            const jsonData = JSON.parse(data);
            const products = jsonData.products || [];
            const filteredProducts = products.filter(product => product.id !== this.id);

            const updatedData = {
                ...jsonData,
                products: filteredProducts
            };

            await fs.writeFile(
                path.join(__dirname, '../../../database/seeds/products.json'),
                JSON.stringify(updatedData, null, 2)
            );
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = Product;