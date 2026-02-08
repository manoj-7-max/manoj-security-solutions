document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const container = document.querySelector('.products-grid');
            container.innerHTML = ''; // Clear loading/static content

            if (products.length === 0) {
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #aaa; padding: 50px;"><h3>No Products Available Yet.</h3><p>Please check back later.</p></div>';
                return;
            }

            products.forEach(product => {
                // Determine image/icon display
                let imageHtml = '';
                if (product.image) {
                    imageHtml = `<img src="${product.image}" alt="${product.name}">`;
                } else {
                    imageHtml = `<i class="${product.icon}" style="color: #66fcf1; font-size: 3rem;"></i>`;
                }

                const card = `
                    <div class="product-card">
                        <div class="product-img">
                            ${imageHtml}
                        </div>
                        <div class="product-info">
                            <span class="tag">${product.category}</span>
                            <h3>${product.name}</h3>
                            <p class="price" style="color: #66fcf1; font-weight: bold; margin-bottom: 10px;">
                                ${product.price && product.price !== 'TBD' ? '₹' + product.price : 'Price on Request'}
                            </p>
                            <p style="color: #aaa; margin-bottom: 20px;">${product.description}</p>
                            <button onclick="addToCart('${product.name}', this)" class="btn btn-secondary" style="width: 100%;">Add to Cart</button>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(err => {
            console.error('Error loading products:', err);
            document.querySelector('.products-grid').innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #ff4d4d;"><h3>Failed to Load Products</h3><p>Please try again later.</p></div>';
        });
});

// Cart Logic
let cart = JSON.parse(localStorage.getItem('enquiryCart')) || [];

function addToCart(productName, btnElement) {
    if (!cart.includes(productName)) {
        cart.push(productName);
        localStorage.setItem('enquiryCart', JSON.stringify(cart));
        updateCartUI();

        // Button Feedback
        if (btnElement) {
            const originalText = btnElement.innerText;
            btnElement.innerText = 'Added!';
            btnElement.style.background = '#2ecc71';
            btnElement.disabled = true;
            setTimeout(() => {
                btnElement.innerText = 'Add to Cart';
                btnElement.style.background = '';
                btnElement.disabled = false;
            }, 2000);
        }
    } else {
        // Optional: Shake animation or distinct feedback
        if (btnElement) {
            btnElement.innerText = 'In Cart';
            setTimeout(() => btnElement.innerText = 'Add to Cart', 1000);
        }
    }
}

function updateCartUI() {
    const cartBtn = document.getElementById('cart-fab');
    if (!cartBtn) {
        const btn = document.createElement('a');
        btn.id = 'cart-fab';
        btn.href = 'contact.html';
        btn.className = 'whatsapp-float';
        btn.style.bottom = '90px';
        btn.style.background = '#ff0000';
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> <span id="cart-count" style="font-size: 12px; font-weight: bold;">${cart.length}</span>`;
        document.body.appendChild(btn);
    } else {
        document.getElementById('cart-count').innerText = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', updateCartUI);
