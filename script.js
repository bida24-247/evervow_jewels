// script.js
class CartSystem {
  static KEY = 'evervow-cart';
  
  static init() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify([]));
    }
    this.updateCartUI();
    this.updateCartPage();
  }

  static getItems() {
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  }

  static addItem(name, price, image = '') {
    const items = this.getItems();
    items.push({ name, price: parseFloat(price), image });
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateCartUI();
    this.updateCartPage();
    this.showNotification(`${name} added to cart`);
  }

  static removeItem(index) {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateCartUI();
    this.updateCartPage();
  }

  static clearCart() {
    localStorage.setItem(this.KEY, JSON.stringify([]));
    this.updateCartUI();
    this.updateCartPage();
  }

  static updateCartUI() {
    const items = this.getItems();
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    // Update cart count everywhere
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = items.length;
    });
    
    // Update cart preview if it exists
    const cartPreview = document.getElementById('cart-preview');
    if (cartPreview) {
      const cartItemsEl = document.getElementById('cart-items-preview') || 
                         document.getElementById('cart-items');
      const emptyMessage = document.getElementById('empty-cart-message');
      const cartTotals = document.getElementById('cart-totals');
      const checkoutBtn = document.querySelector('.view-cart-btn');
      
      if (items.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (cartTotals) cartTotals.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
      } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (cartTotals) cartTotals.style.display = 'block';
        if (checkoutBtn) checkoutBtn.style.display = 'block';
        
        if (cartItemsEl) {
          cartItemsEl.innerHTML = items.map((item, index) => `
            <div class="cart-item">
              <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}">
              <div>
                <h6>${item.name}</h6>
                <small>P${item.price.toFixed(2)}</small>
              </div>
              <button class="remove-item" data-index="${index}">
                &times;
              </button>
            </div>
          `).join('');
        }
        
        if (document.getElementById('cart-total-amount')) {
          document.getElementById('cart-total-amount').textContent = `P${total.toFixed(2)}`;
        }
      }
    }
  }

  static updateCartPage() {
    // Only run on the cart page
    if (!document.getElementById('cart-section')) return;
    
    const items = this.getItems();
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (items.length === 0) {
      cartItemsEl.innerHTML = '<li>Your cart is empty</li>';
      if (cartTotalEl) cartTotalEl.textContent = `Total: P0.00`;
    } else {
      cartItemsEl.innerHTML = items.map((item, index) => `
        <li class="cart-item">
          <span>${item.name}</span>
          <span>P${item.price.toFixed(2)}</span>
          <button class="remove-item" data-index="${index}">Remove</button>
        </li>
      `).join('');
      if (cartTotalEl) cartTotalEl.textContent = `Total: P${total.toFixed(2)}`;
    }
  }

  static showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <span>✓ ${message}</span>
      <a href="cart.html">View Cart</a>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  CartSystem.init();
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product');
      const imgSrc = productCard.querySelector('img').src;
      CartSystem.addItem(
        btn.dataset.name, 
        btn.dataset.price,
        imgSrc
      );
    });
  });
  
  // Remove item buttons (works for both preview and cart page)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      CartSystem.removeItem(parseInt(e.target.dataset.index));
    }
  });
  
  // Toggle cart preview
  document.getElementById('cart-icon')?.addEventListener('click', () => {
    document.getElementById('cart-preview').classList.toggle('open');
  });
  
  // Close cart button
  document.querySelector('.close-cart')?.addEventListener('click', () => {
    document.getElementById('cart-preview').classList.remove('open');
  });
  
  // Clear cart button
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    CartSystem.clearCart();
  });
  
  // Category switching functionality (shop page only)
  const tabs = document.querySelectorAll('.category-tab');
  const sections = document.querySelectorAll('.category-section');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      this.classList.add('active');
      const categoryId = this.getAttribute('data-category');
      document.getElementById(categoryId).classList.add('active');
    });
  });
  
  // Populate "All Products" section with all products
  const allProductsSection = document.querySelector('#all .product-list');
  if (allProductsSection) {
    document.querySelectorAll('.category-section:not(#all) .product').forEach(product => {
      allProductsSection.appendChild(product.cloneNode(true));
    });
  }
});