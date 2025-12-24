// Base de données : 30 produits avec multi-vues
const PRODUCTS = [
	// --- TECH (7 PRODUITS) ---
	{
		id: 1,
		cat: 'tech',
		price: 1150,
		name: { fr: 'iPhone 15 Pro Max', ln: 'iPhone ya sika mpenza', sw: 'iPhone mpya kabisa', en: 'iPhone 15 Pro Max' },
		images: ['https://i.ibb.co/W43f6sxj/Iphone15.jpg', 'https://i.ibb.co/KjpBgJCk/img-1950.jpg', 'https://i.ibb.co/W43f6sxj/Iphone15.jpg'],
	},
	{
		id: 2,
		cat: 'tech',
		price: 159,
		name: { fr: 'AirPods Pro 2', ln: 'Ba écouteurs ya sika', sw: 'Vifaa vya masikio', en: 'AirPods Pro 2' },
		images: [
			'https://i.ibb.co/RGyy7ZyG/apple-airpods-pro-2-670px.jpg',
			'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500',
			'https://i.ibb.co/RGyy7ZyG/apple-airpods-pro-2-670px.jpg',
		],
	},
	{
		id: 3,
		cat: 'tech',
		price: 990,
		name: { fr: 'MacBook Air M2', ln: 'Ordinateur ya moke', sw: 'Tarakilishi ndogo', en: 'MacBook Air M2' },
		images: [
			'https://images.unsplash.com/photo-1661961110218-35af7210f803?auto=format&fit=crop&w=500',
			'https://i.ibb.co/B2XTKQHm/macbook.jpg',
			'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500',
		],
	},

	{
		id: 4,
		cat: 'tech',
		price: 410,
		name: { fr: 'PlayStation 5 Slim', ln: 'PS5 ya lisano', sw: 'PS5 mpya', en: 'PS5 Slim' },
		images: ['https://i.ibb.co/SX67R8Sp/play5.webp', 'https://i.ibb.co/1fTVc9RW/playstation-5-slim.jpg', 'https://i.ibb.co/cXcg8q3W/ps5.jpg'],
	},
	{
		id: 5,
		cat: 'tech',
		price: 85,
		name: { fr: 'Powerbank Anker 737', ln: 'Batterie ya kokitisa', sw: 'Betri ya akiba', en: 'Anker Powerbank' },
		images: [
			'https://i.ibb.co/tTS7dnWF/anker-powercore-portable-charger-1-2.jpg',
			'https://i.ibb.co/Pzh2DB3s/grande-anker-737-power-bank.jpg',
			'https://i.ibb.co/tTS7dnWF/anker-powercore-portable-charger-1-2.jpg',
		],
	},
	{
		id: 6,
		cat: 'tech',
		price: 249,
		name: { fr: 'Apple Watch SE', ln: 'Montre ya mayele', sw: 'Saa ya kisasa', en: 'Apple Watch SE' },
		images: [
			'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500',
			'https://i.ibb.co/Q7qSwZB8/applewatch.jpg',
		],
	},
	{
		id: 7,
		cat: 'tech',
		price: 35,
		name: { fr: 'JBL Go 3', ln: 'Radio ya moke', sw: 'Spika ya muziki', en: 'JBL Go 3' },
		images: ['https://i.ibb.co/fYTyZ1N1/jbl-go-3-4.webp', 'https://i.ibb.co/WvKvhRTn/jbl.jpg', 'https://i.ibb.co/fYTyZ1N1/jbl-go-3-4.webp'],
	},

	// --- MODE ---
	{
		id: 11,
		cat: 'mode',
		price: 110,
		name: { fr: 'Nike Air Max 270', ln: 'Sapatu ya sika', sw: 'Viatu vya michezo', en: 'Nike Air Max' },
		images: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500',
		],
	},
	{
		id: 12,
		cat: 'mode',
		price: 85,
		name: { fr: 'Veste Kitenge Homme', ln: 'Kazaka ya liputa', sw: 'Koti la Kitenge', en: 'Kitenge Blazer' },
		images: [
			'https://i.ibb.co/mrh2Rc0x/8de6fb1816fb530c6f7e78fcf2ec359d.jpg',
			'https://i.ibb.co/ffvc1M5/55bbd75da9d1665953847f214aaa672d.jpg',
			'https://i.ibb.co/XrtC9v94/Veste-de-costume-pour-homme-style-africain-imprim-Ankara-sur-mesure-pour-mariage-f-te-Design-jpg-640.webp',
		],
	},
	{
		id: 13,
		cat: 'mode',
		price: 45,
		name: { fr: 'Sac à main Luxe', ln: 'Saki ya basi', sw: 'Mfuko wa ngozi', en: 'Leather Handbag' },
		images: [
			'https://i.ibb.co/ZpJg8WVY/nature-morte-du-sac-suspendu-52683-151481.jpg',
			'https://i.ibb.co/Mk0b99Sj/sac-suspendu-meuble-interieur-23-2151073506.jpg',
			'https://i.ibb.co/wNkfhJCx/sac-suspendu-meuble-interieur-23-2151073514.jpg',
		],
	},
	{
		id: 14,
		cat: 'mode',
		price: 135,
		name: { fr: 'Montre Fossil Classic', ln: 'Montre ya wolo', sw: 'Saa ya mkono', en: 'Fossil Watch' },
		images: [
			'https://i.ibb.co/pvcdx8mF/Watches-LP-carousel-Type-Mens-silver.jpg',
			'https://i.ibb.co/hJmncwgs/Watches-LP-carousel-Style-Mens-auto.jpg',
			'https://i.ibb.co/vxK0gRzF/Watches-LP-carousel-Style-Mens-classic.jpg',
		],
	},
	{
		id: 15,
		cat: 'mode',
		price: 155,
		name: { fr: 'Ray-Ban Aviator', ln: 'Maneti ya moi', sw: 'Miwani ya jua', en: 'Ray-Ban Aviator' },
		images: [
			'https://i.ibb.co/FPWcp9C/ray-ban-aviator-large-metal-gold-rb3025-112-85-55-14-medium-gradient.png',
			'https://i.ibb.co/gbRDZG2B/s-l400.jpg',
			'https://i.ibb.co/GQq8V8Nd/Ray-Ban-Aviator.jpg',
		],
	},
	{
		id: 16,
		cat: 'mode',
		price: 25,
		name: { fr: 'T-shirt Blanc Coton', ln: 'Mupira ya kitoko', sw: 'T-shati ya pamba', en: 'White Cotton T-shirt' },
		images: [
			'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=500',
		],
	},
	{
		id: 17,
		cat: 'mode',
		price: 40,
		name: { fr: 'Pantalon Cargo Olive', ln: 'Pantalo ya sika', sw: 'Suruali ya kisasa', en: 'Olive Cargo Pants' },
		images: [
			'https://i.ibb.co/N6cDf8Cf/a8eb21ccf1c644ad8e02cdcf45b82d9e.jpg',
			'https://i.ibb.co/LXZ2k69c/7eaefca7266a497baef1079c4b2a1aad.jpg',
			'https://i.ibb.co/WNHbtCtG/50473fc644704d08bf445104258c1f64.jpg',
		],
	},

	// --- ALIMENTAIRE (IMAGES DÉJÀ VALIDES) ---
	{
		id: 21,
		cat: 'food',
		price: 12,
		name: { fr: 'Café du Kivu Grain', ln: 'Kawa ya Kivu', sw: 'Kahawa ya Kivu', en: 'Kivu Coffee' },
		images: [
			'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500',
			'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=500',
		],
	},
	{
		id: 22,
		cat: 'food',
		price: 18,
		name: { fr: 'Miel Bio Pur', ln: 'Wiki ya sika', sw: 'Asali mbichi', en: 'Pure Organic Honey' },
		images: ['https://i.ibb.co/R4H6ZDT7/organic-honey.jpg', 'https://i.ibb.co/3yGBf7Vj/miel-1L.jpg', 'https://i.ibb.co/ZRCx4Q9m/miel2-1.webp'],
	},

	{
		id: 23,
		cat: 'food',
		price: 22,
		name: { fr: 'Huile de Palme 5L', ln: 'Mafuta ya mbila', sw: 'Mafuta ya mawese', en: 'Palm Oil 5L' },
		images: [
			'https://i.ibb.co/1YJw2K2F/Huile-de-palme-e-Mart-cd-5-L.jpg',
			'https://i.ibb.co/1YJw2K2F/Huile-de-palme-e-Mart-cd-5-L.jpg',
			'https://i.ibb.co/1YJw2K2F/Huile-de-palme-e-Mart-cd-5-L.jpg',
		],
	},
	{
		id: 24,
		cat: 'food',
		price: 8,
		name: { fr: 'Chocolat Noir Lowa', ln: 'Chocolat ya mboka', sw: 'Chokoleti ya ndani', en: 'Lowa Dark Chocolate' },
		images: [
			'https://i.ibb.co/hRj88PWR/ed959-lowa-chocolat-au-cafe-14.jpg',
			'https://i.ibb.co/8LdfTZdH/Screen-Shot-2020-08-31-at-4-33-02-PM.webp',
			'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=500',
		],
	},
	{
		id: 25,
		cat: 'food',
		price: 30,
		name: { fr: 'Panier de Fruits Kin', ln: 'Ebonza ya mbuma', sw: 'Kikapu cha matunda', en: 'Kin Fruit Basket' },
		images: [
			'https://i.ibb.co/XZPrZnjP/raisins-alimentaires-blanc-kiwi-dessert-1172-541.jpg',
			'https://i.ibb.co/XZ63wG25/fruits-frais-dans-panier-table-bois-73966-2482.jpg',
			'https://i.ibb.co/wZmwt0jN/panier-fruit-2eme-600x600.webp',
		],
	},
	{
		id: 26,
		cat: 'food',
		price: 6,
		name: { fr: 'Thé Noir Bukavu', ln: 'Ti ya kitoko', sw: 'Chai ya Bukavu', en: 'Bukavu Black Tea' },
		images: [
			'https://i.ibb.co/fY4XtK9q/dried-black-tea-on-white-260nw-2307428109.jpg',
			'https://i.ibb.co/8gXPKLPV/pngtree-red-tea-black-tea-tea-diet-png-image-3392967.jpg',
			'https://i.ibb.co/fY4XtK9q/dried-black-tea-on-white-260nw-2307428109.jpg',
		],
	},
	{
		id: 27,
		cat: 'food',
		price: 5,
		name: { fr: 'Piment Pili-Pili', ln: 'Pilipili ya makasi', sw: 'Pilipili kali', en: 'Pili-Pili Hot Chili' },
		images: ['https://i.ibb.co/SDLGF6ZM/12167-2-9.jpg', 'https://i.ibb.co/zWfVw7h4/IMG-1248-530x414.jpg', 'https://i.ibb.co/rftQQdsm/produit5-6.webp'],
	},
];
const UI_TEXT = {
	fr: {
		h1: 'Inspiré par Kinshasa.',
		sub: 'Le shop qui comprend votre style.',
		all: 'Tout',
		tech: 'Tech',
		mode: 'Mode',
		food: 'Bio Food',
		buy: 'Ajouter',
		cart: 'Votre Panier',
		total: 'Total',
		fDesc: "L'excellence à Kinshasa.",
		fHelp: 'Aide',
		fPay: 'Paiement',
	},
	ln: {
		h1: 'Euti na Kinshasa.',
		sub: 'Shop oyo eyebi molato na yo.',
		all: 'Nioso',
		tech: 'Mayele',
		mode: 'Molato',
		food: 'Bilia',
		buy: 'Bakisa',
		cart: 'Saki na yo',
		total: 'Motuya',
		fDesc: 'Kitoko ya mombongo na Kin.',
		fHelp: 'Lisungi',
		fPay: 'Kofuta',
	},
	sw: {
		h1: 'Imechochewa na Kin.',
		sub: 'Duka linaloelewa mtindo wako.',
		all: 'Zote',
		tech: 'Tekino',
		mode: 'Mitindo',
		food: 'Chakula',
		buy: 'Weka',
		cart: 'Kikapu',
		total: 'Jumla',
		fDesc: 'Ubora wa biashara Kinshasa.',
		fHelp: 'Msaada',
		fPay: 'Malipo',
	},
	en: {
		h1: 'Inspired by Kinshasa.',
		sub: 'The shop that knows your style.',
		all: 'All',
		tech: 'Tech',
		mode: 'Fashion',
		food: 'Organic',
		buy: 'Add',
		cart: 'Your Cart',
		total: 'Total',
		fDesc: "Kinshasa's best shopping.",
		fHelp: 'Help',
		fPay: 'Payment',
	},
};

