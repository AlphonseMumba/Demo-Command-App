/**
 * SwiftShop - Application JavaScript
 * E-commerce Application for Congo (DRC)
 * © 2025 SwiftShop
 */
"use strict";
// SwiftShop application - comments trimmed for clarity

/* ============================================
   PRODUCTS SERVICE (client-side) - load from server
   ============================================ */
const ProductsDatabase = {
    exchangeRate: 2250,
    shippingFee: 5000,
    categories: {
        all: { name: 'Tous', icon: 'fa-th-large' },
        food: { name: 'Nourriture', icon: 'fa-utensils' },
        clothing: { name: 'Vêtements', icon: 'fa-tshirt' },
        electronics: { name: 'Électronique', icon: 'fa-laptop' },
        home: { name: 'Maison', icon: 'fa-couch' },
        beauty: { name: 'Beauté', icon: 'fa-spa' }
    },
    products: [],

    async load() {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Erreur chargement produits');
            const data = await res.json();
            this.products = data.products || [];
            this.exchangeRate = data.exchangeRate || this.exchangeRate;
            this.shippingFee = data.shippingFee || this.shippingFee;
        } catch (err) {
            console.error('Failed to load products', err);
        }
    },

    getAll() { return [...this.products]; },
    getById(id) { return this.products.find(p => p.id === id) || null; },
    getByCategory(category) { return category === 'all' ? this.getAll() : this.products.filter(p => p.category === category); },
    search(query) {
        const normalizedQuery = (query || '').toLowerCase().trim();
        if (!normalizedQuery) return this.getAll();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(normalizedQuery) ||
            (p.description || '').toLowerCase().includes(normalizedQuery) ||
            (p.category || '').toLowerCase().includes(normalizedQuery)
        );
    },
    getCategoryName(categorySlug) { return this.categories[categorySlug]?.name || categorySlug; },
    filter({ category = 'all', query = '', sortBy = 'default' } = {}) {
        let results = category === 'all' ? this.getAll() : this.getByCategory(category);
        if (query) {
            const normalizedQuery = query.toLowerCase().trim();
            results = results.filter(p => p.name.toLowerCase().includes(normalizedQuery) || (p.description || '').toLowerCase().includes(normalizedQuery));
        }
        switch (sortBy) {
            case 'price-asc': results.sort((a, b) => a.priceCDF - b.priceCDF); break;
            case 'price-desc': results.sort((a, b) => b.priceCDF - a.priceCDF); break;
            case 'rating': results.sort((a, b) => b.rating - a.rating); break;
            case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        return results;
    }
};
/* ACCESSIBILITY HELPERS */
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
                    data-action="toggle-wishlist"
                    data-product-id="${product.id}"
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
                        data-action="add-to-cart"
                        data-product-id="${product.id}"
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
                            data-action="update-quantity"
                            data-product-id="${item.id}"
                            data-delta="-1"
                            aria-label="Réduire la quantité de ${item.name}"
                            ${item.quantity <= 1 ? 'aria-label="Supprimer ' + item.name + ' du panier"' : ''}
                        >
                            <i class="fas fa-minus" aria-hidden="true"></i>
                        </button>
                        <span class="quantity-control__value" aria-label="Quantité: ${item.quantity}">${item.quantity}</span>
                        <button 
                            class="quantity-control__button" 
                            data-action="update-quantity"
                            data-product-id="${item.id}"
                            data-delta="1"
                            aria-label="Augmenter la quantité de ${item.name}"
                        >
                            <i class="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button 
                    class="cart-item__remove" 
                    data-action="remove-from-cart"
                    data-product-id="${item.id}"
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
    // Require authentication before checkout
    const token = getAuthToken();
    if (!token) {
        showToast('Veuillez vous connecter avant de passer la commande', 'error');
        openAuthModal();
        return;
    }
    
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
    closeAuthModal();
    if (AppState.isCartOpen) toggleCart();
}

/**
 * Confirm order
 */
