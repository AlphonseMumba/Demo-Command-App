/**
 * Validations de sécurité pour SwiftShop
 * Utilise Joi pour la validation des données
 */

const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
        .required()
        .messages({
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne peut pas dépasser 100 caractères',
            'string.pattern.base': 'Le nom contient des caractères invalides',
            'any.required': 'Le nom est obligatoire'
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase()
        .required()
        .messages({
            'string.email': 'Adresse email invalide',
            'any.required': 'L\'email est obligatoire'
        }),

    password: Joi.string()
        .min(8)
        .max(128)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
            'string.max': 'Le mot de passe ne peut pas dépasser 128 caractères',
            'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
            'any.required': 'Le mot de passe est obligatoire'
        }),

    phone: Joi.string()
        .pattern(/^\+243[0-9]{9}$/)
        .allow('')
        .optional()
        .messages({
            'string.pattern.base': 'Le numéro de téléphone doit être au format +243XXXXXXXXX'
        })
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.email': 'Adresse email invalide',
            'any.required': 'L\'email est obligatoire'
        }),

    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Le mot de passe est obligatoire'
        })
});

// Schéma de validation pour les produits
const productSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({
            'string.min': 'Le nom du produit doit contenir au moins 2 caractères',
            'string.max': 'Le nom du produit ne peut pas dépasser 200 caractères',
            'any.required': 'Le nom du produit est obligatoire'
        }),

    category: Joi.string()
        .valid('food', 'clothing', 'electronics', 'home', 'beauty')
        .required()
        .messages({
            'any.only': 'Catégorie invalide',
            'any.required': 'La catégorie est obligatoire'
        }),

    priceCDF: Joi.number()
        .integer()
        .min(100)
        .max(10000000)
        .required()
        .messages({
            'number.min': 'Le prix doit être d\'au moins 100 FC',
            'number.max': 'Le prix ne peut pas dépasser 10,000,000 FC',
            'any.required': 'Le prix est obligatoire'
        }),

    description: Joi.string()
        .max(1000)
        .allow('')
        .optional()
        .messages({
            'string.max': 'La description ne peut pas dépasser 1000 caractères'
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .max(10000)
        .default(0)
        .optional()
        .messages({
            'number.min': 'Le stock ne peut pas être négatif',
            'number.max': 'Le stock ne peut pas dépasser 10,000 unités'
        })
});

// Schéma de validation pour les commandes
const orderSchema = Joi.object({
    items: Joi.array()
        .items(Joi.object({
            productId: Joi.number().integer().required(),
            quantity: Joi.number().integer().min(1).max(100).required()
        }))
        .min(1)
        .required()
        .messages({
            'array.min': 'La commande doit contenir au moins un article',
            'any.required': 'Les articles de la commande sont obligatoires'
        }),

    shippingAddress: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        phone: Joi.string().pattern(/^\+243[0-9]{9}$/).required(),
        address: Joi.string().min(10).max(500).required(),
        city: Joi.string().valid('Kinshasa').required()
    }).required(),

    paymentMethod: Joi.string()
        .valid('orange_money', 'airtel_money', 'mpesa')
        .required()
        .messages({
            'any.only': 'Méthode de paiement invalide'
        })
});

// Fonction de validation middleware
function validateRequest(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Données de validation invalides',
                details: errors
            });
        }

        req.validatedData = value;
        next();
    };
}

// Fonction de sanitisation des entrées
function sanitizeInput(input) {
    if (typeof input === 'string') {
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
            .trim();
    }
    return input;
}

// Fonction de validation email renforcée
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Fonction de validation mot de passe renforcée
function isStrongPassword(password) {
    // Au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
}

module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
    orderSchema,
    validateRequest,
    sanitizeInput,
    isValidEmail,
    isStrongPassword
};