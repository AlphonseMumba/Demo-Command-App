const path = require('path');

const databaseConfig = {
    // File-based database paths
    paths: {
        users: path.join(__dirname, '../../../database/seeds/users.json'),
        products: path.join(__dirname, '../../../database/seeds/products.json'),
        orders: path.join(__dirname, '../../../database/seeds/orders.json')
    },

    // Database initialization
    initialize: async () => {
        const fs = require('fs').promises;

        // Ensure database directory exists
        await fs.mkdir(path.join(__dirname, '../../../database'), { recursive: true });
        await fs.mkdir(path.join(__dirname, '../../../database/seeds'), { recursive: true });
        await fs.mkdir(path.join(__dirname, '../../../database/migrations'), { recursive: true });
        await fs.mkdir(path.join(__dirname, '../../../database/backups'), { recursive: true });

        // Initialize data files if they don't exist
        const initialData = {
            users: [],
            products: [],
            orders: []
        };

        for (const [key, filePath] of Object.entries(databaseConfig.paths)) {
            try {
                await fs.access(filePath);
            } catch (error) {
                // File doesn't exist, create it with initial data
                await fs.writeFile(filePath, JSON.stringify(initialData[key], null, 2));
                console.log(`Initialized ${key} database file`);
            }
        }
    },

    // Backup functionality
    backup: async () => {
        const fs = require('fs').promises;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(__dirname, '../../../database/backups', timestamp);

        await fs.mkdir(backupDir, { recursive: true });

        for (const [key, filePath] of Object.entries(databaseConfig.paths)) {
            const backupPath = path.join(backupDir, `${key}.json`);
            await fs.copyFile(filePath, backupPath);
        }

        console.log(`Database backup created at ${backupDir}`);
        return backupDir;
    }
};

module.exports = databaseConfig;