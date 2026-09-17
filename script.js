/* ============================================================
   SAMI PERFUME - Complete E-Commerce JavaScript
   ============================================================ */

/* ============================================================
   1. CONFIGURATION - Central config for easy editing
   ============================================================ */
const CONFIG = {
    storeName: 'SAMI PERFUME',
    // Backend Integration Required: Replace with real WhatsApp number
    whatsappNumber: '923001234567',
    social: {
        whatsapp: 'https://wa.me/923001234567',
        facebook: 'https://facebook.com/samiperfume',
        instagram: 'https://instagram.com/samiperfume',
        tiktok: 'https://tiktok.com/@samiperfume'
    },
    contact: {
        phone: '+92 300 1234567',
        email: 'info@sami-perfume.com',
        address: 'Main Boulevard, Gulberg III, Lahore, Pakistan'
    }
};

/* ============================================================
   2. PRODUCT DATA - Centralized product data structure
   ============================================================ */
const PRODUCTS = [
    {
        id: 1, name: 'Royal Oud', category: 'men', type: 'perfume', price: 4999, originalPrice: null,
        size: '100ml', emoji: '🤴', badge: 'Premium',
        desc: 'A majestic blend of agarwood, saffron, and rose. A commanding fragrance for the modern king.',
        notes: 'Top: Saffron, Pink Pepper | Heart: Oud, Rose | Base: Amber, Sandalwood',
        bestSeller: true, isNew: false, isOffer: false
    },
    {
        id: 2, name: 'Arabian Musk', category: 'unisex', type: 'perfume', price: 2999, originalPrice: 3499,
        size: '80ml', emoji: '🌙', badge: null,
        desc: 'An enchanting blend of white musk and Arabian florals that lasts all day.',
        notes: 'Top: Bergamot, Lemon | Heart: Musk, Jasmine | Base: Cedarwood, Vanilla',
        bestSeller: true, isNew: false, isOffer: true
    },
    {
        id: 3, name: 'Blue Sapphire', category: 'men', type: 'perfume', price: 3499, originalPrice: null,
        size: '100ml', emoji: '💎', badge: 'New',
        desc: 'Cool aqua notes fused with amber and vetiver. Fresh, confident, unstoppable.',
        notes: 'Top: Ocean Breeze, Mint | Heart: Lavender, Sage | Base: Vetiver, Amber',
        bestSeller: false, isNew: true, isOffer: false
    },
    {
        id: 4, name: 'Golden Amber', category: 'women', type: 'perfume', price: 3499, originalPrice: null,
        size: '75ml', emoji: '✨', badge: null,
        desc: 'Warm amber blended with vanilla and soft florals. An embrace in a bottle.',
        notes: 'Top: Orange Blossom | Heart: Amber, Honey | Base: Vanilla, Musk',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 5, name: 'Velvet Rose', category: 'women', type: 'perfume', price: 2499, originalPrice: 2999,
        size: '50ml', emoji: '🌹', badge: 'Best Seller',
        desc: 'Luscious Damask rose layered with peony and a hint of dark berries.',
        notes: 'Top: Berry, Lychee | Heart: Damask Rose, Peony | Base: Patchouli, Musk',
        bestSeller: true, isNew: false, isOffer: true
    },
    {
        id: 6, name: 'Black Oud', category: 'men', type: 'attar', price: 1999, originalPrice: null,
        size: '12ml', emoji: '🖤', badge: null,
        desc: 'Intense concentration of rare oud oil. Deep, smoky, and utterly captivating.',
        notes: 'Top: Smoky Notes | Heart: Oud, Agarwood | Base: Leather, Sandalwood',
        bestSeller: true, isNew: false, isOffer: false
    },
    {
        id: 7, name: 'White Musk', category: 'women', type: 'attar', price: 1499, originalPrice: null,
        size: '12ml', emoji: '🤍', badge: null,
        desc: 'Delicate and pure white musk. A light, heavenly scent for everyday elegance.',
        notes: 'Top: Aldehydes | Heart: White Musk, Lily | Base: Musk, Powder',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 8, name: 'Imperial Leather', category: 'men', type: 'perfume', price: 2999, originalPrice: null,
        size: '100ml', emoji: '👔', badge: null,
        desc: 'Rich leather accords with tobacco and dark spices. The scent of authority.',
        notes: 'Top: Black Pepper, Cardamom | Heart: Leather, Tobacco | Base: Oud, Amber',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 9, name: 'Desert Sultan', category: 'men', type: 'perfume', price: 4999, originalPrice: 5999,
        size: '100ml', emoji: '🏜️', badge: 'Sale',
        desc: 'Grand Arabian fragrance with frankincense, myrrh, and golden amber.',
        notes: 'Top: Frankincense, Myrrh | Heart: Oud, Dates | Base: Amber, Sandalwood',
        bestSeller: false, isNew: false, isOffer: true
    },
    {
        id: 10, name: 'Royal Jasmine', category: 'women', type: 'perfume', price: 2999, originalPrice: null,
        size: '75ml', emoji: '🌺', badge: null,
        desc: 'Night-blooming jasmine captured at its peak. Intoxicating and unforgettable.',
        notes: 'Top: Green Notes | Heart: Jasmine, Tuberose | Base: Sandalwood, Vanilla',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 11, name: 'Midnight Oud', category: 'unisex', type: 'perfume', price: 3499, originalPrice: null,
        size: '80ml', emoji: '🌃', badge: 'New',
        desc: 'A mysterious blend of dark oud, midnight florals, and smoky incense.',
        notes: 'Top: Incense, Black Rose | Heart: Oud, Plum | Base: Amber, Musk',
        bestSeller: false, isNew: true, isOffer: false
    },
    {
        id: 12, name: 'Noor Attar', category: 'attar', type: 'attar', price: 1999, originalPrice: null,
        size: '12ml', emoji: '🕯️', badge: null,
        desc: 'Pure noor attar. Spiritual, calming, and deeply traditional. Crafted for devotion.',
        notes: 'Top: Light Musk | Heart: Attar Noor | Base: Sandalwood',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 13, name: 'Crimson Spice', category: 'men', type: 'perfume', price: 2499, originalPrice: null,
        size: '80ml', emoji: '🔥', badge: null,
        desc: 'Fiery cinnamon and clove with a warm woody backbone. Bold and unforgettable.',
        notes: 'Top: Cinnamon, Clove | Heart: Cardamom, Ginger | Base: Wood, Amber',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 14, name: 'Pearl Musk', category: 'women', type: 'attar', price: 1499, originalPrice: 1999,
        size: '12ml', emoji: '🫧', badge: 'Sale',
        desc: 'Soft pearl-white musk. Light, fresh, and perfect for everyday wear.',
        notes: 'Top: Pear, Apple | Heart: Musk, Freesia | Base: White Cedar',
        bestSeller: false, isNew: false, isOffer: true
    },
    {
        id: 15, name: 'Oud Satin', category: 'unisex', type: 'perfume', price: 3499, originalPrice: null,
        size: '100ml', emoji: '🎶', badge: null,
        desc: 'Smooth oud blended with satin-soft florals. Luxurious from first spray to last.',
        notes: 'Top: Saffron, Rose | Heart: Oud, Iris | Base: Vetiver, Musk',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 16, name: 'Amber Gold', category: 'attar', type: 'attar', price: 2499, originalPrice: null,
        size: '12ml', emoji: '⚱️', badge: null,
        desc: 'Pure amber oil blended with a touch of rose. Rich and deeply resonant.',
        notes: 'Top: Rose, Saffron | Heart: Amber | Base: Sandalwood, Musk',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 17, name: 'Cedarwood Essence', category: 'men', type: 'perfume', price: 1999, originalPrice: null,
        size: '80ml', emoji: '🌲', badge: null,
        desc: 'Earthy cedarwood with hints of bergamot and patchouli. Grounded sophistication.',
        notes: 'Top: Bergamot, Grapefruit | Heart: Cedarwood, Pine | Base: Patchouli, Moss',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 18, name: 'Silk Petals', category: 'women', type: 'perfume', price: 2999, originalPrice: 3499,
        size: '75ml', emoji: '🪷', badge: 'Best Seller',
        desc: 'Delicate peony and magnolia wrapped in a silk veil of white musk.',
        notes: 'Top: Peony, Lychee | Heart: Magnolia, Rose | Base: Musk, Iris',
        bestSeller: true, isNew: false, isOffer: true
    },
    {
        id: 19, name: 'Attar Hindi', category: 'attar', type: 'attar', price: 1499, originalPrice: null,
        size: '12ml', emoji: '🌿', badge: null,
        desc: 'Traditional Hindi attar with earthy, herbaceous notes. Pure and authentic.',
        notes: 'Top: Green Herbs | Heart: Attar | Base: Vetiver, Musk',
        bestSeller: false, isNew: false, isOffer: false
    },
    {
        id: 20, name: 'Noir Intense', category: 'unisex', type: 'perfume', price: 4999, originalPrice: 5999,
        size: '100ml', emoji: '🖤', badge: 'Premium Sale',
        desc: 'Deep, dark, and utterly seductive. A masterwork of oud, leather, and dark chocolate.',
        notes: 'Top: Dark Chocolate, Coffee | Heart: Oud, Leather | Base: Amber, Vetiver',
        bestSeller: false, isNew: false, isOffer: true
    },
    {
        id: 21, name: 'Sandalwood Dream', category: 'women', type: 'perfume', price: 2499, originalPrice: null,
        size: '50ml', emoji: '🌻', badge: 'New',
        desc: 'Creamy sandalwood meets vanilla and soft florals. A dreamy daytime fragrance.',
        notes: 'Top: Vanilla, Almond | Heart: Sandalwood, Jasmine | Base: Musk, Tonka',
        bestSeller: false, isNew: true, isOffer: false
    },
    {
        id: 22, name: 'Attar Rose', category: 'attar', type: 'attar', price: 1999, originalPrice: null,
        size: '12ml', emoji: '🌹', badge: null,
        desc: 'Pure rose attar distilled from the finest Kannauj roses. Timeless elegance.',
        notes: 'Top: Rose Petals | Heart: Rose Absolute | Base: Musk, Sandalwood',
        bestSeller: false, isNew: false, isOffer: false
    }
];

