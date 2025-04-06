document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuContainer = document.querySelector('.menu-items');
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMsg = document.querySelector('.empty-cart-message');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Cart Data
    let cart = JSON.parse(localStorage.getItem('primeDoughCart')) || [];
    const TAX_RATE = 0.10; 

    // Initialize
    updateCartDisplay();
    setupCategoryFilters();
    loadMenuItems();

    // Event Delegation
    menuContainer.addEventListener('click', handleMenuClick);
    cartItemsContainer.addEventListener('click', handleCartClick);
    checkoutBtn.addEventListener('click', showCheckoutModal);
    closeModal.addEventListener('click', hideCheckoutModal);
    window.addEventListener('click', outsideModalClick);

    // Functions
    function loadMenuItems() {
        
        console.log('Menu items loaded from HTML');
    }

    function handleMenuClick(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const menuItem = e.target.closest('.menu-item');
            addToCart(menuItem, e); 
        }
    }

    function handleCartClick(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.dataset.id;
            removeFromCart(itemId);
        } 
        else if (e.target.classList.contains('quantity-btn')) {
            const itemId = e.target.dataset.id;
            const isIncrease = e.target.classList.contains('plus');
            updateQuantity(itemId, isIncrease);
        }
    }

    function addToCart(menuItem, event) { 
        const id = menuItem.dataset.id;
        const name = menuItem.querySelector('h3').textContent;
        const price = parseFloat(menuItem.dataset.price);
        const image = menuItem.querySelector('img').src;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }

        
        const button = event.target;
        button.textContent = 'Added!';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
        }, 1000);

        saveCart();
        updateCartDisplay();
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        updateCartDisplay();
    }

    function updateQuantity(itemId, isIncrease) {
        const item = cart.find(item => item.id === itemId);
        
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== itemId);
            }
        }
        
        saveCart();
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            checkoutBtn.disabled = true;
        } else {
            emptyCartMsg.style.display = 'none';
            checkoutBtn.disabled = false;
            
            cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }

        updateTotals();
        updateCartCount();
    }

    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    function saveCart() {
        localStorage.setItem('primeDoughCart', JSON.stringify(cart));
    }

    function setupCategoryFilters() {
        const menuItems = document.querySelectorAll('.menu-item');

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                
                const category = this.dataset.category;
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    function showCheckoutModal() {
        checkoutModal.style.display = 'block';
        renderCheckoutForm();
    }

    function hideCheckoutModal() {
        checkoutModal.style.display = 'none';
    }

    function outsideModalClick(e) {
        if (e.target === checkoutModal) {
            hideCheckoutModal();
        }
    }

    function renderCheckoutForm() {
        const form = document.getElementById('checkout-form');
        form.innerHTML = `
            <div class="form-group">
                <label for="checkout-name">Full Name*</label>
                <input type="text" id="checkout-name" required>
            </div>
            <div class="form-group">
                <label for="checkout-email">Email*</label>
                <input type="email" id="checkout-email" required>
            </div>
            <div class="form-group">
                <label for="checkout-phone">Phone Number*</label>
                <input type="tel" id="checkout-phone" required>
            </div>
            <div class="form-group">
                <label for="checkout-address">Delivery Address*</label>
                <textarea id="checkout-address" required></textarea>
            </div>
            <div class="form-group">
                <label for="checkout-notes">Special Instructions</label>
                <textarea id="checkout-notes"></textarea>
            </div>
            <button type="submit" class="btn-primary">Place Order</button>
        `;

        form.onsubmit = function(e) {
            e.preventDefault();
            processOrder();
        };
    }

    function processOrder() {
        
        const orderData = {
            customer: {
                name: document.getElementById('checkout-name').value,
                email: document.getElementById('checkout-email').value,
                phone: document.getElementById('checkout-phone').value,
                address: document.getElementById('checkout-address').value
            },
            items: cart,
            notes: document.getElementById('checkout-notes').value,
            subtotal: parseFloat(subtotalEl.textContent.slice(1)),
            tax: parseFloat(taxEl.textContent.slice(1)),
            total: parseFloat(totalEl.textContent.slice(1)),
            date: new Date().toISOString()
        };

        console.log('Order submitted:', orderData);
        
        
        alert(`Order confirmed! Total: $${orderData.total.toFixed(2)}`);
        
        
        cart = [];
        saveCart();
        updateCartDisplay();
        hideCheckoutModal();
    }
});