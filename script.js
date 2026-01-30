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
    orderDate: null
};

// Product Data
const products = {
    'exterior-doors': {
        name: 'Exterior Doors',
        patterns: ['Classic Panel', 'Modern Flush', 'Glass Insert', 'Decorative Relief'],
        colors: ['White', 'Black', 'Bronze', 'Silver', 'Wood Grain'],
        basePrice: 350, // per square meter
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop'
    },
    'interior-doors': {
        name: 'Interior Doors',
        patterns: ['Plain Flush', 'Panel Design', 'Glass Panel', 'Louvered'],
        colors: ['White', 'Ivory', 'Gray', 'Oak', 'Walnut'],
        basePrice: 250, // per square meter
        image: 'https://images.unsplash.com/photo-1562184552-0d4ea30f6c51?w=400&h=300&fit=crop'
    },
    'exterior-fences': {
        name: 'Exterior Fences',
        patterns: ['Vertical Bars', 'Horizontal Slats', 'Lattice', 'Privacy Panel'],
        colors: ['Black', 'White', 'Green', 'Bronze', 'Charcoal'],
        basePrice: 180, // per square meter
        image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=400&h=300&fit=crop'
    },
    'interior-fences': {
        name: 'Interior Fences',
        patterns: ['Modern Rails', 'Glass Partition', 'Mesh Design', 'Decorative Screen'],
        colors: ['Silver', 'White', 'Black', 'Gold', 'Bronze'],
        basePrice: 150, // per square meter
        image: 'https://images.unsplash.com/photo-1631248055345-4fa87f6b8f49?w=400&h=300&fit=crop'
    },
    'window-protections': {
        name: 'Window Protections',
        patterns: ['Standard Grid', 'Decorative Scroll', 'Security Bars', 'Mesh Screen'],
        colors: ['White', 'Black', 'Bronze', 'Silver', 'Brown'],
        basePrice: 120, // per square meter
        image: 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=400&h=300&fit=crop'
    },
    'handrail': {
        name: 'Handrail',
        patterns: ['Round Rail', 'Square Rail', 'Ornamental', 'Cable Rail'],
        colors: ['Brushed Steel', 'Black', 'Bronze', 'Chrome', 'Wood Finish'],
        basePrice: 200, // per linear meter (we'll calculate as if it's square meters for simplicity)
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop'
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
        'Classic Panel': 'https://images.unsplash.com/photo-1551027438-c339f3eb4b1d?w=400&h=300&fit=crop',
        'Modern Flush': 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop',
        'Glass Insert': 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=400&h=300&fit=crop',
        'Decorative Relief': 'https://images.unsplash.com/photo-1589939705384-8be4ed3c31d0?w=400&h=300&fit=crop'
    },
    'interior-doors': {
        'Plain Flush': 'https://images.unsplash.com/photo-1562184552-0d4ea30f6c51?w=400&h=300&fit=crop',
        'Panel Design': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'Glass Panel': 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop',
        'Louvered': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    'exterior-fences': {
        'Vertical Bars': 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=400&h=300&fit=crop',
        'Horizontal Slats': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop',
        'Lattice': 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop',
        'Privacy Panel': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop'
    },
    'interior-fences': {
        'Modern Rails': 'https://images.unsplash.com/photo-1631248055345-4fa87f6b8f49?w=400&h=300&fit=crop',
        'Glass Partition': 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop',
        'Mesh Design': 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop',
        'Decorative Screen': 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop'
    },
    'window-protections': {
        'Standard Grid': 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=400&h=300&fit=crop',
        'Decorative Scroll': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
        'Security Bars': 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop',
        'Mesh Screen': 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop'
    },
    'handrail': {
        'Round Rail': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
        'Square Rail': 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop',
        'Ornamental': 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop',
        'Cable Rail': 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&h=300&fit=crop'
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
    document.getElementById('next-to-step4').disabled = true;
}

// Navigation Functions
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show the requested step
    // Mapping: 1->step1, 2->step2, 3->step3, 4->step4, 5->step5, 6->step6, 7->step7, 8->step8
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

// Step 3: Color Selection
function loadColors() {
    const product = products[state.category];
    document.getElementById('selected-pattern').textContent = state.pattern;
    
    const colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = '';
    
    product.colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        const patternImage = patternImages[state.category][state.pattern] || product.image;
        colorCard.innerHTML = `
            <div class="color-preview-container">
                <img src="${patternImage}" alt="${state.pattern}" class="color-preview-image">
                <div class="color-swatch" style="background-color: ${colorHex[color]}; border: 3px solid #ddd;"></div>
            </div>
            <h3>${color}</h3>
        `;
        colorCard.addEventListener('click', () => selectColor(color, colorCard));
        colorContainer.appendChild(colorCard);
    });
    
    document.getElementById('next-to-step4').disabled = true;
}