async function confirmOrder() {
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

    // Generate order number and amounts
    const orderNumber = generateOrderNumber();
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.priceCDF * item.quantity), 0);
    const totalCDF = subtotal + ProductsDatabase.shippingFee;
    document.getElementById('orderNumber').textContent = orderNumber;

    const paymentMethod = document.getElementById('paymentMethod')?.value;

    // Ensure authenticated (safety check)
    const token = getAuthToken();
    if (!token) { showToast('Veuillez vous connecter pour continuer', 'error'); openAuthModal(); return; }

    // Create order server-side
    let orderResp;
    try {
        const orderPayload = {
            cart: AppState.cart,
            customer: { name, phone, address, commune: document.getElementById('customerCommune')?.value || '' },
            paymentMethod,
            provider: document.getElementById('mobileProvider')?.value || null
        };
        const r = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify(orderPayload)
        });
        orderResp = await r.json();
        if (!r.ok) { showToast(orderResp.error || 'Impossible de créer la commande', 'error'); return; }
    } catch (err) {
        console.error('Order create error', err);
        showToast('Erreur création commande', 'error');
        return;
    }

    if (paymentMethod === 'mobile') {
        const provider = document.getElementById('mobileProvider')?.value;
        const mobilePhone = document.getElementById('mobilePhone')?.value.trim();

        if (!mobilePhone) {
            showFieldError('mobilePhone', 'Le téléphone pour Mobile Money est requis');
            showToast('Veuillez fournir un numéro mobile pour le paiement', 'error');
            return;
        }

        showToast('Initialisation du paiement Mobile Money...', 'success');

        try {
            const payload = {
                orderNumber,
                amountCDF: totalCDF,
                name,
                phone: mobilePhone,
                orderId: orderResp.order?.id || null
            };
            const response = await processMobilePayment(provider, payload);

            if (response && (response.status === 'success' || response.status === 'pending')) {
                closeCheckoutModal();
                const successModal = document.getElementById('successModal');
                successModal.classList.add('modal-overlay--active');
                AppState.isSuccessModalOpen = true;
                trapFocus(successModal);

                AppState.cart = [];
                renderCart();

                document.getElementById('customerName').value = '';
                document.getElementById('customerPhone').value = '';
                document.getElementById('customerAddress').value = '';
                document.getElementById('customerCommune').value = '';
                document.getElementById('paymentMethod').value = 'cash';
                document.getElementById('mobilePhone').value = '';

                announceToScreenReader(`Commande en cours: ${orderNumber}. Statut: ${response.status}`);
                showToast('Paiement initié. Vous recevrez une confirmation par SMS.', 'success');
            } else {
                showToast('Le paiement a échoué. Réessayez.', 'error');
            }
        } catch (err) {
            console.error('Payment error', err);
            showToast('Erreur lors du paiement. Vérifiez votre connexion.', 'error');
        }

        return;
    }

    // Default: cash or card (client-side simulation)
    closeCheckoutModal();
    const successModal = document.getElementById('successModal');
    successModal.classList.add('modal-overlay--active');
    AppState.isSuccessModalOpen = true;
    trapFocus(successModal);

    AppState.cart = [];
    renderCart();

    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerCommune').value = '';
    document.getElementById('paymentMethod').value = 'cash';

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

/**
 * Toggle visibility of mobile payment options
 */
function toggleMobileOptions() {
    const method = document.getElementById('paymentMethod')?.value;
    const mobileBox = document.getElementById('mobilePaymentOptions');
    if (!mobileBox) return;
    mobileBox.style.display = method === 'mobile' ? 'block' : 'none';
}

/**
 * Send payment request to backend for the given provider
 * This is a light wrapper; the backend should handle provider credentials.
 */
async function processMobilePayment(provider, payload) {
    const url = `/api/payments/${provider}`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error('Network response was not ok');
    return resp.json();
}

/* ============================================
   AUTH (client-side)
   ============================================ */
function getAuthToken() {
    return localStorage.getItem('ss_token') || null;
}

function setAuthState(user, token) {
    if (token) localStorage.setItem('ss_token', token);
    if (user) localStorage.setItem('ss_user', JSON.stringify(user));
    updateAuthButton();
}

function clearAuthState() {
    localStorage.removeItem('ss_token');
    localStorage.removeItem('ss_user');
    updateAuthButton();
}

async function restoreAuthState() {
    const token = getAuthToken();
    if (!token) return updateAuthButton();
    try {
        const res = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + token } });
        if (!res.ok) { clearAuthState(); return; }
        const user = await res.json();
        setAuthState(user, token);
    } catch (e) {
        clearAuthState();
    }
}

function updateAuthButton() {
    const btn = document.getElementById('authButton');
    const user = JSON.parse(localStorage.getItem('ss_user') || 'null');
    if (!btn) return;
    const adminLink = document.getElementById('adminLink');
    if (user) {
        btn.textContent = user.name || user.email || 'Mon compte';
        btn.setAttribute('data-action', 'show-account-menu');
        if (adminLink) adminLink.style.display = (user.role === 'admin') ? 'inline-block' : 'none';
    } else {
        btn.textContent = 'Se connecter';
        btn.setAttribute('data-action', 'open-auth-modal');
        if (adminLink) adminLink.style.display = 'none';
    }
}

