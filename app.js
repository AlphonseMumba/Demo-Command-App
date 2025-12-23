// Base de données : 30 produits avec multi-vues
const PRODUCTS = [
	// --- TECH (7 PRODUITS) ---
	{
		id: 1,
		cat: 'tech',
		price: 1150,
		name: { fr: 'iPhone 15 Pro Max', ln: 'iPhone ya sika mpenza', sw: 'iPhone mpya kabisa', en: 'iPhone 15 Pro Max' },
		images: [
			'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 2,
		cat: 'tech',
		price: 159,
		name: { fr: 'AirPods Pro 2', ln: 'Ba écouteurs ya sika', sw: 'Vifaa vya masikio', en: 'AirPods Pro 2' },
		images: [
			'https://images.unsplash.com/photo-1588423770574-910ae27c85a5?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 3,
		cat: 'tech',
		price: 990,
		name: { fr: 'MacBook Air M2', ln: 'Ordinateur ya moke', sw: 'Tarakilishi ndogo', en: 'MacBook Air M2' },
		images: [
			'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 4,
		cat: 'tech',
		price: 410,
		name: { fr: 'PlayStation 5 Slim', ln: 'PS5 ya lisano', sw: 'PS5 mpya', en: 'PS5 Slim' },
		images: [
			'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1591333139263-5821034e9a40?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 5,
		cat: 'tech',
		price: 85,
		name: { fr: 'Powerbank Anker 737', ln: 'Batterie ya kokitisa', sw: 'Betri ya akiba', en: 'Anker Powerbank' },
		images: [
			'https://images.unsplash.com/photo-1609591035230-84a81b7a99c1?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1609591035011-096bc75c879d?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1619131304595-241575806657?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 6,
		cat: 'tech',
		price: 249,
		name: { fr: 'Apple Watch SE', ln: 'Montre ya mayele', sw: 'Saa ya kisasa', en: 'Apple Watch SE' },
		images: [
			'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1434493907317-a46b5bc78344?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 7,
		cat: 'tech',
		price: 35,
		name: { fr: 'JBL Go 3', ln: 'Radio ya moke', sw: 'Spika ya muziki', en: 'JBL Go 3' },
		images: [
			'https://images.unsplash.com/photo-1612441804231-77a32b21c526?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1589003077984-844134d68810?auto=format&fit=crop&w=600',
		],
	},

	// --- MODE (7 PRODUITS) ---
	{
		id: 11,
		cat: 'mode',
		price: 110,
		name: { fr: 'Nike Air Max 270', ln: 'Sapatu ya sika', sw: 'Viatu vya michezo', en: 'Nike Air Max' },
		images: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 12,
		cat: 'mode',
		price: 85,
		name: { fr: 'Veste Kitenge Homme', ln: 'Kazaka ya liputa', sw: 'Koti la Kitenge', en: 'Kitenge Blazer' },
		images: [
			'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 13,
		cat: 'mode',
		price: 45,
		name: { fr: 'Sac à main Luxe', ln: 'Saki ya basi', sw: 'Mfuko wa ngozi', en: 'Leather Handbag' },
		images: [
			'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 14,
		cat: 'mode',
		price: 135,
		name: { fr: 'Montre Fossil Classic', ln: 'Montre ya wolo', sw: 'Saa ya mkono', en: 'Fossil Watch' },
		images: [
			'https://images.unsplash.com/photo-1524592091214-b44696899660?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1522312346375-d1ad5937951f?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 15,
		cat: 'mode',
		price: 155,
		name: { fr: 'Ray-Ban Aviator', ln: 'Maneti ya moi', sw: 'Miwani ya jua', en: 'Ray-Ban Aviator' },
		images: [
			'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1511499767390-91f99f73948c?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 16,
		cat: 'mode',
		price: 25,
		name: { fr: 'T-shirt Blanc Coton', ln: 'Mupira ya kitoko', sw: 'T-shati ya pamba', en: 'White Cotton T-shirt' },
		images: [
			'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 17,
		cat: 'mode',
		price: 40,
		name: { fr: 'Pantalon Cargo Olive', ln: 'Pantalo ya sika', sw: 'Suruali ya kisasa', en: 'Olive Cargo Pants' },
		images: [
			'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1565084888279-aff99696c242?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1517441662442-f8406595638c?auto=format&fit=crop&w=600',
		],
	},

	// --- ALIMENTAIRE (7 PRODUITS) ---
	{
		id: 21,
		cat: 'food',
		price: 12,
		name: { fr: 'Café du Kivu Grain', ln: 'Kawa ya Kivu', sw: 'Kahawa ya Kivu', en: 'Kivu Coffee' },
		images: [
			'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 22,
		cat: 'food',
		price: 18,
		name: { fr: 'Miel Bio Pur', ln: 'Wiki ya sika', sw: 'Asali mbichi', en: 'Pure Organic Honey' },
		images: [
			'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1471943311424-646960669fba?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 23,
		cat: 'food',
		price: 22,
		name: { fr: 'Huile de Palme 5L', ln: 'Mafuta ya mbila', sw: 'Mafuta ya mawese', en: 'Palm Oil 5L' },
		images: [
			'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1590779033100-9f60705a2f3d?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 24,
		cat: 'food',
		price: 8,
		name: { fr: 'Chocolat Noir Lowa', ln: 'Chocolat ya mboka', sw: 'Chokoleti ya ndani', en: 'Lowa Dark Chocolate' },
		images: [
			'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 25,
		cat: 'food',
		price: 30,
		name: { fr: 'Panier de Fruits Kin', ln: 'Ebonza ya mbuma', sw: 'Kikapu cha matunda', en: 'Kin Fruit Basket' },
		images: [
			'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1610832958506-ee5636637671?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 26,
		cat: 'food',
		price: 6,
		name: { fr: 'Thé Noir Bukavu', ln: 'Ti ya kitoko', sw: 'Chai ya Bukavu', en: 'Bukavu Black Tea' },
		images: [
			'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1544782703-569b53382b3d?auto=format&fit=crop&w=600',
		],
	},
	{
		id: 27,
		cat: 'food',
		price: 5,
		name: { fr: 'Piment Pili-Pili', ln: 'Pilipili ya makasi', sw: 'Pilipili kali', en: 'Pili-Pili Hot Chili' },
		images: [
			'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600',
			'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600',
		],
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
