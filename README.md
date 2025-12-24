# Demo-Command-App ✅

Petit demo d'une **application de commande** (front-end statique) inspirée par Kinshasa.

Live demo: https://alphonsemumba.github.io/Demo-Command-App/

---

## À propos / About

- **Statique** : site HTML/CSS/JS (pas de backend).  
- **Langues** : Français, Lingala, Swahili, Anglais (sélecteur en haut à droite).  
- **Monnaies** : USD / CDF (sélecteur de devise).  
- **Paiement** : bouton de commande via WhatsApp (ouverture d'un message pré-formaté).

## Structure du projet / Project structure

```
app.js
index.html
styles.css
README.md
```

## Lancer en local / Run locally

1. Ouvrir `index.html` dans votre navigateur (double-clic) — solution rapide pour un aperçu.
2. Pour servir les fichiers via un petit serveur (recommandé) :

	 - Avec Python 3 :

		 ```powershell
		 python -m http.server 8000; Start-Process http://localhost:8000
		 ```

	 - Ou avec `npx serve` :

		 ```powershell
		 npx serve . -p 8000
		 ```

Ouvrez ensuite `http://localhost:8000` dans votre navigateur.

## Personnalisation / Tips

- Modifiez les produits et traductions dans `app.js` (tableau `PRODUCTS` et `UI_TEXT`).
- Les taux de change sont définis dans `EXCHANGE_RATE` et la conversion est effectuée dans `formatPrice()`.

## Contribution

Pull requests bienvenues pour améliorer le design, l'accessibilité ou ajouter des tests.

---

© 2025 KINU | Demo project
