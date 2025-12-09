// Data produk contoh
const products = [
    // lorem 1
    { 
        id: 1, 
        name: "lorem 1", 
        price: 15000, 
        category: "lorem1", 
        image: "../imges/gambar1.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem1",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },


    // lorem 2
    { 
        id: 2, 
        name: "lorem 2", 
        price: 15000, 
        category: "lorem2", 
        image: "/../imges/gambar2.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem2",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },
    // lorem 3
    { 
        id: 3, 
        name: "lorem 3", 
        price: 15000, 
        category: "lorem3", 
        image: "imges/gambar3.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem3",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },
    // lorem 4
    { 
        id: 4, 
        name: "lorem 4", 
        price: 15000, 
        category: "lorem4", 
        image: "../imges/gambar4.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem4",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    }
];

let cart = [];

// Fungsi untuk membuka halaman detail produk
function openProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Tampilkan produk
function displayProducts(filter = "all") {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image" onclick="openProductDetail(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Produk+Tidak+Tersedia'">
            </div>
            <div class="product-info">
                <h3 onclick="openProductDetail(${product.id})" style="cursor: pointer; color: #0d6efd;">${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString()}</p>
                <p class="product-description">Produk berkualitas tinggi dengan harga terbaik</p>
                <div class="product-actions">
                    <button type="button" onclick="openProductDetail(${product.id})" class="btn" style="background: #f8f9fa; color: #0d6efd; border: 1px solid #0d6efd; flex: 1; min-width: 0; cursor: pointer;">
                        <i class="fas fa-eye"></i> <span>Detail</span>
                    </button>
                    <button type="button" onclick="addToCart(${product.id})" class="btn" style="flex: 1; min-width: 0; background: var(--gradient-primary); color: white; border: none; cursor: pointer;">
                        <i class="fas fa-shopping-cart"></i> <span>Tambah ke Keranjang</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Tambah ke keranjang
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartCount();
    showNotification('Produk berhasil ditambahkan ke keranjang!');
}

// Tampilkan notifikasi
function showNotification(message) {
    // Hapus notifikasi yang ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Tampilkan notifikasi
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Sembunyikan setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update jumlah di ikon keranjang
function updateCartCount() {
    document.querySelector(".cart-count").textContent = cart.reduce((a, b) => a + b.qty, 0);
}

// Hapus produk dari keranjang
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    showCart();
}

// Tampilkan modal keranjang
function showCart() {
    const cartModal = document.getElementById("cartModal");
    const cartContent = document.querySelector(".cart-content");
    
    if (!cartModal || !cartContent) return;
    
    cartModal.style.display = "block";
    cartContent.style.right = "0";
    
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #6c757d;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Keranjang Anda kosong</p>
            </div>
        `;
        document.getElementById("cartTotal").textContent = "Rp 0";
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=Produk'">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
                        <div class="cart-item-quantity">
                            <button onclick="decreaseQuantity(${item.id})" class="quantity-btn">-</button>
                            <input type="text" class="quantity-input" value="${item.qty}" readonly>
                            <button onclick="increaseQuantity(${item.id})" class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                        <div style="font-weight: 600; color: #0d6efd; font-size: 1.1em;">
                            Rp ${(item.price * item.qty).toLocaleString()}
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn" title="Hapus">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("cartTotal").textContent = "Rp " + total.toLocaleString();
}

// Tambah quantity
function increaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += 1;
        updateCartCount();
        showCart();
    }
}

// Kurangi quantity
function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        if (item.qty > 1) {
            item.qty -= 1;
        } else {
            removeFromCart(id);
            return;
        }
        updateCartCount();
        showCart();
    }
}

// Tutup modal keranjang
function closeCart() {
    const cartModal = document.getElementById("cartModal");
    const cartContent = document.querySelector(".cart-content");
    cartContent.style.right = "-400px";
    setTimeout(() => {
        cartModal.style.display = "none";
    }, 300);
}

// Filter produk
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        displayProducts(this.dataset.filter);
    });
});

// Fungsi checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang Anda kosong!');
        closeCart();
        return;
    }
    
    // Buat pesan untuk WhatsApp
    let message = "Halo, saya ingin memesan produk berikut:\n\n";
    let total = 0;
    
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Harga: Rp ${item.price.toLocaleString()}\n`;
        message += `   Jumlah: ${item.qty}\n`;
        message += `   Subtotal: Rp ${subtotal.toLocaleString()}\n\n`;
    });
    
    message += `Total: Rp ${total.toLocaleString()}\n\n`;
    message += "Terima kasih!";
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    const urlToWhatsapp = `https://wa.me/6282131701032?text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(urlToWhatsapp, "_blank");
    
    // Kosongkan keranjang setelah checkout
    cart = [];
    updateCartCount();
    closeCart();
    showNotification('Pesanan telah dikirim ke WhatsApp!');
}

// Event listener untuk ikon keranjang dan tombol tutup
const cartIcon = document.getElementById("cartIcon");
const closeCartBtn = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");

if (cartIcon) {
    cartIcon.onclick = showCart;
}

if (closeCartBtn) {
    closeCartBtn.onclick = closeCart;
}

if (checkoutBtn) {
    checkoutBtn.onclick = checkout;
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
});

var nav = document.querySelector('nav.navbar');
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 20) nav.classList.add('navbar_fix');
    else nav.classList.remove('navbar_fix');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
    });
});

// Inisialisasi
displayProducts();
updateCartCount();
