const express = require('express');
const path = require('path');
const config = require('./config/config');
const databaseConfig = require('./config/database');

// Import middleware
const {
    corsOptions,
    generalLimiter,
    authLimiter,
    helmetConfig,
    securityLogger,
    helmet,
    cors,
    validateInput
} = require('./middleware/security');

const {
    errorHandler,
    notFoundHandler,
    errorMonitoring,
    logSystemError
} = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

// Initialize database
databaseConfig.initialize().catch(console.error);

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet(helmetConfig));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);

// Logging middleware
app.use(securityLogger);

// Static files
app.use(express.static(path.join(__dirname, '../client')));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Legacy route for /api/me (used by frontend)
const AuthController = require('./controllers/AuthController');
const { authenticateToken } = require('./middleware/security');
app.get('/api/me', authenticateToken, AuthController.getCurrentUser);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.server.env
    });
});

// Serve client application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/admin.html'));
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Error monitoring
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    logSystemError(error, { type: 'uncaughtException' });
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    logSystemError(reason, { type: 'unhandledRejection' });
});

// Start server
const server = app.listen(config.server.port, () => {
    console.log(`🚀 Server running on http://${config.server.host}:${config.server.port}`);
    console.log(`📝 Environment: ${config.server.env}`);
    console.log(`🔒 Security: ${config.security.jwtSecret ? 'Configured' : 'Missing JWT_SECRET'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

module.exports = app;
