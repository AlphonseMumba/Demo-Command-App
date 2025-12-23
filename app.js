const PRODUCTS = [
	{
		id: 1,
		cat: 'mode',
		name: { fr: 'Sneaker Kin-Vibe', ln: 'Sapatu ya sika' },
		price: 75,
		images: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
			'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
			'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
		],
	},
	{
		id: 2,
		cat: 'tech',
		name: { fr: 'Casque Kinu Audio', ln: 'Casque ya makasi' },
		price: 120,
		images: [
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
			'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
			'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600',
		],
	},
	{
		id: 3,
		cat: 'food',
		name: { fr: "Café de l'Est (Pack)", ln: 'Kawa kitoko' },
		price: 25,
		images: [
			'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600',
			'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600',
			'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
		],
	},
	// Ajoutez plus de produits ici selon le même schéma
];

const CATEGORIES = [
	{ id: 'all', fr: 'Tout' },
	{ id: 'mode', fr: 'Mode' },
	{ id: 'tech', fr: 'Tech' },
	{ id: 'food', fr: 'Alimentaire' },
];

let cart = [];
let currentLang = 'fr';
let currentCat = 'all';

function updateUI() {
	currentLang = document.getElementById('lang-select').value;
	renderCategories();
	renderProducts();
}

function renderCategories() {
	const container = document.getElementById('category-list');
	container.innerHTML = CATEGORIES.map(
		(c) => `
        <div class="cat-item ${currentCat === c.id ? 'active' : ''}" onclick="filterCat('${c.id}')">
            ${c[currentLang] || c.fr}
        </div>
    `
	).join('');
}

function filterCat(id) {
	currentCat = id;
	renderCategories();
	renderProducts();
}

function renderProducts() {
	const grid = document.getElementById('product-grid');
	const filtered = currentCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === currentCat);

	grid.innerHTML = filtered
		.map(
			(p) => `
        <div class="product-card">
            <div class="gallery-container" onmousemove="handleGallery(event, this)">
                <div class="gallery-track">
                    ${p.images.map((img) => `<img src="${img}" alt="">`).join('')}
                </div>
                <div class="gallery-dots">
                    <div class="dot active"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div class="product-info">
                <h3>${p.name[currentLang] || p.name.fr}</h3>
                <div class="price-row">
                    <span class="price">${p.price} $</span>
                    <button class="add-bag" onclick="addToCart(${p.id})">Ajouter</button>
                </div>
            </div>
        </div>
    `
		)
		.join('');
}

// Logique de galerie au survol (Amazon Style)
function handleGallery(e, container) {
	const rect = container.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const width = rect.width;
	const track = container.querySelector('.gallery-track');
	const dots = container.querySelectorAll('.dot');

	let index = 0;
	if (x > width / 3) index = 1;
	if (x > (2 * width) / 3) index = 2;

	track.style.transform = `translateX(-${index * 33.333}%)`;
	dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function toggleCart() {
	document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(id) {
	const product = PRODUCTS.find((p) => p.id === id);
	cart.push(product);
	document.getElementById('cart-count').innerText = cart.length;
	updateCartList();
}

function updateCartList() {
	const list = document.getElementById('cart-items');
	const total = cart.reduce((s, p) => s + p.price, 0);
	list.innerHTML = cart
		.map(
			(p) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
            <span>${p.name[currentLang]}</span>
            <b>${p.price} $</b>
        </div>
    `
		)
		.join('');
	document.getElementById('cart-total').innerText = total;
}

window.onload = updateUI;
