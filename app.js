// 1. Constantes des produits
const PRODUCTS = [
	{
		id: 1,
		name: { fr: 'Café du Kivu', ln: 'Kawa ya Kivu', sw: 'Kahawa ya Kivu', en: 'Kivu Coffee' },
		price: 15,
		image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400',
	},
	{
		id: 2,
		name: { fr: 'Panier de Fruits', ln: 'Ebonza ya mbuma', sw: 'Kikapu cha matunda', en: 'Fruit Basket' },
		price: 25,
		image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400',
	},
	{
		id: 3,
		name: { fr: 'Huile de Palme', ln: 'Mafuta ya mbila', sw: 'Mafuta ya nazi', en: 'Palm Oil' },
		price: 10,
		image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=400',
	},
	{
		id: 4,
		name: { fr: 'Sac en Pagne', ln: 'Saki ya Liputa', sw: 'Mfuko wa Kitenge', en: 'Pagne Bag' },
		price: 45,
		image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400',
	},
];

// 2. Traductions UI
const TRANSLATIONS = {
	fr: {
		heroTitle: 'La qualité, chez vous.',
		heroSub: 'Produits locaux et importés livrés partout à Kinshasa.',
		catTitle: 'Nos Produits',
		addBtn: 'Ajouter au panier',
	},
	ln: {
		heroTitle: 'Kitoko, na ndako na yo.',
		heroSub: 'Biloko ya mboka mpe ya bapaya, tokoyela bino yango na Kin.',
		catTitle: 'Biloko na biso',
		addBtn: 'Bakisa na saki',
	},
	sw: {
		heroTitle: 'Ubora, nyumbani kwako.',
		heroSub: 'Bidhaa za ndani na nje zinazoletwa kila mahali Kinshasa.',
		catTitle: 'Bidhaa zetu',
		addBtn: 'Weka kwa kikapu',
	},
	en: {
		heroTitle: 'Quality, at your doorstep.',
		heroSub: 'Local and imported products delivered across Kinshasa.',
		catTitle: 'Our Products',
		addBtn: 'Add to cart',
	},
};

let currentLang = 'fr';
let cartCount = 0;

// 3. Fonctions d'affichage
function renderProducts() {
	const container = document.getElementById('product-container');
	container.innerHTML = '';

	PRODUCTS.forEach((product) => {
		const card = document.createElement('div');
		card.className = 'product-card';
		card.innerHTML = `
            <img src="${product.image}" alt="${product.name[currentLang]}" class="product-img">
            <div class="product-info">
                <h3>${product.name[currentLang]}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-btn" onclick="addToCart()">
                    ${TRANSLATIONS[currentLang].addBtn}
                </button>
            </div>
        `;
		container.appendChild(card);
	});
}

function changeLanguage() {
	currentLang = document.getElementById('lang-select').value;

	// Mise à jour des textes statiques
	document.getElementById('hero-title').innerText = TRANSLATIONS[currentLang].heroTitle;
	document.getElementById('hero-subtitle').innerText = TRANSLATIONS[currentLang].heroSub;
	document.getElementById('category-title').innerText = TRANSLATIONS[currentLang].catTitle;

	// Re-rendre les produits
	renderProducts();
}

function addToCart() {
	cartCount++;
	document.getElementById('cart-count').innerText = cartCount;
	alert(currentLang === 'fr' ? 'Ajouté au panier !' : 'Ebakisami na saki !');
}

// Initialisation
window.onload = renderProducts;
