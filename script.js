// Application State
const state = {
    category: null,
    pattern: null,
    color: null,
    width: 0,
    height: 0,
    quantity: 1,
    totalPrice: 0,
    depositAmount: 0,
    invoiceNumber: null,
    orderDate: null,
    cart: [], // Array to store multiple products in the order
    currentItemId: 0 // Counter for generating unique item IDs
};

// Texture Configuration Constants
const DEFAULT_MAX_ANISOTROPY = 16; // Default anisotropic filtering value for better texture quality
const TEXTURE_SCALE_MIN = 0.5; // Minimum texture scale to prevent over-tiling
const TEXTURE_SCALE_MAX = 2.0; // Maximum texture scale to prevent under-tiling

// Gemini API Configuration
// ⚠️ SECURITY WARNING: This API key is exposed in client-side code and should be moved to a secure backend
// In production, implement a backend API proxy that:
// 1. Stores the API key securely in environment variables
// 2. Validates and rate-limits client requests
// 3. Prevents unauthorized usage and quota exhaustion
// TODO: Move API calls to backend service before production deployment
const GEMINI_API_KEY = 'AIzaSyDLumkxN_6uKWwqJKs5QwOT8jP9sGCW0hQ';
// Using gemini-1.5-pro for higher output token limits to ensure complete design pattern analysis
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

// Product Data
const products = {
    'exterior-doors': {
        name: 'Exterior Doors',
        patterns: ['Classic Panel', 'Modern Flush', 'Glass Insert', 'Decorative Relief'],
        colors: ['White', 'Black', 'Bronze', 'Silver', 'Wood Grain'],
        basePrice: 350, // per square meter
        image: 'images/exterior-doors/exterior-doors.jpg',
        standardDimensions: [
            { width: 0.9, height: 2.1, label: 'Single Door (90cm × 210cm)' },
            { width: 1.0, height: 2.1, label: 'Wide Single Door (100cm × 210cm)' },
            { width: 1.8, height: 2.1, label: 'Double Door (180cm × 210cm)' },
            { width: 2.0, height: 2.4, label: 'Large Double Door (200cm × 240cm)' }
        ]
    },
    'interior-doors': {
        name: 'Interior Doors',
        patterns: ['Plain Flush', 'Panel Design', 'Glass Panel', 'Louvered'],
        colors: ['White', 'Ivory', 'Gray', 'Oak', 'Walnut'],
        basePrice: 250, // per square meter
        image: 'images/interior-doors/interior-doors.jpg',
        standardDimensions: [
            { width: 0.8, height: 2.0, label: 'Standard (80cm × 200cm)' },
            { width: 0.9, height: 2.0, label: 'Wide Standard (90cm × 200cm)' },
            { width: 0.7, height: 2.0, label: 'Narrow (70cm × 200cm)' },
            { width: 1.6, height: 2.0, label: 'Double (160cm × 200cm)' }
        ]
    },
    'exterior-fences': {
        name: 'Exterior Fences',
        patterns: ['Vertical Bars', 'Horizontal Slats', 'Lattice', 'Privacy Panel'],
        colors: ['Black', 'White', 'Green', 'Bronze', 'Charcoal'],
        basePrice: 180, // per square meter
        image: 'images/exterior-fences/exterior-fences.jpg',
        standardDimensions: [
            { width: 2.0, height: 1.5, label: 'Low Panel (2m × 1.5m)' },
            { width: 2.0, height: 1.8, label: 'Standard Panel (2m × 1.8m)' },
            { width: 2.5, height: 2.0, label: 'High Panel (2.5m × 2m)' },
            { width: 3.0, height: 2.0, label: 'Wide Panel (3m × 2m)' }
        ]
    },
    'interior-fences': {
        name: 'Interior Fences',
        patterns: ['Modern Rails', 'Glass Partition', 'Mesh Design', 'Decorative Screen'],
        colors: ['Silver', 'White', 'Black', 'Gold', 'Bronze'],
        basePrice: 150, // per square meter
        image: 'images/interior-fences/interior-fences.jpg',
        standardDimensions: [
            { width: 1.5, height: 1.0, label: 'Low Partition (1.5m × 1m)' },
            { width: 2.0, height: 1.2, label: 'Standard Partition (2m × 1.2m)' },
            { width: 2.5, height: 1.5, label: 'Tall Partition (2.5m × 1.5m)' },
            { width: 3.0, height: 2.0, label: 'Full Height (3m × 2m)' }
        ]
    },
    'window-protections': {
        name: 'Window Protections',
        patterns: ['Standard Grid', 'Decorative Scroll', 'Security Bars', 'Mesh Screen'],
        colors: ['White', 'Black', 'Bronze', 'Silver', 'Brown'],
        basePrice: 120, // per square meter
        image: 'images/window-protections/window-protections.jpg',
        standardDimensions: [
            { width: 1.0, height: 1.2, label: 'Small Window (1m × 1.2m)' },
            { width: 1.5, height: 1.5, label: 'Standard Window (1.5m × 1.5m)' },
            { width: 2.0, height: 1.5, label: 'Wide Window (2m × 1.5m)' },
            { width: 2.5, height: 2.0, label: 'Large Window (2.5m × 2m)' }
        ]
    },
    'handrail': {
        name: 'Handrail',
        patterns: ['Round Rail', 'Square Rail', 'Ornamental', 'Cable Rail'],
        colors: ['Brushed Steel', 'Black', 'Bronze', 'Chrome', 'Wood Finish'],
        basePrice: 200, // per linear meter (we'll calculate as if it's square meters for simplicity)
        image: 'images/handrail/handrail.jpg',
        standardDimensions: [
            { width: 1.0, height: 1.0, label: 'Short (1m length)' },
            { width: 2.0, height: 1.0, label: 'Standard (2m length)' },
            { width: 3.0, height: 1.0, label: 'Long (3m length)' },
            { width: 5.0, height: 1.0, label: 'Extra Long (5m length)' }
        ]
    }
};

const colorHex = {
    'White': '#FFFFFF',
    'Black': '#000000',
    'Bronze': '#CD7F32',
    'Silver': '#C0C0C0',
    'Wood Grain': '#8B4513',
    'Ivory': '#FFFFF0',
    'Gray': '#808080',
    'Oak': '#D2691E',
    'Walnut': '#5C4033',
    'Green': '#228B22',
    'Charcoal': '#36454F',
    'Gold': '#FFD700',
    'Brown': '#A52A2A',
    'Brushed Steel': '#ADB5BD',
    'Chrome': '#E5E4E2',
    'Wood Finish': '#A0522D'
};

// Pattern images for different categories
const patternImages = {
    'exterior-doors': {
        'Classic Panel': 'images/exterior-doors/exterior-doors-classic-panel.jpg',
        'Modern Flush': 'images/exterior-doors/exterior-doors-modern-flush.jpg',
        'Glass Insert': 'images/exterior-doors/exterior-doors-glass-insert.jpg',
        'Decorative Relief': 'images/exterior-doors/exterior-doors-decorative-relief.jpg'
    },
    'interior-doors': {
        'Plain Flush': 'images/interior-doors/interior-doors-plain-flush.jpg',
        'Panel Design': 'images/interior-doors/interior-doors-panel-design.jpg',
        'Glass Panel': 'images/interior-doors/interior-doors-glass-panel.jpg',
        'Louvered': 'images/interior-doors/interior-doors-louvered.jpg'
    },
    'exterior-fences': {
        'Vertical Bars': 'images/exterior-fences/exterior-fences-vertical-bars.jpg',
        'Horizontal Slats': 'images/exterior-fences/exterior-fences-horizontal-slats.jpg',
        'Lattice': 'images/exterior-fences/exterior-fences-lattice.jpg',
        'Privacy Panel': 'images/exterior-fences/exterior-fences-privacy-panel.jpg'
    },
    'interior-fences': {
        'Modern Rails': 'images/interior-fences/interior-fences-modern-rails.jpg',
        'Glass Partition': 'images/interior-fences/interior-fences-glass-partition.jpg',
        'Mesh Design': 'images/interior-fences/interior-fences-mesh-design.jpg',
        'Decorative Screen': 'images/interior-fences/interior-fences-decorative-screen.jpg'
    },
    'window-protections': {
        'Standard Grid': 'images/window-protections/window-protections-standard-grid.jpg',
        'Decorative Scroll': 'images/window-protections/window-protections-decorative-scroll.jpg',
        'Security Bars': 'images/window-protections/window-protections-security-bars.jpg',
        'Mesh Screen': 'images/window-protections/window-protections-mesh-screen.jpg'
    },
    'handrail': {
        'Round Rail': 'images/handrail/handrail-round-rail.jpg',
        'Square Rail': 'images/handrail/handrail-square-rail.jpg',
        'Ornamental': 'images/handrail/handrail-ornamental.jpg',
        'Cable Rail': 'images/handrail/handrail-cable-rail.jpg'
    }
};

// Initialize the application
function init() {
    // Add event listeners to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            selectCategory(this.dataset.category);
        });
    });

    // Note: Next button is hidden via CSS for auto-navigation
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = true;
    }
}

// Navigation Functions
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show the requested step
    // Mapping: 1->step1, 2->step2, 3->step3, 4->step4 (cart), 5->step5, 6->step6, 7->step7, 8->step8
    const stepId = `step${stepNumber}`;
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
        stepElement.classList.remove('hidden');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Step 1: Category Selection
function selectCategory(categoryId) {
    state.category = categoryId;
    
    // Update UI
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-category="${categoryId}"]`).classList.add('selected');
    
    // Load patterns for this category
    loadPatterns(categoryId);
    
    // Move to next step
    setTimeout(() => goToStep(2), 300);
}

// Step 2: Pattern Selection
function loadPatterns(categoryId) {
    const product = products[categoryId];
    document.getElementById('selected-category').textContent = product.name;
    
    const patternContainer = document.getElementById('pattern-container');
    patternContainer.innerHTML = '';
    
    product.patterns.forEach(pattern => {
        const patternCard = document.createElement('div');
        patternCard.className = 'pattern-card';
        const patternImage = patternImages[categoryId][pattern] || product.image;
        patternCard.innerHTML = `
            <img src="${patternImage}" alt="${pattern}" class="pattern-image">
            <h3>${pattern}</h3>
            <p>Premium ${pattern.toLowerCase()} design</p>
        `;
        patternCard.addEventListener('click', () => selectPattern(pattern, patternCard));
        patternContainer.appendChild(patternCard);
    });
}

function selectPattern(pattern, element) {
    state.pattern = pattern;
    
    // Update UI
    document.querySelectorAll('.pattern-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Auto-navigate to next step after selection
    setTimeout(() => goToStep(3), 300);
}

// Step 3: Color and Dimensions Selection
function loadColors() {
    const product = products[state.category];
    document.getElementById('selected-pattern').textContent = state.pattern;
    
    const colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = '';
    
    product.colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.innerHTML = `
            <div class="color-swatch" style="background-color: ${colorHex[color]}; border: 3px solid #ddd;"></div>
            <h3>${color}</h3>
        `;
        colorCard.addEventListener('click', () => selectColor(color, colorCard));
        colorContainer.appendChild(colorCard);
    });
    
    // Load standard dimensions
    loadStandardDimensions();
    
    // Disable add to cart button initially
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = true;
    }
}

function loadStandardDimensions() {
    const product = products[state.category];
    const dimensionContainer = document.getElementById('dimension-container');
    dimensionContainer.innerHTML = '';
    
    product.standardDimensions.forEach(dim => {
        const dimCard = document.createElement('div');
        dimCard.className = 'dimension-card';
        dimCard.innerHTML = `
            <h3>${dim.label}</h3>
            <p>${dim.width}m × ${dim.height}m</p>
        `;
        dimCard.addEventListener('click', () => selectStandardDimension(dim, dimCard));
        dimensionContainer.appendChild(dimCard);
    });
}

function selectStandardDimension(dimension, element) {
    // Clear custom inputs
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    
    // Store dimensions in state
    state.width = dimension.width;
    state.height = dimension.height;
    
    // Update UI
    document.querySelectorAll('.dimension-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Enable next button if color is also selected
    checkIfReadyToCalculate();
}

function selectColor(color, element) {
    state.color = color;
    
    // Update UI
    document.querySelectorAll('.color-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Enable next button if dimensions are also selected
    checkIfReadyToCalculate();
}

function checkIfReadyToCalculate() {
    // Check if color is selected
    const colorSelected = state.color !== null;
    
    // Check if dimensions are selected (either standard or custom)
    const customWidth = parseFloat(document.getElementById('width').value);
    const customHeight = parseFloat(document.getElementById('height').value);
    const dimensionsSelected = (state.width > 0 && state.height > 0) || (!isNaN(customWidth) && customWidth > 0 && !isNaN(customHeight) && customHeight > 0);
    
    // Enable button if both are selected
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = !(colorSelected && dimensionsSelected);
    }
}

// Add event listeners for custom dimension inputs
document.addEventListener('DOMContentLoaded', () => {
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    
    if (widthInput && heightInput) {
        const handleCustomDimensionInput = () => {
            // Clear standard dimension selection
            document.querySelectorAll('.dimension-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Reset state dimensions to 0 when switching to custom
            state.width = 0;
            state.height = 0;
            
            // Update state with valid custom values
            const width = parseFloat(widthInput.value);
            const height = parseFloat(heightInput.value);
            
            if (!isNaN(width) && width > 0) {
                state.width = width;
            }
            if (!isNaN(height) && height > 0) {
                state.height = height;
            }
            
            checkIfReadyToCalculate();
        };
        
        widthInput.addEventListener('input', handleCustomDimensionInput);
        heightInput.addEventListener('input', handleCustomDimensionInput);
    }
});

// Step 3: Add item to cart
function addToCart() {
    // In the new 3D design system, get dimensions from designState
    // Convert from cm to meters for consistency with old system
    const width = designState.horizontalScale / 100; // cm to meters
    const height = designState.verticalScale / 100; // cm to meters
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0 || isNaN(quantity) || quantity < 1) {
        alert('Please configure dimensions and quantity');
        return;
    }
    
    if (!state.category || !state.pattern) {
        alert('Please select category and pattern');
        return;
    }
    
    // Create cart item
    const product = products[state.category];
    const area = width * height;
    const itemPrice = area * product.basePrice * quantity;
    
    // Get the color from designState (convert to color name for cart display)
    const colorName = `Custom (${designState.currentColor})`;
    
    const cartItem = {
        id: ++state.currentItemId,
        category: state.category,
        categoryName: product.name,
        pattern: state.pattern,
        color: colorName,
        width: width,
        height: height,
        thickness: designState.thickness,
        quantity: quantity,
        area: area,
        basePrice: product.basePrice,
        itemPrice: itemPrice,
        dimensionType: '3D Custom'
    };
    
    // Add to cart
    state.cart.push(cartItem);
    
    // Show success message
    alert(`Item added to cart! You now have ${state.cart.length} item(s) in your cart.`);
    
    // Go to cart review
    goToStep(4);
    displayCart();
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-items-container');
    
    if (state.cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Your cart is empty. Add some products!</p>';
        document.getElementById('cart-summary').innerHTML = '';
        return;
    }
    
    let cartHTML = '<div class="cart-items">';
    
    state.cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-details">
                    <h3>${item.categoryName}</h3>
                    <p><strong>Pattern:</strong> ${item.pattern}</p>
                    <p><strong>Color:</strong> ${item.color}</p>
                    <p><strong>Dimensions:</strong> ${item.width}m × ${item.height}m (${item.dimensionType})</p>
                    <p><strong>Area:</strong> ${item.area.toFixed(2)} m²</p>
                    <p><strong>Quantity:</strong> ${item.quantity} units</p>
                    <p><strong>Price:</strong> $${item.itemPrice.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    cartContainer.innerHTML = cartHTML;
    
    // Calculate totals
    updateCartSummary();
}

// Update cart summary totals
function updateCartSummary() {
    let subtotal = 0;
    state.cart.forEach(item => {
        subtotal += item.itemPrice;
    });
    
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    state.totalPrice = total;
    state.depositAmount = total * 0.05;
    
    const summaryHTML = `
        <div class="cart-summary-content">
            <h3>Order Totals</h3>
            <div class="price-item">
                <span><strong>Subtotal:</strong></span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="price-item">
                <span><strong>Tax (15%):</strong></span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="price-item total">
                <span>TOTAL:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="price-item" style="color: #667eea;">
                <span><strong>Required Deposit (5%):</strong></span>
                <span><strong>$${state.depositAmount.toFixed(2)}</strong></span>
            </div>
        </div>
    `;
    
    document.getElementById('cart-summary').innerHTML = summaryHTML;
}

// Remove item from cart
function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    displayCart();
    
    if (state.cart.length === 0) {
        alert('Your cart is now empty. Add some products!');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (state.cart.length === 0) {
        alert('Your cart is empty. Please add some products first.');
        return;
    }
    
    displayPriceSummary();
    goToStep(5);
}

// Step 4: Price Calculation (kept for backward compatibility, now uses cart)
function calculatePrice() {
    addToCart();
}

function displayPriceSummary() {
    if (state.cart.length === 0) {
        document.getElementById('price-summary').innerHTML = '<p>No items in cart</p>';
        return;
    }
    
    let summaryHTML = '<h3 style="margin-bottom: 20px;">Order Items</h3>';
    
    // Display each item
    state.cart.forEach((item, index) => {
        summaryHTML += `
            <div class="summary-item" style="margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <h4 style="color: #667eea; margin-bottom: 10px;">Item ${index + 1}: ${item.categoryName}</h4>
                <div class="price-item">
                    <span><strong>Pattern:</strong></span>
                    <span>${item.pattern}</span>
                </div>
                <div class="price-item">
                    <span><strong>Color:</strong></span>
                    <span>${item.color}</span>
                </div>
                <div class="price-item">
                    <span><strong>Dimensions:</strong></span>
                    <span>${item.width}m × ${item.height}m (${item.dimensionType})</span>
                </div>
                <div class="price-item">
                    <span><strong>Area per unit:</strong></span>
                    <span>${item.area.toFixed(2)} m²</span>
                </div>
                <div class="price-item">
                    <span><strong>Quantity:</strong></span>
                    <span>${item.quantity} units</span>
                </div>
                <div class="price-item">
                    <span><strong>Base Price:</strong></span>
                    <span>$${item.basePrice}/m²</span>
                </div>
                <div class="price-item">
                    <span><strong>Item Total:</strong></span>
                    <span><strong>$${item.itemPrice.toFixed(2)}</strong></span>
                </div>
            </div>
        `;
    });
    
    // Calculate overall totals
    let subtotal = 0;
    state.cart.forEach(item => {
        subtotal += item.itemPrice;
    });
    
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    state.totalPrice = total;
    state.depositAmount = total * 0.05;
    
    summaryHTML += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 3px solid #667eea;">
            <h3 style="margin-bottom: 20px;">Order Summary</h3>
            <div class="price-item">
                <span><strong>Subtotal:</strong></span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="price-item">
                <span><strong>Tax (15%):</strong></span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="price-item total">
                <span>TOTAL:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="price-item" style="color: #667eea;">
                <span><strong>Required Deposit (5%):</strong></span>
                <span><strong>$${state.depositAmount.toFixed(2)}</strong></span>
            </div>
        </div>
    `;
    
    document.getElementById('price-summary').innerHTML = summaryHTML;
}

// Step 6: Generate Invoice
function generateInvoice() {
    // Generate invoice number and date
    state.invoiceNumber = 'INV-' + Date.now();
    state.orderDate = new Date().toLocaleDateString();
    
    // Calculate totals from cart
    let subtotal = 0;
    state.cart.forEach(item => {
        subtotal += item.itemPrice;
    });
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    // Update state totals
    state.totalPrice = total;
    state.depositAmount = total * 0.05;
    
    let invoiceHTML = `
        <div class="invoice-header">
            <h3>INVOICE</h3>
            <p>Aluminum Construction Products</p>
            <p>123 Industrial Avenue, Construction City, CC 12345</p>
            <p>Phone: (555) 123-4567 | Email: info@aluminumcp.com</p>
        </div>
        
        <div class="invoice-details">
            <div class="invoice-details-row">
                <strong>Invoice Number:</strong> <span>${state.invoiceNumber}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Date:</strong> <span>${state.orderDate}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Due Date:</strong> <span>${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</span>
            </div>
        </div>
        
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Specifications</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add each cart item
    state.cart.forEach(item => {
        invoiceHTML += `
                <tr>
                    <td><strong>${item.categoryName}</strong><br>Pattern: ${item.pattern}<br>Color: ${item.color}</td>
                    <td>${item.width}m × ${item.height}m<br>(${item.area.toFixed(2)} m²)</td>
                    <td>${item.quantity}</td>
                    <td>$${item.basePrice}/m²</td>
                    <td>$${item.itemPrice.toFixed(2)}</td>
                </tr>
        `;
    });
    
    invoiceHTML += `
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Subtotal:</strong></td>
                    <td><strong>$${subtotal.toFixed(2)}</strong></td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Tax (15%):</strong></td>
                    <td><strong>$${tax.toFixed(2)}</strong></td>
                </tr>
                <tr style="background: #f0f4ff;">
                    <td colspan="4" style="text-align: right;"><strong>TOTAL:</strong></td>
                    <td><strong>$${total.toFixed(2)}</strong></td>
                </tr>
                <tr style="background: #fff3cd;">
                    <td colspan="4" style="text-align: right;"><strong>Deposit Required (5%):</strong></td>
                    <td><strong>$${state.depositAmount.toFixed(2)}</strong></td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Balance Due:</strong></td>
                    <td><strong>$${(total - state.depositAmount).toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div class="terms-conditions">
            <h4>Terms & Conditions</h4>
            <ul>
                <li><strong>Payment Terms:</strong> A 5% deposit is required to process your order. The remaining balance is due upon delivery.</li>
                <li><strong>Delivery:</strong> Products will be delivered within 4-6 weeks from the date of deposit payment.</li>
                <li><strong>Installation:</strong> Professional installation services are available at an additional cost.</li>
                <li><strong>Warranty:</strong> All products come with a 10-year manufacturer's warranty against defects.</li>
                <li><strong>Cancellation:</strong> Orders can be cancelled within 48 hours of deposit payment for a full refund. After 48 hours, a 20% restocking fee applies.</li>
                <li><strong>Returns:</strong> Custom-made products are non-returnable unless defective.</li>
                <li><strong>Payment Methods:</strong> We accept credit cards, debit cards, bank transfers, and certified checks.</li>
            </ul>
            
            <h4 style="margin-top: 20px;">Payment Details</h4>
            <ul>
                <li><strong>Bank Name:</strong> Construction Bank</li>
                <li><strong>Account Name:</strong> Aluminum Construction Products Ltd.</li>
                <li><strong>Account Number:</strong> 123-456-789</li>
                <li><strong>Routing Number:</strong> 987654321</li>
                <li><strong>SWIFT Code:</strong> CONBANKXXX</li>
            </ul>
            <p style="margin-top: 15px; font-size: 0.9em; color: #666;"><em>Note: These are placeholder banking details for demonstration purposes only.</em></p>
        </div>
    `;
    
    document.getElementById('invoice-container').innerHTML = invoiceHTML;
}

// Step 7: Payment
function setupPayment() {
    const paymentInfoHTML = `
        <h3>Deposit Payment Required</h3>
        <div style="display: flex; justify-content: space-between; margin-top: 15px;">
            <div>
                <p><strong>Invoice Number:</strong> ${state.invoiceNumber}</p>
                <p><strong>Total Amount:</strong> $${state.totalPrice.toFixed(2)}</p>
            </div>
            <div>
                <p style="font-size: 1.5em; color: #856404;"><strong>Deposit Amount: $${state.depositAmount.toFixed(2)}</strong></p>
            </div>
        </div>
    `;
    
    document.getElementById('payment-info').innerHTML = paymentInfoHTML;
}

function processPayment() {
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!cardName || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all payment details');
        return;
    }
    
    // Simulate payment processing (DEMO ONLY - Not a real payment gateway)
    alert('Processing payment... (This is a demonstration - no real payment is processed)');
    
    setTimeout(() => {
        alert('Payment successful! Generating debit note...');
        generateDebitNote();
        goToStep(8);
    }, 1500);
}

// Step 8: Debit Note
function generateDebitNote() {
    const paymentDate = new Date().toLocaleDateString();
    const transactionId = 'TXN-' + Date.now();
    
    const debitNoteHTML = `
        <div class="success-message">
            ✓ Payment Successfully Processed
        </div>
        
        <div class="invoice-header">
            <h3>DEBIT NOTE</h3>
            <p>Aluminum Construction Products</p>
            <p>123 Industrial Avenue, Construction City, CC 12345</p>
        </div>
        
        <div class="invoice-details">
            <div class="invoice-details-row">
                <strong>Debit Note Number:</strong> <span>DN-${Date.now()}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Invoice Number:</strong> <span>${state.invoiceNumber}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Transaction ID:</strong> <span>${transactionId}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Payment Date:</strong> <span>${paymentDate}</span>
            </div>
            <div class="invoice-details-row">
                <strong>Payment Method:</strong> <span>Credit Card</span>
            </div>
        </div>
        
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Order Total</td>
                    <td>$${state.totalPrice.toFixed(2)}</td>
                </tr>
                <tr style="background: #d4edda;">
                    <td><strong>Deposit Paid (5%)</strong></td>
                    <td><strong>$${state.depositAmount.toFixed(2)}</strong></td>
                </tr>
                <tr style="background: #fff3cd;">
                    <td><strong>Outstanding Balance</strong></td>
                    <td><strong>$${(state.totalPrice - state.depositAmount).toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div class="terms-conditions">
            <h4>Important Information</h4>
            <ul>
                <li>Your deposit of $${state.depositAmount.toFixed(2)} has been successfully processed.</li>
                <li>The outstanding balance of $${(state.totalPrice - state.depositAmount).toFixed(2)} is due upon delivery.</li>
                <li>We will contact you to schedule delivery within 4-6 weeks.</li>
                <li>Please keep this debit note for your records.</li>
                <li>For any questions, please contact us at (555) 123-4567 or info@aluminumcp.com</li>
            </ul>
            
            <p style="margin-top: 20px; text-align: center; font-weight: bold; color: #667eea;">
                Thank you for your business!
            </p>
        </div>
    `;
    
    document.getElementById('debit-note-container').innerHTML = debitNoteHTML;
}

function downloadDebitNote() {
    alert('Debit note would be downloaded as PDF in a production environment.');
    // In a real application, you would generate and download a PDF here
}

// ========================================
// 3D Design System
// ========================================

// Pattern Database - Mock database with pattern information
const patternDatabase = {
    'exterior-doors': [
        { id: 1, name: 'Classic Panel', image_url: 'images/exterior-doors/exterior-doors-classic-panel.jpg', aspect_ratio: 1.0 },
        { id: 2, name: 'Modern Flush', image_url: 'images/exterior-doors/exterior-doors-modern-flush.jpg', aspect_ratio: 1.0 },
        { id: 3, name: 'Glass Insert', image_url: 'images/exterior-doors/exterior-doors-glass-insert.jpg', aspect_ratio: 1.0 },
        { id: 4, name: 'Decorative Relief', image_url: 'images/exterior-doors/exterior-doors-decorative-relief.jpg', aspect_ratio: 1.0 }
    ],
    'interior-doors': [
        { id: 5, name: 'Plain Flush', image_url: 'images/interior-doors/interior-doors-plain-flush.jpg', aspect_ratio: 1.0 },
        { id: 6, name: 'Panel Design', image_url: 'images/interior-doors/interior-doors-panel-design.jpg', aspect_ratio: 1.0 },
        { id: 7, name: 'Glass Panel', image_url: 'images/interior-doors/interior-doors-glass-panel.jpg', aspect_ratio: 1.0 },
        { id: 8, name: 'Louvered', image_url: 'images/interior-doors/interior-doors-louvered.jpg', aspect_ratio: 1.0 }
    ],
    'exterior-fences': [
        { id: 9, name: 'Vertical Bars', image_url: 'images/exterior-fences/exterior-fences-vertical-bars.jpg', aspect_ratio: 1.33 },
        { id: 10, name: 'Horizontal Slats', image_url: 'images/exterior-fences/exterior-fences-horizontal-slats.jpg', aspect_ratio: 1.33 },
        { id: 11, name: 'Lattice', image_url: 'images/exterior-fences/exterior-fences-lattice.jpg', aspect_ratio: 1.33 },
        { id: 12, name: 'Privacy Panel', image_url: 'images/exterior-fences/exterior-fences-privacy-panel.jpg', aspect_ratio: 1.33 }
    ],
    'interior-fences': [
        { id: 13, name: 'Modern Rails', image_url: 'images/interior-fences/interior-fences-modern-rails.jpg', aspect_ratio: 1.5 },
        { id: 14, name: 'Glass Partition', image_url: 'images/interior-fences/interior-fences-glass-partition.jpg', aspect_ratio: 1.5 },
        { id: 15, name: 'Mesh Design', image_url: 'images/interior-fences/interior-fences-mesh-design.jpg', aspect_ratio: 1.5 },
        { id: 16, name: 'Decorative Screen', image_url: 'images/interior-fences/interior-fences-decorative-screen.jpg', aspect_ratio: 1.5 }
    ],
    'window-protections': [
        { id: 17, name: 'Standard Grid', image_url: 'images/window-protections/window-protections-standard-grid.jpg', aspect_ratio: 1.2 },
        { id: 18, name: 'Decorative Scroll', image_url: 'images/window-protections/window-protections-decorative-scroll.jpg', aspect_ratio: 1.2 },
        { id: 19, name: 'Security Bars', image_url: 'images/window-protections/window-protections-security-bars.jpg', aspect_ratio: 1.2 },
        { id: 20, name: 'Mesh Screen', image_url: 'images/window-protections/window-protections-mesh-screen.jpg', aspect_ratio: 1.2 }
    ],
    'handrail': [
        { id: 21, name: 'Round Rail', image_url: 'images/handrail/handrail-round-rail.jpg', aspect_ratio: 0.2 },
        { id: 22, name: 'Square Rail', image_url: 'images/handrail/handrail-square-rail.jpg', aspect_ratio: 0.2 },
        { id: 23, name: 'Ornamental', image_url: 'images/handrail/handrail-ornamental.jpg', aspect_ratio: 0.2 },
        { id: 24, name: 'Cable Rail', image_url: 'images/handrail/handrail-cable-rail.jpg', aspect_ratio: 0.2 }
    ]
};

// Color preset database
const colorPresets = [
    { name: 'Walnut', hex: '#5C4033' },
    { name: 'Oak', hex: '#D2691E' },
    { name: 'Mahogany', hex: '#C04000' },
    { name: 'Cherry', hex: '#8B4513' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Bronze', hex: '#CD7F32' },
    { name: 'Silver', hex: '#C0C0C0' }
];

// Color detection constants
const COLOR_QUANTIZATION_STEP = 20; // Step size for color quantization in detection algorithm
const COLOR_MATCH_THRESHOLD = 60; // Distance threshold for matching pixels to dominant color

// 3D Design State
const designState = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    mesh: null,
    texture: null,
    originalTexture: null, // Store original texture for color manipulation
    currentPattern: null,
    horizontalScale: 100,
    verticalScale: 200,
    thickness: 40,
    baseHorizontalScale: 100,
    baseVerticalScale: 200,
    lockAspectRatio: false,
    currentColor: '#8B4513',
    colorIntensity: 0.8,
    textureCache: {}
};

// Initialize 3D Design Interface when moving to Step 3
function init3DDesign() {
    const category = state.category;
    if (!category) return;
    
    // Update category display
    document.getElementById('selected-category-step3').textContent = products[category].name;
    
    // Load pattern thumbnails
    loadPatternThumbnails(category);
    
    // Setup color presets
    setupColorPresets();
    
    // Initialize Three.js scene
    initThreeJS();
    
    // Setup event listeners
    setup3DEventListeners();
    
    // Initialize AI analysis system
    initAIAnalysis();
}

// Load pattern thumbnails from database
function loadPatternThumbnails(category) {
    const container = document.getElementById('pattern-thumbnails');
    container.innerHTML = '<div class="pattern-loading">Loading patterns...</div>';
    
    // Simulate database fetch with timeout
    setTimeout(() => {
        const patterns = patternDatabase[category] || [];
        container.innerHTML = '';
        
        patterns.forEach((pattern, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'pattern-thumbnail';
            thumb.style.backgroundImage = `url('${pattern.image_url}')`;
            thumb.dataset.patternId = pattern.id;
            thumb.dataset.patternName = pattern.name;
            thumb.dataset.imageUrl = pattern.image_url;
            thumb.title = pattern.name;
            
            // Select first pattern by default
            if (index === 0) {
                thumb.classList.add('selected');
                loadPatternTexture(pattern);
                // Enable Add to Cart button since pattern is selected
                enableAddToCartButton();
            }
            
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.pattern-thumbnail').forEach(t => t.classList.remove('selected'));
                thumb.classList.add('selected');
                loadPatternTexture(pattern);
                // Enable Add to Cart button when pattern is clicked
                enableAddToCartButton();
            });
            
            container.appendChild(thumb);
        });
    }, 500);
}

// Enable Add to Cart button
function enableAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = false;
    }
}

// Setup color presets
function setupColorPresets() {
    const container = document.getElementById('color-presets');
    container.innerHTML = '';
    
    colorPresets.forEach(color => {
        const preset = document.createElement('div');
        preset.className = 'color-preset';
        preset.style.backgroundColor = color.hex;
        preset.title = color.name;
        preset.dataset.hex = color.hex;
        
        preset.addEventListener('click', () => {
            document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
            document.getElementById('color-picker').value = color.hex;
            document.getElementById('color-hex').value = color.hex;
            designState.currentColor = color.hex;
            applyColorToTexture();
        });
        
        container.appendChild(preset);
    });
}

// Initialize Three.js
function initThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Scene
    designState.scene = new THREE.Scene();
    designState.scene.background = new THREE.Color(0xffffff); // White background for better visibility
    
    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    designState.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    designState.camera.position.set(0, 0, 5);
    
    // Renderer
    designState.renderer = new THREE.WebGLRenderer({ antialias: true });
    designState.renderer.setSize(container.clientWidth, container.clientHeight);
    designState.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(designState.renderer.domElement);
    
    // Lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    hemisphereLight.position.set(0, 20, 0);
    designState.scene.add(hemisphereLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    designState.scene.add(directionalLight);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    designState.scene.add(ambientLight);
    
    // Create initial geometry (will be updated with texture)
    createProductGeometry();
    
    // OrbitControls
    if (THREE.OrbitControls) {
        designState.controls = new THREE.OrbitControls(designState.camera, designState.renderer.domElement);
        designState.controls.enableDamping = true;
        designState.controls.dampingFactor = 0.05;
        designState.controls.screenSpacePanning = false;
        designState.controls.minDistance = 2;
        designState.controls.maxDistance = 10;
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate3D();
}

// Create product geometry based on category
function createProductGeometry() {
    // Remove existing mesh
    if (designState.mesh) {
        designState.scene.remove(designState.mesh);
    }
    
    const category = state.category;
    let geometry;
    
    // Different geometry for different product types
    if (category === 'handrail') {
        // Handrail - horizontal bar
        geometry = new THREE.BoxGeometry(3, 0.1, 0.1);
    } else if (category.includes('fence')) {
        // Fences - wider panel
        geometry = new THREE.BoxGeometry(2, 1.5, 0.05);
    } else if (category === 'window-protections') {
        // Window protections - square-ish
        geometry = new THREE.BoxGeometry(1.5, 1.5, 0.05);
    } else {
        // Doors - tall rectangle
        geometry = new THREE.BoxGeometry(1, 2, 0.05);
    }
    
    // Material with texture
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.3
    });
    
    designState.mesh = new THREE.Mesh(geometry, material);
    designState.scene.add(designState.mesh);
}

// Load pattern texture
function loadPatternTexture(pattern) {
    designState.currentPattern = pattern;
    
    // Update pattern name display
    document.getElementById('pattern-name-display').textContent = pattern.name;
    
    // Check cache
    if (designState.textureCache[pattern.id]) {
        applyTexture(designState.textureCache[pattern.id]);
        return;
    }
    
    // Load new texture with CORS enabled for canvas manipulation
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
        pattern.image_url,
        (texture) => {
            // Cache texture
            designState.textureCache[pattern.id] = texture;
            applyTexture(texture);
        },
        undefined,
        (error) => {
            console.error('Error loading texture:', error);
            // Use fallback color if texture fails to load
            if (designState.mesh) {
                designState.mesh.material.map = null;
                designState.mesh.material.color.setHex(0x888888);
                designState.mesh.material.needsUpdate = true;
            }
        }
    );
}

// Apply texture to mesh
function applyTexture(texture) {
    if (!designState.mesh) return;
    
    // Set high-quality texture filtering
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    // Enable anisotropic filtering for better quality
    if (designState.renderer) {
        const maxAnisotropy = designState.renderer.capabilities.getMaxAnisotropy();
        texture.anisotropy = maxAnisotropy;
    }
    
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.generateMipmaps = true;
    
    // Apply scaling
    updateMeshScale();
    
    designState.mesh.material.map = texture;
    designState.mesh.material.needsUpdate = true;
    designState.texture = texture;
    
    // Store original texture for pattern textures (but don't reset if it's from uploaded image)
    if (!aiState.generated3DModel) {
        // Only reset for pattern selection, not for uploaded images
        designState.originalTexture = null;
    } else {
        // For uploaded images, clone and preserve the texture with same settings
        designState.originalTexture = texture.clone();
        designState.originalTexture.minFilter = THREE.LinearMipMapLinearFilter;
        designState.originalTexture.magFilter = THREE.LinearFilter;
        designState.originalTexture.anisotropy = texture.anisotropy;
        designState.originalTexture.needsUpdate = true;
    }
    
    // Apply current color
    applyColorToTexture();
}

// Update mesh scale based on dimension controls
function updateMeshScale() {
    if (!designState.mesh) return;
    
    const hScale = designState.horizontalScale / designState.baseHorizontalScale;
    const vScale = designState.verticalScale / designState.baseVerticalScale;
    
    // Scale the mesh geometry (door size) instead of texture
    designState.mesh.scale.x = hScale;
    designState.mesh.scale.y = vScale;
    
    if (designState.texture) {
        if (aiState.generated3DModel) {
            // For uploaded images: Smart scaling with pattern detection
            // Scale texture proportionally to maintain pattern quality
            // Use smaller repeat values for larger dimensions to maintain pattern detail
            const avgScale = (hScale + vScale) / 2;
            const textureScale = Math.max(TEXTURE_SCALE_MIN, Math.min(TEXTURE_SCALE_MAX, 1.0 / avgScale));
            designState.texture.repeat.set(textureScale, textureScale);
        } else {
            // For pattern textures: Keep at 1:1 repeat to preserve pattern proportions
            // This maintains the pattern's original dimensions while the door scales
            designState.texture.repeat.set(1, 1);
        }
        designState.texture.needsUpdate = true;
    }
}

// Detect dominant colors in texture and replace with selected color
function applyColorToTexture() {
    if (!designState.mesh || !designState.texture || !designState.texture.image) {
        // If no texture yet, just apply color directly
        if (designState.mesh) {
            const color = new THREE.Color(designState.currentColor);
            const intensity = designState.colorIntensity;
            const blendedColor = new THREE.Color(0xffffff).lerp(color, intensity);
            designState.mesh.material.color = blendedColor;
            designState.mesh.material.needsUpdate = true;
            setWhiteBackground();
        }
        return;
    }
    
    try {
        // Store original texture if not already stored
        if (!designState.originalTexture) {
            designState.originalTexture = designState.texture.clone();
            designState.originalTexture.needsUpdate = true;
        }
        
        // Create a canvas to manipulate the texture
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const img = designState.originalTexture.image;
        
        // Check if image is loaded
        if (!img.complete || img.naturalWidth === 0) {
            console.log('Image not ready, falling back to overlay method');
            throw new Error('Image not ready');
        }
        
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Detect dominant color (excluding very dark and very light colors)
        const colorMap = new Map();
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Skip transparent pixels
            if (a < 128) continue;
            
            // Skip very dark (likely text/borders) and very light colors (likely background)
            const brightness = (r + g + b) / 3;
            if (brightness < 30 || brightness > 240) continue;
            
            // Quantize colors to reduce variations
            const key = `${Math.floor(r / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP},${Math.floor(g / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP},${Math.floor(b / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
        
        // Find the most common color
        let dominantColor = null;
        let maxCount = 0;
        for (const [color, count] of colorMap) {
            if (count > maxCount) {
                maxCount = count;
                dominantColor = color.split(',').map(Number);
            }
        }
        
        // If no dominant color found, fallback to old behavior
        if (!dominantColor) {
            console.log('No dominant color found, falling back to overlay method');
            throw new Error('No dominant color found');
        }
        
        console.log('Dominant color detected:', dominantColor);
        
        // Get target color
        const targetColor = new THREE.Color(designState.currentColor);
        const targetR = Math.floor(targetColor.r * 255);
        const targetG = Math.floor(targetColor.g * 255);
        const targetB = Math.floor(targetColor.b * 255);
        
        // Replace dominant color with target color
        const intensity = designState.colorIntensity;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Skip transparent pixels
            if (a < 128) continue;
            
            // Check if this pixel is close to the dominant color
            const dr = Math.abs(r - dominantColor[0]);
            const dg = Math.abs(g - dominantColor[1]);
            const db = Math.abs(b - dominantColor[2]);
            const distance = Math.sqrt(dr * dr + dg * dg + db * db);
            
            // If close to dominant color, replace it with target color
            if (distance < COLOR_MATCH_THRESHOLD) {
                // Lerp between original and target based on intensity
                data[i] = Math.floor(r * (1 - intensity) + targetR * intensity);
                data[i + 1] = Math.floor(g * (1 - intensity) + targetG * intensity);
                data[i + 2] = Math.floor(b * (1 - intensity) + targetB * intensity);
            }
        }
        
        // Put modified image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Create new texture from modified canvas
        const newTexture = new THREE.CanvasTexture(canvas);
        newTexture.wrapS = THREE.RepeatWrapping;
        newTexture.wrapT = THREE.RepeatWrapping;
        // Keep texture at 1:1 repeat to preserve pattern proportions since mesh scaling handles dimensions
        newTexture.repeat.set(1, 1);
        newTexture.needsUpdate = true;
        
        // Apply new texture to mesh
        designState.mesh.material.map = newTexture;
        designState.mesh.material.color.setHex(0xffffff); // Reset to white so texture color shows
        designState.mesh.material.needsUpdate = true;
        designState.texture = newTexture;
        
        console.log('Color replacement successful');
        
        // Ensure background is white
        setWhiteBackground();
    } catch (error) {
        // Fallback to old overlay method if color detection fails
        console.log('Color detection failed, using overlay method:', error.message);
        const color = new THREE.Color(designState.currentColor);
        const intensity = designState.colorIntensity;
        const blendedColor = new THREE.Color(0xffffff).lerp(color, intensity);
        designState.mesh.material.color = blendedColor;
        designState.mesh.material.needsUpdate = true;
        setWhiteBackground();
    }
}

// Ensure 3D scene background is always white
function setWhiteBackground() {
    if (!designState.scene) return;
    
    // Always use white background as per requirements
    designState.scene.background = new THREE.Color(0xffffff);
}

// Animation loop
function animate3D() {
    requestAnimationFrame(animate3D);
    
    if (designState.controls) {
        designState.controls.update();
    }
    
    if (designState.renderer && designState.scene && designState.camera) {
        designState.renderer.render(designState.scene, designState.camera);
    }
}

// Window resize handler
function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container || !designState.camera || !designState.renderer) return;
    
    designState.camera.aspect = container.clientWidth / container.clientHeight;
    designState.camera.updateProjectionMatrix();
    designState.renderer.setSize(container.clientWidth, container.clientHeight);
}

// Setup 3D event listeners
function setup3DEventListeners() {
    // Horizontal scale
    const hScaleInput = document.getElementById('horizontal-scale');
    const hScaleSlider = document.getElementById('horizontal-scale-slider');
    const hPercentage = document.getElementById('horizontal-percentage');
    
    const updateHorizontalScale = (value) => {
        designState.horizontalScale = parseFloat(value);
        hScaleInput.value = value;
        hScaleSlider.value = value;
        const percent = ((value / designState.baseHorizontalScale) * 100).toFixed(0);
        hPercentage.textContent = `${percent}%`;
        updateMeshScale();
        
        if (designState.lockAspectRatio) {
            const ratio = designState.horizontalScale / designState.baseHorizontalScale;
            const newVertical = designState.baseVerticalScale * ratio;
            document.getElementById('vertical-scale').value = newVertical;
            document.getElementById('vertical-scale-slider').value = newVertical;
            designState.verticalScale = newVertical;
            const vPercent = ((newVertical / designState.baseVerticalScale) * 100).toFixed(0);
            document.getElementById('vertical-percentage').textContent = `${vPercent}%`;
        }
    };
    
    hScaleInput.addEventListener('input', (e) => updateHorizontalScale(e.target.value));
    hScaleSlider.addEventListener('input', (e) => updateHorizontalScale(e.target.value));
    
    // Vertical scale
    const vScaleInput = document.getElementById('vertical-scale');
    const vScaleSlider = document.getElementById('vertical-scale-slider');
    const vPercentage = document.getElementById('vertical-percentage');
    
    const updateVerticalScale = (value) => {
        designState.verticalScale = parseFloat(value);
        vScaleInput.value = value;
        vScaleSlider.value = value;
        const percent = ((value / designState.baseVerticalScale) * 100).toFixed(0);
        vPercentage.textContent = `${percent}%`;
        updateMeshScale();
        
        if (designState.lockAspectRatio) {
            const ratio = designState.verticalScale / designState.baseVerticalScale;
            const newHorizontal = designState.baseHorizontalScale * ratio;
            document.getElementById('horizontal-scale').value = newHorizontal;
            document.getElementById('horizontal-scale-slider').value = newHorizontal;
            designState.horizontalScale = newHorizontal;
            const hPercent = ((newHorizontal / designState.baseHorizontalScale) * 100).toFixed(0);
            document.getElementById('horizontal-percentage').textContent = `${hPercent}%`;
        }
    };
    
    vScaleInput.addEventListener('input', (e) => updateVerticalScale(e.target.value));
    vScaleSlider.addEventListener('input', (e) => updateVerticalScale(e.target.value));
    
    // Thickness
    const thicknessInput = document.getElementById('thickness');
    const thicknessSlider = document.getElementById('thickness-slider');
    
    const updateThickness = (value) => {
        designState.thickness = parseFloat(value);
        thicknessInput.value = value;
        thicknessSlider.value = value;
        // Update mesh depth if needed
        if (designState.mesh) {
            const scale = value / 40; // 40mm is base
            designState.mesh.scale.z = scale;
        }
    };
    
    thicknessInput.addEventListener('input', (e) => updateThickness(e.target.value));
    thicknessSlider.addEventListener('input', (e) => updateThickness(e.target.value));
    
    // Lock aspect ratio
    document.getElementById('lock-aspect-ratio').addEventListener('change', (e) => {
        designState.lockAspectRatio = e.target.checked;
    });
    
    // Reset dimensions
    document.getElementById('reset-dimensions').addEventListener('click', () => {
        designState.horizontalScale = designState.baseHorizontalScale;
        designState.verticalScale = designState.baseVerticalScale;
        designState.thickness = 40;
        
        document.getElementById('horizontal-scale').value = designState.baseHorizontalScale;
        document.getElementById('horizontal-scale-slider').value = designState.baseHorizontalScale;
        document.getElementById('horizontal-percentage').textContent = '100%';
        
        document.getElementById('vertical-scale').value = designState.baseVerticalScale;
        document.getElementById('vertical-scale-slider').value = designState.baseVerticalScale;
        document.getElementById('vertical-percentage').textContent = '100%';
        
        document.getElementById('thickness').value = 40;
        document.getElementById('thickness-slider').value = 40;
        
        updateMeshScale();
        if (designState.mesh) {
            designState.mesh.scale.z = 1;
        }
    });
    
    // Color picker
    const colorPicker = document.getElementById('color-picker');
    const colorHex = document.getElementById('color-hex');
    
    colorPicker.addEventListener('input', (e) => {
        designState.currentColor = e.target.value;
        colorHex.value = e.target.value.toUpperCase();
        applyColorToTexture();
    });
    
    colorHex.addEventListener('input', (e) => {
        let value = e.target.value;
        if (!value.startsWith('#')) value = '#' + value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            designState.currentColor = value;
            colorPicker.value = value;
            applyColorToTexture();
        }
    });
    
    // Color intensity
    const intensitySlider = document.getElementById('color-intensity');
    const intensityPercentage = document.getElementById('intensity-percentage');
    
    intensitySlider.addEventListener('input', (e) => {
        designState.colorIntensity = parseFloat(e.target.value) / 100;
        intensityPercentage.textContent = `${e.target.value}%`;
        applyColorToTexture();
    });
    
    // Apply color button
    document.getElementById('apply-color').addEventListener('click', () => {
        applyColorToTexture();
    });
    
    // Reset view
    document.getElementById('reset-view').addEventListener('click', () => {
        if (designState.camera) {
            designState.camera.position.set(0, 0, 5);
            designState.camera.lookAt(0, 0, 0);
        }
        if (designState.controls) {
            designState.controls.reset();
        }
    });
    
    // Auto-rotate
    document.getElementById('auto-rotate').addEventListener('change', (e) => {
        if (designState.controls) {
            designState.controls.autoRotate = e.target.checked;
            designState.controls.autoRotateSpeed = 2.0;
        }
    });
}

function startNewOrder() {
    // Reset state
    state.category = null;
    state.pattern = null;
    state.color = null;
    state.width = 0;
    state.height = 0;
    state.quantity = 1;
    state.totalPrice = 0;
    state.depositAmount = 0;
    state.invoiceNumber = null;
    state.orderDate = null;
    state.cart = [];
    state.currentItemId = 0;
    
    // Clear form inputs
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    document.getElementById('quantity').value = 1;
    document.getElementById('card-name').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
    
    // Clear selections
    document.querySelectorAll('.category-card, .pattern-card, .color-card, .dimension-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Go back to step 1
    goToStep(1);
}

// ========================================
// AI Dimension Analysis System
// ========================================

// AI state for uploaded image and analysis
const aiState = {
    uploadedImage: null,
    imageData: null,
    detectedDimensions: {
        width: 0,
        height: 0,
        depth: 0,
        aspectRatio: 0
    },
    confidence: 0,
    generated3DModel: null,
    modelSettings: {
        extrusionDepth: 5,
        detailLevel: 5
    },
    // Advanced analysis results
    advancedAnalysis: {
        patterns: {
            horizontal: 0,
            vertical: 0,
            diagonal: 0,
            geometric: []
        },
        hardware: {
            hinges: [],
            handles: [],
            locks: [],
            other: []
        },
        colors: {
            palette: [],
            dominant: null
        },
        decorative: {
            ornamental: [],
            relief: [],
            details: []
        },
        texture: {
            type: 'unknown',
            score: 0
        },
        components: []
    }
};

// Initialize AI image analysis system
function initAIAnalysis() {
    const uploadInput = document.getElementById('ai-image-upload');
    const analyzeBtn = document.getElementById('analyze-image-btn');
    const applyBtn = document.getElementById('apply-ai-dimensions');
    const extrusionDepthSlider = document.getElementById('extrusion-depth');
    const modelDetailSlider = document.getElementById('model-detail');
    
    if (!uploadInput || !analyzeBtn || !applyBtn) return;
    
    // Handle image upload
    uploadInput.addEventListener('change', handleImageUpload);
    
    // Handle analyze button click
    analyzeBtn.addEventListener('click', analyzeImageDimensions);
    
    // Handle apply dimensions button
    applyBtn.addEventListener('click', applyDetectedDimensions);
    
    // Note: Generate 3D Model and CAD Schema buttons removed - these actions are now
    // automatically performed when an image is uploaded
    
    // Handle settings sliders
    if (extrusionDepthSlider) {
        extrusionDepthSlider.addEventListener('input', (e) => {
            aiState.modelSettings.extrusionDepth = parseFloat(e.target.value);
            document.getElementById('extrusion-depth-value').textContent = `${e.target.value}cm`;
        });
    }
    
    if (modelDetailSlider) {
        modelDetailSlider.addEventListener('input', (e) => {
            aiState.modelSettings.detailLevel = parseInt(e.target.value);
            const levels = ['Very Low', 'Low', 'Low-Med', 'Medium', 'Med-High', 'High', 'Very High', 'Ultra', 'Max', 'Extreme'];
            document.getElementById('model-detail-value').textContent = levels[e.target.value - 1];
        });
    }
}

// Handle image upload
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        showAIStatus('Please upload a valid image file.', 'error');
        return;
    }
    
    showAIStatus('Processing image...', 'analyzing');
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            // Store original image
            const originalImage = e.target.result;
            
            // Remove background automatically
            showAIStatus('Removing background...', 'analyzing');
            const processedImage = await removeBackgroundFromImage(originalImage);
            
            // Store processed image
            aiState.uploadedImage = processedImage;
            aiState.originalImage = originalImage;
            
            // Show preview
            const previewImg = document.getElementById('ai-preview-image');
            const previewContainer = document.getElementById('ai-preview-container');
            const settingsContainer = document.getElementById('ai-3d-settings');
            
            previewImg.src = aiState.uploadedImage;
            previewContainer.classList.remove('hidden');
            
            // Show 3D generation settings
            if (settingsContainer) {
                settingsContainer.classList.remove('hidden');
            }
            
            // Hide results if previously shown
            document.getElementById('ai-results-container').classList.add('hidden');
            
            // Use Gemini API for advanced analysis
            showAIStatus('Analyzing design with AI...', 'analyzing');
            await analyzeWithGemini(file);
            
            // Auto-trigger dimension analysis
            showAIStatus('Analyzing dimensions...', 'analyzing');
            await analyzeImageDimensions();
            
            // Auto-generate 3D model
            showAIStatus('Generating 3D model...', 'generating');
            await generate3DModelFromImage();
            
            // Auto-trigger enhanced CAD analysis with vector paths, color map, depth analysis
            showAIStatus('Extracting vector paths and component inventory...', 'analyzing');
            await analyzeForCADTranslation(file);
            
            showAIStatus('✅ Complete analysis ready! Scroll down to see detailed breakdown.', 'success');
        } catch (error) {
            console.error('Image processing error:', error);
            showAIStatus('Error processing image. Using original image.', 'warning');
            aiState.uploadedImage = e.target.result;
            
            const previewImg = document.getElementById('ai-preview-image');
            const previewContainer = document.getElementById('ai-preview-container');
            previewImg.src = aiState.uploadedImage;
            previewContainer.classList.remove('hidden');
        }
    };
    
    reader.readAsDataURL(file);
}

// Analyze image dimensions using AI
async function analyzeImageDimensions() {
    if (!aiState.uploadedImage) {
        showAIStatus('Please upload an image first.', 'error');
        return;
    }
    
    showAIStatus('Analyzing image dimensions...', 'analyzing');
    
    try {
        // Create an image element
        const img = new Image();
        img.src = aiState.uploadedImage;
        
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        
        // Perform AI analysis
        const analysis = await performAIAnalysis(img);
        
        // Store results
        aiState.detectedDimensions = analysis.dimensions;
        aiState.confidence = analysis.confidence;
        
        // Display results
        displayAnalysisResults(analysis);
        
        showAIStatus('Analysis complete! Review the detected dimensions below.', 'success');
        
    } catch (error) {
        console.error('AI Analysis error:', error);
        showAIStatus('Error analyzing image. Please try again.', 'error');
    }
}

// Perform AI analysis on the image
async function performAIAnalysis(img) {
    // Get image dimensions
    const imageWidth = img.naturalWidth;
    const imageHeight = img.naturalHeight;
    const aspectRatio = imageWidth / imageHeight;
    
    // Create canvas to analyze image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 224; // Standard size for image processing
    canvas.height = 224;
    ctx.drawImage(img, 0, 0, 224, 224);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, 224, 224);
    aiState.imageData = imageData;
    
    // Analyze image using TensorFlow.js - pass canvas instead of imageData
    const tensor = tf.browser.fromPixels(canvas);
    const normalized = tensor.div(255.0);
    
    // Edge detection to find product boundaries
    const edges = await detectEdges(normalized);
    
    // Analyze product type based on current category
    const category = state.category;
    const productType = analyzeProductType(category, aspectRatio);
    
    // Calculate estimated dimensions
    const dimensions = estimateDimensions(aspectRatio, productType, edges);
    
    // Calculate confidence based on edge clarity and aspect ratio match
    const confidence = calculateConfidence(edges, aspectRatio, productType);
    
    // Perform advanced analysis
    await performAdvancedAnalysis(tensor, normalized, imageData, ctx, canvas);
    
    // Cleanup tensors
    tensor.dispose();
    normalized.dispose();
    
    return {
        dimensions: dimensions,
        confidence: confidence,
        aspectRatio: aspectRatio,
        productType: productType
    };
}

// ========================================
// Advanced AI Analysis Functions
// ========================================

// Perform comprehensive advanced analysis on the image
async function performAdvancedAnalysis(tensor, normalized, imageData, ctx, canvas) {
    // Reset advanced analysis state
    aiState.advancedAnalysis = {
        patterns: { horizontal: 0, vertical: 0, diagonal: 0, geometric: [] },
        hardware: { hinges: [], handles: [], locks: [], other: [] },
        colors: { palette: [], dominant: null },
        decorative: { ornamental: [], relief: [], details: [] },
        texture: { type: 'unknown', score: 0 },
        components: []
    };
    
    // Run all analysis in parallel for efficiency
    await Promise.all([
        detectPatternsAndLines(normalized),
        detectHardwareComponents(normalized, imageData),
        extractColorPalette(imageData),
        detectDecorativeElements(normalized),
        analyzeTexture(normalized, imageData),
        segmentComponents(normalized)
    ]);
}

// 1. Detect Design Patterns and Lines
async function detectPatternsAndLines(tensor) {
    try {
        // Convert to grayscale for line detection
        const gray = tensor.mean(2);
        
        // Detect horizontal lines using horizontal edge kernel
        const horizontalKernel = tf.tensor2d([
            [-1, -1, -1],
            [ 2,  2,  2],
            [-1, -1, -1]
        ], [3, 3, 1, 1]);
        
        // Detect vertical lines using vertical edge kernel
        const verticalKernel = tf.tensor2d([
            [-1, 2, -1],
            [-1, 2, -1],
            [-1, 2, -1]
        ], [3, 3, 1, 1]);
        
        // Detect diagonal lines (top-left to bottom-right)
        const diagonal1Kernel = tf.tensor2d([
            [ 2, -1, -1],
            [-1,  2, -1],
            [-1, -1,  2]
        ], [3, 3, 1, 1]);
        
        // Detect diagonal lines (top-right to bottom-left)
        const diagonal2Kernel = tf.tensor2d([
            [-1, -1,  2],
            [-1,  2, -1],
            [ 2, -1, -1]
        ], [3, 3, 1, 1]);
        
        const expanded = gray.expandDims(0).expandDims(-1);
        
        // Apply convolutions
        const horizontalEdges = tf.conv2d(expanded, horizontalKernel, 1, 'same');
        const verticalEdges = tf.conv2d(expanded, verticalKernel, 1, 'same');
        const diagonal1Edges = tf.conv2d(expanded, diagonal1Kernel, 1, 'same');
        const diagonal2Edges = tf.conv2d(expanded, diagonal2Kernel, 1, 'same');
        
        // Get data and count strong lines
        const horizontalData = await horizontalEdges.data();
        const verticalData = await verticalEdges.data();
        const diagonal1Data = await diagonal1Edges.data();
        const diagonal2Data = await diagonal2Edges.data();
        
        // Count lines with threshold
        const threshold = 0.3;
        const horizontalCount = Array.from(horizontalData).filter(v => Math.abs(v) > threshold).length;
        const verticalCount = Array.from(verticalData).filter(v => Math.abs(v) > threshold).length;
        const diagonal1Count = Array.from(diagonal1Data).filter(v => Math.abs(v) > threshold).length;
        const diagonal2Count = Array.from(diagonal2Data).filter(v => Math.abs(v) > threshold).length;
        
        // Store results
        aiState.advancedAnalysis.patterns.horizontal = Math.floor(horizontalCount / 100);
        aiState.advancedAnalysis.patterns.vertical = Math.floor(verticalCount / 100);
        aiState.advancedAnalysis.patterns.diagonal = Math.floor((diagonal1Count + diagonal2Count) / 200);
        
        // Detect geometric patterns (rectangles, circles)
        await detectGeometricPatterns(gray);
        
        // Cleanup
        gray.dispose();
        horizontalKernel.dispose();
        verticalKernel.dispose();
        diagonal1Kernel.dispose();
        diagonal2Kernel.dispose();
        expanded.dispose();
        horizontalEdges.dispose();
        verticalEdges.dispose();
        diagonal1Edges.dispose();
        diagonal2Edges.dispose();
    } catch (error) {
        console.error('Error in pattern detection:', error);
    }
}

// Detect geometric patterns like rectangles, panels
async function detectGeometricPatterns(grayTensor) {
    try {
        // Apply edge detection to find shapes
        const sobelX = tf.tensor2d([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], [3, 3, 1, 1]);
        const sobelY = tf.tensor2d([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], [3, 3, 1, 1]);
        
        const expanded = grayTensor.expandDims(0).expandDims(-1);
        const edgesX = tf.conv2d(expanded, sobelX, 1, 'same');
        const edgesY = tf.conv2d(expanded, sobelY, 1, 'same');
        
        // Combine edges
        const edges = tf.sqrt(tf.add(tf.square(edgesX), tf.square(edgesY)));
        const edgesData = await edges.data();
        
        // Simple heuristic: count strong edge pixels in grid sections
        const gridSize = 4;
        const sectionSize = Math.floor(224 / gridSize);
        let rectangularPatterns = 0;
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let sectionEdges = 0;
                for (let y = i * sectionSize; y < (i + 1) * sectionSize; y++) {
                    for (let x = j * sectionSize; x < (j + 1) * sectionSize; x++) {
                        if (edgesData[y * 224 + x] > 0.5) sectionEdges++;
                    }
                }
                // If section has strong edges on perimeter, it's likely a panel/rectangle
                if (sectionEdges > sectionSize * 2 && sectionEdges < sectionSize * sectionSize * 0.3) {
                    rectangularPatterns++;
                }
            }
        }
        
        if (rectangularPatterns > 0) {
            aiState.advancedAnalysis.patterns.geometric.push({
                type: 'rectangular_panels',
                count: rectangularPatterns,
                confidence: Math.min(0.95, rectangularPatterns / (gridSize * gridSize) * 2)
            });
        }
        
        // Cleanup
        sobelX.dispose();
        sobelY.dispose();
        expanded.dispose();
        edgesX.dispose();
        edgesY.dispose();
        edges.dispose();
    } catch (error) {
        console.error('Error in geometric pattern detection:', error);
    }
}

// 2. Detect Hardware Components (hinges, handles, locks)
async function detectHardwareComponents(tensor, imageData) {
    try {
        // Convert to grayscale
        const gray = tensor.mean(2);
        const grayData = await gray.data();
        
        // Detect hinges (look for small vertical metallic elements on edges)
        const hinges = await detectHinges(grayData, imageData);
        aiState.advancedAnalysis.hardware.hinges = hinges;
        
        // Detect handles (look for horizontal protrusions, circular elements)
        const handles = await detectHandles(grayData, imageData);
        aiState.advancedAnalysis.hardware.handles = handles;
        
        // Detect locks (look for circular/rectangular elements near handles)
        const locks = await detectLocks(grayData, imageData, handles);
        aiState.advancedAnalysis.hardware.locks = locks;
        
        // Cleanup
        gray.dispose();
    } catch (error) {
        console.error('Error in hardware detection:', error);
    }
}

// Detect hinges (typically on left/right edges)
async function detectHinges(grayData, imageData) {
    const hinges = [];
    const width = 224, height = 224;
    const edgeWidth = 20; // Check first/last 20 pixels
    
    // Check left and right edges for metallic vertical elements
    for (let edge of ['left', 'right']) {
        const xStart = edge === 'left' ? 0 : width - edgeWidth;
        const xEnd = edge === 'left' ? edgeWidth : width;
        
        let metallicRegions = [];
        for (let y = 10; y < height - 10; y += 5) {
            let metallicScore = 0;
            for (let x = xStart; x < xEnd; x++) {
                const idx = (y * width + x) * 4;
                const r = imageData.data[idx];
                const g = imageData.data[idx + 1];
                const b = imageData.data[idx + 2];
                
                // Check for metallic colors (silver, bronze, black)
                const isMetallic = (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) || 
                                  (r < 50 && g < 50 && b < 50);
                if (isMetallic) metallicScore++;
            }
            
            if (metallicScore > edgeWidth * 0.3) {
                metallicRegions.push(y);
            }
        }
        
        // Group nearby regions into hinges
        let currentHinge = null;
        for (let y of metallicRegions) {
            if (!currentHinge || y - currentHinge.yEnd > 30) {
                if (currentHinge && currentHinge.yEnd - currentHinge.yStart > 15) {
                    hinges.push(currentHinge);
                }
                currentHinge = { side: edge, yStart: y, yEnd: y };
            } else {
                currentHinge.yEnd = y;
            }
        }
        if (currentHinge && currentHinge.yEnd - currentHinge.yStart > 15) {
            hinges.push(currentHinge);
        }
    }
    
    return hinges;
}

// Detect handles (typically in center, horizontal or circular)
async function detectHandles(grayData, imageData) {
    const handles = [];
    const width = 224, height = 224;
    const centerX = width / 2;
    const searchRadius = 60;
    
    // Look for protrusions or circular elements in center region
    for (let y = height * 0.3; y < height * 0.7; y += 10) {
        for (let x = centerX - searchRadius; x < centerX + searchRadius; x += 10) {
            let handleScore = 0;
            const regionSize = 15;
            
            // Check surrounding region for handle-like features
            for (let dy = -regionSize; dy <= regionSize; dy++) {
                for (let dx = -regionSize; dx <= regionSize; dx++) {
                    const px = Math.min(width - 1, Math.max(0, x + dx));
                    const py = Math.min(height - 1, Math.max(0, y + dy));
                    const idx = (py * width + px) * 4;
                    
                    const brightness = (imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]) / 3;
                    
                    // Handles often have contrast with door
                    const edgeStrength = Math.abs(grayData[py * width + px] - grayData[y * width + x]);
                    if (edgeStrength > 0.2) handleScore++;
                }
            }
            
            if (handleScore > regionSize * regionSize * 0.4) {
                // Check if we already have a handle nearby
                const nearbyHandle = handles.find(h => 
                    Math.abs(h.x - x) < 40 && Math.abs(h.y - y) < 40
                );
                
                if (!nearbyHandle) {
                    handles.push({
                        x: x,
                        y: y,
                        confidence: Math.min(0.85, handleScore / (regionSize * regionSize)),
                        type: Math.abs(x - centerX) < 20 ? 'centered' : 'offset'
                    });
                }
            }
        }
    }
    
    return handles;
}

// Detect locks (typically near handles)
async function detectLocks(grayData, imageData, handles) {
    const locks = [];
    const width = 224;
    
    // Look for small circular/rectangular elements near handles
    for (let handle of handles) {
        const searchRegion = 40;
        
        for (let offsetY = -searchRegion; offsetY <= searchRegion; offsetY += 10) {
            const y = handle.y + offsetY;
            if (y < 0 || y >= 224) continue;
            
            for (let offsetX = -searchRegion; offsetX <= searchRegion; offsetX += 10) {
                const x = handle.x + offsetX;
                if (x < 0 || x >= 224) continue;
                
                // Skip if too close to handle center
                if (Math.abs(offsetX) < 10 && Math.abs(offsetY) < 10) continue;
                
                let lockScore = 0;
                const regionSize = 8;
                
                // Check for circular/rectangular metallic element
                for (let dy = -regionSize; dy <= regionSize; dy++) {
                    for (let dx = -regionSize; dx <= regionSize; dx++) {
                        const px = Math.min(223, Math.max(0, x + dx));
                        const py = Math.min(223, Math.max(0, y + dy));
                        const idx = (py * width + px) * 4;
                        
                        const r = imageData.data[idx];
                        const g = imageData.data[idx + 1];
                        const b = imageData.data[idx + 2];
                        
                        // Check for metallic or dark colors
                        if ((Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 100) || 
                            (r < 60 && g < 60 && b < 60)) {
                            lockScore++;
                        }
                    }
                }
                
                if (lockScore > regionSize * regionSize * 0.5) {
                    locks.push({
                        x: x,
                        y: y,
                        nearHandle: { x: handle.x, y: handle.y },
                        confidence: Math.min(0.75, lockScore / (regionSize * regionSize))
                    });
                }
            }
        }
    }
    
    return locks;
}

// 3. Extract Color Palette
async function extractColorPalette(imageData) {
    try {
        const colorMap = new Map();
        const data = imageData.data;
        
        // Sample colors (every 4th pixel for performance)
        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Quantize colors to reduce palette size (round to nearest 32)
            const qr = Math.round(r / 32) * 32;
            const qg = Math.round(g / 32) * 32;
            const qb = Math.round(b / 32) * 32;
            
            const key = `${qr},${qg},${qb}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
        
        // Convert to array and sort by frequency
        const colors = Array.from(colorMap.entries())
            .map(([key, count]) => {
                const [r, g, b] = key.split(',').map(Number);
                return { r, g, b, count };
            })
            .sort((a, b) => b.count - a.count);
        
        // Get top 5 colors
        const totalPixels = imageData.width * imageData.height;
        const topColors = colors.slice(0, 5).map(color => ({
            rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
            hex: rgbToHex(color.r, color.g, color.b),
            percentage: ((color.count * 4) / totalPixels * 100).toFixed(1),
            name: getColorName(color.r, color.g, color.b)
        }));
        
        aiState.advancedAnalysis.colors.palette = topColors;
        aiState.advancedAnalysis.colors.dominant = topColors[0];
    } catch (error) {
        console.error('Error in color extraction:', error);
    }
}

// Helper: Convert RGB to Hex
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Helper: Get color name from RGB
function getColorName(r, g, b) {
    const brightness = (r + g + b) / 3;
    
    if (brightness < 50) return 'Dark/Black';
    if (brightness > 200) return 'Light/White';
    
    // Simple color classification
    if (r > g + 30 && r > b + 30) return 'Red/Brown';
    if (g > r + 30 && g > b + 30) return 'Green';
    if (b > r + 30 && b > g + 30) return 'Blue';
    if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
        if (brightness > 150) return 'Silver/Gray';
        if (brightness > 100) return 'Gray';
        return 'Dark Gray';
    }
    if (r > 150 && g > 100 && b < 100) return 'Bronze/Gold';
    if (r > 100 && g > 80 && b < 70) return 'Wood/Brown';
    
    return 'Mixed';
}

// 4. Detect Decorative Elements
async function detectDecorativeElements(tensor) {
    try {
        // Convert to grayscale
        const gray = tensor.mean(2);
        
        // Detect ornamental patterns using high-frequency features
        const ornamentalKernel = tf.tensor2d([
            [ 0, -1,  0],
            [-1,  5, -1],
            [ 0, -1,  0]
        ], [3, 3, 1, 1]);
        
        const expanded = gray.expandDims(0).expandDims(-1);
        const ornamental = tf.conv2d(expanded, ornamentalKernel, 1, 'same');
        const ornamentalData = await ornamental.data();
        
        // Count ornamental regions (high-detail areas)
        let ornamentalRegions = 0;
        const gridSize = 8;
        const sectionSize = 224 / gridSize;
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let detailScore = 0;
                for (let y = Math.floor(i * sectionSize); y < Math.floor((i + 1) * sectionSize); y++) {
                    for (let x = Math.floor(j * sectionSize); x < Math.floor((j + 1) * sectionSize); x++) {
                        if (Math.abs(ornamentalData[y * 224 + x]) > 0.3) detailScore++;
                    }
                }
                
                if (detailScore > sectionSize * sectionSize * 0.2) {
                    ornamentalRegions++;
                    aiState.advancedAnalysis.decorative.ornamental.push({
                        gridX: j,
                        gridY: i,
                        detailLevel: detailScore / (sectionSize * sectionSize)
                    });
                }
            }
        }
        
        // Detect relief work (depth variations)
        await detectReliefWork(gray);
        
        // Count decorative details
        if (ornamentalRegions > 2) {
            aiState.advancedAnalysis.decorative.details.push({
                type: 'ornamental_pattern',
                regions: ornamentalRegions,
                coverage: (ornamentalRegions / (gridSize * gridSize) * 100).toFixed(0) + '%'
            });
        }
        
        // Cleanup
        gray.dispose();
        ornamentalKernel.dispose();
        expanded.dispose();
        ornamental.dispose();
    } catch (error) {
        console.error('Error in decorative element detection:', error);
    }
}

// Detect relief work (embossed/debossed patterns)
async function detectReliefWork(grayTensor) {
    try {
        // Use Laplacian kernel to detect depth variations
        const reliefKernel = tf.tensor2d([
            [ 1,  1,  1],
            [ 1, -8,  1],
            [ 1,  1,  1]
        ], [3, 3, 1, 1]);
        
        const expanded = grayTensor.expandDims(0).expandDims(-1);
        const relief = tf.conv2d(expanded, reliefKernel, 1, 'same');
        const reliefData = await relief.data();
        
        // Count relief regions
        let reliefCount = 0;
        for (let i = 0; i < reliefData.length; i++) {
            if (Math.abs(reliefData[i]) > 0.4) reliefCount++;
        }
        
        if (reliefCount > 1000) {
            aiState.advancedAnalysis.decorative.relief.push({
                type: 'embossed_pattern',
                coverage: (reliefCount / reliefData.length * 100).toFixed(1) + '%',
                intensity: 'medium'
            });
        }
        
        // Cleanup
        reliefKernel.dispose();
        expanded.dispose();
        relief.dispose();
    } catch (error) {
        console.error('Error in relief detection:', error);
    }
}

// 5. Analyze Texture
async function analyzeTexture(tensor, imageData) {
    try {
        const gray = tensor.mean(2);
        const grayData = await gray.data();
        
        // Calculate texture features
        const variance = calculateVariance(grayData);
        const entropy = calculateEntropy(grayData);
        const edgeDensity = calculateEdgeDensity(grayData);
        
        // Classify texture based on features
        let textureType = 'smooth';
        let textureScore = 0;
        
        if (edgeDensity > 0.3 && variance > 0.05) {
            textureType = 'highly_textured';
            textureScore = 0.85;
        } else if (edgeDensity > 0.2 || variance > 0.03) {
            textureType = 'textured';
            textureScore = 0.70;
        } else if (entropy > 4) {
            textureType = 'patterned';
            textureScore = 0.65;
        } else {
            textureType = 'smooth';
            textureScore = 0.80;
        }
        
        aiState.advancedAnalysis.texture = {
            type: textureType,
            score: textureScore,
            features: {
                variance: variance.toFixed(3),
                entropy: entropy.toFixed(2),
                edgeDensity: edgeDensity.toFixed(3)
            }
        };
        
        // Cleanup
        gray.dispose();
    } catch (error) {
        console.error('Error in texture analysis:', error);
    }
}

// Calculate variance (texture roughness)
function calculateVariance(data) {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    return variance;
}

// Calculate entropy (texture complexity)
function calculateEntropy(data) {
    const histogram = new Array(256).fill(0);
    for (let val of data) {
        const bin = Math.floor(val * 255);
        histogram[bin]++;
    }
    
    let entropy = 0;
    const total = data.length;
    for (let count of histogram) {
        if (count > 0) {
            const p = count / total;
            entropy -= p * Math.log2(p);
        }
    }
    return entropy;
}

// Calculate edge density
function calculateEdgeDensity(data) {
    let edgeCount = 0;
    const width = 224;
    const threshold = 0.1;
    
    for (let y = 1; y < 223; y++) {
        for (let x = 1; x < 223; x++) {
            const idx = y * width + x;
            const diff = Math.abs(data[idx] - data[idx - 1]) + 
                        Math.abs(data[idx] - data[idx + 1]) +
                        Math.abs(data[idx] - data[idx - width]) +
                        Math.abs(data[idx] - data[idx + width]);
            if (diff > threshold) edgeCount++;
        }
    }
    
    return edgeCount / (222 * 222);
}

// 6. Segment Components
async function segmentComponents(tensor) {
    try {
        // Convert to grayscale
        const gray = tensor.mean(2);
        const grayData = await gray.data();
        
        // Simple segmentation using intensity-based regions
        const segments = [];
        const gridSize = 3;
        const sectionSize = 224 / gridSize;
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let sumIntensity = 0;
                let count = 0;
                
                for (let y = Math.floor(i * sectionSize); y < Math.floor((i + 1) * sectionSize); y++) {
                    for (let x = Math.floor(j * sectionSize); x < Math.floor((j + 1) * sectionSize); x++) {
                        sumIntensity += grayData[y * 224 + x];
                        count++;
                    }
                }
                
                const avgIntensity = sumIntensity / count;
                let componentType = 'unknown';
                
                // Classify component based on intensity and position
                if (avgIntensity > 0.7) {
                    componentType = 'light_panel';
                } else if (avgIntensity > 0.4) {
                    componentType = 'mid_tone_section';
                } else {
                    componentType = 'dark_element';
                }
                
                // Add position context
                if (j === 0 || j === gridSize - 1) {
                    componentType += '_edge';
                } else if (i === Math.floor(gridSize / 2) && j === Math.floor(gridSize / 2)) {
                    componentType += '_center';
                }
                
                segments.push({
                    row: i,
                    col: j,
                    type: componentType,
                    avgIntensity: avgIntensity.toFixed(2)
                });
            }
        }
        
        aiState.advancedAnalysis.components = segments;
        
        // Cleanup
        gray.dispose();
    } catch (error) {
        console.error('Error in component segmentation:', error);
    }
}

// Detect edges in the image
async function detectEdges(tensor) {
    // Convert to grayscale
    const gray = tensor.mean(2);
    
    // Simple edge detection using convolution
    // Create a 4D kernel for conv2d: [filterHeight, filterWidth, inDepth, outDepth]
    // Flatten the kernel values: 3x3 grid with 1 input channel and 1 output channel
    const kernelValues = [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ];
    const kernel = tf.tensor4d(kernelValues, [3, 3, 1, 1]);
    
    const expanded = gray.expandDims(0).expandDims(-1);
    const edges = tf.conv2d(expanded, kernel, 1, 'same');
    const edgeData = await edges.data();
    
    // Calculate edge strength
    const edgeStrength = Array.from(edgeData).reduce((sum, val) => sum + Math.abs(val), 0) / edgeData.length;
    
    // Cleanup
    gray.dispose();
    kernel.dispose();
    expanded.dispose();
    edges.dispose();
    
    return edgeStrength;
}

// Analyze product type based on category and aspect ratio
function analyzeProductType(category, aspectRatio) {
    const productTypes = {
        'exterior-doors': { expectedRatio: 0.43, width: 1.0, height: 2.1, depth: 0.05 },
        'interior-doors': { expectedRatio: 0.43, width: 0.9, height: 2.0, depth: 0.05 },
        'exterior-fences': { expectedRatio: 1.33, width: 2.0, height: 1.5, depth: 0.05 },
        'interior-fences': { expectedRatio: 1.67, width: 2.0, height: 1.2, depth: 0.05 },
        'window-protections': { expectedRatio: 1.0, width: 1.5, height: 1.5, depth: 0.05 },
        'handrail': { expectedRatio: 10.0, width: 3.0, height: 0.1, depth: 0.1 }
    };
    
    return productTypes[category] || productTypes['exterior-doors'];
}

// Estimate dimensions based on analysis
function estimateDimensions(aspectRatio, productType, edgeStrength) {
    // Base dimensions on product type
    let width = productType.width;
    let height = productType.height;
    let depth = productType.depth;
    
    // Adjust based on detected aspect ratio
    const ratioAdjustment = aspectRatio / productType.expectedRatio;
    
    if (ratioAdjustment > 1.2 || ratioAdjustment < 0.8) {
        // Significant difference, adjust dimensions
        if (aspectRatio > productType.expectedRatio) {
            // Wider than expected
            width = width * ratioAdjustment;
        } else {
            // Taller than expected
            height = height / ratioAdjustment;
        }
    }
    
    // Edge strength can indicate depth perception
    if (edgeStrength > 50) {
        depth = depth * 1.2; // Strong edges might indicate thicker product
    }
    
    return {
        width: Math.round(width * 100) / 100, // Round to 2 decimals
        height: Math.round(height * 100) / 100,
        depth: Math.round(depth * 100) / 100,
        aspectRatio: Math.round(aspectRatio * 100) / 100
    };
}

// Calculate confidence score
function calculateConfidence(edgeStrength, aspectRatio, productType) {
    let confidence = 0.5; // Base confidence
    
    // Edge clarity contributes to confidence
    if (edgeStrength > 30) {
        confidence += 0.2;
    } else if (edgeStrength < 10) {
        confidence -= 0.2;
    }
    
    // Aspect ratio match contributes to confidence
    const ratioMatch = Math.abs(aspectRatio - productType.expectedRatio) / productType.expectedRatio;
    if (ratioMatch < 0.1) {
        confidence += 0.2;
    } else if (ratioMatch > 0.5) {
        confidence -= 0.1;
    }
    
    // Ensure confidence is between 0 and 1
    confidence = Math.max(0, Math.min(1, confidence));
    
    return Math.round(confidence * 100); // Return as percentage
}

// Display analysis results
function displayAnalysisResults(analysis) {
    const resultsContainer = document.getElementById('ai-results-container');
    
    // Update dimension displays
    document.getElementById('ai-detected-width').textContent = `${analysis.dimensions.width}m`;
    document.getElementById('ai-detected-height').textContent = `${analysis.dimensions.height}m`;
    document.getElementById('ai-aspect-ratio').textContent = analysis.dimensions.aspectRatio.toFixed(2);
    
    // Update confidence display with color coding
    const confidenceElement = document.getElementById('ai-confidence');
    confidenceElement.textContent = `${analysis.confidence}%`;
    
    // Color code confidence
    confidenceElement.className = 'ai-value';
    if (analysis.confidence >= 70) {
        confidenceElement.classList.add('confidence-high');
    } else if (analysis.confidence >= 50) {
        confidenceElement.classList.add('confidence-medium');
    } else {
        confidenceElement.classList.add('confidence-low');
    }
    
    // Display advanced analysis results
    displayAdvancedAnalysis();
    
    // Show results
    resultsContainer.classList.remove('hidden');
}

// Display advanced analysis results in the UI
function displayAdvancedAnalysis() {
    const advancedContainer = document.getElementById('advanced-analysis-container');
    if (!advancedContainer) return;
    
    const adv = aiState.advancedAnalysis;
    let html = '<div class="advanced-analysis-content">';
    
    // 1. Design Patterns & Lines
    html += '<div class="analysis-section">';
    html += '<h4>🔷 Design Patterns & Lines</h4>';
    html += '<div class="analysis-details">';
    html += `<div class="detail-item"><span class="detail-label">Horizontal Lines:</span> <span class="detail-value">${adv.patterns.horizontal}</span></div>`;
    html += `<div class="detail-item"><span class="detail-label">Vertical Lines:</span> <span class="detail-value">${adv.patterns.vertical}</span></div>`;
    html += `<div class="detail-item"><span class="detail-label">Diagonal Lines:</span> <span class="detail-value">${adv.patterns.diagonal}</span></div>`;
    
    if (adv.patterns.geometric.length > 0) {
        html += '<div class="detail-item"><span class="detail-label">Geometric Patterns:</span></div>';
        adv.patterns.geometric.forEach(pattern => {
            html += `<div class="detail-subitem">• ${pattern.type.replace(/_/g, ' ')}: ${pattern.count} (${(pattern.confidence * 100).toFixed(0)}% confidence)</div>`;
        });
    }
    html += '</div></div>';
    
    // 2. Hardware Components
    html += '<div class="analysis-section">';
    html += '<h4>🔧 Hardware Components</h4>';
    html += '<div class="analysis-details">';
    
    if (adv.hardware.hinges.length > 0) {
        html += `<div class="detail-item"><span class="detail-label">Hinges Detected:</span> <span class="detail-value">${adv.hardware.hinges.length}</span></div>`;
        adv.hardware.hinges.forEach((hinge, i) => {
            html += `<div class="detail-subitem">• Hinge ${i + 1}: ${hinge.side} side</div>`;
        });
    } else {
        html += '<div class="detail-item"><span class="detail-label">Hinges:</span> <span class="detail-value">None detected</span></div>';
    }
    
    if (adv.hardware.handles.length > 0) {
        html += `<div class="detail-item"><span class="detail-label">Handles Detected:</span> <span class="detail-value">${adv.hardware.handles.length}</span></div>`;
        adv.hardware.handles.forEach((handle, i) => {
            html += `<div class="detail-subitem">• Handle ${i + 1}: ${handle.type} (${(handle.confidence * 100).toFixed(0)}% confidence)</div>`;
        });
    } else {
        html += '<div class="detail-item"><span class="detail-label">Handles:</span> <span class="detail-value">None detected</span></div>';
    }
    
    if (adv.hardware.locks.length > 0) {
        html += `<div class="detail-item"><span class="detail-label">Locks Detected:</span> <span class="detail-value">${adv.hardware.locks.length}</span></div>`;
    } else {
        html += '<div class="detail-item"><span class="detail-label">Locks:</span> <span class="detail-value">None detected</span></div>';
    }
    
    html += '</div></div>';
    
    // 3. Color Palette
    html += '<div class="analysis-section">';
    html += '<h4>🎨 Color Palette</h4>';
    html += '<div class="analysis-details">';
    
    if (adv.colors.palette.length > 0) {
        html += '<div class="color-palette">';
        adv.colors.palette.forEach((color, i) => {
            html += `
                <div class="color-item">
                    <div class="color-swatch" style="background-color: ${color.rgb};"></div>
                    <div class="color-info">
                        <div class="color-name">${color.name}</div>
                        <div class="color-details">${color.hex} • ${color.percentage}%</div>
                    </div>
                </div>`;
        });
        html += '</div>';
        
        if (adv.colors.dominant) {
            html += `<div class="detail-item"><span class="detail-label">Dominant Color:</span> <span class="detail-value">${adv.colors.dominant.name}</span></div>`;
        }
    } else {
        html += '<div class="detail-item">No color data available</div>';
    }
    
    html += '</div></div>';
    
    // 4. Decorative Elements
    html += '<div class="analysis-section">';
    html += '<h4>✨ Decorative Elements</h4>';
    html += '<div class="analysis-details">';
    
    if (adv.decorative.details.length > 0) {
        adv.decorative.details.forEach(detail => {
            html += `<div class="detail-item"><span class="detail-label">${detail.type.replace(/_/g, ' ')}:</span> <span class="detail-value">${detail.regions} regions (${detail.coverage} coverage)</span></div>`;
        });
    }
    
    if (adv.decorative.relief.length > 0) {
        adv.decorative.relief.forEach(relief => {
            html += `<div class="detail-item"><span class="detail-label">${relief.type.replace(/_/g, ' ')}:</span> <span class="detail-value">${relief.coverage} coverage, ${relief.intensity} intensity</span></div>`;
        });
    }
    
    if (adv.decorative.details.length === 0 && adv.decorative.relief.length === 0) {
        html += '<div class="detail-item"><span class="detail-value">Minimal decorative elements detected</span></div>';
    }
    
    html += '</div></div>';
    
    // 5. Texture Analysis
    html += '<div class="analysis-section">';
    html += '<h4>📐 Texture Analysis</h4>';
    html += '<div class="analysis-details">';
    html += `<div class="detail-item"><span class="detail-label">Texture Type:</span> <span class="detail-value">${adv.texture.type.replace(/_/g, ' ')}</span></div>`;
    html += `<div class="detail-item"><span class="detail-label">Confidence:</span> <span class="detail-value">${(adv.texture.score * 100).toFixed(0)}%</span></div>`;
    
    if (adv.texture.features) {
        html += `<div class="detail-subitem">Variance: ${adv.texture.features.variance}</div>`;
        html += `<div class="detail-subitem">Entropy: ${adv.texture.features.entropy}</div>`;
        html += `<div class="detail-subitem">Edge Density: ${adv.texture.features.edgeDensity}</div>`;
    }
    
    html += '</div></div>';
    
    // 6. Component Segmentation
    html += '<div class="analysis-section">';
    html += '<h4>🔲 Component Segmentation</h4>';
    html += '<div class="analysis-details">';
    html += `<div class="detail-item"><span class="detail-label">Components Identified:</span> <span class="detail-value">${adv.components.length}</span></div>`;
    
    if (adv.components.length > 0) {
        const componentTypes = {};
        adv.components.forEach(comp => {
            const baseType = comp.type.replace(/_edge|_center/g, '');
            componentTypes[baseType] = (componentTypes[baseType] || 0) + 1;
        });
        
        html += '<div class="detail-item"><span class="detail-label">Breakdown:</span></div>';
        Object.entries(componentTypes).forEach(([type, count]) => {
            html += `<div class="detail-subitem">• ${type.replace(/_/g, ' ')}: ${count}</div>`;
        });
    }
    
    html += '</div></div>';
    
    html += '</div>';
    
    advancedContainer.innerHTML = html;
    advancedContainer.classList.remove('hidden');
}

// Apply detected dimensions to the 3D model
function applyDetectedDimensions() {
    if (!aiState.detectedDimensions.width || !aiState.detectedDimensions.height) {
        showAIStatus('No dimensions detected. Please analyze an image first.', 'error');
        return;
    }
    
    // Convert meters to centimeters for the scale inputs
    const widthCm = aiState.detectedDimensions.width * 100;
    const heightCm = aiState.detectedDimensions.height * 100;
    
    // Update horizontal and vertical scale
    designState.horizontalScale = widthCm;
    designState.verticalScale = heightCm;
    designState.baseHorizontalScale = widthCm;
    designState.baseVerticalScale = heightCm;
    
    // Update UI controls
    document.getElementById('horizontal-scale').value = widthCm;
    document.getElementById('horizontal-scale-slider').value = widthCm;
    document.getElementById('horizontal-percentage').textContent = '100%';
    
    document.getElementById('vertical-scale').value = heightCm;
    document.getElementById('vertical-scale-slider').value = heightCm;
    document.getElementById('vertical-percentage').textContent = '100%';
    
    // Update thickness based on detected depth
    const thicknessMm = aiState.detectedDimensions.depth * 1000;
    document.getElementById('thickness').value = thicknessMm;
    document.getElementById('thickness-slider').value = thicknessMm;
    designState.thickness = thicknessMm;
    
    // Update 3D geometry with new dimensions
    updateGeometryWithDetectedDimensions();
    
    // Update mesh scale
    updateMeshScale();
    
    showAIStatus('Dimensions applied successfully! The 3D model has been updated.', 'success');
}

// Update 3D geometry based on detected dimensions
function updateGeometryWithDetectedDimensions() {
    if (!designState.mesh || !designState.scene) return;
    
    // Remove old mesh
    designState.scene.remove(designState.mesh);
    
    // Create new geometry with detected dimensions
    const width = aiState.detectedDimensions.width;
    const height = aiState.detectedDimensions.height;
    const depth = aiState.detectedDimensions.depth;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = designState.mesh.material.clone();
    
    designState.mesh = new THREE.Mesh(geometry, material);
    designState.scene.add(designState.mesh);
    
    // Reapply texture if exists
    if (designState.texture) {
        designState.mesh.material.map = designState.texture;
        designState.mesh.material.needsUpdate = true;
    }
}

// ========================================
// Background Removal & Gemini API Integration
// ========================================

// Remove white (or light) background from image
async function removeBackgroundFromImage(imageDataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image
            ctx.drawImage(img, 0, 0);
            
            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Find the bounding box of non-background pixels
            let minX = canvas.width;
            let minY = canvas.height;
            let maxX = 0;
            let maxY = 0;
            
            // Define background color threshold (for white/light backgrounds)
            const bgThreshold = 240; // Adjust this value (0-255) for different backgrounds
            const minAlphaForForeground = 200; // Minimum alpha value for opaque (non-background) pixels
            
            // First pass: find boundaries
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const idx = (y * canvas.width + x) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];
                    const a = data[idx + 3];
                    
                    // Check if pixel is NOT background (not white/light)
                    const isBackground = (r > bgThreshold && g > bgThreshold && b > bgThreshold) || a < minAlphaForForeground;
                    
                    if (!isBackground) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            
            // Add small padding
            const padding = 5;
            minX = Math.max(0, minX - padding);
            minY = Math.max(0, minY - padding);
            maxX = Math.min(canvas.width - 1, maxX + padding);
            maxY = Math.min(canvas.height - 1, maxY + padding);
            
            // Calculate cropped dimensions
            const croppedWidth = maxX - minX + 1;
            const croppedHeight = maxY - minY + 1;
            
            // If no object detected, return original image
            if (croppedWidth <= 0 || croppedHeight <= 0 || croppedWidth === canvas.width || croppedHeight === canvas.height) {
                console.log('No background to remove or entire image is object');
                resolve(imageDataUrl);
                return;
            }
            
            // Create new canvas with cropped dimensions
            const croppedCanvas = document.createElement('canvas');
            const croppedCtx = croppedCanvas.getContext('2d');
            croppedCanvas.width = croppedWidth;
            croppedCanvas.height = croppedHeight;
            
            // Second pass: remove background and crop
            const croppedImageData = ctx.getImageData(minX, minY, croppedWidth, croppedHeight);
            const croppedData = croppedImageData.data;
            
            // Make background pixels transparent
            for (let i = 0; i < croppedData.length; i += 4) {
                const r = croppedData[i];
                const g = croppedData[i + 1];
                const b = croppedData[i + 2];
                
                // If pixel is background color, make it transparent
                if (r > bgThreshold && g > bgThreshold && b > bgThreshold) {
                    croppedData[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }
            
            croppedCtx.putImageData(croppedImageData, 0, 0);
            
            // Convert to data URL
            const processedDataUrl = croppedCanvas.toDataURL('image/png');
            resolve(processedDataUrl);
        };
        
        img.onerror = function() {
            console.error('Error loading image for background removal');
            reject(new Error('Failed to load image'));
        };
        
        img.src = imageDataUrl;
    });
}

// Analyze image with Gemini API
async function analyzeWithGemini(imageFile) {
    try {
        // Convert file to base64
        const base64Image = await fileToBase64(imageFile);
        
        // Prepare request to Gemini API
        const requestBody = {
            contents: [{
                parts: [
                    {
                        text: `Analyze this aluminum construction product image in detail. Identify:
1. Product type (door, fence, window protection, handrail, etc.)
2. Design patterns (horizontal lines, vertical bars, panels, glass sections, etc.)
3. Hardware components (hinges, handles, locks, mounting brackets)
4. Color scheme and material finish
5. Decorative elements (relief work, ornamental patterns, scrollwork)
6. Structural components (frame, panels, rails, slats)
7. Any distinctive design features

Provide a structured analysis with specific details.`
                    },
                    {
                        inline_data: {
                            mime_type: imageFile.type,
                            data: base64Image
                        }
                    }
                ]
            }]
        };
        
        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract and store analysis results
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const analysisText = data.candidates[0].content.parts[0].text;
            
            // Store in AI state
            if (!aiState.geminiAnalysis) {
                aiState.geminiAnalysis = {};
            }
            aiState.geminiAnalysis.rawText = analysisText;
            aiState.geminiAnalysis.timestamp = new Date().toISOString();
            
            console.log('Gemini Analysis:', analysisText);
            
            // Parse and display key insights
            displayGeminiInsights(analysisText);
            
            return analysisText;
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        // Silently fail - don't disrupt the user experience
        return null;
    }
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove data:image/jpeg;base64, prefix
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Display Gemini insights in the UI
function displayGeminiInsights(analysisText) {
    // Check if we have an advanced analysis container
    let geminiContainer = document.getElementById('gemini-insights-container');
    
    if (!geminiContainer) {
        // Create container if it doesn't exist
        const resultsContainer = document.getElementById('ai-results-container');
        if (resultsContainer) {
            geminiContainer = document.createElement('div');
            geminiContainer.id = 'gemini-insights-container';
            geminiContainer.className = 'gemini-insights';
            resultsContainer.appendChild(geminiContainer);
        }
    }
    
    if (geminiContainer) {
        let html = '<div class="analysis-section">';
        html += '<h4>🤖 AI Design Analysis (Gemini)</h4>';
        html += '<div class="analysis-details gemini-text">';
        
        // Format the analysis text for better readability
        const formattedText = analysisText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\n\n/g, '</p><p>') // Paragraphs
            .replace(/\n/g, '<br>'); // Line breaks
        
        html += `<p>${formattedText}</p>`;
        html += '</div></div>';
        
        geminiContainer.innerHTML = html;
        geminiContainer.classList.remove('hidden');
    }
}

// ========================================
// 3D Model Generation from Image
// ========================================

// Generate 3D model from uploaded 2D image
async function generate3DModelFromImage() {
    if (!aiState.uploadedImage) {
        showAIStatus('Please upload an image first.', 'error');
        return;
    }
    
    showAIStatus('Generating 3D model from image... This may take a moment.', 'generating');
    
    try {
        // Create an image element
        const img = new Image();
        img.src = aiState.uploadedImage;
        
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        
        // Step 1: Extract silhouette/contour from image
        const silhouette = await extractImageSilhouette(img);
        
        // Step 2: Generate 3D geometry from silhouette
        const geometry = await createGeometryFromSilhouette(silhouette, img);
        
        // Step 3: Create texture from original image
        const texture = await createTextureFromImage(img);
        
        // Step 4: Replace current 3D model with generated one
        replaceWith3DModel(geometry, texture);
        
        // Store generated model
        aiState.generated3DModel = {
            geometry: geometry,
            texture: texture,
            timestamp: Date.now()
        };
        
        showAIStatus('✅ 3D model generated successfully! The model is now displayed in the viewer.', 'success');
        
    } catch (error) {
        console.error('3D generation error:', error);
        showAIStatus('Error generating 3D model. Please try a different image or adjust settings.', 'error');
    }
}

// Extract silhouette/outline from image with MAXIMUM precision
async function extractImageSilhouette(img) {
    // Create canvas to process image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Use detail level to determine resolution with MUCH HIGHER quality
    const detailLevel = aiState.modelSettings.detailLevel;
    
    // HIGH-PRECISION resolution scaling
    // Very Low (1): 512, Low (2): 768, Medium (5): 1024, High (8): 1536, Extreme (10): 2048
    const baseResolution = 512;
    const resolutionMultiplier = Math.pow(1.15, detailLevel); // Exponential scaling for quality
    let targetResolution = Math.floor(baseResolution * resolutionMultiplier);
    
    // Cap at 2048 for performance, but maintain quality
    targetResolution = Math.min(targetResolution, 2048);
    
    // Maintain aspect ratio precisely to avoid cropping or distortion
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let canvasWidth, canvasHeight;
    
    if (aspectRatio > 1) {
        // Landscape - width is larger
        canvasWidth = targetResolution;
        canvasHeight = Math.floor(targetResolution / aspectRatio);
    } else {
        // Portrait or square - height is larger or equal
        canvasHeight = targetResolution;
        canvasWidth = Math.floor(targetResolution * aspectRatio);
    }
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // HIGH-QUALITY image rendering - use best quality settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Draw image maintaining aspect ratio without cropping
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    
    // Detect background brightness by sampling corners and edges
    const backgroundBrightness = detectBackgroundBrightness(data, canvasWidth, canvasHeight);
    const isWhiteBackground = backgroundBrightness > 180; // Bright background threshold
    
    // Convert to grayscale and threshold to create binary mask with ADAPTIVE thresholding
    const threshold = 128;
    const totalPixels = canvasWidth * canvasHeight;
    const mask = new Array(totalPixels);
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Calculate brightness using relative luminance
        const brightness = calculatePixelBrightness(r, g, b);
        
        // Consider alpha channel for transparency
        const pixelIndex = i / 4;
        
        // Adaptive thresholding based on background type
        if (isWhiteBackground) {
            // For white backgrounds, darker pixels are the design
            mask[pixelIndex] = (brightness < threshold && a > 128) ? 1 : 0;
        } else {
            // For dark backgrounds, brighter pixels are the design
            mask[pixelIndex] = (brightness > threshold && a > 128) ? 1 : 0;
        }
    }
    
    // Find contours using edge detection
    const contours = findContours(mask, canvasWidth, canvasHeight);
    
    return {
        mask: mask,
        contours: contours,
        width: canvasWidth,
        height: canvasHeight,
        originalWidth: img.naturalWidth,
        originalHeight: img.naturalHeight,
        aspectRatio: aspectRatio
    };
}

// Helper function to calculate pixel brightness using relative luminance
function calculatePixelBrightness(r, g, b) {
    // Human eyes are more sensitive to green than red or blue
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Detect average background brightness by sampling corners and edges
function detectBackgroundBrightness(data, width, height) {
    const samples = [];
    
    // Sample top edge
    for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 20))) {
        const i = x * 4;
        if (i < data.length) {
            const brightness = calculatePixelBrightness(data[i], data[i + 1], data[i + 2]);
            samples.push(brightness);
        }
    }
    
    // Sample bottom edge
    for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 20))) {
        const i = ((height - 1) * width + x) * 4;
        if (i < data.length) {
            const brightness = calculatePixelBrightness(data[i], data[i + 1], data[i + 2]);
            samples.push(brightness);
        }
    }
    
    // Sample left edge
    for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 20))) {
        const i = (y * width) * 4;
        if (i < data.length) {
            const brightness = calculatePixelBrightness(data[i], data[i + 1], data[i + 2]);
            samples.push(brightness);
        }
    }
    
    // Sample right edge
    for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 20))) {
        const i = (y * width + (width - 1)) * 4;
        if (i < data.length) {
            const brightness = calculatePixelBrightness(data[i], data[i + 1], data[i + 2]);
            samples.push(brightness);
        }
    }
    
    // Calculate median instead of average for better robustness
    samples.sort((a, b) => a - b);
    const medianIndex = Math.floor(samples.length / 2);
    return samples[medianIndex] || 255;
}

// Find contours in binary mask with aspect ratio support
function findContours(mask, width, height) {
    const contours = [];
    const totalPixels = width * height;
    const visited = new Array(totalPixels).fill(false);
    
    // Simple contour extraction - find boundary pixels
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            
            if (mask[idx] === 1 && !visited[idx]) {
                // Check if this is a boundary pixel
                const neighbors = [
                    mask[(y-1) * width + x],     // top
                    mask[(y+1) * width + x],     // bottom
                    mask[y * width + (x-1)],     // left
                    mask[y * width + (x+1)]      // right
                ];
                
                // If any neighbor is 0, this is a boundary
                if (neighbors.some(n => n === 0)) {
                    contours.push({
                        x: (x / width) - 0.5,   // Normalize to -0.5 to 0.5
                        y: (y / height) - 0.5,
                        idx: idx
                    });
                    visited[idx] = true;
                }
            }
        }
    }
    
    return contours;
}

// Create 3D geometry from silhouette with MAXIMUM precision
async function createGeometryFromSilhouette(silhouette, img) {
    const extrusionDepth = aiState.modelSettings.extrusionDepth / 100; // Convert cm to meters
    const width = silhouette.width;
    const height = silhouette.height;
    const aspectRatio = silhouette.aspectRatio;
    
    // Determine base dimensions based on detected size or defaults
    let baseWidth = 1.0;
    let baseHeight = 1.0;
    
    if (aiState.detectedDimensions.width > 0) {
        baseWidth = aiState.detectedDimensions.width;
        baseHeight = aiState.detectedDimensions.height;
    } else {
        // Use aspect ratio to set dimensions
        if (aspectRatio > 1) {
            baseWidth = aspectRatio;
        } else {
            baseHeight = 1 / aspectRatio;
        }
    }
    
    // Create a grid-based geometry with proper triangulation and HIGH DETAIL
    const mask = silhouette.mask;
    const detailLevel = aiState.modelSettings.detailLevel;
    
    // HIGH-PRECISION step calculation - smaller step = more triangles = better detail
    // Very Low (1): step 20, Low (2): step 15, Medium (5): step 8, High (8): step 4, Extreme (10): step 2
    const step = Math.max(1, Math.floor(20 / Math.pow(detailLevel, 0.8)));
    
    const vertices = [];
    const indices = [];
    const uvs = [];
    
    // Build a 2D grid of vertices for pixels in the mask
    const vertexGrid = [];
    for (let y = 0; y < height; y += step) {
        vertexGrid[y] = [];
    }
    
    // Create vertices for all mask pixels with PRECISE UV mapping
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const idx = y * width + x;
            
            if (mask[idx] === 1) {
                // Normalize coordinates maintaining aspect ratio
                const nx = (x / width - 0.5) * baseWidth;
                const ny = -(y / height - 0.5) * baseHeight; // Flip Y for proper orientation
                
                // PRECISE UV coordinates - directly map to image for no distortion
                const u = x / width;
                const v = 1 - y / height; // Flip V for proper texture orientation
                
                const vertexIndex = vertices.length / 3;
                
                // Front face vertex with precise UV
                vertices.push(nx, ny, extrusionDepth / 2);
                uvs.push(u, v);
                
                vertexGrid[y][x] = { front: vertexIndex };
                
                // Back face vertex with precise UV
                vertices.push(nx, ny, -extrusionDepth / 2);
                uvs.push(u, v);
                
                vertexGrid[y][x].back = vertexIndex + 1;
            }
        }
    }
    
    // Create triangles for the front and back faces with proper winding
    for (let y = 0; y < height - step; y += step) {
        for (let x = 0; x < width - step; x += step) {
            const v00 = vertexGrid[y][x] || null;
            const v10 = vertexGrid[y][x + step] || null;
            const v01 = vertexGrid[y + step] ? vertexGrid[y + step][x] : null;
            const v11 = vertexGrid[y + step] ? vertexGrid[y + step][x + step] : null;
            
            // Create quads (2 triangles) for solid regions
            if (v00 && v10 && v01 && v11) {
                // Front face triangles (counter-clockwise for proper normals)
                indices.push(v00.front, v10.front, v01.front);
                indices.push(v10.front, v11.front, v01.front);
                
                // Back face triangles (clockwise for proper normals)
                indices.push(v00.back, v01.back, v10.back);
                indices.push(v10.back, v01.back, v11.back);
            }
        }
    }
    
    // Create side walls (edges) to connect front and back faces
    // This closes the gap and creates proper thickness
    for (let y = 0; y < height - step; y += step) {
        for (let x = 0; x < width - step; x += step) {
            const v00 = vertexGrid[y][x] || null;
            const v10 = vertexGrid[y][x + step] || null;
            const v01 = vertexGrid[y + step] ? vertexGrid[y + step][x] : null;
            const v11 = vertexGrid[y + step] ? vertexGrid[y + step][x + step] : null;
            
            // Check each edge of the quad and create side walls where there's an edge
            if (v00 && v10) {
                // Top edge - check if there's no neighbor above
                const vAbove = (y > 0 && vertexGrid[y - step] && vertexGrid[y - step][x]) ? vertexGrid[y - step][x] : null;
                if (!vAbove) {
                    // Create side wall quad connecting front to back
                    indices.push(v00.front, v00.back, v10.front);
                    indices.push(v10.front, v00.back, v10.back);
                }
            }
            
            if (v10 && v11) {
                // Right edge - check if there's no neighbor to the right
                const vRight = vertexGrid[y][x + (2 * step)] || null;
                if (!vRight) {
                    // Create side wall quad
                    indices.push(v10.front, v10.back, v11.front);
                    indices.push(v11.front, v10.back, v11.back);
                }
            }
            
            if (v01 && v11) {
                // Bottom edge - check if there's no neighbor below
                const vBelow = (vertexGrid[y + (2 * step)]) ? vertexGrid[y + (2 * step)][x] : null;
                if (!vBelow) {
                    // Create side wall quad
                    indices.push(v01.front, v11.front, v01.back);
                    indices.push(v01.back, v11.front, v11.back);
                }
            }
            
            if (v00 && v01) {
                // Left edge - check if there's no neighbor to the left
                const vLeft = (x > 0 && vertexGrid[y][x - step]) ? vertexGrid[y][x - step] : null;
                if (!vLeft) {
                    // Create side wall quad
                    indices.push(v00.front, v01.front, v00.back);
                    indices.push(v00.back, v01.front, v01.back);
                }
            }
        }
    }
    
    // If we have vertices, create the HIGH-QUALITY geometry
    if (vertices.length > 0 && indices.length > 0) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.setIndex(indices);
        
        // Compute smooth normals for better lighting
        geometry.computeVertexNormals();
        
        // Optimize geometry for better performance
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        
        console.log(`Generated high-quality 3D geometry with thickness: ${vertices.length/3} vertices, ${indices.length/3} triangles, Step: ${step}`);
        
        return geometry;
    } else {
        // Fallback: create simple box geometry maintaining aspect ratio
        console.warn('No valid geometry created, using fallback box');
        return new THREE.BoxGeometry(baseWidth, baseHeight, extrusionDepth);
    }
}

// Enhance image quality using AI-based upscaling for vector-like quality
async function enhanceImageQuality(img) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Target resolution for enhanced image (4x upscale for vector-like quality)
        const upscaleFactor = 4;
        const targetWidth = img.naturalWidth * upscaleFactor;
        const targetHeight = img.naturalHeight * upscaleFactor;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw the image at higher resolution
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        // Apply edge enhancement for sharper details
        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const enhancedData = applyEdgeEnhancement(imageData);
        ctx.putImageData(enhancedData, 0, 0);
        
        // Convert canvas to data URL
        const enhancedImageUrl = canvas.toDataURL('image/png', 1.0);
        
        console.log(`Image enhanced: ${img.naturalWidth}x${img.naturalHeight} → ${targetWidth}x${targetHeight} (${upscaleFactor}x upscale)`);
        
        resolve(enhancedImageUrl);
    });
}

// Apply edge enhancement filter to sharpen details
function applyEdgeEnhancement(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const outputData = output.data;
    
    // Sharpening kernel (enhance edges while preserving colors)
    const kernel = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];
    
    const kernelSize = 3;
    const half = Math.floor(kernelSize / 2);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            
            // Apply kernel
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const px = Math.min(width - 1, Math.max(0, x + kx - half));
                    const py = Math.min(height - 1, Math.max(0, y + ky - half));
                    const idx = (py * width + px) * 4;
                    const weight = kernel[ky * kernelSize + kx];
                    
                    r += data[idx] * weight;
                    g += data[idx + 1] * weight;
                    b += data[idx + 2] * weight;
                }
            }
            
            const idx = (y * width + x) * 4;
            outputData[idx] = Math.min(255, Math.max(0, r));
            outputData[idx + 1] = Math.min(255, Math.max(0, g));
            outputData[idx + 2] = Math.min(255, Math.max(0, b));
            outputData[idx + 3] = data[idx + 3]; // Preserve alpha
        }
    }
    
    return output;
}

// Create texture from image with MAXIMUM quality filtering and enhancement
async function createTextureFromImage(img) {
    return new Promise(async (resolve) => {
        // First, enhance the image quality for vector-like sharpness
        const enhancedImageUrl = await enhanceImageQuality(img);
        
        // Use the ENHANCED image for maximum quality
        const texture = new THREE.TextureLoader().load(
            enhancedImageUrl,
            (loadedTexture) => {
                // HIGHEST-QUALITY filtering settings
                loadedTexture.minFilter = THREE.LinearMipMapLinearFilter;
                loadedTexture.magFilter = THREE.LinearFilter;
                
                // Enable MAXIMUM anisotropic filtering for best quality at angles
                const maxAnisotropy = designState.renderer ? designState.renderer.capabilities.getMaxAnisotropy() : 16;
                loadedTexture.anisotropy = maxAnisotropy; // Use maximum available (typically 16)
                
                // Set wrapping mode to clamp to prevent texture repeating artifacts
                loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
                loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
                
                // Generate high-quality mipmaps
                loadedTexture.generateMipmaps = true;
                
                // Set encoding for proper color representation
                loadedTexture.encoding = THREE.sRGBEncoding;
                
                // Ensure texture updates
                loadedTexture.needsUpdate = true;
                
                console.log('High-quality ENHANCED texture created with 4x upscaling:', {
                    originalSize: `${img.naturalWidth}x${img.naturalHeight}`,
                    enhancedSize: `${loadedTexture.image?.width}x${loadedTexture.image?.height}`,
                    anisotropy: loadedTexture.anisotropy,
                    minFilter: loadedTexture.minFilter,
                    magFilter: loadedTexture.magFilter
                });
                
                resolve(loadedTexture);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                // Create basic texture as fallback
                const basicTexture = new THREE.Texture();
                basicTexture.needsUpdate = true;
                resolve(basicTexture);
            }
        );
    });
}

// Replace current 3D model with generated one
function replaceWith3DModel(geometry, texture) {
    if (!designState.scene) return;
    
    // Remove old mesh
    if (designState.mesh) {
        designState.scene.remove(designState.mesh);
        if (designState.mesh.geometry) designState.mesh.geometry.dispose();
        if (designState.mesh.material) designState.mesh.material.dispose();
    }
    
    // Set MAXIMUM quality texture filtering to prevent pixelation
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    
    // Enable MAXIMUM anisotropic filtering for best quality at angles
    if (designState.renderer) {
        const maxAnisotropy = designState.renderer.capabilities.getMaxAnisotropy();
        texture.anisotropy = maxAnisotropy;
        console.log('Applied maximum anisotropy:', maxAnisotropy);
    }
    
    // Set wrapping to clamp to prevent edge artifacts
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    // Set proper encoding for color accuracy
    texture.encoding = THREE.sRGBEncoding;
    
    // Create HIGH-QUALITY material with uploaded image as texture
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xffffff,  // Pure white to not tint the texture
        roughness: 0.4,   // Slightly glossy for better light interaction
        metalness: 0.1,   // Slight metalness for aluminum appearance
        side: THREE.DoubleSide,
        flatShading: false,  // Smooth shading for better appearance
        transparent: false,
        opacity: 1.0
    });
    
    // Create new mesh with high-quality settings
    designState.mesh = new THREE.Mesh(geometry, material);
    
    // Enable shadows for better realism
    designState.mesh.castShadow = true;
    designState.mesh.receiveShadow = true;
    
    designState.scene.add(designState.mesh);
    
    // Store texture and clone as original for color preservation
    designState.texture = texture;
    designState.originalTexture = texture.clone();
    designState.originalTexture.minFilter = THREE.LinearMipMapLinearFilter;
    designState.originalTexture.magFilter = THREE.LinearFilter;
    designState.originalTexture.anisotropy = texture.anisotropy;
    designState.originalTexture.needsUpdate = true;
    
    // Update camera position for better view
    if (designState.camera) {
        const box = new THREE.Box3().setFromObject(designState.mesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 2.5;
        designState.camera.position.set(0, 0, distance);
    }
}

// Show AI status message
function showAIStatus(message, type) {
    const statusElement = document.getElementById('ai-status');
    statusElement.textContent = message;
    statusElement.className = `ai-status ${type}`;
    statusElement.classList.remove('hidden');
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusElement.classList.add('hidden');
        }, 5000);
    }
}

// ========================================
// Vision-to-CAD Translation Engine
// ========================================

// CAD schema state
const cadSchema = {
    componentHierarchy: [],
    geometryPatterns: [],
    scalingRules: [],
    materialMapping: [],
    metadata: {}
};

// Analyze image for CAD translation using Gemini API
async function analyzeForCADTranslation(imageFile) {
    try {
        showAIStatus('Analyzing image for CAD translation...', 'analyzing');
        
        // Convert file to base64
        const base64Image = await fileToBase64(imageFile);
        
        // Prepare request to Gemini API with CAD-specific prompt
        const requestBody = {
            contents: [{
                parts: [
                    {
                        text: `You are a Vision-to-CAD Geometric Parser with EXPERT-LEVEL precision. Your task is to extract a high-fidelity, non-pixelated vector map of the foreground object while completely ignoring background noise, foliage, or environment.

⚠️ CRITICAL: COMPLETE ANALYSIS REQUIRED ⚠️
- YOU MUST analyze and document EVERY single visible component in the design
- DO NOT skip or omit any design elements, no matter how small
- DO NOT truncate your response - provide the COMPLETE JSON structure
- ALL sections must be filled with comprehensive data
- The design pattern integrity MUST be preserved in your output
- Missing components = incomplete analysis = FAILURE

CRITICAL ACCURACY REQUIREMENTS:
- Analyze with extreme attention to detail
- Measure all dimensions relative to product bounding box with 0.01 precision (2 decimal places)
- Identify EVERY visible component, no matter how small - decorative elements, hardware, structural pieces
- Provide confidence scores for each major detection
- Cross-validate measurements across different analysis sections
- If uncertain about any detail, mark it explicitly with lower confidence
- Ensure ALL arrays (product_decomposition, vector_paths, material_classes, depth_analysis, parametric_scaling) contain complete data

ANALYSIS INSTRUCTIONS:

1. OBJECT ISOLATION AND SEMANTIC CLEANUP (Deep Segmentation):
   - FOREGROUND OBJECT ISOLATION:
     * Perform deep semantic segmentation to isolate the primary object (e.g., gate, door, or product) from the background
     * Completely ignore background noise, foliage, grass, trees, sky, or environment
     * Treat all areas visible THROUGH the gaps/openings of the object as "void" or "null space"
     * Mark void spaces with geometry_type: "negative_space" in vector_paths
   
   - EDGE SMOOTHING & MATHEMATICAL CONTINUITY:
     * Ensure edges are mathematically smooth and continuous
     * Remove any "shredding" or pixel artifacts caused by background interference
     * Convert ragged pixel boundaries into clean bezier curves or smooth polylines
     * Use minimum 0.001 precision for curve control points
     * Mark edge_smoothing_applied: true in metadata
   
   - VOID SPACE DETECTION:
     * Identify all see-through areas (gaps between bars, window openings, decorative cutouts)
     * For each void, create a vector path entry with geometry_type: "negative_space"
     * Provide precise boundary coordinates for each void area
     * Document void purpose (structural gap, decorative opening, functional space)

2. MULTI-LAYER PATH EXTRACTION (Non-Pixelating Vector Conversion):
   - Convert identified geometry into clean, mathematical vector paths (SVG/DXF style)
   - NO PIXELATION: All paths must be resolution-independent bezier curves or polygons
   
   - LAYER 01 (Base Frame - Structural Foundation):
     * Extract the structural foundation as a single, connected geometry
     * Include: outer frame, main body, structural rails, support beams
     * Mark all Layer 01 components with layer_id: "LAYER_01_BASE_FRAME"
     * Provide closed polygon or bezier path for entire frame perimeter
     * This forms the primary structural container
   
   - LAYER 02 (Ornamentation - Decorative Elements):
     * Isolate EVERY decorative element, inlay, or overlay as a separate vector path
     * Include: medallions, scrollwork, relief patterns, ornamental crests, inlays
     * Mark all Layer 02 components with layer_id: "LAYER_02_ORNAMENTATION"
     * Each ornament must have its own vector path with precise boundary
     * Specify if ornament is Integrated (embossed) or Applied (attached)
   
   - LAYER 03 (Hardware - Functional Components):
     * Isolate functional components like handles, locks, hinges
     * Include: door handles, locks, keyholes, hinges, brackets, knobs
     * Mark all Layer 03 components with layer_id: "LAYER_03_HARDWARE"
     * Hardware typically has fixed dimensions (do not stretch)
     * Specify standard hardware sizes where applicable

3. PRODUCT DECOMPOSITION & SEGMENTATION (Maximum Precision):
   - PRIMARY CHASSIS IDENTIFICATION:
     * Identify the main body/frame as the foundational structure
     * Provide bounding box coordinates in normalized 0.0-1.0 space
     * Note material composition and structural purpose
   
   - SUB-COMPONENT INVENTORY (exhaustive list):
     * Structural: frames, rails, panels, slats, bars, posts, beams
     * Hardware: handles, locks, hinges, brackets, screws, bolts, knockers
     * Decorative: ornaments, medallions, crests, inlays, relief work, scrollwork
     * Functional: glass sections, weather strips, thresholds, seals
     * Fasteners: visible mounting points, connection elements
   
   - ATTACHMENT TYPE CLASSIFICATION (critical for 3D modeling):
     * "Integrated" = Part of the original mold/casting, cannot be removed without destroying the component
       Examples: embossed patterns on a door panel, molded frame details, cast ornamental features
     * "Applied" = Separate piece attached to the surface, can be removed/replaced
       Examples: screw-on handles, glued ornaments, bolted hinges, adhesive medallions
     * For EACH component, analyze shadows, edges, and depth to determine attachment type
     * Confidence score for each classification (0.0 to 1.0)

4. VECTOR & GEOMETRIC MAPPING (Mathematical Precision):
   - SILHOUETTE TRACING:
     * Trace outer boundary as closed polygon with vertices in normalized coordinates
     * Minimum 8 vertices for simple rectangles, 16+ for complex shapes
     * List vertices clockwise starting from top-left
   
   - INTERNAL DECORATIVE PATHS:
     * For each decorative element, provide SVG path notation or polygon vertices
     * Specify curve types: bezier (with control points), arc (with radius), or line
     * Mark start point, end point, and all control/inflection points
   
   - NORMALIZED COORDINATE SYSTEM (0.0 to 1.0):
     * 0.0 = Left edge (X) or Top edge (Y)
     * 1.0 = Right edge (X) or Bottom edge (Y)
     * 0.5 = Center
     * Use 2 decimal places minimum (0.00 to 1.00), 3 decimals for high precision (0.000 to 1.000)
     * Example: Handle at center = (0.500, 0.500)
   
   - SYMMETRY PLANE DETECTION (Critical for balanced scaling):
     * VERTICAL SYMMETRY: Check if left half mirrors right half
       - If symmetric, mark vertical: true and specify axis position (typically 0.50)
       - Calculate symmetry confidence score (0.0-1.0)
     * HORIZONTAL SYMMETRY: Check if top half mirrors bottom half
       - If symmetric, mark horizontal: true and specify axis position
       - Calculate symmetry confidence score (0.0-1.0)
     * Asymmetric designs: Mark both as false
     * Measure deviation from perfect symmetry in percentage

3. MATERIAL & COMPONENT CLASSES - MODIFICATION HOOKS (Exhaustive Classification):
   - CLASS ID NAMING CONVENTION:
     * MAT_PRIMARY = Main structural material (frame, body, panels)
     * MAT_ACCENT_01, MAT_ACCENT_02, etc. = Secondary decorative materials
     * MAT_HARDWARE = All functional hardware (handles, locks, hinges)
     * MAT_GLASS = Transparent/translucent sections
     * MAT_TRIM = Border or edge materials
     * Use descriptive suffixes: MAT_GOLD_HARDWARE, MAT_WOOD_FRAME, MAT_BRONZE_ORNAMENT
   
   - COLOR DETECTION (High Precision):
     * Sample multiple areas of each component
     * Average the samples to get representative color
     * Provide HEX code: #RRGGBB (e.g., #D4AF37 for gold)
     * Provide RGB values: [R, G, B] where each is 0-255
     * Note if color varies across component (gradient/weathering)
   
   - FINISH CLASSIFICATION (Visual Analysis):
     * Matte = No shine, diffuse reflection, flat appearance
     * Polished = Mirror-like shine, specular highlights, reflective
     * Brushed = Directional grain pattern, semi-reflective
     * Grained = Wood grain or textured surface pattern
     * Hammered = Dimpled or textured metallic surface
     * Patina = Aged or weathered finish with color variation
   
   - OPACITY DETERMINATION:
     * Solid = Completely opaque, no light transmission (0% transparency)
     * Translucent = Partial light transmission, diffused (1-99% transparency)
     * Transparent = Clear light transmission, see-through (90-100% transparency)
     * Measure based on visible background through material

5. COMPONENT CLASS AND COLOR MAPPING (Unique Identification):
   - Detect every unique color and texture. Group them into "Component Classes"
   - Assign unique descriptive IDs to each Class using this naming convention:
   
   - ENHANCED CLASS ID NAMING (Use Descriptive Names):
     * CLASS_BLACK_IRON = Black wrought iron structural elements
     * CLASS_GOLD_LEAF = Gold or brass decorative accents
     * CLASS_BRONZE_ORNAMENT = Bronze ornamental features
     * CLASS_DARK_WOOD = Dark wood grain panels or frames
     * CLASS_BRUSHED_STEEL = Brushed stainless steel hardware
     * CLASS_CLEAR_GLASS = Transparent glass sections
     * CLASS_WHITE_FRAME = White painted frame elements
     * CLASS_COPPER_HARDWARE = Copper or rose gold hardware
     * Use format: CLASS_[COLOR]_[MATERIAL] for each unique material group
     * Examples: CLASS_MATTE_BLACK, CLASS_POLISHED_CHROME, CLASS_OAK_WOOD
   
   - For each Component Class in material_classes array, provide:
     * class_id: Unique descriptive ID (e.g., "CLASS_BLACK_IRON", "CLASS_GOLD_LEAF")
     * name: Human-readable name
     * detected_color_hex: Hex color code (e.g., #000000, #D4AF37)
     * rgb: RGB values [R, G, B] where each is 0-255
     * finish: Matte, Metallic, Wood, Polished, Brushed, Hammered, Patina
     * material_type: Metal, Wood, Glass, Plastic, Composite
     * texture: smooth, brushed, wood_grain, hammered, etc.
     * components: Array of all component IDs using this class

6. 3D PARAMETRIC LOGIC (Depth and Scaling Rules):
   - RELATIVE Z-DEPTH ASSIGNMENT (Per Layer):
     * Assign a relative Z-depth to each layer in depth_analysis array:
       - Base Frame (Layer 01) = 0mm (reference plane)
       - Ornaments (Layer 02) = +10mm extrusion (or appropriate depth)
       - Hardware (Layer 03) = +15mm to +30mm (protruding elements)
     * For recessed/engraved elements use negative Z-depth (e.g., -5mm)
     * All depth values are relative to the base plane
     * Include z_depth_mm field for each component
   
   - SCALING ANCHORS (Fixed Aspect Ratio Components):
     * In parametric_scaling array, specify components that must maintain fixed aspect ratio
     * When overall height/width is adjusted, these components:
       - Maintain their aspect ratio (no distortion)
       - May scale uniformly but preserve proportions
       - Examples: handles, central crest, medallions, logos, hardware
     * Define anchor_point: {x: 0.0-1.0, y: 0.0-1.0} where component stays fixed during resize
     * Mark with scale_lock: true and behavior: "fixed"
     * Include fixed_aspect_ratio: true in constraints
   
   - REPEATING UNITS (Pattern Multiplication):
     * For gates, fences, or patterned products, identify repeating elements
     * These patterns should REPEAT (multiply) rather than STRETCH
     * In parametric_scaling, mark with behavior: "adaptive_repeat"
     * Specify:
       - repetition_axis: "horizontal" (for vertical bars), "vertical" (for horizontal slats), or "both"
       - base_spacing_cm: distance between repeated elements (e.g., 10cm)
       - min_spacing_cm and max_spacing_cm: allowable spacing range
       - repetition_rule: Description of how pattern repeats
     * Examples: "Vertical bars repeat every 10cm. When width increases, add more bars at same 10cm spacing"

7. PARAMETRIC SCALING & TRANSFORMATION LOGIC (Engineering Rules):
   - STATIC ELEMENTS (Never stretch - maintain absolute size):
     * Logos, brand marks, text labels
     * Door handles, knobs, levers (standard hardware sizes)
     * Lock cylinders, keyhole plates (standard sizes)
     * Bolts, screws, fasteners (fixed dimensions)
     * Hinges (standard hardware)
     * Small decorative medallions (preserve detail)
     * Specify exact dimensions: width_mm, height_mm
     * Anchor point: where element attaches (typically center: 0.5, 0.5)
     * Examples: "12cm handle stays 12cm regardless of door size"
   
   - DYNAMIC ELEMENTS (Stretch to fill available space):
     * Flat panels (expand to fit frame)
     * Glass sections (scale with opening)
     * Solid doors (scale proportionally)
     * Support beams (extend along dimension)
     * Background fill areas
     * Border frames (follow perimeter)
     * Specify minimum and maximum scale limits
     * Examples: "Panel stretches from frame edge to frame edge"
   
   - REPEATING ELEMENTS (Multiply to fill space, don't stretch):
     * Vertical bars in fences/gates (add more bars for wider spans)
     * Horizontal slats (add more slats for taller heights)
     * Decorative pattern tiles (tile to fill area)
     * Balusters in railings (spacing-based repetition)
     * Grid patterns (repeat cells)
     * Specify: base_spacing_cm, min_spacing_cm, max_spacing_cm
     * Specify: repetition_axis (horizontal, vertical, or both)
     * Examples: "Bars repeat every 10cm, add/remove bars as width changes"

5. 3D DEPTH & EXTRUSION DATA (Precision Depth Analysis):
   - DEPTH ANALYSIS FROM VISUAL CUES:
     * Analyze shadows: darker shadow = greater depth
     * Analyze highlights: edge highlights indicate raised surfaces
     * Analyze perspective: parallax indicates depth
     * Look for edge thickness visible in photo
   
   - LAYER CATEGORIZATION (Three-tier system):
     * "Base Layer" = Main surface plane, Z-depth = 0mm, reference surface
     * "Embossed/Raised" = Elements projecting outward, positive Z-depth
       - Light raised: +1 to +5mm (subtle texture, embossed patterns)
       - Medium raised: +6 to +15mm (relief work, shallow ornaments)
       - Heavy raised: +16 to +50mm (handles, deep sculptural elements)
     * "Engraved/Recessed" = Elements cut inward, negative Z-depth
       - Light recessed: -1 to -3mm (engraved lines, grooves)
       - Medium recessed: -4 to -10mm (inset panels, carved details)
       - Deep recessed: -11mm+ (deep cuts, through-holes)
   
   - DEPTH MEASUREMENTS (Estimated from image):
     * z_depth_mm: relative to base surface (+ for raised, - for recessed, 0 for base)
     * thickness_mm: how thick the component is (front to back)
     * For applied elements: thickness = how far it protrudes
     * For integrated elements: thickness = depth of feature
     * Confidence level for each depth estimate
   
   - LAYERING ORDER:
     * 0 = Base layer (main surface)
     * 1 = First layer on top of base
     * 2 = Second layer (on top of layer 1)
     * Higher numbers = further from surface
     * Negative numbers = cut into surface

6. CROSS-VALIDATION & QUALITY ASSURANCE:
   - Ensure component IDs are consistent across all sections
   - Verify that material_class_id in components matches class_id in material_classes
   - Confirm normalized coordinates stay within 0.0-1.0 range
   - Check that child components are positioned within parent boundaries
   - Validate that Z-depths create logical stacking order
   - Ensure Static elements have anchor points specified
   - Verify Repeating elements have spacing rules defined

7. OUTPUT FORMAT: Provide response as structured JSON with these exact keys:
{
  "metadata": {
    "product_type": "string",
    "overall_style": "string",
    "primary_function": "string",
    "primary_chassis": "Description of main body structure",
    "image_quality": "clear|pixelated|blurry|unclear",
    "confidence_level": "high|medium|low",
    "analysis_precision": "percentage 0-100",
    "total_components_detected": 0,
    "edge_smoothing_applied": true|false,
    "void_spaces_detected": 0,
    "symmetry_planes": {
      "vertical": true|false,
      "horizontal": true|false,
      "vertical_axis": 0.0-1.0,
      "horizontal_axis": 0.0-1.0,
      "vertical_symmetry_confidence": 0.0-1.0,
      "horizontal_symmetry_confidence": 0.0-1.0,
      "symmetry_deviation_percent": 0.0
    },
    "bounding_box": {
      "width_pixels": 0,
      "height_pixels": 0,
      "aspect_ratio": 0.0
    }
  },
  "product_decomposition": [
    {
      "id": "COMP-XXX",
      "name": "Component Name",
      "type": "structural|hardware|decorative|functional|fastener",
      "layer_id": "LAYER_01_BASE_FRAME|LAYER_02_ORNAMENTATION|LAYER_03_HARDWARE",
      "attachment_type": "Integrated|Applied",
      "attachment_confidence": 0.0-1.0,
      "parent_id": "COMP-YYY or null",
      "material_class_id": "CLASS_BLACK_IRON|CLASS_GOLD_LEAF|CLASS_DARK_WOOD|etc",
      "size_category": "large|medium|small|tiny",
      "detection_confidence": 0.0-1.0
    }
  ],
  "vector_paths": [
    {
      "id": "PATH-XXX",
      "name": "Path Name",
      "layer_id": "LAYER_01_BASE_FRAME|LAYER_02_ORNAMENTATION|LAYER_03_HARDWARE",
      "geometry_type": "negative_space|solid_geometry",
      "shape": "rectangle|circle|polygon|path|arc|bezier",
      "svg_path": "SVG path notation or null",
      "vertices": [[x1,y1], [x2,y2], [x3,y3]],
      "curve_type": "line|arc|bezier",
      "control_points": [[cx1,cy1], [cx2,cy2]],
      "description": "Mathematical description for extrusion",
      "precision_level": 0.001-0.1,
      "void_space": true|false
    }
  ],
  "component_hierarchy": [
    {
      "id": "COMP-XXX",
      "name": "Component Name",
      "type": "structural|hardware|decorative|functional",
      "layer_id": "LAYER_01_BASE_FRAME|LAYER_02_ORNAMENTATION|LAYER_03_HARDWARE",
      "parent_id": "COMP-YYY or null",
      "attachment_type": "Integrated|Applied",
      "material_class_id": "CLASS_BLACK_IRON|CLASS_GOLD_LEAF|CLASS_DARK_WOOD|etc",
      "base_color_hex": "#RRGGBB",
      "material_type": "Metal|Wood|Glass|Plastic|Composite",
      "z_depth_mm": 0.0,
      "depth_type": "raised|embossed|recessed|engraved|flat",
      "thickness_mm": 0.0,
      "scale_lock": true|false,
      "detection_confidence": 0.0-1.0
    }
  ],
  "material_classes": [
    {
      "class_id": "CLASS_BLACK_IRON|CLASS_GOLD_LEAF|CLASS_DARK_WOOD|CLASS_BRUSHED_STEEL|etc",
      "name": "Descriptive name (e.g., Black Wrought Iron, Gold Decorative Leaf, Dark Oak Wood)",
      "detected_color_hex": "#RRGGBB",
      "rgb": [r, g, b],
      "color_variance": "uniform|gradient|weathered",
      "finish": "Matte|Polished|Brushed|Grained|Hammered|Patina|Metallic|Wood",
      "opacity": "Solid|Translucent|Transparent",
      "opacity_percent": 0-100,
      "material_type": "Metal|Wood|Glass|Plastic|Composite",
      "texture": "smooth|brushed|wood_grain|glass|matte|hammered",
      "surface_finish": "glossy|matte|satin|brushed|textured",
      "reflectivity": "none|low|medium|high",
      "components": ["COMP-XXX", "COMP-YYY"],
      "sample_locations": [[x1,y1], [x2,y2]],
      "detection_confidence": 0.0-1.0
    }
  ],
  "geometry_patterns": [
    {
      "component_id": "COMP-XXX",
      "shape": "rectangle|circle|polygon|path",
      "normalized_coordinates": {
        "x_start": 0.000-1.000,
        "y_start": 0.000-1.000,
        "x_end": 0.000-1.000,
        "y_end": 0.000-1.000
      },
      "vertices": [[x1,y1], [x2,y2]],
      "symmetry": "none|vertical|horizontal|both",
      "precision": 0.001
    }
  ],
  "depth_analysis": [
    {
      "component_id": "COMP-XXX",
      "layer_id": "LAYER_01_BASE_FRAME|LAYER_02_ORNAMENTATION|LAYER_03_HARDWARE",
      "z_depth_mm": 0.0,
      "layer_category": "Base Layer|Embossed/Raised|Engraved/Recessed",
      "depth_type": "raised|embossed|recessed|engraved|flat",
      "depth_intensity": "light|medium|heavy|deep",
      "thickness_mm": 0.0,
      "layer_order": 0,
      "relative_to": "base_frame|surface",
      "depth_confidence": 0.0-1.0,
      "visual_cues": ["shadow|highlight|edge|perspective"]
    }
  ],
  "parametric_scaling": [
    {
      "component_id": "COMP-XXX",
      "element_type": "Static|Dynamic|Repeating",
      "behavior": "fixed|adaptive_stretch|adaptive_repeat",
      "scale_lock": true|false,
      "fixed_aspect_ratio": true|false,
      "anchor_point": {"x": 0.000-1.000, "y": 0.000-1.000},
      "constraints": "description of scaling constraints",
      "dimensions_mm": {"width": 0, "height": 0},
      "min_scale": 0.0,
      "max_scale": 0.0,
      "repetition_rule": "spacing value for repeating elements",
      "repetition_axis": "horizontal|vertical|both",
      "base_spacing_cm": 0.0,
      "min_spacing_cm": 0.0,
      "max_spacing_cm": 0.0
    }
  ],
  "editable_attributes": [
    {
      "component_id": "COMP-XXX",
      "component_name": "Descriptive name",
      "material_class_id": "MAT_PRIMARY|MAT_ACCENT_01|etc",
      "base_color_hex": "#RRGGBB",
      "material_type": "Metal|Wood|Glass|Plastic|Matte",
      "z_depth_mm": 0.0,
      "thickness_mm": 0.0,
      "scale_lock": true|false,
      "editable": true,
      "recommended_modifications": ["color|material|depth|size"]
    }
  ],
  "quality_metrics": {
    "total_components": 0,
    "components_with_high_confidence": 0,
    "average_confidence": 0.0-1.0,
    "symmetry_detected": true|false,
    "material_classes_count": 0,
    "depth_layers_count": 0,
    "validation_status": "passed|warnings|failed",
    "warnings": []
  }
}

⚠️ FINAL REMINDERS - CRITICAL FOR SUCCESS ⚠️
1. Your response MUST include the COMPLETE JSON structure - do not truncate or abbreviate
2. EVERY visible component must be documented in product_decomposition
3. ALL material classes must be identified and listed
4. Vector paths must capture ALL geometric elements
5. Depth analysis must cover ALL layers and components
6. Parametric scaling rules must be defined for ALL component types
7. The design pattern MUST be preserved completely - no missing pieces allowed
8. If the response is getting long, prioritize completeness over brevity
9. Even if the image is pixelated or unclear, make your best analysis and provide confidence_level
10. Provide ONLY the complete JSON object with ALL sections filled, no additional text or explanations`
                    },
                    {
                        inline_data: {
                            mime_type: imageFile.type,
                            data: base64Image
                        }
                    }
                ]
            }],
            generationConfig: {
                maxOutputTokens: 8192,  // Configured limit for complete analysis (balances completeness with performance)
                temperature: 0.2,       // Lower temperature for more consistent, accurate output
                topK: 40,
                topP: 0.95
            }
        };
        
        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract and parse CAD analysis results
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const analysisText = data.candidates[0].content.parts[0].text;
            
            // Parse JSON from response (handle code blocks if present)
            let jsonText = analysisText;
            const jsonMatch = analysisText.match(/```json\s*([\s\S]*?)\s*```/) || 
                            analysisText.match(/```\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                jsonText = jsonMatch[1];
            }
            
            try {
                const cadData = JSON.parse(jsonText);
                
                // Validate completeness of the response
                const validationWarnings = [];
                
                // Check for essential sections
                if (!cadData.metadata || Object.keys(cadData.metadata).length === 0) {
                    validationWarnings.push('Missing metadata section');
                }
                
                if (!cadData.product_decomposition || cadData.product_decomposition.length === 0) {
                    validationWarnings.push('Missing product decomposition - no components detected');
                }
                
                if (!cadData.material_classes || cadData.material_classes.length === 0) {
                    validationWarnings.push('Missing material classes - color/material analysis incomplete');
                }
                
                if (!cadData.vector_paths || cadData.vector_paths.length === 0) {
                    validationWarnings.push('Missing vector paths - geometric data incomplete');
                }
                
                if (!cadData.depth_analysis || cadData.depth_analysis.length === 0) {
                    validationWarnings.push('Missing depth analysis - 3D information incomplete');
                }
                
                if (!cadData.parametric_scaling || cadData.parametric_scaling.length === 0) {
                    validationWarnings.push('Missing parametric scaling rules - transformation logic incomplete');
                }
                
                // Check if response was likely truncated
                const finishReason = data.candidates[0].finishReason;
                if (finishReason === 'MAX_TOKENS' || finishReason === 'SAFETY' || finishReason === 'LENGTH' || finishReason === 'OTHER') {
                    validationWarnings.push(`Response may be incomplete - finish reason: ${finishReason}`);
                }
                
                // Store in CAD schema state
                cadSchema.metadata = cadData.metadata || {};
                cadSchema.productDecomposition = cadData.product_decomposition || [];
                cadSchema.vectorPaths = cadData.vector_paths || [];
                cadSchema.componentHierarchy = cadData.component_hierarchy || [];
                cadSchema.materialClasses = cadData.material_classes || [];
                cadSchema.geometryPatterns = cadData.geometry_patterns || [];
                cadSchema.depthAnalysis = cadData.depth_analysis || [];
                cadSchema.parametricScaling = cadData.parametric_scaling || [];
                cadSchema.editableAttributes = cadData.editable_attributes || [];
                cadSchema.qualityMetrics = cadData.quality_metrics || {};
                
                // Add validation warnings to quality metrics
                if (validationWarnings.length > 0) {
                    if (!cadSchema.qualityMetrics.warnings) {
                        cadSchema.qualityMetrics.warnings = [];
                    }
                    cadSchema.qualityMetrics.warnings.push(...validationWarnings);
                    cadSchema.qualityMetrics.validation_status = 'warnings';
                    console.warn('CAD Schema Validation Warnings:', validationWarnings);
                }
                
                // Backward compatibility
                cadSchema.globalColorMap = cadData.global_color_map || cadData.material_classes || [];
                cadSchema.scalingRules = cadData.scaling_rules || cadData.parametric_scaling || [];
                cadSchema.materialMapping = cadData.material_mapping || [];
                
                console.log('CAD Schema Generated:', cadSchema);
                console.log('Quality Metrics:', cadSchema.qualityMetrics);
                
                // Log warning if incomplete
                if (validationWarnings.length > 0) {
                    console.warn('⚠️ Analysis may be incomplete. Consider retrying with a simpler prompt or higher resolution image.');
                    showAIStatus('⚠️ CAD schema generated with warnings - some sections may be incomplete', 'warning');
                } else {
                    showAIStatus('✅ CAD schema generated successfully!', 'success');
                }
                
                // Display the CAD schema
                displayCADSchema(cadSchema);
                
                return cadSchema;
            } catch (parseError) {
                console.error('JSON parsing error:', parseError);
                console.log('Raw response:', analysisText);
                
                // Fallback: display as text
                displayCADSchemaAsText(analysisText);
                
                showAIStatus('✅ CAD analysis complete (text format)', 'success');
                return null;
            }
        }
    } catch (error) {
        console.error('CAD Translation error:', error);
        showAIStatus('Error generating CAD schema. Please try again.', 'error');
        return null;
    }
}

// Display CAD schema in structured format
function displayCADSchema(schema) {
    // Create or get CAD schema container
    let cadContainer = document.getElementById('cad-schema-container');
    
    if (!cadContainer) {
        const resultsContainer = document.getElementById('ai-results-container');
        if (!resultsContainer) return;
        
        cadContainer = document.createElement('div');
        cadContainer.id = 'cad-schema-container';
        cadContainer.className = 'cad-schema';
        resultsContainer.appendChild(cadContainer);
    }
    
    let html = '<div class="cad-section">';
    html += '<h4>🔧 Universal Product Engineering Analyst - Digital Twin Schema</h4>';
    html += '<p class="schema-subtitle">High-precision reconstruction schema for 3D orbit viewing and real-time modification</p>';
    
    // Metadata with confidence level and symmetry planes
    if (schema.metadata && Object.keys(schema.metadata).length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>📋 Product Metadata</h5>';
        html += '<div class="cad-details">';
        for (const [key, value] of Object.entries(schema.metadata)) {
            if (key === 'symmetry_planes') {
                // Display symmetry planes specially
                html += '<div class="cad-item"><strong>Symmetry Planes:</strong></div>';
                if (value.vertical) {
                    html += `<div class="cad-item-indent">✓ <strong>Vertical Symmetry:</strong> Axis at ${(value.vertical_axis || 0.5).toFixed(2)} (${(value.vertical_axis * 100 || 50).toFixed(0)}%)</div>`;
                }
                if (value.horizontal) {
                    html += `<div class="cad-item-indent">✓ <strong>Horizontal Symmetry:</strong> Axis at ${(value.horizontal_axis || 0.5).toFixed(2)} (${(value.horizontal_axis * 100 || 50).toFixed(0)}%)</div>`;
                }
                if (!value.vertical && !value.horizontal) {
                    html += '<div class="cad-item-indent">✗ No symmetry detected</div>';
                }
                continue;
            }
            
            let displayValue = value;
            if (key === 'confidence_level') {
                const confClass = value === 'high' ? 'confidence-high' : value === 'medium' ? 'confidence-medium' : 'confidence-low';
                displayValue = `<span class="${confClass}">${value.toUpperCase()}</span>`;
            } else if (typeof value === 'object') {
                displayValue = JSON.stringify(value);
            }
            html += `<div class="cad-item"><strong>${formatKey(key)}:</strong> ${displayValue}</div>`;
        }
        html += '</div></div>';
    }
    
    // Product Decomposition & Segmentation - NEW
    if (schema.productDecomposition && schema.productDecomposition.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>🔍 Product Decomposition & Multi-Layer Path Extraction</h5>';
        html += '<p class="subsection-description">Every sub-component identified with layer classification and attachment type</p>';
        html += '<table class="cad-table">';
        html += '<tr><th>ID</th><th>Component Name</th><th>Layer</th><th>Type</th><th>Attachment</th><th>Material Class</th></tr>';
        
        schema.productDecomposition.forEach(comp => {
            const attachmentClass = comp.attachment_type === 'Integrated' ? 'attachment-integrated' : 'attachment-applied';
            const layerBadge = comp.layer_id ? `<span class="layer-badge">${comp.layer_id.replace('LAYER_0', 'L').replace(/_/g, ' ')}</span>` : 'N/A';
            html += `<tr>
                <td><code>${comp.id}</code></td>
                <td>${comp.name}</td>
                <td>${layerBadge}</td>
                <td>${comp.type || 'N/A'}</td>
                <td><span class="${attachmentClass}">${comp.attachment_type || 'Unknown'}</span></td>
                <td><code>${comp.material_class_id || 'N/A'}</code></td>
            </tr>`;
        });
        
        html += '</table></div>';
    }
    
    // Vector Path Extraction
    if (schema.vectorPaths && schema.vectorPaths.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>🎯 Vector & Geometric Mapping (Non-Pixelating Paths)</h5>';
        html += '<p class="subsection-description">Clean mathematical vector paths with void space detection</p>';
        html += '<table class="cad-table">';
        html += '<tr><th>ID</th><th>Name</th><th>Layer</th><th>Type</th><th>Shape</th><th>Description</th></tr>';
        
        schema.vectorPaths.forEach(path => {
            const typeClass = path.geometry_type === 'negative_space' ? 'geometry-negative' : 'geometry-solid';
            const voidBadge = path.void_space ? '<span class="void-badge">VOID</span>' : '';
            const layerBadge = path.layer_id ? `<span class="layer-badge">${path.layer_id.replace('LAYER_0', 'L').replace(/_/g, ' ')}</span>` : 'N/A';
            html += `<tr>
                <td><code>${path.id}</code></td>
                <td>${path.name} ${voidBadge}</td>
                <td>${layerBadge}</td>
                <td><span class="${typeClass}">${path.geometry_type || 'N/A'}</span></td>
                <td>${path.shape || 'N/A'}</td>
                <td><small>${path.description || 'N/A'}</small></td>
            </tr>`;
        });
        
        html += '</table></div>';
    }
    
    // Material Classes (Component Classes) - NEW
    if (schema.materialClasses && schema.materialClasses.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>🎨 Material & Component Classes (Modification Hooks)</h5>';
        html += '<p class="subsection-description">Elements grouped by visual material and color for unified modifications</p>';
        
        schema.materialClasses.forEach(matClass => {
            const colorHex = matClass.detected_color_hex || matClass.hex_code || '#CCCCCC';
            html += '<div class="material-card">';
            html += `<div class="material-header">
                <code>${matClass.class_id}</code>: ${matClass.name}
                <span class="color-swatch" style="background: ${colorHex}; border: 1px solid #ccc;"></span>
            </div>`;
            html += '<div class="material-details">';
            
            if (colorHex) {
                html += `<div><strong>Detected Color:</strong> ${colorHex}`;
                if (matClass.rgb) {
                    html += ` (RGB: ${matClass.rgb.join(', ')})`;
                }
                html += '</div>';
            }
            
            if (matClass.finish) {
                html += `<div><strong>Finish:</strong> ${matClass.finish}</div>`;
            }
            
            if (matClass.opacity) {
                html += `<div><strong>Opacity:</strong> ${matClass.opacity}</div>`;
            }
            
            if (matClass.material_type) {
                html += `<div><strong>Material Type:</strong> ${matClass.material_type}</div>`;
            }
            
            if (matClass.texture) {
                html += `<div><strong>Texture:</strong> ${matClass.texture}</div>`;
            }
            
            if (matClass.surface_finish) {
                html += `<div><strong>Surface Finish:</strong> ${matClass.surface_finish}</div>`;
            }
            
            if (matClass.components && matClass.components.length > 0) {
                html += `<div><strong>Components:</strong> <code>${matClass.components.join(', ')}</code></div>`;
            }
            
            html += '</div></div>';
        });
        
        html += '</div>';
    }
    
    // Fallback to Global Color Map if materialClasses not present
    if ((!schema.materialClasses || schema.materialClasses.length === 0) && schema.globalColorMap && schema.globalColorMap.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>🎨 Material & Component Classes</h5>';
        html += '<p class="subsection-description">Unique color/material classes for component categorization</p>';
        
        schema.globalColorMap.forEach(colorClass => {
            html += '<div class="material-card">';
            html += `<div class="material-header">
                <code>${colorClass.class_id}</code>: ${colorClass.name}
                ${colorClass.hex_code ? `<span class="color-swatch" style="background: ${colorClass.hex_code}; border: 1px solid #ccc;"></span>` : ''}
            </div>`;
            html += '<div class="material-details">';
            
            if (colorClass.hex_code) {
                html += `<div><strong>Color Code:</strong> ${colorClass.hex_code}`;
                if (colorClass.rgb) {
                    html += ` (RGB: ${colorClass.rgb.join(', ')})`;
                }
                html += '</div>';
            }
            
            if (colorClass.material_type) {
                html += `<div><strong>Material Type:</strong> ${colorClass.material_type}</div>`;
            }
            
            if (colorClass.texture) {
                html += `<div><strong>Texture:</strong> ${colorClass.texture}</div>`;
            }
            
            if (colorClass.surface_finish) {
                html += `<div><strong>Surface Finish:</strong> ${colorClass.surface_finish}</div>`;
            }
            
            if (colorClass.components && colorClass.components.length > 0) {
                html += `<div><strong>Components:</strong> <code>${colorClass.components.join(', ')}</code></div>`;
            }
            
            html += '</div></div>';
        });
        
        html += '</div>';
    }
    
    // 3D Depth & Extrusion Data
    if (schema.depthAnalysis && schema.depthAnalysis.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>📏 3D Parametric Logic - Depth Analysis</h5>';
        html += '<p class="subsection-description">Relative Z-depth assignment per layer: Base Frame (0mm), Ornaments (+10mm), Hardware (+15-30mm)</p>';
        html += '<table class="cad-table">';
        html += '<tr><th>Component ID</th><th>Layer</th><th>Layer Category</th><th>Depth Type</th><th>Z-Depth (mm)</th><th>Thickness (mm)</th></tr>';
        
        schema.depthAnalysis.forEach(depth => {
            const layerCategory = depth.layer_category || 
                                 (depth.depth_type?.includes('raised') || depth.depth_type?.includes('embossed') ? 'Embossed/Raised' :
                                  depth.depth_type?.includes('recessed') || depth.depth_type?.includes('engraved') ? 'Engraved/Recessed' :
                                  'Base Layer');
            const layerBadge = depth.layer_id ? `<span class="layer-badge">${depth.layer_id.replace('LAYER_0', 'L').replace(/_/g, ' ')}</span>` : 'N/A';
            const depthClass = layerCategory === 'Embossed/Raised' ? 'depth-raised' : 
                              layerCategory === 'Engraved/Recessed' ? 'depth-recessed' : 'depth-base';
            html += `<tr>
                <td><code>${depth.component_id}</code></td>
                <td>${layerBadge}</td>
                <td><span class="${depthClass}">${layerCategory}</span></td>
                <td>${depth.depth_type || 'flat'}</td>
                <td>${depth.z_depth_mm != null ? depth.z_depth_mm.toFixed(1) : '0.0'}</td>
                <td>${depth.thickness_mm != null ? depth.thickness_mm.toFixed(1) : '0.0'}</td>
            </tr>`;
        });
        
        html += '</table></div>';
    }
    
    // Parametric Scaling & Transformation Logic
    if (schema.parametricScaling && schema.parametricScaling.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>⚙️ 3D Parametric Logic - Scaling Rules</h5>';
        html += '<p class="subsection-description">Scaling Anchors (fixed aspect ratio) and Repeating Units (multiply patterns)</p>';
        html += '<table class="cad-table">';
        html += '<tr><th>Component ID</th><th>Element Type</th><th>Behavior</th><th>Anchor</th><th>Aspect Lock</th><th>Constraints</th></tr>';
        
        schema.parametricScaling.forEach(rule => {
            const elementType = rule.element_type || 
                               (rule.behavior === 'fixed' ? 'Static' :
                                rule.behavior === 'adaptive_repeat' ? 'Repeating' : 'Dynamic');
            const elementClass = elementType === 'Static' ? 'element-static' :
                               elementType === 'Repeating' ? 'element-repeating' : 'element-dynamic';
            const anchor = rule.anchor_point ? `(${rule.anchor_point.x?.toFixed(2) || '?'}, ${rule.anchor_point.y?.toFixed(2) || '?'})` : 'N/A';
            const aspectLock = rule.fixed_aspect_ratio ? '🔒 Yes' : 'No';
            html += `<tr>
                <td><code>${rule.component_id}</code></td>
                <td><span class="${elementClass}">${elementType}</span></td>
                <td>${rule.behavior || 'N/A'}</td>
                <td><small>${anchor}</small></td>
                <td>${aspectLock}</td>
                <td><small>${rule.constraints || rule.repetition_rule || 'N/A'}</small></td>
            </tr>`;
        });
        
        html += '</table></div>';
    }
    
    // Fallback to old scalingRules if parametricScaling not present
    if ((!schema.parametricScaling || schema.parametricScaling.length === 0) && schema.scalingRules && schema.scalingRules.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>⚙️ Parametric Scaling Rules</h5>';
        html += '<table class="cad-table">';
        html += '<tr><th>Component ID</th><th>Behavior</th><th>Anchor</th><th>Constraints</th></tr>';
        
        schema.scalingRules.forEach(rule => {
            const anchor = rule.anchor_point ? `(${rule.anchor_point.x?.toFixed(2)}, ${rule.anchor_point.y?.toFixed(2)})` : 'N/A';
            const behaviorClass = rule.behavior === 'fixed' ? 'behavior-fixed' : 'behavior-adaptive';
            html += `<tr>
                <td><code>${rule.component_id}</code></td>
                <td><span class="${behaviorClass}">${rule.behavior || 'N/A'}</span></td>
                <td><small>${anchor}</small></td>
                <td><small>${rule.constraints || 'None'}</small></td>
            </tr>`;
        });
        
        html += '</table></div>';
    }
    
    // Material Mapping
    if (schema.materialMapping && schema.materialMapping.length > 0) {
        html += '<div class="cad-subsection">';
        html += '<h5>🎨 Material & Color Mapping</h5>';
        
        schema.materialMapping.forEach(material => {
            html += '<div class="material-card">';
            html += `<div class="material-header">
                <strong>${material.id}</strong>: ${material.name}
            </div>`;
            html += '<div class="material-details">';
            
            if (material.color) {
                html += `<div><strong>Color:</strong> ${material.color}`;
                if (material.color_code) {
                    html += ` <span class="color-swatch" style="background: ${material.color_code}"></span>`;
                }
                html += '</div>';
            }
            
            if (material.texture) {
                html += `<div><strong>Texture:</strong> ${material.texture}</div>`;
            }
            
            if (material.grain_direction && material.grain_direction !== 'none') {
                html += `<div><strong>Grain Direction:</strong> ${material.grain_direction}</div>`;
            }
            
            if (material.surface_finish) {
                html += `<div><strong>Surface Finish:</strong> ${material.surface_finish}</div>`;
            }
            
            if (material.components && material.components.length > 0) {
                html += `<div><strong>Used by:</strong> <code>${material.components.join(', ')}</code></div>`;
            }
            
            html += '</div></div>';
        });
        
        html += '</div>';
    }
    
    // Quality Metrics & Validation - NEW
    if (schema.qualityMetrics && Object.keys(schema.qualityMetrics).length > 0) {
        html += '<div class="cad-subsection quality-section">';
        html += '<h5>✅ Quality Metrics & Validation</h5>';
        html += '<p class="subsection-description">Analysis precision and validation results</p>';
        html += '<div class="cad-details">';
        
        const metrics = schema.qualityMetrics;
        
        if (metrics.total_components !== undefined) {
            html += `<div class="cad-item"><strong>Total Components Detected:</strong> ${metrics.total_components}</div>`;
        }
        
        if (metrics.components_with_high_confidence !== undefined) {
            html += `<div class="cad-item"><strong>High-Confidence Components:</strong> ${metrics.components_with_high_confidence}</div>`;
        }
        
        if (metrics.average_confidence !== undefined) {
            const avgConfPercent = (metrics.average_confidence * 100).toFixed(1);
            const confClass = metrics.average_confidence >= 0.8 ? 'confidence-high' : 
                             metrics.average_confidence >= 0.6 ? 'confidence-medium' : 'confidence-low';
            html += `<div class="cad-item"><strong>Average Confidence:</strong> <span class="${confClass}">${avgConfPercent}%</span></div>`;
        }
        
        if (metrics.symmetry_detected !== undefined) {
            const symIcon = metrics.symmetry_detected ? '✓' : '✗';
            html += `<div class="cad-item"><strong>Symmetry Detected:</strong> ${symIcon} ${metrics.symmetry_detected ? 'Yes' : 'No'}</div>`;
        }
        
        if (metrics.material_classes_count !== undefined) {
            html += `<div class="cad-item"><strong>Material Classes:</strong> ${metrics.material_classes_count}</div>`;
        }
        
        if (metrics.depth_layers_count !== undefined) {
            html += `<div class="cad-item"><strong>Depth Layers:</strong> ${metrics.depth_layers_count}</div>`;
        }
        
        if (metrics.validation_status) {
            const statusClass = metrics.validation_status === 'passed' ? 'status-passed' : 
                               metrics.validation_status === 'warnings' ? 'status-warnings' : 'status-failed';
            html += `<div class="cad-item"><strong>Validation Status:</strong> <span class="${statusClass}">${metrics.validation_status.toUpperCase()}</span></div>`;
        }
        
        if (metrics.warnings && metrics.warnings.length > 0) {
            html += '<div class="cad-item"><strong>Warnings:</strong><ul class="warning-list">';
            metrics.warnings.forEach(warning => {
                html += `<li>${warning}</li>`;
            });
            html += '</ul></div>';
        }
        
        html += '</div></div>';
    }
    
    // Export button
    html += '<div class="cad-actions">';
    html += '<button class="control-btn" onclick="exportCADSchema()">📥 Export CAD Schema (JSON)</button>';
    html += '<button class="control-btn" onclick="exportCADSchemaText()">📄 Export as Text</button>';
    html += '</div>';
    
    html += '</div>';
    
    cadContainer.innerHTML = html;
    cadContainer.classList.remove('hidden');
}

// Build hierarchical component tree HTML
function buildComponentTree(components, allComponents, level = 0) {
    let html = '';
    const indent = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
    
    components.forEach(comp => {
        const icon = getComponentIcon(comp.type);
        html += `<div class="component-item" style="margin-left: ${level * 20}px">`;
        html += `${icon} <code>${comp.id}</code>: ${comp.name} `;
        html += `<span class="component-type">[${comp.type}]</span> `;
        html += `<span class="component-material">MAT: ${comp.material_id}</span>`;
        html += '</div>';
        
        // Find children
        const children = allComponents.filter(c => c.parent_id === comp.id);
        if (children.length > 0) {
            html += buildComponentTree(children, allComponents, level + 1);
        }
    });
    
    return html;
}

// Get icon for component type
function getComponentIcon(type) {
    const icons = {
        'structural': '🏗️',
        'hardware': '🔧',
        'decorative': '✨',
        'functional': '⚙️'
    };
    return icons[type] || '📦';
}

// Format key for display
function formatKey(key) {
    return key.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Display CAD schema as text (fallback)
function displayCADSchemaAsText(text) {
    let cadContainer = document.getElementById('cad-schema-container');
    
    if (!cadContainer) {
        const resultsContainer = document.getElementById('ai-results-container');
        if (!resultsContainer) return;
        
        cadContainer = document.createElement('div');
        cadContainer.id = 'cad-schema-container';
        cadContainer.className = 'cad-schema';
        resultsContainer.appendChild(cadContainer);
    }
    
    let html = '<div class="cad-section">';
    html += '<h4>🔧 Vision-to-CAD Analysis</h4>';
    html += '<div class="cad-text-content">';
    
    // Format the text for better readability
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    html += `<p>${formattedText}</p>`;
    html += '</div>';
    
    html += '<div class="cad-actions">';
    html += '<button class="control-btn" onclick="exportCADSchemaTextContent()">📄 Export as Text</button>';
    html += '</div>';
    
    html += '</div>';
    
    cadContainer.innerHTML = html;
    cadContainer.classList.remove('hidden');
}

// Export CAD schema as JSON file
function exportCADSchema() {
    const dataStr = JSON.stringify(cadSchema, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cad-schema-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showAIStatus('CAD schema exported successfully!', 'success');
}

// Export CAD schema as formatted text with ALL new fields
function exportCADSchemaText() {
    let text = '=== UNIVERSAL PRODUCT ENGINEERING ANALYST - DIGITAL TWIN SCHEMA ===\n\n';
    
    // Metadata
    if (cadSchema.metadata && Object.keys(cadSchema.metadata).length > 0) {
        text += '--- PRODUCT METADATA ---\n';
        for (const [key, value] of Object.entries(cadSchema.metadata)) {
            if (key === 'symmetry_planes' && typeof value === 'object') {
                text += 'Symmetry Planes:\n';
                if (value.vertical) {
                    text += `  Vertical: YES (Axis: ${(value.vertical_axis || 0.5).toFixed(3)}, Confidence: ${((value.vertical_symmetry_confidence || 0) * 100).toFixed(0)}%)\n`;
                } else {
                    text += '  Vertical: NO\n';
                }
                if (value.horizontal) {
                    text += `  Horizontal: YES (Axis: ${(value.horizontal_axis || 0.5).toFixed(3)}, Confidence: ${((value.horizontal_symmetry_confidence || 0) * 100).toFixed(0)}%)\n`;
                } else {
                    text += '  Horizontal: NO\n';
                }
            } else if (typeof value === 'object') {
                text += `${formatKey(key)}: ${JSON.stringify(value)}\n`;
            } else {
                text += `${formatKey(key)}: ${value}\n`;
            }
        }
        text += '\n';
    }
    
    // Product Decomposition
    if (cadSchema.productDecomposition && cadSchema.productDecomposition.length > 0) {
        text += '--- PRODUCT DECOMPOSITION & SEGMENTATION ---\n';
        cadSchema.productDecomposition.forEach(comp => {
            text += `${comp.id}: ${comp.name}\n`;
            text += `  Type: ${comp.type}\n`;
            text += `  Attachment: ${comp.attachment_type || 'Unknown'}\n`;
            text += `  Material Class: ${comp.material_class_id || 'N/A'}\n`;
            if (comp.attachment_confidence !== undefined) {
                text += `  Attachment Confidence: ${(comp.attachment_confidence * 100).toFixed(0)}%\n`;
            }
            text += '\n';
        });
    }
    
    // Vector Paths
    if (cadSchema.vectorPaths && cadSchema.vectorPaths.length > 0) {
        text += '--- VECTOR & GEOMETRIC MAPPING ---\n';
        cadSchema.vectorPaths.forEach(path => {
            text += `${path.id}: ${path.name}\n`;
            text += `  Type: ${path.geometry_type}\n`;
            text += `  Shape: ${path.shape}\n`;
            if (path.description) {
                text += `  Description: ${path.description}\n`;
            }
            text += '\n';
        });
    }
    
    // Material Classes
    if (cadSchema.materialClasses && cadSchema.materialClasses.length > 0) {
        text += '--- MATERIAL & COMPONENT CLASSES (MODIFICATION HOOKS) ---\n';
        cadSchema.materialClasses.forEach(mat => {
            text += `${mat.class_id}: ${mat.name}\n`;
            if (mat.detected_color_hex) text += `  Detected Color: ${mat.detected_color_hex}\n`;
            if (mat.finish) text += `  Finish: ${mat.finish}\n`;
            if (mat.opacity) text += `  Opacity: ${mat.opacity}\n`;
            if (mat.material_type) text += `  Material Type: ${mat.material_type}\n`;
            if (mat.texture) text += `  Texture: ${mat.texture}\n`;
            if (mat.surface_finish) text += `  Surface Finish: ${mat.surface_finish}\n`;
            if (mat.components) text += `  Components: ${mat.components.join(', ')}\n`;
            if (mat.detection_confidence !== undefined) {
                text += `  Confidence: ${(mat.detection_confidence * 100).toFixed(0)}%\n`;
            }
            text += '\n';
        });
    }
    
    // Component Hierarchy
    if (cadSchema.componentHierarchy && cadSchema.componentHierarchy.length > 0) {
        text += '--- COMPONENT HIERARCHY ---\n';
        cadSchema.componentHierarchy.forEach(comp => {
            text += `${comp.id}: ${comp.name}\n`;
            text += `  Type: ${comp.type}\n`;
            if (comp.attachment_type) text += `  Attachment: ${comp.attachment_type}\n`;
            if (comp.material_class_id) text += `  Material Class: ${comp.material_class_id}\n`;
            if (comp.parent_id && comp.parent_id !== 'null') {
                text += `  Parent: ${comp.parent_id}\n`;
            }
            text += '\n';
        });
    }
    
    // Geometry Patterns
    if (cadSchema.geometryPatterns && cadSchema.geometryPatterns.length > 0) {
        text += '--- GEOMETRY PATTERNS (NORMALIZED 0.0-1.0) ---\n';
        cadSchema.geometryPatterns.forEach(pattern => {
            text += `${pattern.component_id}: ${pattern.shape}\n`;
            if (pattern.normalized_coordinates || pattern.coordinates) {
                const c = pattern.normalized_coordinates || pattern.coordinates;
                text += `  Start: (${c.x_start?.toFixed(3)}, ${c.y_start?.toFixed(3)})\n`;
                text += `  End: (${c.x_end?.toFixed(3)}, ${c.y_end?.toFixed(3)})\n`;
            }
            if (pattern.symmetry) text += `  Symmetry: ${pattern.symmetry}\n`;
            text += '\n';
        });
    }
    
    // 3D Depth Analysis
    if (cadSchema.depthAnalysis && cadSchema.depthAnalysis.length > 0) {
        text += '--- 3D DEPTH & EXTRUSION DATA ---\n';
        cadSchema.depthAnalysis.forEach(depth => {
            text += `${depth.component_id}\n`;
            text += `  Layer Category: ${depth.layer_category || 'Base Layer'}\n`;
            text += `  Depth Type: ${depth.depth_type || 'flat'}\n`;
            text += `  Z-Depth: ${depth.z_depth_mm?.toFixed(1) || '0.0'} mm\n`;
            text += `  Thickness: ${depth.thickness_mm?.toFixed(1) || '0.0'} mm\n`;
            text += `  Layer Order: ${depth.layer_order || 0}\n`;
            if (depth.depth_confidence !== undefined) {
                text += `  Confidence: ${(depth.depth_confidence * 100).toFixed(0)}%\n`;
            }
            text += '\n';
        });
    }
    
    // Parametric Scaling
    if (cadSchema.parametricScaling && cadSchema.parametricScaling.length > 0) {
        text += '--- PARAMETRIC SCALING & TRANSFORMATION LOGIC ---\n';
        cadSchema.parametricScaling.forEach(rule => {
            text += `${rule.component_id}\n`;
            text += `  Element Type: ${rule.element_type || 'Dynamic'}\n`;
            text += `  Behavior: ${rule.behavior}\n`;
            if (rule.anchor_point) {
                text += `  Anchor: (${rule.anchor_point.x?.toFixed(3)}, ${rule.anchor_point.y?.toFixed(3)})\n`;
            }
            if (rule.constraints) {
                text += `  Constraints: ${rule.constraints}\n`;
            }
            if (rule.repetition_rule) {
                text += `  Repetition: ${rule.repetition_rule}\n`;
            }
            text += '\n';
        });
    } else if (cadSchema.scalingRules && cadSchema.scalingRules.length > 0) {
        text += '--- PARAMETRIC SCALING RULES ---\n';
        cadSchema.scalingRules.forEach(rule => {
            text += `${rule.component_id}: ${rule.behavior}\n`;
            if (rule.anchor_point) {
                text += `  Anchor: (${rule.anchor_point.x?.toFixed(3)}, ${rule.anchor_point.y?.toFixed(3)})\n`;
            }
            if (rule.constraints) {
                text += `  Constraints: ${rule.constraints}\n`;
            }
            text += '\n';
        });
    }
    
    // Quality Metrics
    if (cadSchema.qualityMetrics && Object.keys(cadSchema.qualityMetrics).length > 0) {
        text += '--- QUALITY METRICS & VALIDATION ---\n';
        const m = cadSchema.qualityMetrics;
        if (m.total_components !== undefined) text += `Total Components: ${m.total_components}\n`;
        if (m.components_with_high_confidence !== undefined) text += `High-Confidence Components: ${m.components_with_high_confidence}\n`;
        if (m.average_confidence !== undefined) text += `Average Confidence: ${(m.average_confidence * 100).toFixed(1)}%\n`;
        if (m.symmetry_detected !== undefined) text += `Symmetry Detected: ${m.symmetry_detected ? 'YES' : 'NO'}\n`;
        if (m.material_classes_count !== undefined) text += `Material Classes: ${m.material_classes_count}\n`;
        if (m.depth_layers_count !== undefined) text += `Depth Layers: ${m.depth_layers_count}\n`;
        if (m.validation_status) text += `Validation Status: ${m.validation_status.toUpperCase()}\n`;
        if (m.warnings && m.warnings.length > 0) {
            text += 'Warnings:\n';
            m.warnings.forEach(w => text += `  - ${w}\n`);
        }
        text += '\n';
    }
    
    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `product-engineering-schema-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showAIStatus('Product Engineering Schema exported successfully!', 'success');
}

// Export text content from CAD analysis
function exportCADSchemaTextContent() {
    const container = document.getElementById('cad-schema-container');
    if (!container) return;
    
    const textContent = container.querySelector('.cad-text-content');
    if (!textContent) return;
    
    const text = textContent.innerText || textContent.textContent;
    
    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cad-analysis-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showAIStatus('CAD analysis exported successfully!', 'success');
}

// Event listener to update invoice when moving to step 6 and payment when moving to step 7
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Override goToStep for special handling of cart, invoice and payment
    const originalGoToStep = window.goToStep;
    window.goToStep = function(stepNumber) {
        if (stepNumber === 3) {
            // Initialize 3D design interface
            setTimeout(() => init3DDesign(), 100);
        } else if (stepNumber === 4) {
            displayCart();
        } else if (stepNumber === 6) {
            generateInvoice();
        } else if (stepNumber === 7) {
            setupPayment();
        }
        originalGoToStep(stepNumber);
    };
});
