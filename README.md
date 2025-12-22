# SwiftShop 🛒

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Votre marché en ligne en République Démocratique du Congo 🇨🇩
>
> SwiftShop est une plateforme de commerce électronique moderne conçue spécifiquement pour le marché congolais, offrant une expérience d'achat fluide avec paiement mobile intégré.

## Fonctionnalités

### Catalogue de Produits
- Catégories riches : Nourriture, Vêtements, Électronique, Maison, Beauté
- Recherche avancée : Recherche en temps réel avec filtrage par catégorie
- Tri intelligent : Par prix, notation, nom
- Conversion devise : Franc Congolais (FC) ↔ Dollar US ($)

### Authentification Utilisateur
- Inscription/Connexion : Système sécurisé avec JWT
- Gestion des comptes : Profils utilisateurs avec informations personnelles
- Sécurité : Mots de passe hashés avec bcrypt

### Expérience d'Achat
- Panier dynamique : Ajout/suppression en temps réel
- Calcul automatique : Sous-totaux, frais de port, taxes
- Liste de souhaits : Sauvegarde des produits favoris
- Quantités flexibles : Gestion des stocks

### Paiement Mobile Money
- Orange Money (orangeMoney.cd)
- Airtel Money (airtelMoney.cd)
- M-Pesa (Safaricom)
- API intégrée : Endpoints serveur pour traitement sécurisé

### Interface Utilisateur
- Design moderne : Interface responsive et élégante
- Mode sombre/clair : Adaptation automatique aux préférences
- Accessibilité : Conformité WCAG 2.1 AA
- Performance : Optimisé pour mobile et desktop

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** 18.0 ou supérieur
- **npm** ou **yarn**

### Installation

1. Cloner le repository
   ```bash
   git clone https://github.com/username/swiftshop.git
   cd swiftshop
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Démarrer le serveur
   ```bash
   # Mode développement (avec auto-reload)
   npm run dev

   # Mode production
   npm start
   ```

4. Accéder à l'application
   ```
   http://localhost:3000
   ```

### Configuration

#### Variables d'environnement (`.env`)
```env
# JWT Secret (changez en production)
JWT_SECRET=votre-secret-jwt-super-securise

# Mot de passe admin par défaut
ADMIN_PASSWORD=Admin123!

# Port du serveur (optionnel, défaut: 3000)
PORT=3000
```

#### Utilisateur Admin
Un compte administrateur est automatiquement créé au premier démarrage :
- Email : `admin@swiftshop.local`
- Mot de passe : Défini par `ADMIN_PASSWORD` ou `Admin123!` par défaut

## Structure du Projet

```
swiftshop/
├── index.html          # Page principale HTML
├── styles.css          # Styles CSS avec variables et mode sombre
├── app.js              # Logique frontend JavaScript
├── server.js           # Serveur Express.js
├── package.json        # Dépendances et scripts
├── data/               # Stockage JSON
│   ├── products.json      # Catalogue de produits
│   ├── users.json         # Comptes utilisateurs
│   └── orders.json        # Commandes
└── README.md           # Documentation
```

## Sécurité

### Mesures de sécurité implémentées

#### Authentification et autorisation
- JWT avec expiration courte (1 heure en production)
- Hashage bcrypt des mots de passe (12 rounds)
- Validation renforcée des mots de passe
- Protection contre les attaques par dictionnaire

#### Protection contre les attaques web
- **Helmet.js** : En-têtes de sécurité HTTP
- **Rate limiting** : Limitation du nombre de requêtes
- **CORS configuré** : Origines autorisées uniquement
- **Validation d'entrée** : Sanitisation et validation Joi
- **Protection XSS** : Échappement des données utilisateur

#### Sécurité des données
- **Chiffrement** : Clés de chiffrement pour données sensibles
- **Validation** : Schémas Joi pour toutes les entrées
- **Logging sécurisé** : Logs d'erreurs sans fuite d'informations
- **Gestion d'erreurs** : Messages d'erreur génériques

#### Sécurité réseau
- **HTTPS obligatoire** en production
- **HSTS** : Forçage HTTPS
- **CSP** : Content Security Policy
- **Referrer Policy** : Protection des données de référence

### Configuration de sécurité

#### Variables d'environnement requises
```env
# Sécurité JWT
JWT_SECRET=votre-secret-jwt-super-securise-d-au-moins-32-caracteres
JWT_EXPIRES_IN=1h

# Sécurité base de données
DB_ENCRYPTION_KEY=une-cle-de-chiffrement-32-caracteres-minimum

# Sécurité CORS
ALLOWED_ORIGINS=https://votredomaine.com,https://www.votredomaine.com