/* ============================================================
   3. STATE MANAGEMENT
   ============================================================ */
const State = {
    cart: JSON.parse(localStorage.getItem('sami_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('sami_wishlist') || '[]'),
    user: JSON.parse(localStorage.getItem('sami_user') || 'null'),
    reviews: JSON.parse(localStorage.getItem('sami_reviews') || '{}'),
    ratings: JSON.parse(localStorage.getItem('sami_ratings') || '{}'),
    orders: JSON.parse(localStorage.getItem('sami_orders') || '[]'),
    settings: JSON.parse(localStorage.getItem('sami_settings') || 'null'),
    customProducts: JSON.parse(localStorage.getItem('sami_custom_products') || '[]'),

    save(key, data) {
        localStorage.setItem('sami_' + key, JSON.stringify(data));
    },
    getAllProducts() {
        return [...PRODUCTS, ...this.customProducts];
    }
};

// Load settings if saved
if (State.settings) {
    if (State.settings.whatsappNumber) CONFIG.whatsappNumber = State.settings.whatsappNumber;
    if (State.settings.social) Object.assign(CONFIG.social, State.settings.social);
    if (State.settings.storeName) CONFIG.storeName = State.settings.storeName;
}

/* ============================================================
   4. TOAST NOTIFICATION
   ============================================================ */
function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + type + ' show';
    setTimeout(() => t.classList.remove('show'), 2500);
}

/* ============================================================
   5. NAVIGATION
   ============================================================ */
function showSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('section-' + id);
    if (sec) sec.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update nav active
    document.querySelectorAll('.nav-list a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + id + "'")) {
            a.classList.add('active');
        }
    });

    // Render section-specific content
    renderSectionContent(id);
    closeThreeDotMenu();
}

function renderSectionContent(id) {
    switch (id) {
        case 'home': renderHomePage(); break;
        case 'all-perfumes': renderProductGrid('allProductsGrid', State.getAllProducts()); break;
        case 'men-perfumes': renderProductGrid('menProductsGrid', State.getAllProducts().filter(p => p.category === 'men')); break;
        case 'women-perfumes': renderProductGrid('womenProductsGrid', State.getAllProducts().filter(p => p.category === 'women')); break;
        case 'unisex-perfumes': renderProductGrid('unisexProductsGrid', State.getAllProducts().filter(p => p.category === 'unisex')); break;
        case 'attar-collection': renderProductGrid('attarProductsGrid', State.getAllProducts().filter(p => p.type === 'attar')); break;
        case 'premium-collection': renderProductGrid('premiumProductsGrid', State.getAllProducts().filter(p => p.price >= 4000)); break;
        case 'best-sellers': renderProductGrid('bestSellersGrid', State.getAllProducts().filter(p => p.bestSeller)); break;
        case 'new-arrivals': renderProductGrid('newArrivalsGrid', State.getAllProducts().filter(p => p.isNew)); break;
        case 'special-offers': renderProductGrid('specialOffersGrid', State.getAllProducts().filter(p => p.isOffer)); break;
        case 'cart': renderCart(); break;
        case 'wishlist': renderWishlist(); break;
        case 'reviews': renderAllReviews(); break;
        case 'account': renderAccount(); break;
        case 'checkout': renderCheckoutSummary(); break;
        case 'faq': renderFAQ(); break;
        case 'admin': renderAdminProducts(); loadAdminSettings(); break;
        case 'order-history': renderOrderHistory(); break;
    }
    updateSocialLinks();
}

// Mobile nav
function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('show');
    document.getElementById('mobileNavOverlay').classList.remove('show');
}

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.add('show');
    document.getElementById('mobileNavOverlay').classList.add('show');
});

// Three dot menu
function toggleThreeDotMenu() {
    document.getElementById('dropdownMenu').classList.toggle('show');
}
function closeThreeDotMenu() {
    document.getElementById('dropdownMenu').classList.remove('show');
}
document.addEventListener('click', (e) => {
    if (!e.target.closest('.three-dot-menu')) closeThreeDotMenu();
});

// Search toggle mobile
function toggleSearch() {
    const sb = document.getElementById('searchBar');
    sb.classList.toggle('mobile-show');
    if (sb.classList.contains('mobile-show')) {
        document.getElementById('searchInput').focus();
    }
}

/* ============================================================
   6. PRODUCT RENDERING
   ============================================================ */
