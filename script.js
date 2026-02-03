// --- 1. Data ---
const translations = {
    lo: {
        shopName: "ຮ້ານໝາກໄມ້ສົດ",
        nav: { products: "ສິນຄ້າ", cart: "ກະຕ່າ", checkout: "ຊຳລະເງິນ" },
        hero: { title: "ໝາກໄມ້ສົດ ຄຸນນະພາບດີ", subtitle: "ສົ່ງຕົງຈາກສວນ ຮອດມືທ່ານທຸກໆມື້" },
        products: { title: "🍇 ສິນຄ້າແນະນຳ" },
        search: { placeholder: "ຄົ້ນຫາໝາກໄມ້..." },
        filter: { all: "ທັງໝົດ", tropical: "ເຂດຮ້ອນ", citrus: "ຕະກຸນສົ້ມ", berry: "ເບີຣີ" },
        cart: { title: "🛒 ກະຕ່າຂອງທ່ານ", empty: "ຍັງບໍ່ມີສິນຄ້າ", total: "ລວມ:" },
        checkout: { title: "📦 ທີ່ຢູ່ຈັດສົ່ງ", name: "ຊື່ຜູ້ຮັບ", phone: "ເບີໂທ", address: "ທີ່ຢູ່ລະອຽດ", submit: "ຢືນຢັນຄຳສັ່ງຊື້" },
        button: { addToCart: "ເພີ່ມໃສ່ກະຕ່າ" },
        alert: { emptyCart: "ກະຕ່າວ່າງ! ກະລຸນາເລືອກສິນຄ້າກ່ອນ" },
        payment: { title: "📱 ສະແກນ QR Code", total: "ຍອດໂອນ:", bankInfo: "ທະນາຄານ: BCEL One\nເລກບັນຊີ: 160-12-25003534\nຊື່: PHOUTTHASACK SIPAMOUNE MR", confirm: "✅ ແຈ້ງໂອນເງິນແລ້ວ (WhatsApp)" },
        currency: "₭"
    },
    en: {
        shopName: "Fresh Fruit Shop",
        nav: { products: "Products", cart: "Cart", checkout: "Checkout" },
        hero: { title: "Premium Fresh Fruits", subtitle: "Farm to table delivery everyday" },
        products: { title: "🍇 Featured Products" },
        search: { placeholder: "Search fruits..." },
        filter: { all: "All", tropical: "Tropical", citrus: "Citrus", berry: "Berries" },
        cart: { title: "🛒 Your Cart", empty: "Cart is empty", total: "Total:" },
        checkout: { title: "📦 Shipping Info", name: "Full Name", phone: "Phone Number", address: "Address", submit: "Place Order" },
        button: { addToCart: "Add to Cart" },
        alert: { emptyCart: "Your cart is empty!" },
        payment: { title: "📱 Scan to Pay", total: "Total:", bankInfo: "Bank: BCEL One\nAccount: 160-12-25003534\nName: PHOUTTHASACK SIPAMOUNE MR", confirm: "✅ I have paid (WhatsApp)" },
        currency: "₭"
    }
};