# Sécurité rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Audit de sécurité recommandé
- [ ] Analyse statique du code (ESLint Security)
- [ ] Tests de pénétration (OWASP ZAP)
- [ ] Audit des dépendances (npm audit)
- [ ] Revue de code pour sécurité
- [ ] Tests de charge et DoS

### Bonnes pratiques de sécurité

#### Pour les développeurs
- ✅ Toujours valider les entrées utilisateur
- ✅ Utiliser des requêtes préparées (paramétrées)
- ✅ Échapper les sorties HTML
- ✅ Implémenter le principe du moindre privilège
- ✅ Logger les actions sensibles

#### Pour l'infrastructure
- ✅ Utiliser HTTPS en production
- ✅ Configurer un firewall
- ✅ Mettre à jour régulièrement les dépendances
- ✅ Sauvegarder les données régulièrement
- ✅ Monitorer les logs de sécurité

#### Pour les utilisateurs
- ✅ Mots de passe forts (8+ caractères, mixtes)
- ✅ Authentification à deux facteurs (recommandé)
- ✅ Ne jamais partager les informations de connexion
- ✅ Vérifier l'URL avant de saisir des données sensibles

## API Endpoints

### Produits
```http
GET /api/products          # Récupérer tous les produits
```

### Authentification
```http
POST /api/auth/register    # Inscription utilisateur
POST /api/auth/login       # Connexion utilisateur
```

### Paiements Mobile Money
```http
POST /api/payments/:provider  # Initier paiement (Orange/Airtel/M-Pesa)
```

## Intégration Mobile Money

### Configuration par Provider

#### Orange Money
1. Créer un compte marchand sur [orangeMoney.cd](https://orangeMoney.cd)
2. Obtenir `client_id` et `client_secret`
3. Configurer webhook pour confirmations
4. Implémenter appels API côté serveur

#### Airtel Money
1. S'inscrire auprès d'Airtel pour API access
2. Obtenir clés API et certificats
3. Configurer callback URLs
4. Gérer signatures de sécurité

#### M-Pesa
1. Intégrer SDK Safaricom
2. Configurer environnement (sandbox/production)
3. Gérer callbacks et validations
4. Respecter exigences de sécurité

### Sécurité
- HTTPS obligatoire en production
- Signatures HMAC pour webhooks
- Validation côté serveur de toutes les transactions
- Clés API stockées dans variables d'environnement

## Fonctionnalités Avancées

### Accessibilité
- Navigation clavier complète
- Lecteurs d'écran supportés
- Contraste élevé en mode sombre
- Focus visible et intuitif

### Performance
- Lazy loading des images
- Code splitting JavaScript
- Optimisation mobile first
- Cache intelligent des données

### Internationalisation
- Langue française (Congo)
- Format monétaire local (FC)
- Numéros de téléphone congolais (+243)
- Adresses de livraison Kinshasa-centric

## Développement

### Commandes de sécurité
```bash
# Audit de sécurité complet
npm run audit

# Vérification sécurité + vulnérabilités
npm run security-check

# Installation des dépendances de sécurité
npm install
```

### Ajouter des Produits
Modifier `data/products.json` :
```json
{
  "products": [
    {
      "id": 1,
      "name": "Smartphone Samsung",
      "priceCDF": 450000,
      "category": "electronics",
      "description": "Téléphone Android récent",
      "image": "https://example.com/image.jpg",
      "rating": 4.5,
      "stock": 10
    }
  ],
  "exchangeRate": 2250,
  "shippingFee": 5000
}
```

### Migration Base de Données
Pour production, migrez vers :
- PostgreSQL ou MySQL pour données relationnelles
- MongoDB pour flexibilité
- Redis pour cache et sessions

## Déploiement

### Environnements Recommandés
- Vercel : Frontend statique
- Heroku : Application Node.js complète
- Railway : Déploiement simplifié
- AWS/GCP : Solutions enterprise

### Checklist Pré-déploiement
- [ ] Variables d'environnement configurées
- [ ] HTTPS activé
- [ ] Base de données migrée
- [ ] Tests de paiement effectués
- [ ] Monitoring configuré

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- ESLint pour JavaScript
- Prettier pour formatage
- Conventional Commits pour messages
- Tests unitaires encouragés

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

- Email : info@swiftshop.com
- Téléphone : +243 842 315 918
- Site Web : [swiftshop.com](https://swiftshop.com)

## Remerciements

- Communauté Open Source pour les outils utilisés
- Développeurs congolais pour l'inspiration locale
- Équipe SwiftShop pour l'innovation continue

---

<div align="center">
  <p>Fait avec ❤️ pour la communauté congolaise</p>
  <p>
    <a href="#swiftshop-">Retour en haut</a> •
    <a href="https://github.com/username/swiftshop/issues">Signaler un bug</a> •
    <a href="https://github.com/username/swiftshop/pulls">Contribuer</a>
  </p>
</div>