function createProductCard(product) {
    const cartItem = State.cart.find(c => c.id === product.id);
    const inWishlist = State.wishlist.includes(product.id);
    const rating = State.ratings[product.id] || 0;
    const reviewCount = (State.reviews[product.id] || []).length;

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= rating ? 'filled' : ''}" onclick="setRating(${product.id}, ${i})">&#9733;</span>`;
    }

    let badgeHtml = '';
    if (product.badge) badgeHtml = `<span class="product-badge ${product.isOffer ? 'offer' : ''}">${product.badge}</span>`;

    let priceHtml = `PKR ${product.price.toLocaleString()}`;
    if (product.originalPrice) {
        priceHtml += ` <span class="original-price">PKR ${product.originalPrice.toLocaleString()}</span>`;
    }

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img">
                <span class="product-emoji">${product.emoji}</span>
                ${badgeHtml}
                <div class="product-actions-overlay">
                    <button class="action-btn-sm" onclick="event.stopPropagation();toggleWishlist(${product.id})" title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">${inWishlist ? '&#10084;' : '&#9825;'}</button>
                    <button class="action-btn-sm" onclick="event.stopPropagation();viewProduct(${product.id})" title="View Details">&#128065;</button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category} ${product.type}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc.substring(0, 80)}...</div>
                <div class="product-size">Size: ${product.size}</div>
                <div class="product-price">${priceHtml}</div>
                <div class="product-rating">
                    ${starsHtml}
                    <span class="rating-text">${rating > 0 ? rating + '/5' : ''} ${reviewCount > 0 ? '(' + reviewCount + ' reviews)' : ''}</span>
                </div>
                <div class="product-buttons">
                    <button class="btn btn-gold btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-outline btn-sm" onclick="viewProduct(${product.id})">Details</button>
                    <button class="btn btn-whatsapp btn-sm" onclick="orderOnWhatsApp(${product.id})">WhatsApp</button>
                </div>
            </div>
        </div>
    `;
}

function renderProductGrid(containerId, products) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (products.length === 0) {
        el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">&#128269;</div><h3>No products found</h3><p>Try a different filter or browse all products.</p><button class="btn btn-gold" onclick="showSection('all-perfumes')">View All Products</button></div>`;
        return;
    }
    el.innerHTML = products.map(p => createProductCard(p)).join('');
}

function renderHomePage() {
    const all = State.getAllProducts();
    renderProductGrid('featuredProducts', all.slice(0, 4));
    renderProductGrid('bestSellersHome', all.filter(p => p.bestSeller).slice(0, 4));
    renderProductGrid('specialOffersHome', all.filter(p => p.isOffer).slice(0, 4));
    renderHomeReviews();
}

/* ============================================================
   7. PRODUCT DETAILS
   ============================================================ */
function viewProduct(id) {
    const product = State.getAllProducts().find(p => p.id === id);
    if (!product) return;

    const rating = State.ratings[product.id] || 0;
    const reviews = State.reviews[product.id] || [];
    const inWishlist = State.wishlist.includes(product.id);

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= rating ? 'filled' : ''}" onclick="setRating(${product.id}, ${i})">&#9733;</span>`;
    }

    let priceHtml = `PKR ${product.price.toLocaleString()}`;
    if (product.originalPrice) {
        priceHtml += ` <span class="original-price" style="font-size:1rem">PKR ${product.originalPrice.toLocaleString()}</span>`;
    }

    const related = State.getAllProducts().filter(p => p.id !== product.id && (p.category === product.category || p.type === product.type)).slice(0, 4);

    const html = `
        <div class="detail-grid">
            <div class="detail-img">
                <span class="product-emoji">${product.emoji}</span>
            </div>
            <div class="detail-info">
                <div class="detail-category">${product.category.toUpperCase()} ${product.type.toUpperCase()}</div>
                <h2>${product.name}</h2>
                <div class="detail-price">${priceHtml}</div>
                <p class="detail-desc">${product.desc}</p>
                <div class="detail-meta">
                    <h4>Fragrance Notes</h4>
                    <p>${product.notes}</p>
                </div>
                <div class="detail-size"><strong>Size:</strong> ${product.size}</div>
                <div class="product-rating" style="margin-bottom:1rem">
                    ${starsHtml}
                    <span class="rating-text">${rating > 0 ? rating + '/5' : 'Rate this product'}</span>
                </div>
                <div class="quantity-selector">
                    <button onclick="changeDetailQty(-1)">-</button>
                    <span id="detailQty">1</span>
                    <button onclick="changeDetailQty(1)">+</button>
                </div>
                <div class="detail-buttons">
                    <button class="btn btn-gold" onclick="addToCart(${product.id}, getDetailQty())">Add to Cart</button>
                    <button class="btn btn-outline" onclick="toggleWishlist(${product.id})">${inWishlist ? '&#10084; In Wishlist' : '&#9825; Wishlist'}</button>
                    <button class="btn btn-whatsapp" onclick="orderOnWhatsApp(${product.id}, getDetailQty())">WhatsApp Order</button>
                </div>
            </div>
        </div>

        <div class="detail-reviews">
            <h3>Customer Reviews (${reviews.length})</h3>
            ${reviews.length === 0 ? '<p style="color:var(--text-light)">No reviews yet. Be the first to review!</p>' : ''}
            ${reviews.map(r => `
                <div class="review-card" style="margin-bottom:1rem">
                    <div class="review-header">
                        <div class="review-avatar">${r.name.charAt(0).toUpperCase()}</div>
                        <div class="review-meta">
                            <h4>${r.name}</h4>
                            <span>${r.date}</span>
                        </div>
                    </div>
                    <div class="review-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
                    <p class="review-text">${r.comment}</p>
                </div>
            `).join('')}

            <div class="reviews-form">
                <h3>Write a Review</h3>
                <form onsubmit="submitReview(event, ${product.id})">
                    <div class="form-group"><label>Your Name</label><input type="text" id="reviewName" required placeholder="Enter your name"></div>
                    <div class="form-group"><label>Your Rating</label>
                        <div class="product-rating" id="reviewStars">
                            ${[1,2,3,4,5].map(i => `<span class="star" onclick="setReviewRating(${i})">&#9733;</span>`).join('')}
                        </div>
                        <input type="hidden" id="reviewRating" value="0">
                    </div>
                    <div class="form-group"><label>Your Review</label><textarea id="reviewComment" rows="3" required placeholder="Share your experience..."></textarea></div>
                    <button type="submit" class="btn btn-gold">Submit Review</button>
                </form>
            </div>
        </div>

        <div class="related-heading">
            <h3>Related Products</h3>
            <div class="product-grid" style="margin-top:1rem">
                ${related.map(p => createProductCard(p)).join('')}
            </div>
        </div>

        <div style="text-align:center;margin-top:2rem">
            <button class="btn btn-outline" onclick="history.back()">&#8592; Back</button>
        </div>
    `;

    document.getElementById('productDetailContent').innerHTML = html;
    showSection('product-details');
}

let detailQtyVal = 1;
function changeDetailQty(delta) {
    detailQtyVal = Math.max(1, detailQtyVal + delta);
    document.getElementById('detailQty').textContent = detailQtyVal;
}
function getDetailQty() { return detailQtyVal; }

/* ============================================================
   8. RATING SYSTEM
   ============================================================ */
function setRating(productId, rating) {
    State.ratings[productId] = rating;
    State.save('ratings', State.ratings);
    showToast('Rating saved: ' + rating + ' stars');
    // Re-render current view
    renderSectionContent(getCurrentSection());
}

function setReviewRating(rating) {
    document.getElementById('reviewRating').value = rating;
    document.querySelectorAll('#reviewStars .star').forEach((s, i) => {
        s.classList.toggle('filled', i < rating);
    });
}

function getCurrentSection() {
    const active = document.querySelector('.page-section.active');
    if (!active) return 'home';
    return active.id.replace('section-', '');
}

/* ============================================================
   9. REVIEW SYSTEM
   ============================================================ */
function submitReview(e, productId) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    if (!name || !comment) { showToast('Please fill all fields', 'error'); return; }
    if (rating === 0) { showToast('Please select a rating', 'error'); return; }

    if (!State.reviews[productId]) State.reviews[productId] = [];
    State.reviews[productId].push({
        name, rating, comment,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    });
    State.save('reviews', State.reviews);
    showToast('Review submitted successfully!');
    viewProduct(productId);
}

function renderHomeReviews() {
    const allReviews = [];
    Object.keys(State.reviews).forEach(pid => {
        State.reviews[pid].forEach(r => {
            const product = State.getAllProducts().find(p => p.id === parseInt(pid));
            if (product) allReviews.push({ ...r, product: product.name });
        });
    });

    // Add demo reviews if none
    if (allReviews.length === 0) {
        const demoReviews = [
            { name: 'Ahmed R.', rating: 5, comment: 'Royal Oud is absolutely magnificent. The longevity is incredible - lasts 12+ hours. Best oud perfume I have ever used.', date: 'Sep 10, 2026', product: 'Royal Oud' },
            { name: 'Fatima K.', rating: 4, comment: 'Love the Velvet Rose! It is so elegant and feminine. The rose note is very realistic and lasts all day.', date: 'Sep 8, 2026', product: 'Velvet Rose' },
            { name: 'Hassan M.', rating: 5, comment: 'Arabian Musk is a classic. Perfect for everyday use. Highly recommend it for anyone who loves musk fragrances.', date: 'Sep 5, 2026', product: 'Arabian Musk' },
            { name: 'Ayesha S.', rating: 4, comment: 'Beautiful packaging and fast delivery. The Blue Sapphire is fresh and long-lasting. Great value for money!', date: 'Sep 3, 2026', product: 'Blue Sapphire' }
        ];
        const el = document.getElementById('homeReviews');
        if (el) el.innerHTML = demoReviews.map(r => createReviewCard(r)).join('');
        return;
    }

    const el = document.getElementById('homeReviews');
    if (el) el.innerHTML = allReviews.slice(0, 6).map(r => createReviewCard(r)).join('');
}

function createReviewCard(r) {
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${r.name.charAt(0).toUpperCase()}</div>
                <div class="review-meta">
                    <h4>${r.name}</h4>
                    <span>${r.date}${r.product ? ' - ' + r.product : ''}</span>
                </div>
            </div>
            <div class="review-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
            <p class="review-text">${r.comment}</p>
        </div>
    `;
}