function selectColor(color, element) {
    state.color = color;
    
    // Update UI
    document.querySelectorAll('.color-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Enable next button
    document.getElementById('next-to-step4').disabled = false;
    
    // Update display
    document.getElementById('selected-color').textContent = state.color;
    
    // Update product preview in step 4
    updateProductPreview();
}

function updateProductPreview() {
    const product = products[state.category];
    const patternImage = patternImages[state.category][state.pattern] || product.image;
    
    const previewHTML = `
        <div class="product-preview-card">
            <img src="${patternImage}" alt="${state.pattern}" class="product-preview-image">
            <div class="product-preview-details">
                <h3>Your Selection</h3>
                <p><strong>Category:</strong> ${product.name}</p>
                <p><strong>Pattern:</strong> ${state.pattern}</p>
                <p><strong>Color:</strong> ${state.color}</p>
            </div>
        </div>
    `;
    
    const previewContainer = document.getElementById('product-preview-step4');
    if (previewContainer) {
        previewContainer.innerHTML = previewHTML;
    }
}

// Step 4 & 5: Dimensions and Quantity
function calculatePrice() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0 || isNaN(quantity) || quantity < 1) {
        alert('Please enter valid dimensions (greater than 0) and quantity (at least 1)');
        return;
    }
    
    state.width = width;
    state.height = height;
    state.quantity = quantity;
    
    // Calculate price
    const product = products[state.category];
    const area = width * height;
    const subtotal = area * product.basePrice * quantity;
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + tax;
    
    state.totalPrice = total;
    state.depositAmount = total * 0.05; // 5% deposit
    
    // Display price summary
    displayPriceSummary(area, subtotal, tax, total);
    
    // Move to next step
    goToStep(5);
}

function displayPriceSummary(area, subtotal, tax, total) {
    const product = products[state.category];
    const patternImage = patternImages[state.category][state.pattern] || product.image;
    
    const summaryHTML = `
        <div class="product-preview-card">
            <img src="${patternImage}" alt="${state.pattern}" class="product-preview-image">
            <div class="product-preview-details">
                <h3>Your Selection</h3>
                <p><strong>Category:</strong> ${product.name}</p>
                <p><strong>Pattern:</strong> ${state.pattern}</p>
                <p><strong>Color:</strong> ${state.color}</p>
            </div>
        </div>
        <div class="price-item">
            <span><strong>Dimensions:</strong></span>
            <span>${state.width}m × ${state.height}m</span>
        </div>
        <div class="price-item">
            <span><strong>Area per unit:</strong></span>
            <span>${area.toFixed(2)} m²</span>
        </div>
        <div class="price-item">
            <span><strong>Quantity:</strong></span>
            <span>${state.quantity} units</span>
        </div>
        <div class="price-item">
            <span><strong>Base Price:</strong></span>
            <span>$${product.basePrice}/m²</span>
        </div>
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
    `;
    
    document.getElementById('price-summary').innerHTML = summaryHTML;
}

// Step 6: Generate Invoice
function generateInvoice() {
    // Generate invoice number and date
    state.invoiceNumber = 'INV-' + Date.now();
    state.orderDate = new Date().toLocaleDateString();
    
    const product = products[state.category];
    const area = state.width * state.height;
    const subtotal = area * product.basePrice * state.quantity;
    const tax = subtotal * 0.15;
    
    const invoiceHTML = `
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
                <tr>
                    <td><strong>${product.name}</strong><br>Pattern: ${state.pattern}<br>Color: ${state.color}</td>
                    <td>${state.width}m × ${state.height}m<br>(${area.toFixed(2)} m²)</td>
                    <td>${state.quantity}</td>
                    <td>$${product.basePrice}/m²</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
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
    
    // Clear form inputs
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    document.getElementById('quantity').value = 1;
    document.getElementById('card-name').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
    
    // Clear selections
    document.querySelectorAll('.category-card, .pattern-card, .color-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Go back to step 1
    goToStep(1);
}

// Event listener to update invoice when moving to step 6
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Override goToStep for special handling of step 6 and 7
    const originalGoToStep = window.goToStep;
    window.goToStep = function(stepNumber) {
        if (stepNumber === 6) {
            generateInvoice();
        } else if (stepNumber === 7) {
            setupPayment();
        }
        originalGoToStep(stepNumber);
    };
});