let cart = [];
let currentLang = 'fr';
let currentCat = 'all';

function updateUI() {
	currentLang = document.getElementById('lang-select').value;
	const txt = UI_TEXT[currentLang];

	document.getElementById('h-title').innerText = txt.h1;
	document.getElementById('h-sub').innerText = txt.sub;
	document.getElementById('cart-title').innerText = txt.cart;
	document.getElementById('total-label').innerText = txt.total;
	document.getElementById('footer-desc').innerText = txt.fDesc;
	document.getElementById('footer-help-title').innerText = txt.fHelp;
	document.getElementById('footer-pay-title').innerText = txt.fPay;

	renderCategories();
	renderProducts();
}

function renderCategories() {
	const cats = ['all', 'tech', 'mode', 'food'];
	document.getElementById('category-list').innerHTML = cats
		.map(
			(c) => `
        <div class="cat-item ${currentCat === c ? 'active' : ''}" onclick="filterCat('${c}')">
            ${UI_TEXT[currentLang][c]}
        </div>
    `
		)
		.join('');
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
                    ${p.images.map((img) => `<img src="${img}" loading="lazy">`).join('')}
                </div>
                <div class="gallery-dots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
            </div>
            <div class="product-info">
                <h3>${p.name[currentLang]}</h3>
                <div class="price-row">
                    <span class="price">${p.price} $</span>
                    <button class="add-bag" onclick="addToCart(${p.id})">${UI_TEXT[currentLang].buy}</button>
                </div>
            </div>
        </div>
    `
		)
		.join('');
}

function handleGallery(e, container) {
	const rect = container.getBoundingClientRect();
	const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
	const index = Math.min(Math.floor((x / rect.width) * 3), 2);
	container.querySelector('.gallery-track').style.transform = `translateX(-${index * 33.333}%)`;
	const dots = container.querySelectorAll('.dot');
	dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function toggleCart() {
	document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(id) {
	cart.push(PRODUCTS.find((p) => p.id === id));
	document.getElementById('cart-count').innerText = cart.length;
	updateCartList();
}

function updateCartList() {
	const list = document.getElementById('cart-items');
	const total = cart.reduce((s, p) => s + p.price, 0);
	list.innerHTML = cart
		.map(
			(p) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
            <span>${p.name[currentLang]}</span><b>${p.price} $</b>
        </div>
    `
		)
		.join('');
	document.getElementById('cart-total').innerText = total;
}

function checkoutWhatsApp() {
	const total = cart.reduce((s, p) => s + p.price, 0);
	const message = `Bonjour Kinu Shop, je souhaite commander : ${cart.length} articles pour un total de ${total}$.`;
	window.open(`https://wa.me/243000000000?text=${encodeURIComponent(message)}`);
}

window.onload = updateUI;