function renderAllReviews() {
    const container = document.getElementById('allReviewsContent');
    let allReviews = [];

    // Demo reviews
    const demoReviews = [
        { name: 'Ahmed R.', rating: 5, comment: 'Royal Oud is absolutely magnificent. The longevity is incredible - lasts 12+ hours. Best oud perfume I have ever used.', date: 'Sep 10, 2026', product: 'Royal Oud' },
        { name: 'Fatima K.', rating: 4, comment: 'Love the Velvet Rose! It is so elegant and feminine. The rose note is very realistic and lasts all day.', date: 'Sep 8, 2026', product: 'Velvet Rose' },
        { name: 'Hassan M.', rating: 5, comment: 'Arabian Musk is a classic. Perfect for everyday use. Highly recommend it for anyone who loves musk fragrances.', date: 'Sep 5, 2026', product: 'Arabian Musk' },
        { name: 'Ayesha S.', rating: 4, comment: 'Beautiful packaging and fast delivery. The Blue Sapphire is fresh and long-lasting. Great value for money!', date: 'Sep 3, 2026', product: 'Blue Sapphire' },
        { name: 'Bilal T.', rating: 5, comment: 'The Attar Rose is pure and traditional. Reminds me of the attars from Kannauj. Excellent quality.', date: 'Sep 1, 2026', product: 'Attar Rose' },
        { name: 'Zainab A.', rating: 4, comment: 'Ordered the Golden Amber as a gift. The packaging was beautiful and the scent is warm and inviting.', date: 'Aug 28, 2026', product: 'Golden Amber' },
        { name: 'Omar F.', rating: 5, comment: 'Midnight Oud is a masterpiece. Dark, mysterious, and incredibly sophisticated. Worth every rupee.', date: 'Aug 25, 2026', product: 'Midnight Oud' },
        { name: 'Sara N.', rating: 5, comment: 'The White Musk attar is perfect for daily use. Light, clean, and elegant. I have already ordered two more!', date: 'Aug 22, 2026', product: 'White Musk' }
    ];
    allReviews = [...demoReviews];

    // Add user reviews
    Object.keys(State.reviews).forEach(pid => {
        const product = State.getAllProducts().find(p => p.id === parseInt(pid));
        State.reviews[pid].forEach(r => allReviews.push({ ...r, product: product ? product.name : '' }));
    });

    container.innerHTML = `
        <div class="reviews-grid">${allReviews.map(r => createReviewCard(r)).join('')}</div>
    `;
}

/* ============================================================
   10. CART SYSTEM
   ============================================================ */
function addToCart(productId, qty = 1) {
    const existing = State.cart.find(c => c.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        State.cart.push({ id: productId, qty });
    }
    State.save('cart', State.cart);
    updateBadges();
    const product = State.getAllProducts().find(p => p.id === productId);
    showToast(product.name + ' added to cart!');
}

function removeFromCart(productId) {
    State.cart = State.cart.filter(c => c.id !== productId);
    State.save('cart', State.cart);
    updateBadges();
    renderCart();
    showToast('Item removed from cart');
}

