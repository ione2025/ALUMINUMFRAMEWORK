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
        { id: 1, name: 'Classic Panel', image_url: 'images/exterior-doors-classic-panel.jpg', aspect_ratio: 1.0 },
        { id: 2, name: 'Modern Flush', image_url: 'images/exterior-doors-modern-flush.jpg', aspect_ratio: 1.0 },
        { id: 3, name: 'Glass Insert', image_url: 'images/exterior-doors-glass-insert.jpg', aspect_ratio: 1.0 },
        { id: 4, name: 'Decorative Relief', image_url: 'images/exterior-doors-decorative-relief.jpg', aspect_ratio: 1.0 }
    ],
    'interior-doors': [
        { id: 5, name: 'Plain Flush', image_url: 'images/interior-doors-plain-flush.jpg', aspect_ratio: 1.0 },
        { id: 6, name: 'Panel Design', image_url: 'images/interior-doors-panel-design.jpg', aspect_ratio: 1.0 },
        { id: 7, name: 'Glass Panel', image_url: 'images/interior-doors-glass-panel.jpg', aspect_ratio: 1.0 },
        { id: 8, name: 'Louvered', image_url: 'images/interior-doors-louvered.jpg', aspect_ratio: 1.0 }
    ],
    'exterior-fences': [
        { id: 9, name: 'Vertical Bars', image_url: 'images/exterior-fences-vertical-bars.jpg', aspect_ratio: 1.33 },
        { id: 10, name: 'Horizontal Slats', image_url: 'images/exterior-fences-horizontal-slats.jpg', aspect_ratio: 1.33 },
        { id: 11, name: 'Lattice', image_url: 'images/exterior-fences-lattice.jpg', aspect_ratio: 1.33 },
        { id: 12, name: 'Privacy Panel', image_url: 'images/exterior-fences-privacy-panel.jpg', aspect_ratio: 1.33 }
    ],
    'interior-fences': [
        { id: 13, name: 'Modern Rails', image_url: 'images/interior-fences-modern-rails.jpg', aspect_ratio: 1.5 },
        { id: 14, name: 'Glass Partition', image_url: 'images/interior-fences-glass-partition.jpg', aspect_ratio: 1.5 },
        { id: 15, name: 'Mesh Design', image_url: 'images/interior-fences-mesh-design.jpg', aspect_ratio: 1.5 },
        { id: 16, name: 'Decorative Screen', image_url: 'images/interior-fences-decorative-screen.jpg', aspect_ratio: 1.5 }
    ],
    'window-protections': [
        { id: 17, name: 'Standard Grid', image_url: 'images/window-protections-standard-grid.jpg', aspect_ratio: 1.2 },
        { id: 18, name: 'Decorative Scroll', image_url: 'images/window-protections-decorative-scroll.jpg', aspect_ratio: 1.2 },
        { id: 19, name: 'Security Bars', image_url: 'images/window-protections-security-bars.jpg', aspect_ratio: 1.2 },
        { id: 20, name: 'Mesh Screen', image_url: 'images/window-protections-mesh-screen.jpg', aspect_ratio: 1.2 }
    ],
    'handrail': [
        { id: 21, name: 'Round Rail', image_url: 'images/handrail-round-rail.jpg', aspect_ratio: 0.2 },
        { id: 22, name: 'Square Rail', image_url: 'images/handrail-square-rail.jpg', aspect_ratio: 0.2 },
        { id: 23, name: 'Ornamental', image_url: 'images/handrail-ornamental.jpg', aspect_ratio: 0.2 },
        { id: 24, name: 'Cable Rail', image_url: 'images/handrail-cable-rail.jpg', aspect_ratio: 0.2 }
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

// 3D Design State
const designState = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    mesh: null,
    texture: null,
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
    designState.scene.background = new THREE.Color(0x2d3436);
    
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
    
    // Load new texture
    const loader = new THREE.TextureLoader();
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
    
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    // Apply scaling
    updateTextureScale();
    
    designState.mesh.material.map = texture;
    designState.mesh.material.needsUpdate = true;
    designState.texture = texture;
    
    // Apply current color
    applyColorToTexture();
}

// Update texture scale based on dimension controls
function updateTextureScale() {
    if (!designState.texture) return;
    
    const hScale = designState.horizontalScale / designState.baseHorizontalScale;
    const vScale = designState.verticalScale / designState.baseVerticalScale;
    
    designState.texture.repeat.set(hScale, vScale);
    designState.texture.needsUpdate = true;
}

// Apply color overlay to texture
function applyColorToTexture() {
    if (!designState.mesh) return;
    
    const color = new THREE.Color(designState.currentColor);
    const intensity = designState.colorIntensity;
    
    // Blend white with the selected color based on intensity
    const blendedColor = new THREE.Color(0xffffff).lerp(color, intensity);
    
    designState.mesh.material.color = blendedColor;
    designState.mesh.material.needsUpdate = true;
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
        updateTextureScale();
        
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
        updateTextureScale();
        
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
        
        updateTextureScale();
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
