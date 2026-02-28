let cart = [];
const deliveryFee = 5500;

// Fonction pour ajouter un plat
function addToCart(id, name, price) {
    const item = { id, name, price };
    cart.push(item);
    updateCartUI();
}

// Mise à jour du panier visuel
function updateCartUI() {
    const cartItems = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-price');
    
    if (!cartItems) return;

    let subtotal = 0;
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        subtotal += item.price;
        cartItems.innerHTML += `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-2xl mb-2">
                <div>
                    <p class="font-bold text-sm">${item.name}</p>
                    <p class="text-xs text-gray-400">1x</p>
                </div>
                <span class="font-bold text-sm">${item.price.toLocaleString()} CDF</span>
            </div>
        `;
    });

    const total = subtotal > 0 ? subtotal + deliveryFee : 0;
    subtotalEl.innerText = `${subtotal.toLocaleString()} CDF`;
    totalEl.innerText = `${total.toLocaleString()} CDF`;
}

// Gestion des onglets Admin/Dashboard
function switchTab(tabId) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
}