function updateCartQty(productId, delta) {
    const item = State.cart.find(c => c.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    State.save('cart', State.cart);
    renderCart();
}

function clearCart() {
    State.cart = [];
    State.save('cart', State.cart);
    updateBadges();
    renderCart();
    showToast('Cart cleared');
}

function renderCart() {
    const container = document.getElementById('cartContent');
    if (State.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="empty-icon">&#128722;</div>
                <h3>Your Cart is Empty</h3>
                <p>Discover our amazing fragrances and add them to your cart!</p>
                <button class="btn btn-gold" onclick="showSection('all-perfumes')">Shop Now</button>
            </div>`;
        return;
    }

    let subtotal = 0;
    const rows = State.cart.map(item => {
        const product = State.getAllProducts().find(p => p.id === item.id);
        if (!product) return '';
        const total = product.price * item.qty;
        subtotal += total;
        return `
            <tr>
                <td>
                    <div class="cart-item-info">
                        <span class="cart-item-emoji">${product.emoji}</span>
                        <div>
                            <div class="cart-item-name">${product.name}</div>
                            <div class="cart-item-cat">${product.category} ${product.type} | ${product.size}</div>
                        </div>
                    </div>
                </td>
                <td class="cart-item-price">PKR ${product.price.toLocaleString()}</td>
                <td>
                    <div class="cart-qty">
                        <button onclick="updateCartQty(${product.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${product.id}, 1)">+</button>
                    </div>
                </td>
                <td class="cart-item-price">PKR ${total.toLocaleString()}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">&#128465;</button></td>
            </tr>`;
    }).join('');

    container.innerHTML = `
        <div style="overflow-x:auto">
            <table class="cart-table">
                <thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="order-total-line">
                <span>Total</span>
                <span>PKR ${subtotal.toLocaleString()}</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-outline" onclick="showSection('all-perfumes')">Continue Shopping</button>
                <button class="btn btn-danger btn-sm" onclick="clearCart()">Clear Cart</button>
                <button class="btn btn-gold" onclick="showSection('checkout')">Proceed to Checkout</button>
            </div>
        </div>`;
}

/* ============================================================
   11. WISHLIST SYSTEM
   ============================================================ */
function toggleWishlist(productId) {
    const idx = State.wishlist.indexOf(productId);
    const product = State.getAllProducts().find(p => p.id === productId);
    if (idx > -1) {
        State.wishlist.splice(idx, 1);
        showToast(product.name + ' removed from wishlist');
    } else {
        State.wishlist.push(productId);
        showToast(product.name + ' added to wishlist!');
    }
    State.save('wishlist', State.wishlist);
    updateBadges();
    renderSectionContent(getCurrentSection());
}

function renderWishlist() {
    const container = document.getElementById('wishlistContent');
    if (State.wishlist.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="empty-icon">&#9825;</div>
                <h3>Your Wishlist is Empty</h3>
                <p>Browse our collection and save your favorite fragrances!</p>
                <button class="btn btn-gold" onclick="showSection('all-perfumes')">Explore Products</button>
            </div>`;
        return;
    }

    const products = State.wishlist.map(id => State.getAllProducts().find(p => p.id === id)).filter(Boolean);
    container.innerHTML = `
        <div class="wishlist-grid">
            ${products.map(p => `
                <div class="product-card">
                    <div class="product-img">
                        <span class="product-emoji">${p.emoji}</span>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${p.category} ${p.type}</div>
                        <div class="product-name">${p.name}</div>
                        <div class="product-price">PKR ${p.price.toLocaleString()}</div>
                        <div class="product-buttons">
                            <button class="btn btn-gold btn-sm" onclick="addToCart(${p.id})">Add to Cart</button>
                            <button class="btn btn-outline btn-sm" onclick="toggleWishlist(${p.id})">Remove</button>
                            <button class="btn btn-whatsapp btn-sm" onclick="orderOnWhatsApp(${p.id})">WhatsApp</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>`;
}

/* ============================================================
   12. CHECKOUT SYSTEM
   ============================================================ */
function renderCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    let subtotal = 0;
    const items = State.cart.map(item => {
        const product = State.getAllProducts().find(p => p.id === item.id);
        if (!product) return '';
        const total = product.price * item.qty;
        subtotal += total;
        return `<div class="order-item"><span>${product.name} (x${item.qty})</span><span>PKR ${total.toLocaleString()}</span></div>`;
    }).join('');

    const delivery = subtotal >= 5000 ? 0 : 200;
    const grandTotal = subtotal + delivery;

    container.innerHTML = `
        <h3>Order Summary</h3>
        ${State.cart.length === 0 ? '<p style="color:var(--text-light)">Your cart is empty.</p>' : ''}
        ${items}
        <div class="order-item"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : 'PKR ' + delivery.toLocaleString()}</span></div>
        <div class="order-total-line"><span>Total</span><span>PKR ${grandTotal.toLocaleString()}</span></div>
    `;
}

function handleCheckout(e) {
    e.preventDefault();
    if (State.cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }

    const name = document.getElementById('checkName').value.trim();
    const mobile = document.getElementById('checkMobile').value.trim();
    const email = document.getElementById('checkEmail').value.trim();
    const city = document.getElementById('checkCity').value.trim();
    const address = document.getElementById('checkAddress').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !mobile || !email || !city || !address) {
        showToast('Please fill all fields', 'error');
        return;
    }

    let subtotal = 0;
    const orderItems = State.cart.map(item => {
        const product = State.getAllProducts().find(p => p.id === item.id);
        const total = product.price * item.qty;
        subtotal += total;
        return { name: product.name, qty: item.qty, price: product.price, total };
    });

    const delivery = subtotal >= 5000 ? 0 : 200;
    const orderNum = 'SP-' + (10000 + State.orders.length + 1);

    const order = {
        orderNum, name, mobile, email, city, address, payment,
        items: orderItems, subtotal, delivery, total: subtotal + delivery,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'received'
    };

    State.orders.push(order);
    State.save('orders', State.orders);

    // Clear cart
    State.cart = [];
    State.save('cart', State.cart);
    updateBadges();

    document.getElementById('orderConfirmDetails').innerHTML = `
        Order Number: <strong>${orderNum}</strong><br>
        Date: ${order.date}<br>
        Total: PKR ${order.total.toLocaleString()}<br>
        Payment: ${payment === 'cod' ? 'Cash on Delivery' : payment === 'bank' ? 'Bank Transfer' : 'Other Method'}<br>
        Shipping to: ${address}, ${city}
    `;
    showSection('order-confirmation');
    showToast('Order placed successfully!');
}

/* ============================================================
   13. ORDER TRACKING
   ============================================================ */
function trackOrder(e) {
    e.preventDefault();
    const orderNum = document.getElementById('trackOrderNum').value.trim().toUpperCase();
    const mobile = document.getElementById('trackMobile').value.trim();

    const order = State.orders.find(o => o.orderNum === orderNum && o.mobile === mobile);
    const container = document.getElementById('trackingResult');

    if (!order) {
        // Demo tracking
        const statuses = ['received', 'processing', 'shipped', 'out', 'delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const statusIndex = statuses.indexOf(randomStatus);
        const statusLabels = {
            received: 'Order Received', processing: 'Processing',
            shipped: 'Shipped', out: 'Out for Delivery', delivered: 'Delivered'
        };

        container.innerHTML = `
            <p style="color:var(--text-light);margin-bottom:1rem">Demo tracking for order: ${orderNum}</p>
            <div class="tracking-timeline">
                ${statuses.map((s, i) => `
                    <div class="tracking-step">
                        <div class="tracking-dot ${i <= statusIndex ? (i < statusIndex ? 'completed' : 'active') : ''}"></div>
                        <div class="tracking-info">
                            <h4 style="${i <= statusIndex ? 'color:var(--success)' : ''}">${statusLabels[s]}</h4>
                            <p>${i <= statusIndex ? 'Completed' : 'Pending'}</p>
                        </div>
                    </div>
                `).join('')}
            </div>`;
        return;
    }

    const statuses = ['received', 'processing', 'shipped', 'out', 'delivered'];
    const currentIdx = statuses.indexOf(order.status);
    const statusLabels = {
        received: 'Order Received', processing: 'Processing',
        shipped: 'Shipped', out: 'Out for Delivery', delivered: 'Delivered'
    };

    container.innerHTML = `
        <p style="color:var(--text-light);margin-bottom:0.5rem">Order: ${order.orderNum} | Date: ${order.date} | Total: PKR ${order.total.toLocaleString()}</p>
        <div class="tracking-timeline">
            ${statuses.map((s, i) => `
                <div class="tracking-step">
                    <div class="tracking-dot ${i <= currentIdx ? (i < currentIdx ? 'completed' : 'active') : ''}"></div>
                    <div class="tracking-info">
                        <h4 style="${i <= currentIdx ? 'color:var(--success)' : ''}">${statusLabels[s]}</h4>
                        <p>${i <= currentIdx ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
            `).join('')}
        </div>`;
}

function renderOrderHistory() {
    const container = document.getElementById('orderHistoryContent');
    if (State.orders.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="empty-icon">&#128203;</div>
                <h3>No Orders Yet</h3>
                <p>Start shopping and place your first order!</p>
                <button class="btn btn-gold" onclick="showSection('all-perfumes')">Shop Now</button>
            </div>`;
        return;
    }

    container.innerHTML = State.orders.map(o => `
        <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
                <strong>${o.orderNum}</strong>
                <span style="color:var(--text-muted)">${o.date}</span>
            </div>
            <div style="font-size:0.9rem;color:var(--text-light)">
                ${o.items.map(i => `<div>${i.name} x${i.qty} - PKR ${i.total.toLocaleString()}</div>`).join('')}
            </div>
            <div style="margin-top:0.5rem;font-weight:600;color:var(--gold-dark)">Total: PKR ${o.total.toLocaleString()}</div>
            <button class="btn btn-outline btn-sm" style="margin-top:0.5rem" onclick="showSection('order-tracking')">Track Order</button>
        </div>
    `).join('');
}

