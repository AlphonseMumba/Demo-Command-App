/**
 * Middleware de sécurité pour SwiftShop
 * Implémente les meilleures pratiques de sécurité
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const crypto = require('crypto');

// Configuration CORS sécurisée
const corsOptions = {
    origin: function (origin, callback) {
        // Autoriser les origines définies dans les variables d'environnement
        const allowedOrigins = process.env.ALLOWED_ORIGINS ?
            process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'];

        // Autoriser les requêtes sans origine (comme les apps mobiles)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Rate limiting général
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requêtes par fenêtre
    message: {
        error: 'Trop de requêtes, veuillez réessayer plus tard.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Ne pas limiter les requêtes de ressources statiques
        return req.path.startsWith('/css/') ||
               req.path.startsWith('/js/') ||
               req.path.startsWith('/images/');
    }
});

// Rate limiting pour l'authentification
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives de connexion par fenêtre
    message: {
        error: 'Trop de tentatives de connexion. Compte temporairement bloqué.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Ne pas compter les succès
});

// Rate limiting pour les paiements
const paymentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 10, // 10 tentatives de paiement par heure
    message: {
        error: 'Trop de tentatives de paiement. Veuillez contacter le support.',
        retryAfter: '1 heure'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Configuration Helmet avancée
const helmetConfig = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
};

// Fonction de validation d'entrée
function validateInput(req, res, next) {
    // Sanitisation basique des entrées
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/javascript:/gi, '')
                  .replace(/on\w+\s*=/gi, '')
                  .trim();
    };

    // Appliquer la sanitisation aux champs de requête
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = sanitizeString(req.body[key]);
            }
        });
    }

    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = sanitizeString(req.query[key]);
            }
        });
    }

    next();
}

// Fonction de logging de sécurité
function securityLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const method = req.method;
    const url = req.url;

    // Log basique des requêtes suspectes
    if (req.url.includes('<') || req.url.includes('script')) {
        console.warn(`[SECURITY] ${timestamp} - XSS attempt from ${ip}: ${method} ${url}`);
    }

    // Log des tentatives d'accès non autorisé
    if (req.url.startsWith('/api/admin') && !req.headers.authorization) {
        console.warn(`[SECURITY] ${timestamp} - Unauthorized admin access attempt from ${ip}`);
    }

    next();
}

// Fonction de génération de tokens sécurisés
function generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

// Fonction de hashage sécurisé pour données sensibles
function hashData(data) {
    const key = process.env.DB_ENCRYPTION_KEY || 'default-key-change-in-production';
    return crypto.createHmac('sha256', key).update(data).digest('hex');
}

// Middleware d'authentification JWT sécurisé
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token d\'authentification requis' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.warn(`[SECURITY] Invalid token attempt: ${err.message}`);
        return res.status(403).json({ error: 'Token invalide' });
    }
}

// Middleware d'autorisation admin
function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        console.warn(`[SECURITY] Admin access denied for user: ${req.user?.email || 'unknown'}`);
        return res.status(403).json({ error: 'Accès administrateur requis' });
    }
    next();
}

module.exports = {
    corsOptions,
    generalLimiter,
    authLimiter,
    paymentLimiter,
    helmetConfig,
    validateInput,
    securityLogger,
    generateSecureToken,
    hashData,
    authenticateToken,
    requireAdmin,
    helmet,
    cors
};