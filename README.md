# ALUMINUMFRAMEWORK

Aluminum Construction Products - 3D Product Design & Customization Platform with AI

## Overview

An interactive web application for designing and customizing aluminum construction products including doors, fences, window protections, and handrails. Features real-time 3D visualization with Three.js, AI-powered dimension detection, pattern selection, dimension controls, and color customization.

## Features

- **🤖 AI Dimension Analysis** - Upload images to automatically detect product dimensions
- **3D Product Visualization** - Real-time WebGL rendering with Three.js
- **Pattern Selection** - Choose from 24+ patterns across 6 product categories
- **Dimension Controls** - Adjust horizontal/vertical scale, thickness, and lock aspect ratio
- **Color Customization** - HEX color picker with 8 presets and tint intensity control
- **Interactive Navigation** - 360° orbit controls, zoom, pan, auto-rotate
- **Shopping Cart** - Add customized products to order with accurate pricing

## Quick Start

1. **Start Local Server**
   ```bash
   python3 -m http.server 8080
   ```

2. **Open in Browser**
   ```
   http://localhost:8080
   ```

3. **Navigate the App**
   - Step 1: Select product category
   - Step 2: Choose pattern design
   - Step 3: Customize with 3D viewer + **AI dimension analysis**
   - Step 4: Review order and checkout

## AI Dimension Analysis

🤖 **NEW:** Automatically detect product dimensions from uploaded images!

### Quick Guide

1. **Navigate to Step 3** (Design Your Product)
2. **Find AI Section** in left panel
3. **Upload Image** - Click "📤 Upload Image"
4. **Analyze** - Click "🔍 Analyze Dimensions"
5. **Review Results** - Check dimensions and confidence score
6. **Apply** - Click "✅ Apply Dimensions"

### Features

- **Automatic Detection** - AI analyzes images to find width, height, depth
- **Confidence Scores** - Shows reliability (0-100%)
- **Smart Adjustment** - Adapts to product category
- **Manual Override** - Full control still available
- **Privacy-Friendly** - All processing is client-side

### Best Results

✅ Use clear, well-lit product images
✅ Center product in frame
✅ White or neutral background
✅ Straight-on view (not angled)

See [AI_DIMENSION_ANALYSIS_GUIDE.md](AI_DIMENSION_ANALYSIS_GUIDE.md) for complete documentation.

## Image Replacement

⚠️ **Important:** Current images are placeholders and should be replaced with professional product photography.

### Quick Guide

1. **Review Requirements**
   ```bash
   cat IMAGE_REPLACEMENT_GUIDE.md
   ```

2. **Source Professional Images**
   - Stock photos (Shutterstock, Adobe Stock)
   - Royalty-free (Unsplash, Pexels)
   - Professional photography
   - Manufacturer images

3. **Replace Images**
   ```bash
   # Backup originals
   mkdir images_backup
   cp images/*.jpg images_backup/
   
   # Copy new images (keep same filenames)
   cp /path/to/your/professional-door.jpg images/exterior-doors.jpg
   # ... repeat for all 31 images
   ```

4. **Validate Images**
   ```bash
   ./validate-images.sh
   ```

### Required Images

- **6 Category Images** - Main product types
- **24 Pattern Images** - 4 variations per category
- **Format:** JPEG or WEBP
- **Resolution:** 1920x1080 minimum
- **Quality:** Professional product photography

See [IMAGE_REPLACEMENT_GUIDE.md](IMAGE_REPLACEMENT_GUIDE.md) for complete details.

## Project Structure

```
ALUMINUMFRAMEWORK/
├── index.html                      # Main application HTML
├── script.js                       # Application logic, 3D engine & AI
├── styles.css                      # Styling & layout
├── lib/                            # Third-party libraries
│   ├── three.min.js                # Three.js 0.137.0
│   ├── tf.min.js                   # TensorFlow.js 4.11.0 (NEW)
│   └── OrbitControls.js            # Camera controls
├── images/                         # Product images (31 total)
│   ├── *.jpg                       # Category & pattern images
├── IMAGE_REPLACEMENT_GUIDE.md      # Image replacement instructions
├── AI_DIMENSION_ANALYSIS_GUIDE.md  # AI feature documentation (NEW)
├── validate-images.sh              # Image validation script
└── package.json                    # Node.js dependencies

```

## Technologies

- **TensorFlow.js 4.11.0** - AI/ML for dimension analysis (NEW)
- **Three.js 0.137.0** - 3D rendering engine
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic markup

## Browser Requirements

- **WebGL Support** - Required for 3D rendering
- **Modern Browser** - Chrome, Firefox, Safari, Edge (latest versions)
- **JavaScript Enabled**

## Development

### Install Dependencies (Optional)

```bash
npm install
```

### Image Validation

```bash
# Check all images are present and valid
./validate-images.sh
```

### Testing

1. Test each product category
2. Verify pattern selection works
3. Check 3D rendering performance
4. Validate color customization
5. Test add to cart functionality
6. Verify order review and checkout

## Security

- ✅ Three.js 0.137.0 (XSS vulnerability patched)
- ✅ CodeQL security scan: 0 vulnerabilities
- ✅ No external API dependencies

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Support

For image replacement assistance, see [IMAGE_REPLACEMENT_GUIDE.md](IMAGE_REPLACEMENT_GUIDE.md)