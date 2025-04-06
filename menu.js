document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuContainer = document.querySelector('.menu-items');
    const cart = []; // Array to store cart items

    // 1. Category Filtering Functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            const selectedCategory = this.dataset.category;
            
            
            menuItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'flex'; // Show item
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });
    });

    // 2. Add to Cart Functionality
    menuContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const menuItem = e.target.closest('.menu-item');
            const itemId = Date.now(); // Unique ID (replace with real IDs if available)
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
            const itemImage = menuItem.querySelector('img').src;
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === itemName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }
            
            // Visual feedback
            const button = e.target;
            button.textContent = 'Added!';
            button.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1500);
            
            // For debugging 
            console.log('Current Cart:', cart);
            updateCartCount();
        }
    });

    // 3. Update Cart Count Display 
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // 4. Initialize Menu - Show all items by default
    const allButton = document.querySelector('.category-btn[data-category="all"]');
    if (allButton) allButton.click();
});