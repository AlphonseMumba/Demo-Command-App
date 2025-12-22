const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class User {
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.username = data.username;
        this.email = data.email;
        this.password = data.password; // Should be hashed
        this.role = data.role || 'user';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    static async findAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../../../database/seeds/users.json'), 'utf8');
            const users = JSON.parse(data);
            return users.map(user => new User(user));
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    }

    static async findById(id) {
        const users = await this.findAll();
        return users.find(user => user.id === id);
    }

    static async findByEmail(email) {
        const users = await this.findAll();
        return users.find(user => user.email === email);
    }

    static async findByUsername(username) {
        const users = await this.findAll();
        return users.find(user => user.username === username);
    }

    async save() {
        try {
            const users = await this.constructor.findAll();
            const existingIndex = users.findIndex(user => user.id === this.id);

            if (existingIndex >= 0) {
                users[existingIndex] = this;
            } else {
                users.push(this);
            }

            await fs.writeFile(
                path.join(__dirname, '../../../database/seeds/users.json'),
                JSON.stringify(users, null, 2)
            );
            return this;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    toJSON() {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}

module.exports = User;