function showAccountMenu() {
    // simple: offer logout
    if (confirm('Se déconnecter ?')) logout();
}

function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.add('modal-overlay--active');
    document.body.classList.add('no-scroll');
    trapFocus(modal);
    
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.remove('modal-overlay--active');
    document.body.classList.remove('no-scroll');
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Créer un compte';
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authTitle').textContent = 'Se connecter';
}

async function registerUser() {
    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const phone = document.getElementById('regPhone')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    if (!email || !password) { showToast('Email et mot de passe requis', 'error'); return; }

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password })
        });
        const data = await res.json();
        if (!res.ok) { showToast(data.error || 'Erreur inscription', 'error'); return; }
        setAuthState(data.user, data.token);
        closeAuthModal();
        showToast('Compte créé et connecté', 'success');
    } catch (e) { console.error(e); showToast('Erreur serveur', 'error'); }
}

async function loginUser() {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    if (!email || !password) { showToast('Email et mot de passe requis', 'error'); return; }

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) { showToast(data.error || 'Erreur connexion', 'error'); return; }
        setAuthState(data.user, data.token);
        closeAuthModal();
        showToast('Connecté', 'success');
    } catch (e) { console.error(e); showToast('Erreur serveur', 'error'); }
}

function logout() {
    clearAuthState();
    showToast('Déconnecté', 'success');
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
async function initApp() {
    setupDarkMode();
    setupNavigation();
    setupSearch();
    await ProductsDatabase.load();
    renderProducts();
    renderCart();
    // Payment UI
    document.getElementById('paymentMethod')?.addEventListener('change', toggleMobileOptions);
    toggleMobileOptions();

    // Add ARIA live region for announcements
    if (!document.getElementById('ariaAnnouncer')) {
        const announcer = document.createElement('div');
        announcer.id = 'ariaAnnouncer';
        announcer.className = 'visually-hidden';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
    }

    // Setup event listeners for data-action elements
    setupActionListeners();

    // Handle Escape key globally
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Close cart when clicking overlay
    document.getElementById('cartOverlay')?.addEventListener('click', toggleCart);
    // Load auth state (await so UI updates after token is restored)
    await restoreAuthState();

    // Wire authentication forms (submit handlers)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', (e) => { e.preventDefault(); loginUser(); });

    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', (e) => { e.preventDefault(); registerUser(); });
}

/**
 * Setup event listeners for data-action elements
 */
function setupActionListeners() {
    document.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]')?.getAttribute('data-action');
        if (!action) return;

        const productId = e.target.closest('[data-product-id]')?.getAttribute('data-product-id');
        const delta = e.target.closest('[data-delta]')?.getAttribute('data-delta');

        switch (action) {
            case 'search':
                handleSearch();
                break;
            case 'toggle-currency':
                toggleCurrency();
                break;
            case 'toggle-cart':
                toggleCart();
                break;
            case 'open-auth-modal':
                openAuthModal();
                break;
            case 'close-auth-modal':
                closeAuthModal();
                break;
            case 'show-checkout-modal':
                showCheckoutModal();
                break;
            case 'close-checkout-modal':
                closeCheckoutModal();
                break;
            case 'confirm-order':
                confirmOrder();
                break;
            case 'close-success-modal':
                closeSuccessModal();
                break;
            case 'show-register-form':
                showRegisterForm();
                break;
            case 'show-login-form':
                showLoginForm();
                break;
            case 'back-to-site':
                window.location.href = 'index.html';
                break;
            case 'show-account-menu':
                showAccountMenu();
                break;
            case 'toggle-wishlist':
                if (productId) toggleWishlist(parseInt(productId));
                break;
            case 'add-to-cart':
                if (productId) addToCart(parseInt(productId));
                break;
            case 'update-quantity':
                if (productId && delta) updateQuantity(parseInt(productId), parseInt(delta));
                break;
            case 'remove-from-cart':
                if (productId) removeFromCart(parseInt(productId));
                break;
        }
    });

    // Handle form submissions
    document.addEventListener('submit', (e) => {
        const formAction = e.target.getAttribute('data-action');
        if (!formAction) return;

        e.preventDefault();

        switch (formAction) {
            case 'login-form':
                loginUser();
                break;
            case 'register-form':
                registerUser();
                break;
        }
    });
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
