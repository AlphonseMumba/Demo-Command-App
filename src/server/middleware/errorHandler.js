/**
 * Gestion d'erreurs sécurisée pour SwiftShop
 * Évite la fuite d'informations sensibles
 */

const fs = require('fs');
const path = require('path');

// Fonction de logging sécurisé
function logError(error, req = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level: 'error',
        message: error.message,
        stack: error.stack,
        url: req?.url,
        method: req?.method,
        ip: req?.ip || req?.connection?.remoteAddress,
        userAgent: req?.get('User-Agent'),
        userId: req?.user?.id
    };

    // Écrire dans un fichier de log sécurisé
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, `error-${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

    // Afficher seulement les informations non sensibles en console
    console.error(`[ERROR] ${timestamp} - ${error.message}`);
}

// Middleware de gestion d'erreurs global
function errorHandler(err, req, res, next) {
    // Logger l'erreur complète en interne
    logError(err, req);

    // Déterminer le type d'erreur pour la réponse appropriée
    let statusCode = 500;
    let message = 'Une erreur interne est survenue';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Données invalides';
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Non autorisé';
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403;
        message = 'Accès refusé';
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = 'Ressource non trouvée';
    } else if (err.message.includes('CORS')) {
        statusCode = 403;
        message = 'Origine non autorisée';
    }

    // Réponse sécurisée (pas de détails techniques)
    res.status(statusCode).json({
        error: message,
        timestamp: new Date().toISOString(),
        requestId: req.requestId || 'unknown'
    });
}

// Middleware pour les routes non trouvées
function notFoundHandler(req, res, next) {
    const error = new Error(`Route ${req.method} ${req.url} non trouvée`);
    error.name = 'NotFoundError';
    next(error);
}

// Fonction de gestion d'erreurs asynchrone
function asyncErrorHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Classe d'erreur personnalisée sécurisée
class SecureError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Capturer la stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

// Erreurs spécifiques
class ValidationError extends SecureError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

class AuthenticationError extends SecureError {
    constructor(message = 'Authentification échouée') {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

class AuthorizationError extends SecureError {
    constructor(message = 'Accès non autorisé') {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

class NotFoundError extends SecureError {
    constructor(resource = 'Ressource') {
        super(`${resource} non trouvée`, 404);
        this.name = 'NotFoundError';
    }
}

// Fonction de monitoring des erreurs système (non-HTTP)
function logSystemError(error, context = {}) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
        timestamp,
        type: context.type || 'system_error',
        message: error.message,
        stack: error.stack,
        ...context
    };

    console.error('[SYSTEM ERROR]', JSON.stringify(errorInfo, null, 2));
}

// Middleware de monitoring des erreurs
function errorMonitoring(req, res, next) {
    const start = Date.now();

    // Générer un ID de requête unique
    req.requestId = require('crypto').randomBytes(8).toString('hex');

    // Surveiller la réponse
    res.on('finish', () => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;

        // Logger les erreurs serveur
        if (statusCode >= 500) {
            console.warn(`[MONITOR] ${req.requestId} - ${req.method} ${req.url} - ${statusCode} - ${duration}ms`);
        }

        // Logger les requêtes lentes (> 5 secondes)
        if (duration > 5000) {
            console.warn(`[PERF] Slow request: ${req.requestId} - ${req.method} ${req.url} - ${duration}ms`);
        }
    });

    next();
}

// Fonction de nettoyage des erreurs sensibles
function sanitizeError(error) {
    if (error instanceof SecureError) {
        return {
            name: error.name,
            message: error.message,
            statusCode: error.statusCode
        };
    }

    // Pour les erreurs inconnues, retourner seulement un message générique
    return {
        name: 'InternalServerError',
        message: 'Une erreur interne est survenue',
        statusCode: 500
    };
}

module.exports = {
    logError,
    errorHandler,
    notFoundHandler,
    asyncErrorHandler,
    SecureError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    errorMonitoring,
    logSystemError,
    sanitizeError
};