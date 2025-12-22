#!/usr/bin/env node

/**
 * Script d'audit de sécurité pour SwiftShop
 * Vérifie la configuration de sécurité et les vulnérabilités potentielles
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Charger les variables d'environnement
require('dotenv').config();

console.log('🔒 Audit de sécurité SwiftShop');
console.log('==============================\n');

// Vérifications de sécurité
const checks = {
    envFile: false,
    jwtSecret: false,
    encryptionKey: false,
    dependencies: false,
    corsConfig: false,
    rateLimiting: false,
    helmetConfig: false,
    inputValidation: false,
    errorHandling: false
};

let score = 0;
const maxScore = Object.keys(checks).length;

// 1. Vérifier la présence du fichier .env
console.log('1. Configuration des variables d\'environnement:');
try {
    if (fs.existsSync('.env')) {
        console.log('   ✅ Fichier .env présent');
        checks.envFile = true;
        score++;
    } else {
        console.log('   ❌ Fichier .env manquant - COPIEZ .env.example vers .env');
    }
} catch (err) {
    console.log('   ❌ Erreur lors de la vérification du fichier .env');
}

// 2. Vérifier la sécurité du JWT_SECRET
console.log('\n2. Sécurité du JWT_SECRET:');
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret) {
    if (jwtSecret.length >= 32 && jwtSecret !== 'dev-secret-change-me') {
        console.log('   ✅ JWT_SECRET sécurisé (32+ caractères, pas la valeur par défaut)');
        checks.jwtSecret = true;
        score++;
    } else if (jwtSecret === 'dev-secret-change-me') {
        console.log('   ❌ JWT_SECRET utilise la valeur par défaut - CHANGEZ IMMÉDIATEMENT');
    } else {
        console.log('   ⚠️  JWT_SECRET trop court (< 32 caractères) - recommandé: 32+ caractères');
    }
} else {
    console.log('   ❌ JWT_SECRET non défini');
}

// 3. Vérifier la clé de chiffrement
console.log('\n3. Clé de chiffrement des données:');
const encryptionKey = process.env.DB_ENCRYPTION_KEY;
if (encryptionKey) {
    if (encryptionKey.length >= 32) {
        console.log('   ✅ Clé de chiffrement sécurisée (32+ caractères)');
        checks.encryptionKey = true;
        score++;
    } else {
        console.log('   ⚠️  Clé de chiffrement trop courte (< 32 caractères)');
    }
} else {
    console.log('   ❌ Clé de chiffrement non définie');
}

// 4. Vérifier les dépendances de sécurité
console.log('\n4. Dépendances de sécurité:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
    'helmet', 'express-rate-limit', 'express-validator',
    'joi', 'csurf', 'dotenv'
];

let depScore = 0;
requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
        depScore++;
    }
});

if (depScore === requiredDeps.length) {
    console.log('   ✅ Toutes les dépendances de sécurité installées');
    checks.dependencies = true;
    score++;
} else {
    console.log(`   ⚠️  ${depScore}/${requiredDeps.length} dépendances de sécurité installées`);
    console.log('   Dépendances manquantes:', requiredDeps.filter(dep =>
        !packageJson.dependencies || !packageJson.dependencies[dep]
    ));
}

// 5. Vérifier la configuration CORS
console.log('\n5. Configuration CORS:');
const allowedOrigins = process.env.ALLOWED_ORIGINS;
if (allowedOrigins && allowedOrigins !== 'http://localhost:3000') {
    console.log('   ✅ CORS configuré avec origines spécifiques');
    checks.corsConfig = true;
    score++;
} else {
    console.log('   ⚠️  CORS non configuré ou utilise localhost uniquement');
}

// 6. Vérifier les fichiers de sécurité
console.log('\n6. Fichiers de sécurité:');
const securityFiles = [
    'src/server/middleware/security.js',
    'src/server/middleware/validation.js',
    'src/server/middleware/errorHandler.js'
];
let fileScore = 0;

securityFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fileScore++;
        console.log(`   ✅ ${file} présent`);
    } else {
        console.log(`   ❌ ${file} manquant`);
    }
});

if (fileScore === securityFiles.length) {
    checks.rateLimiting = checks.helmetConfig = checks.inputValidation = checks.errorHandling = true;
    score += 4;
}

// 7. Audit des vulnérabilités npm
console.log('\n7. Audit des vulnérabilités npm:');
try {
    const { execSync } = require('child_process');
    const auditResult = execSync('npm audit --audit-level moderate --json', { encoding: 'utf8' });
    const auditData = JSON.parse(auditResult);

    if (auditData.metadata.vulnerabilities.total === 0) {
        console.log('   ✅ Aucune vulnérabilité détectée');
    } else {
        console.log(`   ⚠️  ${auditData.metadata.vulnerabilities.total} vulnérabilités détectées`);
        console.log('   Exécutez: npm audit fix');
    }
} catch (err) {
    console.log('   ❌ Impossible d\'exécuter npm audit');
}

// 8. Vérifications finales
console.log('\n8. Résumé de sécurité:');
const percentage = Math.round((score / maxScore) * 100);
console.log(`   Score de sécurité: ${score}/${maxScore} (${percentage}%)`);

if (percentage >= 80) {
    console.log('   🎉 Sécurité EXCELLENTE - Prêt pour la production');
} else if (percentage >= 60) {
    console.log('   ✅ Sécurité BONNE - Quelques améliorations recommandées');
} else if (percentage >= 40) {
    console.log('   ⚠️  Sécurité MOYENNE - Améliorations nécessaires');
} else {
    console.log('   ❌ Sécurité FAIBLE - Action immédiate requise');
}

// Recommandations
console.log('\n📋 Recommandations:');
if (!checks.envFile) {
    console.log('   - Copiez .env.example vers .env et configurez les variables');
}
if (!checks.jwtSecret) {
    console.log('   - Changez JWT_SECRET pour une valeur sécurisée de 32+ caractères');
}
if (!checks.encryptionKey) {
    console.log('   - Définissez DB_ENCRYPTION_KEY pour chiffrer les données sensibles');
}
if (!checks.dependencies) {
    console.log('   - Installez les dépendances de sécurité manquantes');
}
if (!checks.corsConfig) {
    console.log('   - Configurez ALLOWED_ORIGINS pour votre domaine de production');
}

console.log('\n🔐 Pour plus de sécurité:');
console.log('   - Activez HTTPS en production');
console.log('   - Configurez un firewall');
console.log('   - Mettez à jour régulièrement les dépendances');
console.log('   - Surveillez les logs de sécurité');
console.log('   - Effectuez des audits de sécurité réguliers');

console.log('\n✨ Audit terminé!\n');