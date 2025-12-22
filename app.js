/**
 * SwiftShop - Application JavaScript
 * E-commerce Application for Congo (DRC)
 * © 2025 SwiftShop
 */
'use strict';

/* ============================================
   DATABASE - Products Data Store
   ============================================ */
const ProductsDatabase = {
    // Exchange rate: 1 USD ≈ 2250 CDF
    exchangeRate: 2250,
    
    // Shipping fee in CDF
    shippingFee: 5000,
    
    // Categories definition
    categories: {
        all: { name: 'Tous', icon: 'fa-th-large' },
        food: { name: 'Nourriture', icon: 'fa-utensils' },
        clothing: { name: 'Vêtements', icon: 'fa-tshirt' },
        electronics: { name: 'Électronique', icon: 'fa-laptop' },
        home: { name: 'Maison', icon: 'fa-couch' },
        beauty: { name: 'Beauté', icon: 'fa-spa' }
    },
    
    // Products collection
    products: [
        // ========== FOOD ==========
        {
            id: 1,
            name: "Sac de Riz 25kg Premium",
            category: "food",
            priceCDF: 85000,
            icon: "🍚",
            rating: 4.8,
            reviews: 234,
            badge: "Populaire",
            description: "Riz de qualité supérieure importé",
            inStock: true
        },
        {
            id: 2,
            name: "Huile de Palme 5L",
            category: "food",
            priceCDF: 28000,
            icon: "🫒",
            rating: 4.6,
            reviews: 189,
            badge: null,
            description: "Huile de palme naturelle",
            inStock: true
        },
        {
            id: 3,
            name: "Poulet Fumé 1kg",
            category: "food",
            priceCDF: 22000,
            icon: "🍗",
            rating: 4.9,
            reviews: 456,
            badge: "-15%",
            description: "Poulet fumé traditionnel",
            inStock: true
        },
        {
            id: 4,
            name: "Pondu Frais (Saka-Saka)",
            category: "food",
            priceCDF: 8500,
            icon: "🥬",
            rating: 4.7,
            reviews: 312,
            badge: null,
            description: "Feuilles de manioc fraîches",
            inStock: true
        },
        {
            id: 5,
            name: "Poisson Salé (Makayabu)",
            category: "food",
            priceCDF: 35000,
            icon: "🐟",
            rating: 4.5,
            reviews: 178,
            badge: null,
            description: "Poisson salé séché traditionnel",
            inStock: true
        },
        {
            id: 6,
            name: "Pack Boissons Sucrées x12",
            category: "food",
            priceCDF: 42000,
            icon: "🥤",
            rating: 4.4,
            reviews: 267,
            badge: "Nouveau",
            description: "Assortiment de boissons gazeuses",
            inStock: true
        },
        {
            id: 7,
            name: "Farine de Manioc 10kg",
            category: "food",
            priceCDF: 32000,
            icon: "🌾",
            rating: 4.6,
            reviews: 145,
            badge: null,
            description: "Farine de manioc pure",
            inStock: true
        },
        {
            id: 8,
            name: "Haricots Rouges 5kg",
            category: "food",
            priceCDF: 25000,
            icon: "🫘",
            rating: 4.5,
            reviews: 98,
            badge: null,
            description: "Haricots rouges de qualité",
            inStock: true
        },

        // ========== CLOTHING ==========
        {
            id: 9,
            name: "Chemise Wax Homme",
            category: "clothing",
            priceCDF: 45000,
            icon: "👔",
            rating: 4.7,
            reviews: 145,
            badge: null,
            description: "Chemise africaine en tissu wax",
            inStock: true
        },
        {
            id: 10,
            name: "Robe Pagne Africaine",
            category: "clothing",
            priceCDF: 75000,
            icon: "👗",
            rating: 4.9,
            reviews: 389,
            badge: "Tendance",
            description: "Robe élégante en pagne africain",
            inStock: true
        },
        {
            id: 11,
            name: "Costume 3 Pièces Homme",
            category: "clothing",
            priceCDF: 280000,
            icon: "🤵",
            rating: 4.8,
            reviews: 98,
            badge: null,
            description: "Costume complet avec veste, pantalon et gilet",
            inStock: true
        },
        {
            id: 12,
            name: "Chaussures en Cuir",
            category: "clothing",
            priceCDF: 120000,
            icon: "👞",
            rating: 4.6,
            reviews: 234,
            badge: null,
            description: "Chaussures en cuir véritable",
            inStock: true
        },
        {
            id: 13,
            name: "Sac à Main Femme",
            category: "clothing",
            priceCDF: 65000,
            icon: "👜",
            rating: 4.5,
            reviews: 312,
            badge: "-20%",
            description: "Sac à main élégant pour femme",
            inStock: true
        },
        {
            id: 14,
            name: "Montre Classique",
            category: "clothing",
            priceCDF: 95000,
            icon: "⌚",
            rating: 4.7,
            reviews: 187,
            badge: null,
            description: "Montre classique pour homme et femme",
            inStock: true
        },
        {
            id: 15,
            name: "Ensemble Boubou Brodé",
            category: "clothing",
            priceCDF: 150000,
            icon: "👘",
            rating: 4.8,
            reviews: 123,
            badge: "Premium",
            description: "Boubou traditionnel avec broderies",
            inStock: true
        },

        // ========== ELECTRONICS ==========
        {
            id: 16,
            name: "Smartphone Android 128GB",
            category: "electronics",
            priceCDF: 450000,
            icon: "📱",
            rating: 4.6,
            reviews: 567,
            badge: "Top Vente",
            description: "Smartphone dernière génération",
            inStock: true
        },
        {
            id: 17,
            name: "Laptop Core i5 8GB RAM",
            category: "electronics",
            priceCDF: 1200000,
            icon: "💻",
            rating: 4.8,
            reviews: 234,
            badge: null,
            description: "Ordinateur portable performant",
            inStock: true
        },
        {
            id: 18,
            name: "TV LED 43 Pouces",
            category: "electronics",
            priceCDF: 850000,
            icon: "📺",
            rating: 4.7,
            reviews: 456,
            badge: null,
            description: "Télévision LED Full HD",
            inStock: true
        },
        {
            id: 19,
            name: "Écouteurs Bluetooth",
            category: "electronics",
            priceCDF: 85000,
            icon: "🎧",
            rating: 4.5,
            reviews: 678,
            badge: null,
            description: "Écouteurs sans fil haute qualité",
            inStock: true
        },
        {
            id: 20,
            name: "Groupe Électrogène 3.5kVA",
            category: "electronics",
            priceCDF: 750000,
            icon: "🔌",
            rating: 4.4,
            reviews: 123,
            badge: null,
            description: "Générateur électrique puissant",
            inStock: true
        },
        {
            id: 21,
            name: "Ventilateur Rechargeable",
            category: "electronics",
            priceCDF: 95000,
            icon: "🌀",
            rating: 4.6,
            reviews: 345,
            badge: "Nouveau",
            description: "Ventilateur avec batterie intégrée",
            inStock: true
        },
        {
            id: 22,
            name: "Panneau Solaire 200W",
            category: "electronics",
            priceCDF: 320000,
            icon: "☀️",
            rating: 4.7,
            reviews: 89,
            badge: "Éco",
            description: "Panneau solaire haute performance",
            inStock: true
        },

        // ========== HOME ==========
        {
            id: 23,
            name: "Lit King Size + Matelas",
            category: "home",
            priceCDF: 680000,
            icon: "🛏️",
            rating: 4.8,
            reviews: 89,
            badge: null,
            description: "Lit complet avec matelas orthopédique",
            inStock: true
        },
        {
            id: 24,
            name: "Canapé 5 Places",
            category: "home",
            priceCDF: 520000,
            icon: "🛋️",
            rating: 4.7,
            reviews: 167,
            badge: null,
            description: "Canapé confortable en cuir synthétique",
            inStock: true
        },
        {
            id: 25,
            name: "Table à Manger 6 Places",
            category: "home",
            priceCDF: 320000,
            icon: "🪑",
            rating: 4.6,
            reviews: 234,
            badge: null,
            description: "Table à manger avec 6 chaises",
            inStock: true
        },
        {
            id: 26,
            name: "Réfrigérateur 350L",
            category: "home",
            priceCDF: 980000,
            icon: "❄️",
            rating: 4.8,
            reviews: 345,
            badge: "Promo",
            description: "Réfrigérateur double porte économique",
            inStock: true
        },
        {
            id: 27,
            name: "Cuisinière à Gaz 4 Feux",
            category: "home",
            priceCDF: 420000,
            icon: "🍳",
            rating: 4.5,
            reviews: 278,
            badge: null,
            description: "Cuisinière à gaz avec four intégré",
            inStock: true
        },
        {
            id: 28,
            name: "Machine à Laver 7kg",
            category: "home",
            priceCDF: 650000,
            icon: "🧺",
            rating: 4.7,
            reviews: 189,
            badge: null,
            description: "Lave-linge automatique",
            inStock: true
        },
        {
            id: 29,
            name: "Climatiseur Split 12000 BTU",
            category: "home",
            priceCDF: 850000,
            icon: "❄️",
            rating: 4.6,
            reviews: 156,
            badge: null,
            description: "Climatiseur économique avec télécommande",
            inStock: true
        },

        // ========== BEAUTY ==========
        {
            id: 30,
            name: "Crème Éclaircissante Bio",
            category: "beauty",
            priceCDF: 35000,
            icon: "✨",
            rating: 4.6,
            reviews: 567,
            badge: null,
            description: "Crème naturelle pour le visage",
            inStock: true
        },
        {
            id: 31,
            name: "Parfum Femme 100ml",
            category: "beauty",
            priceCDF: 85000,
            icon: "💐",
            rating: 4.8,
            reviews: 389,
            badge: "Best Seller",
            description: "Parfum floral longue durée",
            inStock: true
        },
        {
            id: 32,
            name: "Kit Maquillage Complet",
            category: "beauty",
            priceCDF: 120000,
            icon: "💄",
            rating: 4.7,
            reviews: 234,
            badge: null,
            description: "Palette de maquillage professionnelle",
            inStock: true
        },
        {
            id: 33,
            name: "Huile de Coco Naturelle",
            category: "beauty",
            priceCDF: 18000,
            icon: "🥥",
            rating: 4.9,
            reviews: 456,
            badge: null,
            description: "Huile de coco 100% naturelle",
            inStock: true
        },
        {
            id: 34,
            name: "Perruque Brésilienne",
            category: "beauty",
            priceCDF: 180000,
            icon: "💇",
            rating: 4.5,
            reviews: 278,
            badge: "Premium",
            description: "Perruque en cheveux naturels",
            inStock: true
        },
        {
            id: 35,
            name: "Gel Coiffant Homme",
            category: "beauty",
            priceCDF: 12000,
            icon: "💈",
            rating: 4.4,
            reviews: 189,
            badge: null,
            description: "Gel fixation forte",
            inStock: true
        }
    ],

    // ========== DATABASE METHODS ==========
    
    /**
     * Get all products
     * @returns {Array} All products
     */
    getAll() {
        return [...this.products];
    },

    /**
     * Get product by ID
     * @param {number} id - Product ID
     * @returns {Object|null} Product or null
     */
    getById(id) {
        return this.products.find(p => p.id === id) || null;
    },

    /**
     * Get products by category
     * @param {string} category - Category slug
     * @returns {Array} Filtered products
     */
    getByCategory(category) {
        if (category === 'all') return this.getAll();
        return this.products.filter(p => p.category === category);
    },

    /**
     * Search products by name or description
     * @param {string} query - Search query
     * @returns {Array} Matching products
     */
    search(query) {
        const normalizedQuery = query.toLowerCase().trim();
        if (!normalizedQuery) return this.getAll();
        
        return this.products.filter(p => 
            p.name.toLowerCase().includes(normalizedQuery) ||
            p.description.toLowerCase().includes(normalizedQuery) ||
            p.category.toLowerCase().includes(normalizedQuery)
        );
    },

    /**
     * Get category name
     * @param {string} categorySlug - Category slug
     * @returns {string} Category display name
     */
    getCategoryName(categorySlug) {
        return this.categories[categorySlug]?.name || categorySlug;
    },

    /**
     * Filter and search products
     * @param {Object} filters - Filter options
     * @returns {Array} Filtered products
     */
    filter({ category = 'all', query = '', sortBy = 'default' } = {}) {
        let results = category === 'all' 
            ? this.getAll() 
            : this.getByCategory(category);

        if (query) {
            const normalizedQuery = query.toLowerCase().trim();
            results = results.filter(p => 
                p.name.toLowerCase().includes(normalizedQuery) ||
                p.description.toLowerCase().includes(normalizedQuery)
            );
        }

        // Sort results
        switch (sortBy) {
            case 'price-asc':
                results.sort((a, b) => a.priceCDF - b.priceCDF);
                break;
            case 'price-desc':
                results.sort((a, b) => b.priceCDF - a.priceCDF);
                break;
            case 'rating':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return results;
    }
};

/* ============================================
   APPLICATION STATE
   ============================================ */
const AppState = {
    cart: [],
    wishlist: [],
    currentCurrency: 'CDF',
    currentCategory: 'all',
    searchQuery: '',
    isCartOpen: false,
    isCheckoutModalOpen: false,
    isSuccessModalOpen: false
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Format price based on current currency
 * @param {number} priceCDF - Price in CDF
 * @param {boolean} showBoth - Show both currencies
 * @returns {Object|string} Formatted price(s)
 */
function formatPrice(priceCDF, showBoth = true) {
    const { exchangeRate } = ProductsDatabase;
    
    if (AppState.currentCurrency === 'CDF') {
        const formatted = new Intl.NumberFormat('fr-CD').format(priceCDF);
        const usd = (priceCDF / exchangeRate).toFixed(2);
        return showBoth 
            ? { main: `${formatted} FC`, alt: `≈ $${usd}` }
            : `${formatted} FC`;
    } else {
        const usd = (priceCDF / exchangeRate).toFixed(2);
        const formatted = new Intl.NumberFormat('fr-CD').format(priceCDF);
        return showBoth 
            ? { main: `$${usd}`, alt: `≈ ${formatted} FC` }
            : `$${usd}`;
    }
}

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (1-5)
 * @returns {string} HTML string for stars
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate unique order number
 * @returns {string} Order number
 */
function generateOrderNumber() {
    return 'SS' + Date.now().toString().slice(-8);
}

/**
 * Trap focus within modal for accessibility
 * @param {HTMLElement} element - Modal element
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
        
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

/* ============================================
   RENDERING FUNCTIONS
   ============================================ */

/**
 * Render products grid
 */
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const products = ProductsDatabase.filter({
        category: AppState.currentCategory,
        query: AppState.searchQuery
    });

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="cart-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-search cart-empty__icon" aria-hidden="true"></i>
                <h3 class="cart-empty__title">Aucun produit trouvé</h3>
                <p class="cart-empty__text">Essayez une autre recherche ou catégorie</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(product => {
        const price = formatPrice(product.priceCDF);
        const isWished = AppState.wishlist.includes(product.id);
        const badgeClass = product.badge === 'Nouveau' || product.badge === 'Éco' 
            ? 'product-card__badge--new' 
            : '';

        return `
            <article class="product-card" data-product-id="${product.id}">
                ${product.badge ? `
                    <span class="product-card__badge ${badgeClass}">${product.badge}</span>
                ` : ''}
                <button 
                    class="product-card__wishlist ${isWished ? 'product-card__wishlist--active' : ''}"
                    onclick="toggleWishlist(${product.id})"
                    aria-label="${isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                    aria-pressed="${isWished}"
                >
                    <i class="fa${isWished ? 's' : 'r'} fa-heart product-card__wishlist-icon" aria-hidden="true"></i>
                </button>
                <div class="product-card__image" role="img" aria-label="${product.name}">
                    ${product.icon}
                </div>
                <div class="product-card__body">
                    <p class="product-card__category">${ProductsDatabase.getCategoryName(product.category)}</p>
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__rating" aria-label="Note: ${product.rating} sur 5">
                        <span class="product-card__stars" aria-hidden="true">${generateStars(product.rating)}</span>
                        <span class="product-card__reviews">(${product.reviews} avis)</span>
                    </div>
                    <div class="product-card__price">
                        <span class="product-card__price-main">${price.main}</span>
                        <span class="product-card__price-alt">${price.alt}</span>
                    </div>
                    <button 
                        class="product-card__button" 
                        onclick="addToCart(${product.id})"
                        aria-label="Ajouter ${product.name} au panier"
                    >
                        <i class="fas fa-cart-plus" aria-hidden="true"></i>
                        Ajouter au panier
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Render cart sidebar
 */
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');

    if (!cartItems || !cartFooter || !cartCount) return;

    const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.setAttribute('aria-label', `${totalItems} articles dans le panier`);

    if (AppState.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket cart-empty__icon" aria-hidden="true"></i>
                <h3 class="cart-empty__title">Votre panier est vide</h3>
                <p class="cart-empty__text">Ajoutez des produits pour commencer</p>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }

    cartFooter.style.display = 'block';

    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.priceCDF * item.quantity), 0);
    const total = subtotal + ProductsDatabase.shippingFee;

    cartItems.innerHTML = AppState.cart.map(item => {
        const price = formatPrice(item.priceCDF * item.quantity, false);
        return `
            <article class="cart-item" data-cart-item-id="${item.id}">
                <div class="cart-item__image" aria-hidden="true">${item.icon}</div>
                <div class="cart-item__info">
                    <h4 class="cart-item__name">${item.name}</h4>
                    <p class="cart-item__price">${price}</p>
                    <div class="quantity-control">
                        <button 
                            class="quantity-control__button" 
                            onclick="updateQuantity(${item.id}, -1)"
                            aria-label="Réduire la quantité de ${item.name}"
                            ${item.quantity <= 1 ? 'aria-label="Supprimer ' + item.name + ' du panier"' : ''}
                        >
                            <i class="fas fa-minus" aria-hidden="true"></i>
                        </button>
                        <span class="quantity-control__value" aria-label="Quantité: ${item.quantity}">${item.quantity}</span>
                        <button 
                            class="quantity-control__button" 
                            onclick="updateQuantity(${item.id}, 1)"
                            aria-label="Augmenter la quantité de ${item.name}"
                        >
                            <i class="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button 
                    class="cart-item__remove" 
                    onclick="removeFromCart(${item.id})"
                    aria-label="Supprimer ${item.name} du panier"
                >
                    <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
            </article>
        `;
    }).join('');

    // Update summary
    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal, false);
    document.getElementById('cartShipping').textContent = formatPrice(ProductsDatabase.shippingFee, false);
    document.getElementById('cartTotal').textContent = formatPrice(total, false);
}

/* ============================================
   CART FUNCTIONS
   ============================================ */

/**
 * Add product to cart
 * @param {number} productId - Product ID
 */
function addToCart(productId) {
    const product = ProductsDatabase.getById(productId);
    if (!product) return;

    const existingItem = AppState.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        AppState.cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    showToast(`${product.name} ajouté au panier`, 'success');
    
    // Announce to screen readers
    announceToScreenReader(`${product.name} ajouté au panier`);
}

/**
 * Remove product from cart
 * @param {number} productId - Product ID
 */
function removeFromCart(productId) {
    const product = AppState.cart.find(item => item.id === productId);
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    renderCart();
    
    if (product) {
        announceToScreenReader(`${product.name} supprimé du panier`);
    }
}

/**
 * Update cart item quantity
 * @param {number} productId - Product ID
 * @param {number} change - Quantity change (+1 or -1)
 */
function updateQuantity(productId, change) {
    const item = AppState.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        renderCart();
    }
}

/**
 * Toggle cart sidebar
 */
function toggleCart() {
    AppState.isCartOpen = !AppState.isCartOpen;
    
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    if (AppState.isCartOpen) {
        overlay.classList.add('cart-overlay--active');
        sidebar.classList.add('cart-sidebar--active');
        document.body.classList.add('no-scroll');
        trapFocus(sidebar);
        
        // Focus the close button
        const closeBtn = sidebar.querySelector('.cart-sidebar__close');
        if (closeBtn) closeBtn.focus();
    } else {
        overlay.classList.remove('cart-overlay--active');
        sidebar.classList.remove('cart-sidebar--active');
        document.body.classList.remove('no-scroll');
    }
}

/* ============================================
   WISHLIST FUNCTIONS
   ============================================ */

/**
 * Toggle product in wishlist
 * @param {number} productId - Product ID
 */
function toggleWishlist(productId) {
    const index = AppState.wishlist.indexOf(productId);
    const product = ProductsDatabase.getById(productId);
    
    if (index > -1) {
        AppState.wishlist.splice(index, 1);
        announceToScreenReader(`${product?.name || 'Produit'} retiré des favoris`);
    } else {
        AppState.wishlist.push(productId);
        showToast('Ajouté à la liste de souhaits', 'success');
        announceToScreenReader(`${product?.name || 'Produit'} ajouté aux favoris`);
    }
    
    renderProducts();
}

/* ============================================
   CURRENCY FUNCTIONS
   ============================================ */

/**
 * Toggle between CDF and USD
 */
function toggleCurrency() {
    AppState.currentCurrency = AppState.currentCurrency === 'CDF' ? 'USD' : 'CDF';
    
    document.getElementById('currencyFlag').textContent = 
        AppState.currentCurrency === 'CDF' ? '🇨🇩' : '🇺🇸';
    document.getElementById('currencyLabel').textContent = AppState.currentCurrency;
    
    renderProducts();
    renderCart();
    
    announceToScreenReader(`Devise changée en ${AppState.currentCurrency === 'CDF' ? 'Franc Congolais' : 'Dollar Américain'}`);
}

/* ============================================
   NAVIGATION & SEARCH
   ============================================ */

/**
 * Setup category navigation
 */
function setupNavigation() {
    document.querySelectorAll('.nav__item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.nav__item').forEach(i => {
                i.classList.remove('nav__item--active');
                i.setAttribute('aria-current', 'false');
            });
            
            this.classList.add('nav__item--active');
            this.setAttribute('aria-current', 'page');
            
            AppState.currentCategory = this.dataset.category;
            renderProducts();
            
            // Scroll to products
            document.getElementById('productsGrid')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

/**
 * Setup search functionality with debounce
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const debouncedSearch = debounce((query) => {
        AppState.searchQuery = query;
        renderProducts();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            AppState.searchQuery = e.target.value;
            renderProducts();
        }
    });
}

/**
 * Handle search button click
 */
function handleSearch() {
    const query = document.getElementById('searchInput')?.value || '';
    AppState.searchQuery = query;
    renderProducts();
}

/* ============================================
   MODAL FUNCTIONS
   ============================================ */

/**
 * Show checkout modal
 */
function showCheckoutModal() {
    if (AppState.cart.length === 0) return;
    
    toggleCart();
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('modal-overlay--active');
    AppState.isCheckoutModalOpen = true;
    document.body.classList.add('no-scroll');
    
    trapFocus(modal);
    
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
}

/**
 * Close checkout modal
 */
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('modal-overlay--active');
    AppState.isCheckoutModalOpen = false;
    document.body.classList.remove('no-scroll');
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('modal-overlay--active');
    AppState.isSuccessModalOpen = false;
    document.body.classList.remove('no-scroll');
}

/**
 * Close all modals
 */
function closeAllModals() {
    closeCheckoutModal();
    closeSuccessModal();
    if (AppState.isCartOpen) toggleCart();
}

/**
 * Confirm order
 */
function confirmOrder() {
    const name = document.getElementById('customerName')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();
    const address = document.getElementById('customerAddress')?.value.trim();

    // Clear previous errors
    clearFormErrors();

    // Validation
    let hasError = false;

    if (!name) {
        showFieldError('customerName', 'Le nom est obligatoire');
        hasError = true;
    }

    if (!phone) {
        showFieldError('customerPhone', 'Le téléphone est obligatoire');
        hasError = true;
    } else if (!/^[\d\s+()-]{8,}$/.test(phone)) {
        showFieldError('customerPhone', 'Numéro de téléphone invalide');
        hasError = true;
    }

    if (!address) {
        showFieldError('customerAddress', 'L\'adresse est obligatoire');
        hasError = true;
    }

    if (hasError) {
        showToast('Veuillez corriger les erreurs', 'error');
        return;
    }

    // Generate order number
    const orderNumber = generateOrderNumber();
    document.getElementById('orderNumber').textContent = orderNumber;

    // Close checkout and show success
    closeCheckoutModal();
    
    const successModal = document.getElementById('successModal');
    successModal.classList.add('modal-overlay--active');
    AppState.isSuccessModalOpen = true;
    
    trapFocus(successModal);

    // Clear cart
    AppState.cart = [];
    renderCart();

    // Clear form
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerCommune').value = '';
    document.getElementById('paymentMethod').value = 'cash';

    // Announce to screen readers
    announceToScreenReader(`Commande confirmée. Numéro de commande: ${orderNumber}`);
}

/**
 * Show field error
 * @param {string} fieldId - Field ID
 * @param {string} message - Error message
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('form-group__input--error');
    field.setAttribute('aria-invalid', 'true');

    const errorId = `${fieldId}-error`;
    let errorEl = document.getElementById(errorId);
    
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'form-group__error';
        errorEl.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
    field.setAttribute('aria-describedby', errorId);
}

/**
 * Clear all form errors
 */
function clearFormErrors() {
    document.querySelectorAll('.form-group__input--error').forEach(el => {
        el.classList.remove('form-group__input--error');
        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-describedby');
    });
    
    document.querySelectorAll('.form-group__error').forEach(el => {
        el.remove();
    });
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success' or 'error')
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} toast__icon" aria-hidden="true"></i>
        <span class="toast__message">${message}</span>
    `;
    
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
    });

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('toast--visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============================================
   ACCESSIBILITY HELPERS
   ============================================ */

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const announcer = document.getElementById('ariaAnnouncer');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

/**
 * Setup dark mode based on system preference
 */
function setupDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize application
 */
function initApp() {
    setupDarkMode();
    setupNavigation();
    setupSearch();
    renderProducts();
    renderCart();

    // Add ARIA live region for announcements
    if (!document.getElementById('ariaAnnouncer')) {
        const announcer = document.createElement('div');
        announcer.id = 'ariaAnnouncer';
        announcer.className = 'visually-hidden';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
    }

    // Handle Escape key globally
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Close cart when clicking overlay
    document.getElementById('cartOverlay')?.addEventListener('click', toggleCart);
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
