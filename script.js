// Initialize cart if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, price, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    updateCart();
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function updateCart() {
    // Update cart count in navigation
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
    
    // If on cart page, update the cart display
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
}

function renderCartItems() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p>Your cart is empty</p>';
        cartTotalEl.textContent = '$0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                <p>$${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
    });
    
    cartItemsEl.innerHTML = html;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', updateCart);// main.js - Works in ALL browsers
document.addEventListener('DOMContentLoaded', function() {
  // Shared functionality (e.g., mobile menu)
  console.log('Loaded!');
});// cart.js - Edge-compatible
function loadCart() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var cartItems = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < cart.length; i++) {
    html += `
      <div class="cart-item">
        <h3>${cart[i].name}</h3>
        <p>Price: $${cart[i].price}</p>
      </div>
    `;
  }
  cartItems.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCart);// Shared functionality
console.log("Main JS loaded");// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const item = {
                id: product.dataset.id,
                name: product.dataset.name,
                price: parseFloat(product.dataset.price)
            };
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
        });
    });
    
    // Display cart items
    if (document.getElementById('cart-items')) {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        let total = 0;
        cart.forEach(item => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
            total += item.price;
        });
        
        cartTotal.textContent = total.toFixed(2);
    }
});
