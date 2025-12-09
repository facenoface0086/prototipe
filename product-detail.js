// Data produk (sama dengan di script.js)
const products = [
    { 
        id: 1, 
        name: "lorem 1", 
        price: 15000, 
        category: "lorem1", 
        image: "/imges/gambar1.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem1",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },
    { 
        id: 2, 
        name: "lorem 2", 
        price: 15000, 
        category: "lorem2", 
        image: "/imges/gambar2.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem2",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },
    { 
        id: 3, 
        name: "lorem 3", 
        price: 15000, 
        category: "lorem3", 
        image: "/imges/gambar3.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Produk berkualitas tinggi dengan bahan-bahan terbaik untuk kesehatan Anda.",
        specs: {
            "Kategori": "lorem3",
            "Berat": "500g",
            "Stok": "Tersedia",
            "Garansi": "1 Tahun"
        }
    },
    { 
        id: 4, 
        name: "lorem 4", 
        price: 15000, 
        category: "lorem4", 
        image: "/imges/gambar4.png",
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

// Ambil ID produk dari URL parameter
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Tampilkan detail produk (meoptimalkan untuk loading cepat)
function displayProductDetail() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);
    const contentDiv = document.getElementById('productDetailContent');

    // Jika produk tidak ditemukan, tampilkan error
    if (!product) {
        contentDiv.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Produk tidak ditemukan</h2>
                <p>Produk yang Anda cari tidak tersedia.</p>
                <a href="index.html#products" class="btn" style="margin-top: 20px; display: inline-block;">Kembali ke Produk</a>
            </div>
        `;
        return;
    }

    // Buat spesifikasi HTML
    let specsHTML = '';
    if (product.specs) {
        specsHTML = '<div class="product-specs"><h3>Spesifikasi Produk</h3>';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHTML += `
                <div class="spec-item">
                    <span class="spec-label">${key}</span>
                    <span class="spec-value">${value}</span>
                </div>
            `;
        }
        specsHTML += '</div>';
    }

    // Render langsung tanpa delay - gunakan requestAnimationFrame untuk smooth rendering
    requestAnimationFrame(() => {
        contentDiv.innerHTML = `
            <div class="product-detail-content">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}" loading="eager" onerror="this.src='https://via.placeholder.com/600x600?text=Produk+Tidak+Tersedia'">
                </div>
                <div class="product-detail-info">
                    <h1>${product.name}</h1>
                    <div class="product-detail-price">Rp ${product.price.toLocaleString()}</div>
                    <div class="product-detail-description">
                        <h3>Deskripsi Produk</h3>
                        <p>${product.description || 'Produk berkualitas tinggi dengan bahan-bahan terbaik.'}</p>
                    </div>
                    <div class="product-detail-actions">
                        <button onclick="buyNow(${product.id})" class="btn" style="background: var(--gradient-accent); width: 100%;">
                            <i class="fas fa-bolt"></i> Beli Sekarang
                        </button>
                    </div>
                    ${specsHTML}
                </div>
            </div>
        `;
    });
}


// Beli sekarang - langsung ke WhatsApp
function buyNow(id) {
    const product = products.find(p => p.id === id);
    
    if (!product) {
        showNotification('Produk tidak ditemukan!');
        return;
    }
    
    // Buat pesan untuk WhatsApp
    let message = "Halo, saya ingin memesan produk berikut:\n\n";
    message += `*${product.name}*\n`;
    message += `Harga: Rp ${product.price.toLocaleString()}\n`;
    message += `Kategori: ${product.category}\n\n`;
    
    if (product.description) {
        message += `Deskripsi:\n${product.description}\n\n`;
    }
    
    message += `Total: Rp ${product.price.toLocaleString()}\n\n`;
    message += "Terima kasih!";
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    const urlToWhatsapp = `https://wa.me/6282131701032?text=${encodedMessage}`;
    
    // Buka WhatsApp langsung
    window.open(urlToWhatsapp, "_blank");
    
    // Tampilkan notifikasi
    showNotification('Mengarahkan ke WhatsApp...');
}

// Update jumlah di ikon keranjang
function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((a, b) => a + b.qty, 0);
    }
}

// Tampilkan modal keranjang
function showCart() {
    const cartModal = document.getElementById("cartModal");
    const cartContent = document.querySelector(".cart-content");
    if (cartModal && cartContent) {
        cartModal.style.display = "block";
        cartContent.style.right = "0";
        
        const cartItems = document.getElementById("cartItems");
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span>${item.name} x${item.qty}</span>
                        <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        document.getElementById("cartTotal").textContent = "Rp " + total.toLocaleString();
    }
}

// Tutup modal keranjang
function closeCart() {
    const cartModal = document.getElementById("cartModal");
    const cartContent = document.querySelector(".cart-content");
    if (cartModal && cartContent) {
        cartContent.style.right = "-400px";
        setTimeout(() => {
            cartModal.style.display = "none";
        }, 300);
    }
}

// Hapus produk dari keranjang
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    showCart();
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

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navLinks) navLinks.classList.toggle('active');
        if (navActions) navActions.classList.toggle('active');
    });
}

// Navbar scroll effect
var nav = document.querySelector('nav.navbar');
if (nav) {
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 20) {
            nav.classList.add('navbar_fix');
        } else {
            nav.classList.remove('navbar_fix');
        }
    });
}

// Tutup menu saat link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        if (navActions) navActions.classList.remove('active');
    });
});

// Event listener untuk ikon keranjang dan tombol tutup
const cartIcon = document.getElementById("cartIcon");
const closeCartBtn = document.getElementById("closeCart");

if (cartIcon) {
    cartIcon.onclick = showCart;
}

if (closeCartBtn) {
    closeCartBtn.onclick = closeCart;
}

// Inisialisasi - jalankan segera setelah DOM ready
(function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            displayProductDetail();
            updateCartCount();
        });
    } else {
        // DOM sudah siap, jalankan langsung
        displayProductDetail();
        updateCartCount();
    }
})();

