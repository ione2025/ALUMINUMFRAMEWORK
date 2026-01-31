# ALUMINUMFRAMEWORK

Aluminum Construction Products - 3D Product Design & Customization Platform with AI

## Overview

An interactive web application for designing and customizing aluminum construction products including doors, fences, window protections, and handrails. Features real-time 3D visualization with Three.js, AI-powered 3D model generation from images, dimension detection, pattern selection, dimension controls, and color customization.

## Features

- **🔧 Vision-to-CAD Translation** - Generate technical CAD schemas from product images ⭐ NEW
- **🧹 Automatic Background Removal** - Automatically removes white backgrounds from uploaded images
- **🤖 Gemini AI Analysis** - Advanced design analysis using Google Gemini AI
- **🎨 AI 3D Model Generation** - Generate custom 3D models from uploaded 2D images
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
   - Step 3: Customize with 3D viewer + **AI features**
   - Step 4: Review order and checkout

## Automatic Background Removal & AI Analysis

🧹 **NEW:** Upload any product image - the system automatically removes white backgrounds and analyzes the design!

### Quick Guide

1. **Navigate to Step 3** (Design Your Product)
2. **Find AI Section** in left panel
3. **Upload Image** - Click "📤 Upload Image"
4. **Automatic Processing**:
   - Background removal (< 1 second)
   - AI design analysis with Gemini (2-5 seconds)
   - Ready for 3D generation!

### Features

- **Smart Background Removal** - Automatically detects and removes white/light backgrounds
- **Auto-Cropping** - Focuses on the product, removes excess space
- **Transparent Backgrounds** - Perfect for 3D texture application
- **Gemini AI Analysis** - Detailed design analysis including:
  - Product type identification
  - Design patterns and lines
  - Hardware components (hinges, handles, locks)
  - Color scheme and materials
  - Decorative elements
  - Structural components

### Best Results

✅ Use images with white or light backgrounds
✅ Good contrast between product and background
✅ Well-lit, clear product images
✅ High resolution recommended

See [BACKGROUND_REMOVAL_GUIDE.md](BACKGROUND_REMOVAL_GUIDE.md) for complete documentation.

## AI 3D Model Generation

🎨 Generate actual 3D models from uploaded 2D images!

### Quick Guide

1. **Upload Image** (background automatically removed)
2. **Adjust Settings**:
   - Extrusion Depth: 1-20cm
   - Detail Level: Very Low to Extreme
3. **Generate** - Click "🎨 Generate 3D Model"
4. **View Result** - Custom 3D model appears in viewer

### Features

- **Custom Geometry** - Creates 3D mesh from image outline
- **Automatic Texturing** - Applies image as texture to model
- **Adjustable Depth** - 20 extrusion depth settings
- **10 Detail Levels** - From fast preview to maximum quality
- **Real-time Generation** - 1-5 seconds typical processing
- **Works with cleaned images** - Background removal ensures better results

See [3D_MODEL_GENERATION_GUIDE.md](3D_MODEL_GENERATION_GUIDE.md) for complete documentation.

## Vision-to-CAD Translation Engine

🔧 **NEW:** Transform product images into structured technical CAD schemas for engineering!

### Quick Guide

1. **Navigate to Step 3** (Design Your Product)
2. **Find AI Section** in left panel
3. **Upload Image** - Click "📤 Upload Image"
4. **Generate Schema** - Click "🔧 Generate CAD Schema"
5. **Review Output** - Examine component hierarchy, geometry, scaling rules, and materials
6. **Export** - Download as JSON or formatted text

### Features

- **Component Hierarchy** - Identifies every part with unique IDs (Frame, Panels, Hardware, Ornaments)
- **Geometry Mapping** - Maps component positions using relative coordinates (0.0 to 1.0)
- **Parametric Scaling** - Defines Fixed Aspect vs Adaptive elements for proper scaling
- **Material Mapping** - Groups materials with unified IDs for easy bulk modifications
- **Structured Output** - Professional technical breakdown for CAD engineers

### What You Get

✅ **Component IDs** - FRAME-001, HANDLE-001, ORNAMENT-001, etc.
✅ **Relative Coordinates** - Position mapping from 0.0 (left/top) to 1.0 (right/bottom)
✅ **Scaling Rules** - Fixed (handles, locks) vs Adaptive (panels, bars)
✅ **Material IDs** - MAT-001, MAT-002 with color codes and texture info
✅ **Export Formats** - JSON (machine-readable) or Text (documentation)

### Best Results

✅ Professional product photography
✅ Front-facing view (perpendicular)
✅ High resolution (1500x1500+)
✅ Clear component details
✅ Good contrast and lighting

See [VISION_TO_CAD_GUIDE.md](VISION_TO_CAD_GUIDE.md) for complete documentation.

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
   cp -r images/ images_backup/
   
   # Copy new images to appropriate category directories
   cp /path/to/your/professional-door.jpg images/exterior-doors/exterior-doors.jpg
   cp /path/to/your/panel-door.jpg images/exterior-doors/exterior-doors-classic-panel.jpg
   # ... repeat for all 30 images in their respective category directories
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
├── index.html                          # Main application HTML
├── script.js                           # Application logic, 3D engine & AI
├── styles.css                          # Styling & layout
├── lib/                                # Third-party libraries
│   ├── three.min.js                    # Three.js 0.137.0
│   ├── tf.min.js                       # TensorFlow.js 4.11.0
│   └── OrbitControls.js                # Camera controls
├── images/                             # Product images (organized by category)
│   ├── exterior-doors/                 # 5 exterior door images
│   ├── interior-doors/                 # 5 interior door images
│   ├── exterior-fences/                # 5 exterior fence images
│   ├── interior-fences/                # 5 interior fence images
│   ├── window-protections/             # 5 window protection images
│   └── handrail/                       # 5 handrail images
├── IMAGE_REPLACEMENT_GUIDE.md          # Image replacement instructions
├── IMAGE_REPLACEMENT_CHECKLIST.md      # Progress tracking checklist
├── VISION_TO_CAD_GUIDE.md              # Vision-to-CAD translation docs ⭐ NEW
├── AI_DIMENSION_ANALYSIS_GUIDE.md      # Dimension detection docs
├── 3D_MODEL_GENERATION_GUIDE.md        # 3D generation docs
├── BACKGROUND_REMOVAL_GUIDE.md         # Background removal docs
├── ADVANCED_AI_ANALYSIS_GUIDE.md       # Advanced AI analysis docs
├── validate-images.sh                  # Image validation script
└── package.json                        # Node.js dependencies

```

## Technologies

- **TensorFlow.js 4.11.0** - AI/ML for image analysis and 3D generation
- **Three.js 0.137.0** - 3D rendering engine and geometry creation
- **Canvas API** - Image processing for 3D model generation ⭐ NEW
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