const products = [
    { id: 1, name: { lo: "ໝາກມ່ວງ", en: "Mango" }, price: 25000, category: "tropical", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400" },
    { id: 2, name: { lo: "ໝາກກ້ວຍ", en: "Banana" }, price: 15000, category: "tropical", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400" },
    { id: 3, name: { lo: "ໝາກນາວ", en: "Lime" }, price: 10000, category: "citrus", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400" },
    { id: 4, name: { lo: "ໝາກສົ້ມ", en: "Orange" }, price: 30000, category: "citrus", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400" },
    { id: 5, name: { lo: "ໝາກອະງຸ່ນ", en: "Grape" }, price: 45000, category: "berry", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400" },
    { id: 6, name: { lo: "ໝາກໂມ", en: "Watermelon" }, price: 35000, category: "tropical", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400" },
    { id: 7, name: { lo: "ໝາກສະຕໍເບີຣີ", en: "Strawberry" }, price: 50000, category: "berry", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400" },
    { id: 8, name: { lo: "ໝາກທຸລຽນ", en: "Durian" }, price: 80000, category: "tropical", image: "durian.jpg" }
];

// --- 2. Logic ---
let currentLang = localStorage.getItem('lang') || 'lo';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

window.onload = function() {
    setLanguage(currentLang);
    renderProducts();
    renderCart();
};

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    if (!translations[currentLang]) currentLang = 'lo';

    document.getElementById('btn-lo').classList.toggle('active', currentLang === 'lo');
    document.getElementById('btn-en').classList.toggle('active', currentLang === 'en');
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = getNestedTranslation(key);
        if (text) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
            else el.innerText = text;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = getNestedTranslation(key);
    });

    renderProducts();
    renderCart();
}

function getNestedTranslation(key) {
    try { return key.split('.').reduce((obj, k) => obj && obj[k], translations[currentLang]); }
    catch(e) { return key; }
}

function renderProducts(filtered = null) {
    const grid = document.getElementById('productGrid');
    const list = filtered || products;
    const t = translations[currentLang];

    if(!grid) return;

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name[currentLang]}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="card-info">
                <h3>${p.name[currentLang]}</h3>
                <p class="price">${formatPrice(p.price)}</p>
                <button class="btn-add" onclick="addToCart(${p.id})">${t.button.addToCart}</button>
            </div>
        </div>
    `).join('');
}

function formatPrice(price) {
    return price.toLocaleString() + ' ' + translations[currentLang].currency;
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else {
        const p = products.find(i => i.id === id);
        cart.push({ ...p, qty: 1 });
    }
    saveCart();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        saveCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const t = translations[currentLang];
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById('cartCount').textContent = count;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-state">${t.cart.empty}</p>`;
        document.getElementById('totalPrice').textContent = formatPrice(0);
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div style="font-weight:600">${item.name[currentLang]}</div>
                <div style="font-size:0.9em;color:#777">${formatPrice(item.price)} x ${item.qty}</div>
            </div>
            <div class="qty-controls">
                <button onclick="updateQty(${item.id}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button onclick="updateQty(${item.id}, 1)">+</button>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    document.getElementById('totalPrice').textContent = formatPrice(total);
}

function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.lo.toLowerCase().includes(term) || p.name.en.toLowerCase().includes(term)
    );
    renderProducts(filtered);
}

function filterByCategory() {
    const cat = document.getElementById('categoryFilter').value;
    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    renderProducts(filtered);
}

function submitOrder(e) {
    e.preventDefault();
    const t = translations[currentLang];
    if (cart.length === 0) return alert(t.alert.emptyCart);
    
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    document.getElementById('modalTotal').textContent = formatPrice(total);
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// --- ฟังก์ชันจ่ายเงิน และ Redirect ไป WhatsApp ---
function confirmPayment() {
    // 1. ดึงข้อมูล
    const name = document.getElementById('customerName').value || "Customer";
    const phone = document.getElementById('customerPhone').value || "-";
    const address = document.getElementById('customerAddress').value || "-";
    
    // คำนวณยอดรวม
    const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const totalStr = formatPrice(totalAmount);

    // สร้างรายการสินค้า
    let itemList = cart.map(i => `- ${i.name[currentLang]} x ${i.qty}`).join("\n");

    // 2. ตั้งค่าเบอร์โทร WhatsApp ร้านค้า
    const myPhoneNumber = "8562093503657"; 

    // 3. เตรียมข้อความ
    let msg = "";
    if(currentLang === 'lo') {
        msg = `ສະບາຍດີ! ຂ້ອຍຕ້ອງການແຈ້ງໂອນເງິນ\n\n👤 ຊື່: ${name}\n📞 ເບີໂທ: ${phone}\n📍 ທີ່ຢູ່: ${address}\n\n🛒 ລາຍການສິນຄ້າ:\n${itemList}\n\n💰 ລວມຍອດ: ${totalStr}\n\n(ກະລຸນາລໍຖ້າຮູບສລິບ...)`;
    } else {
        msg = `Hello! I want to confirm payment\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}\n\n🛒 Items:\n${itemList}\n\n💰 Total: ${totalStr}\n\n(Sending slip...)`;
    }

    // 4. สร้างลิงก์ WhatsApp
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(msg)}`;

    // 5. ปิด Modal, ล้างตะกร้า แล้ว Redirect
    closePaymentModal();
    cart = [];
    saveCart();
    document.getElementById('checkoutForm').reset();

    // เปิด WhatsApp ในแท็บใหม่
    window.open(whatsappUrl, '_blank');
}

window.onclick = function(e) {
    if (e.target == document.getElementById('paymentModal')) closePaymentModal();
}