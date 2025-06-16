// بيانات المنتجات
const products = [
    {
        id: 1,
        title: "تيشيرت رجالي بطبعة جرافيك",
        category: "men",
        price: 199,
        oldPrice: 249,
        image: "images/product1.jpg",
        rating: 4,
        badge: "جديد"
    },
    {
        id: 2,
        title: "جينز نسائي ممزق",
        category: "women",
        price: 349,
        oldPrice: 399,
        image: "images/product2.jpg",
        rating: 5,
        badge: "الأكثر مبيعاً"
    },
    {
        id: 3,
        title: "حذاء رياضي فاخر",
        category: "men",
        price: 499,
        oldPrice: 599,
        image: "images/product3.jpg",
        rating: 4,
        badge: "خصم"
    },
    {
        id: 4,
        title: "جاكيت شتوي من الصوف",
        category: "women",
        price: 599,
        oldPrice: 699,
        image: "images/product4.jpg",
        rating: 3,
        badge: "محدود"
    },
    {
        id: 5,
        title: "قميص رسمي بخطوط",
        category: "men",
        price: 299,
        oldPrice: 349,
        image: "images/product5.jpg",
        rating: 5,
        badge: null
    },
    {
        id: 6,
        title: "فساتين سهرة طويل",
        category: "women",
        price: 799,
        oldPrice: 899,
        image: "images/product6.jpg",
        rating: 4,
        badge: "جديد"
    },
    {
        id: 7,
        title: "شنطة يد جلدية",
        category: "accessories",
        price: 249,
        oldPrice: 299,
        image: "images/product7.jpg",
        rating: 4,
        badge: null
    },
    {
        id: 8,
        title: "ساعة يد ذكية",
        category: "accessories",
        price: 899,
        oldPrice: 999,
        image: "images/product8.jpg",
        rating: 5,
        badge: "الأكثر مبيعاً"
    },
    {
        id: 9,
        title: "نظارات شمسية",
        category: "accessories",
        price: 199,
        oldPrice: 249,
        image: "images/product9.jpg",
        rating: 3,
        badge: null
    },
    {
        id: 10,
        title: "بلوزة نسائية حرير",
        category: "women",
        price: 249,
        oldPrice: 299,
        image: "images/product10.jpg",
        rating: 4,
        badge: "جديد"
    },
    {
        id: 11,
        title: "بنطال جينز رجالي",
        category: "men",
        price: 399,
        oldPrice: 449,
        image: "images/product11.jpg",
        rating: 4,
        badge: null
    },
    {
        id: 12,
        title: "سلسلة ذهبية",
        category: "accessories",
        price: 599,
        oldPrice: 699,
        image: "images/product12.jpg",
        rating: 5,
        badge: "محدود"
    }
];

// عربة التسوق
let cart = [];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('all');
    setupSlider();
    setupTimer();
    setupScrollTopButton();
    setupSearch();
});

// عرض المنتجات
function displayProducts(category) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<span class="product-badge">${product.badge}</span>`;
        }
        
        let ratingHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                ratingHTML += '<i class="fas fa-star"></i>';
            } else {
                ratingHTML += '<i class="far fa-star"></i>';
            }
        }
        
        let oldPriceHTML = '';
        if (product.oldPrice) {
            oldPriceHTML = `<span class="old-price">${product.oldPrice} ج.م</span>`;
        }
        
        productCard.innerHTML = `
            ${badgeHTML}
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price} ج.م</span>
                    ${oldPriceHTML}
                </div>
                <div class="product-rating">
                    ${ratingHTML}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    أضف إلى السلة
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// إضافة إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    
    // إشعار بإضافة المنتج
    showNotification(`تمت إضافة "${product.title}" إلى السلة`);
}

// تحديث السلة
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // تحديث العداد
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // تحديث العناصر
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">${item.price} ج.م × ${item.quantity}</div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // تحديث المجموع
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// عرض/إخفاء السلة
document.getElementById('cartIcon').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('cartDropdown').classList.toggle('active');
});

document.querySelector('.close-cart').addEventListener('click', function() {
    document.getElementById('cartDropdown').classList.remove('active');
});

// إغلاق السلة عند النقر خارجها
document.addEventListener('click', function(e) {
    if (!e.target.closest('#cartDropdown') && !e.target.closest('#cartIcon')) {
        document.getElementById('cartDropdown').classList.remove('active');
    }
});

// فلترة المنتجات حسب التبويب
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const category = this.dataset.category;
        displayProducts(category);
    });
});

// إعداد السلايدر الرئيسي
function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // إنشاء النقاط
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // عرض الشريحة الحالية
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slideCount) % slideCount;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // الانتقال لشريحة محددة
    function goToSlide(n) {
        showSlide(n);
    }
    
    // الشريحة التالية
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // الشريحة السابقة
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // الأزرار
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // التلقائي
    let slideInterval = setInterval(nextSlide, 5000);
    
    // إيقاف التلقائي عند التمرير
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    function resumeSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', resumeSlider);
}

// إعداد العداد التنازلي
function setupTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3); // 3 أيام من الآن
    
    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            clearInterval(timerInterval);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// إعداد زر العودة للأعلى
function setupScrollTopButton() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// إعداد البحث
function setupSearch() {
    const searchBtns = document.querySelectorAll('.fa-search, .search-box button');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.querySelector('.close-search');
    
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // إغلاق البحث عند النقر خارجها
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// إضافة أنماط الإشعارات ديناميكيًا
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles)