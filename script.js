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

// Product Data
const products = {
    'exterior-doors': {
        name: 'Exterior Doors',
        patterns: ['Classic Panel', 'Modern Flush', 'Glass Insert', 'Decorative Relief'],
        colors: ['White', 'Black', 'Bronze', 'Silver', 'Wood Grain'],
        basePrice: 350, // per square meter
        image: 'images/exterior-doors.jpg',
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
        image: 'images/interior-doors.jpg',
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
        image: 'images/exterior-fences.jpg',
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
        image: 'images/interior-fences.jpg',
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
        image: 'images/window-protections.jpg',
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
        image: 'images/handrail.jpg',
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
        'Classic Panel': 'images/exterior-doors-classic-panel.jpg',
        'Modern Flush': 'images/exterior-doors-modern-flush.jpg',
        'Glass Insert': 'images/exterior-doors-glass-insert.jpg',
        'Decorative Relief': 'images/exterior-doors-decorative-relief.jpg'
    },
    'interior-doors': {
        'Plain Flush': 'images/interior-doors-plain-flush.jpg',
        'Panel Design': 'images/interior-doors-panel-design.jpg',
        'Glass Panel': 'images/interior-doors-glass-panel.jpg',
        'Louvered': 'images/interior-doors-louvered.jpg'
    },
    'exterior-fences': {
        'Vertical Bars': 'images/exterior-fences-vertical-bars.jpg',
        'Horizontal Slats': 'images/exterior-fences-horizontal-slats.jpg',
        'Lattice': 'images/exterior-fences-lattice.jpg',
        'Privacy Panel': 'images/exterior-fences-privacy-panel.jpg'
    },
    'interior-fences': {
        'Modern Rails': 'images/interior-fences-modern-rails.jpg',
        'Glass Partition': 'images/interior-fences-glass-partition.jpg',
        'Mesh Design': 'images/interior-fences-mesh-design.jpg',
        'Decorative Screen': 'images/interior-fences-decorative-screen.jpg'
    },
    'window-protections': {
        'Standard Grid': 'images/window-protections-standard-grid.jpg',
        'Decorative Scroll': 'images/window-protections-decorative-scroll.jpg',
        'Security Bars': 'images/window-protections-security-bars.jpg',
        'Mesh Screen': 'images/window-protections-mesh-screen.jpg'
    },
    'handrail': {
        'Round Rail': 'images/handrail-round-rail.jpg',
        'Square Rail': 'images/handrail-square-rail.jpg',
        'Ornamental': 'images/handrail-ornamental.jpg',
        'Cable Rail': 'images/handrail-cable-rail.jpg'
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

    // Disable next buttons initially
    document.getElementById('next-to-step3').disabled = true;
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
    
    document.getElementById('next-to-step3').disabled = true;
}

function selectPattern(pattern, element) {
    state.pattern = pattern;
    
    // Update UI
    document.querySelectorAll('.pattern-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Enable next button
    document.getElementById('next-to-step3').disabled = false;
    
    // Load colors
    loadColors();
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
    
    document.getElementById('next-to-step4').disabled = true;
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
    // Get dimensions from custom inputs if they were used
    const customWidth = parseFloat(document.getElementById('width').value);
    const customHeight = parseFloat(document.getElementById('height').value);
    
    // Use custom dimensions if provided, otherwise use state dimensions
    const width = (!isNaN(customWidth) && customWidth > 0) ? customWidth : state.width;
    const height = (!isNaN(customHeight) && customHeight > 0) ? customHeight : state.height;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0 || isNaN(quantity) || quantity < 1) {
        alert('Please select dimensions (standard or custom) and quantity');
        return;
    }
    
    if (!state.color) {
        alert('Please select a color');
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
    
    const cartItem = {
        id: ++state.currentItemId,
        category: state.category,
        categoryName: product.name,
        pattern: state.pattern,
        color: state.color,
        width: width,
        height: height,
        quantity: quantity,
        area: area,
        basePrice: product.basePrice,
        itemPrice: itemPrice,
        dimensionType: (customWidth || customHeight) ? 'Custom' : 'Standard'
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
                    <td>${item.width}m × ${item.height}m<br>(${item.area.toFixed(2)} m²)<br>${item.dimensionType} Dimensions</td>
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
                    <td><strong>$${state.totalPrice.toFixed(2)}</strong></td>
                </tr>
                <tr style="background: #fff3cd;">
                    <td colspan="4" style="text-align: right;"><strong>Deposit Required (5%):</strong></td>
                    <td><strong>$${state.depositAmount.toFixed(2)}</strong></td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Balance Due:</strong></td>
                    <td><strong>$${(state.totalPrice - state.depositAmount).toFixed(2)}</strong></td>
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
                <li><strong>SWIFT Code:</strong> CONBANKXXX</li>
            </ul>
            <p style="margin-top: 15px; font-size: 0.9em; color: #666;"><em>Note: These are placeholder banking details for demonstration purposes only.</em></p>
        </div>
    `;
    
    document.getElementById('invoice-container').innerHTML = invoiceHTML;
}

// Step 6: Payment
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

// Event listener to update invoice when moving to step 6 and payment when moving to step 7
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Override goToStep for special handling of cart, invoice and payment
    const originalGoToStep = window.goToStep;
    window.goToStep = function(stepNumber) {
        if (stepNumber === 4) {
            displayCart();
        } else if (stepNumber === 6) {
            generateInvoice();
        } else if (stepNumber === 7) {
            setupPayment();
        }
        originalGoToStep(stepNumber);
    };
});