/* ============================================================
   14. SEARCH SYSTEM
   ============================================================ */
function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) return;

    const results = State.getAllProducts().filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query)
    );

    document.getElementById('searchResultsCount').textContent = `Found ${results.length} product(s) for "${query}"`;

    if (results.length === 0) {
        document.getElementById('searchResultsGrid').innerHTML = '';
        document.getElementById('searchEmpty').style.display = 'block';
    } else {
        document.getElementById('searchEmpty').style.display = 'none';
        renderProductGrid('searchResultsGrid', results);
    }

    showSection('search-results');
    closeMobileNav();
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBar').classList.remove('mobile-show');
}

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

/* ============================================================
   15. FILTER SYSTEM
   ============================================================ */
function filterProducts() {
    const cat = document.getElementById('filterCategory').value;
    const price = document.getElementById('filterPrice').value;
    const sort = document.getElementById('filterSort').value;

    let filtered = [...State.getAllProducts()];

    if (cat !== 'all') filtered = filtered.filter(p => p.category === cat || p.type === cat);
    if (price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    switch (sort) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'rating': filtered.sort((a, b) => (State.ratings[b.id] || 0) - (State.ratings[a.id] || 0)); break;
    }

    renderProductGrid('allProductsGrid', filtered);
}

/* ============================================================
   16. WHATSAPP ORDER SYSTEM
   ============================================================ */
function orderOnWhatsApp(productId, qty = 1) {
    const product = State.getAllProducts().find(p => p.id === productId);
    if (!product) return;

    const msg = encodeURIComponent(
        `*SAMI PERFUME - Order Request*\n\n` +
        `Product: ${product.name}\n` +
        `Category: ${product.category.toUpperCase()} ${product.type.toUpperCase()}\n` +
        `Size: ${product.size}\n` +
        `Price: PKR ${product.price.toLocaleString()}\n` +
        `Quantity: ${qty}\n` +
        `Total: PKR ${(product.price * qty).toLocaleString()}\n\n` +
        `I would like to order this product. Please confirm availability and delivery details.`
    );

    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}

/* ============================================================
   17. AUTHENTICATION SYSTEM (Demo)
   ============================================================ */
/* Backend Integration Required:
   Real authentication needs server-side API with:
   - Password hashing (bcrypt/argon2)
   - JWT/Session tokens
   - CSRF protection
   - Rate limiting
   This is a frontend demo only. localStorage is NOT secure for auth.
*/

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) { showToast('Please fill all fields', 'error'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('sami_users') || '[]');
    const user = users.find(u => (u.email === email || u.mobile === email));

    if (user && user.password === password) {
        State.user = { name: user.name, email: user.email, mobile: user.mobile };
        State.save('user', State.user);
        updateBadges();
        showToast('Welcome back, ' + user.name + '!');
        showSection('account');
    } else if (!user) {
        // Demo: create user on first login attempt
        State.user = { name: email.split('@')[0] || 'User', email: email, mobile: email };
        State.save('user', State.user);
        updateBadges();
        showToast('Welcome, ' + State.user.name + '! (Demo login)');
        showSection('account');
    } else {
        showToast('Invalid credentials', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const mobile = document.getElementById('signupMobile').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    if (!name || !mobile || !email || !password || !confirm) {
        showToast('Please fill all fields', 'error'); return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) { showToast('Invalid email address', 'error'); return; }
    if (!/^03\d{9}$/.test(mobile.replace(/\s/g, ''))) {
        showToast('Invalid Pakistani mobile number (03XXXXXXXXX)', 'error'); return;
    }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }

    /* Backend Integration Required:
       Real signup needs server-side API to:
       - Hash password securely
       - Store in database
       - Send verification email/SMS
       - Return auth token
    */

    const users = JSON.parse(localStorage.getItem('sami_users') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error'); return;
    }

    users.push({ name, mobile, email, password });
    localStorage.setItem('sami_users', JSON.stringify(users));

    State.user = { name, email, mobile };
    State.save('user', State.user);
    updateBadges();
    showToast('Account created successfully!');
    showSection('account');
}

function handleLogout() {
    State.user = null;
    localStorage.removeItem('sami_user');
    updateBadges();
    showToast('Logged out successfully');
    showSection('home');
}

function renderAccount() {
    const container = document.getElementById('accountContent');
    if (!State.user) {
        container.innerHTML = `
            <div class="auth-container">
                <div class="auth-card" style="text-align:center">
                    <div class="empty-icon">&#128100;</div>
                    <h3 style="font-family:var(--font-heading);margin:1rem 0 0.5rem">Not Logged In</h3>
                    <p style="color:var(--text-light);margin-bottom:1.5rem">Login to access your account, orders, and wishlist.</p>
                    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                        <button class="btn btn-gold" onclick="showSection('login')">Login</button>
                        <button class="btn btn-outline" onclick="showSection('signup')">Sign Up</button>
                    </div>
                </div>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div style="max-width:600px;margin:0 auto">
            <div style="text-align:center;margin-bottom:2rem">
                <div class="review-avatar" style="width:80px;height:80px;font-size:2rem;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center">${State.user.name.charAt(0).toUpperCase()}</div>
                <h2 style="font-family:var(--font-heading)">${State.user.name}</h2>
                <p style="color:var(--text-light)">${State.user.email}</p>
                <p style="color:var(--text-light)">${State.user.mobile || ''}</p>
            </div>
            <div class="settings-grid">
                <div class="settings-card"><h3>&#128203; Orders</h3><p style="font-size:0.85rem;color:var(--text-light);margin-bottom:0.5rem">${State.orders.length} order(s)</p><a href="#" class="btn btn-outline btn-full" onclick="showSection('order-history')">View Orders</a></div>
                <div class="settings-card"><h3>&#9825; Wishlist</h3><p style="font-size:0.85rem;color:var(--text-light);margin-bottom:0.5rem">${State.wishlist.length} item(s)</p><a href="#" class="btn btn-outline btn-full" onclick="showSection('wishlist')">View Wishlist</a></div>
                <div class="settings-card"><h3>&#128274; Security</h3><a href="#" class="btn btn-outline btn-full" onclick="showSection('forgot-password')">Change Password</a></div>
                <div class="settings-card"><h3>&#128682; Session</h3><button class="btn btn-danger btn-full" onclick="handleLogout()">Logout</button></div>
            </div>
            <p class="auth-note">&#9888; Backend Integration Required: Profile editing, order history, and account management need real server-side APIs.</p>
        </div>`;
}

/* ============================================================
   18. PASSWORD RECOVERY SYSTEM
   ============================================================ */
let recoveryMethod = '';
let recoveryContact = '';
let demoCode = '';

function selectRecovery(method) {
    recoveryMethod = method;
    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = 'block';

    if (method === 'whatsapp') {
        document.getElementById('recoveryInputLabel').textContent = 'Enter your WhatsApp number';
        document.getElementById('recoveryInput').placeholder = '+92 3XX XXXXXXX';
    } else {
        document.getElementById('recoveryInputLabel').textContent = 'Enter your email address';
        document.getElementById('recoveryInput').placeholder = 'your@email.com';
    }
}

function sendRecoveryCode() {
    recoveryContact = document.getElementById('recoveryInput').value.trim();
    if (!recoveryContact) { showToast('Please enter your ' + (recoveryMethod === 'whatsapp' ? 'number' : 'email'), 'error'); return; }

    /* Backend Integration Required:
       Real OTP delivery needs:
       - WhatsApp Business API / Twilio for WhatsApp OTP
       - SMTP / SendGrid / Mailgun for email OTP
       - Server-side code generation and verification
    */

    demoCode = String(Math.floor(100000 + Math.random() * 900000));

    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep3').style.display = 'block';

    if (recoveryMethod === 'whatsapp') {
        document.getElementById('recoveryInfo').innerHTML = `A 6-digit code has been sent to <strong>${recoveryContact}</strong> via WhatsApp.<br><br>Demo code: <strong>${demoCode}</strong>`;
        // Prepare WhatsApp message (demo)
        const msg = encodeURIComponent(`SAMI PERFUME Password Recovery\nYour verification code: ${demoCode}`);
        // In production, this would be sent server-side
    } else {
        document.getElementById('recoveryInfo').innerHTML = `A 6-digit code has been sent to <strong>${recoveryContact}</strong> via Email.<br><br>Demo code: <strong>${demoCode}</strong>`;
    }
    showToast('Recovery code sent! (Demo: ' + demoCode + ')');
}

function verifyRecoveryCode() {
    const code = document.getElementById('recoveryCode').value.trim();
    if (!code) { showToast('Please enter the code', 'error'); return; }

    if (code === demoCode) {
        document.getElementById('forgotStep3').style.display = 'none';
        document.getElementById('forgotStep4').style.display = 'block';
        showToast('Code verified!');
    } else {
        showToast('Invalid code. Please try again.', 'error');
    }
}

function resetPassword() {
    const pw = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmNewPassword').value;

    if (pw.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    if (pw !== confirm) { showToast('Passwords do not match', 'error'); return; }

    /* Backend Integration Required:
       Real password reset needs server-side API to:
       - Verify token
       - Hash new password
       - Update database
       - Invalidate old session
    */

    // Demo: update in localStorage users
    const users = JSON.parse(localStorage.getItem('sami_users') || '[]');
    const user = users.find(u => u.email === recoveryContact || u.mobile === recoveryContact);
    if (user) {
        user.password = pw;
        localStorage.setItem('sami_users', JSON.stringify(users));
    }

    document.getElementById('forgotStep4').style.display = 'none';
    document.getElementById('forgotStep5').style.display = 'block';
    showToast('Password reset successful!');
}

function showForgotStep(step) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById('forgotStep' + i).style.display = i === step ? 'block' : 'none';
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

/* ============================================================
   19. CONTACT FORM
   ============================================================ */
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) { showToast('Please fill all required fields', 'error'); return; }

    /* Backend Integration Required:
       Real contact form needs:
       - Server-side email sending
       - Form validation
       - Spam protection (reCAPTCHA)
       - Database storage
    */

    showToast('Message sent successfully! We will get back to you soon.');
    e.target.reset();
}

/* ============================================================
   20. FAQ SYSTEM
   ============================================================ */
function renderFAQ() {
    const faqs = [
        { q: 'How can I order a perfume?', a: 'Browse our collection, add products to your cart, and proceed to checkout. You can also order directly through WhatsApp by clicking the WhatsApp button on any product.' },
        { q: 'Do you offer Cash on Delivery?', a: 'Yes! We offer Cash on Delivery across Pakistan. You can also pay via Bank Transfer or other methods.' },
        { q: 'How can I contact SAMI PERFUME?', a: 'You can reach us via WhatsApp (+92 300 1234567), phone, email (info@sami-perfume.com), or through the Contact Us page.' },
        { q: 'Can I order through WhatsApp?', a: 'Absolutely! Every product has a WhatsApp order button. Click it to send a pre-filled order message directly to our WhatsApp.' },
        { q: 'How can I track my order?', a: 'Visit the Order Tracking page and enter your order number and mobile number to see real-time status updates.' },
        { q: 'Can I leave a review?', a: 'Yes! Visit any product page and scroll to the review section. You can rate the product with stars and write a detailed review.' },
        { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page. Choose WhatsApp or email recovery, enter the verification code, and create a new password.' },
        { q: 'Do you sell attars?', a: 'Yes! We have a dedicated Attar Collection featuring traditional and premium concentrated attars like Black Oud, White Musk, Noor Attar, and more.' },
        { q: 'What is your delivery timeline?', a: 'Standard delivery takes 3-5 business days across Pakistan. Free delivery on orders above PKR 5,000.' },
        { q: 'Can I return a product?', a: 'Products may be returned within 7 days if unopened and in original packaging. Opened perfumes cannot be returned due to hygiene reasons.' }
    ];

    const el = document.getElementById('faqList');
    el.innerHTML = faqs.map((faq, i) => `
        <div class="faq-item" onclick="toggleFaq(${i})">
            <button class="faq-question">${faq.q} <span class="faq-arrow">&#9662;</span></button>
            <div class="faq-answer"><div class="faq-answer-inner">${faq.a}</div></div>
        </div>
    `).join('');
}

function toggleFaq(index) {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
        if (i === index) item.classList.toggle('open');
        else item.classList.remove('open');
    });
}

/* ============================================================
   21. ADMIN / SETTINGS PANEL
   ============================================================ */
function loadAdminSettings() {
    if (State.settings) {
        if (document.getElementById('adminStoreName')) document.getElementById('adminStoreName').value = State.settings.storeName || 'SAMI PERFUME';
        if (document.getElementById('adminWhatsapp')) document.getElementById('adminWhatsapp').value = State.settings.whatsappNumber || '923001234567';
        if (document.getElementById('adminFacebook')) document.getElementById('adminFacebook').value = State.settings.social?.facebook || '#';
        if (document.getElementById('adminInstagram')) document.getElementById('adminInstagram').value = State.settings.social?.instagram || '#';
        if (document.getElementById('adminTiktok')) document.getElementById('adminTiktok').value = State.settings.social?.tiktok || '#';
    }
}

function saveAdminStore(e) {
    e.preventDefault();
    const settings = {
        storeName: document.getElementById('adminStoreName').value,
        whatsappNumber: document.getElementById('adminWhatsapp').value,
        social: {
            facebook: document.getElementById('adminFacebook').value,
            instagram: document.getElementById('adminInstagram').value,
            tiktok: document.getElementById('adminTiktok').value,
            whatsapp: 'https://wa.me/' + document.getElementById('adminWhatsapp').value
        }
    };

    CONFIG.whatsappNumber = settings.whatsappNumber;
    CONFIG.social = settings.social;
    CONFIG.storeName = settings.storeName;

    State.settings = settings;
    State.save('settings', settings);

    updateSocialLinks();
    showToast('Store settings saved!');
}

function addAdminProduct(e) {
    e.preventDefault();
    const name = document.getElementById('adminPName').value.trim();
    const category = document.getElementById('adminPCategory').value;
    const price = parseInt(document.getElementById('adminPPrice').value);
    const size = document.getElementById('adminPSize').value.trim() || '100ml';
    const desc = document.getElementById('adminPDesc').value.trim() || 'Premium quality perfume from SAMI PERFUME.';

    if (!name || !price) { showToast('Please fill required fields', 'error'); return; }

    const emojis = ['🧴', '🌸', '💐', '🪻', '🪷', '🏵️', '🎎', '🎭'];
    const newProduct = {
        id: Date.now(),
        name, category, type: 'perfume', price,
        originalPrice: null, size, emoji: emojis[Math.floor(Math.random() * emojis.length)],
        badge: 'New', desc, notes: 'Custom fragrance blend',
        bestSeller: false, isNew: true, isOffer: false
    };

    State.customProducts.push(newProduct);
    State.save('custom_products', State.customProducts);

    e.target.reset();
    renderAdminProducts();
    showToast('Product added: ' + name);
}

function renderAdminProducts() {
    const el = document.getElementById('adminProductsList');
    if (!el) return;
    const all = State.getAllProducts();
    el.innerHTML = `
        <p style="font-size:0.85rem;color:var(--text-light);margin-bottom:0.5rem">${all.length} total products (${State.customProducts.length} custom)</p>
        ${State.customProducts.map(p => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid var(--border);font-size:0.85rem">
                <span>${p.emoji} ${p.name} - PKR ${p.price.toLocaleString()}</span>
                <button class="btn btn-danger btn-sm" onclick="removeAdminProduct(${p.id})">&#128465;</button>
            </div>
        `).join('')}
    `;
}

function removeAdminProduct(id) {
    State.customProducts = State.customProducts.filter(p => p.id !== id);
    State.save('custom_products', State.customProducts);
    renderAdminProducts();
    showToast('Product removed');
}

/* ============================================================
   22. SOCIAL MEDIA LINKS
   ============================================================ */
function updateSocialLinks() {
    const setLinks = (prefix) => {
        const wa = document.getElementById(prefix + 'Whatsapp');
        const fb = document.getElementById(prefix + 'Facebook');
        const ig = document.getElementById(prefix + 'Instagram');
        const tk = document.getElementById(prefix + 'Tiktok');
        if (wa) wa.href = CONFIG.social.whatsapp;
        if (fb) fb.href = CONFIG.social.facebook;
        if (ig) ig.href = CONFIG.social.instagram;
        if (tk) tk.href = CONFIG.social.tiktok;
    };

    setLinks('social');
    setLinks('contact');
    setLinks('socialPage');
    setLinks('foot');

    // WhatsApp float
    const wf = document.getElementById('whatsappFloat');
    if (wf) wf.href = CONFIG.social.whatsapp;

    // Contact WhatsApp button
    const cwb = document.getElementById('contactWhatsappBtn');
    if (cwb) cwb.href = CONFIG.social.whatsapp;
}

/* ============================================================
   23. THEME SYSTEM
   ============================================================ */
function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('sami_theme', theme);
}

// Load saved theme
(function() {
    const theme = localStorage.getItem('sami_theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        setTimeout(() => {
            const sel = document.getElementById('themeSelect');
            if (sel) sel.value = 'dark';
        }, 0);
    }
})();

/* ============================================================
   24. BADGE UPDATES
   ============================================================ */
function updateBadges() {
    document.getElementById('cartBadge').textContent = State.cart.reduce((sum, c) => sum + c.qty, 0);
    document.getElementById('wishlistBadge').textContent = State.wishlist.length;
}

/* ============================================================
   25. INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    updateBadges();
    renderHomePage();
    updateSocialLinks();
});
// Sami Parfum & Supabase Connection (Auto-Configured)
const supabaseUrl = 'https://vwlotrpekbqktxkenmk.supabase.co';
const supabaseKey = 'sb_publishable_LxRetceJjGzvyndIgdmtew_yZP53YXx';

if (window.supabase) {
    const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    
    async function loadSamiProducts() {
        try {
            let { data, error } = await _supabase.from('products').select('*');
            if (error) throw error;
            console.log("پرفیوم کامیابی سے لوڈ ہو گئے:", data);
        } catch (err) {
            console.log("کنکشن کا مسئلہ:", err.message);
        }
    }
    
    loadSamiProducts();
}
// Supabase سے ڈیٹا لے کر تینوں حصوں میں دکھانے کا محفوظ کوڈ
async function loadCategoriesData() {
  try {
    if (typeof supabaseClient === 'undefined') return;
    
    let { data: products, error } = await supabaseClient
      .from('products')
      .select('*');

    if (error || !products) return;

    let premiumHtml = "<h2>پریمیم کلیکشن</h2><div style='display:flex; gap:15px; justify-content:center; flex-wrap:wrap;'>";
    let regularHtml = "<h2>عام کلیکشن</h2><div style='display:flex; gap:15px; justify-content:center; flex-wrap:wrap;'>";
    let attarHtml = "<h2>عطر کلیکشن</h2><div style='display:flex; gap:15px; justify-content:center; flex-wrap:wrap;'>";

    products.forEach(p => {
      let cat = (p.category || '').toLowerCase().trim();
      let card = `<div style="border:1px solid #ddd; padding:10px; border-radius:8px; width:150px;">
                    <h4>${p.name || ''}</h4>
                    <p>قیمت: ${p.price || ''}</p>
                  </div>`;

      if (cat === 'permium' || cat === 'premium') {
        premiumHtml += card;
      } else if (cat === 'regular') {
        regularHtml += card;
      } else if (cat === 'attar') {
        attarHtml += card;
      }
    });

    premiumHtml += "</div>";
    regularHtml += "</div>";
    attarHtml += "</div>";

    let pSec = document.getElementById('premium-section');
    let rSec = document.getElementById('regular-section');
    let aSec = document.getElementById('attar-section');

    if (pSec) pSec.innerHTML = premiumHtml;
    if (rSec) rSec.innerHTML = regularHtml;
    if (aSec) aSec.innerHTML = attarHtml;

  } catch (err) {
    console.log("Error loading categories:", err);
  }
}

// جیسے ہی پیج لوڈ ہو، یہ فنکشن چل جائے
window.addEventListener('DOMContentLoaded', loadCategoriesData);
