# ALUMINUMFRAMEWORK

Industrial Design & Manufacturing Engineering Platform for Construction Products

## Overview

A professional AI-powered system that deconstructs construction products (Exterior/Interior Gates, Doors, Fences, Window Protection, and Handrails) into modular, production-ready schemas. Operating as a **Lead Industrial Designer and Manufacturing Engineer**, this platform converts product images into comprehensive technical manifests suitable for 3D reconstruction, parametric modification, and manufacturing.

### 🏭 Core Concept: Product Deconstruction to Manufacturing Schema

Transform any construction product into a complete engineering specification:

1. **Semantic Product Breakdown** - Identify product category and catalog all technical components
2. **Vector-Based Geometry Extraction** - Convert designs into lossless mathematical SVG paths with three functional layers
3. **Parametric Engineering Rules** - Establish modification logic for static, dynamic, and iterative components
4. **Material & Color Matrix** - Group elements by material class with unique IDs and modification hooks
5. **3D Volume & Manufacturing Data** - Generate Bill of Materials (BOM) with component counts and manufacturing specs

### 📐 Engineering Precision

The system provides production-ready output with:
- **Vector Maps** - Infinite zoom without pixelation (Primary Chassis, Infill/Design, Hardware/Accents)
- **Parametric Logic** - User dimension inputs automatically recalculate component placement
- **Material Classes** - Unique IDs (METAL_BASE, ORNAMENT_GOLD, GLASS_PANEL) with color/texture data
- **Manufacturing BOM** - Component counts, dimensions, and material specifications
- **3D Reconstruction** - Z-depth assignments for orbital 3D visualization

See [UNIVERSAL_PRODUCT_ANALYST_GUIDE.md](UNIVERSAL_PRODUCT_ANALYST_GUIDE.md) for complete documentation.

## Features

### Product Categories Supported

- **Exterior/Interior Gates** - Frame, Pickets/Bars, Ornamental Filigree (scrolls, rosettes, finials), Hinges, Latches
- **Doors** - Core Slab, Stiles, Rails, Decorative Inlays, Handle Sets, Thresholds
- **Fences** - Frame structures, vertical/horizontal bars, decorative elements, mounting hardware
- **Window Protection** - Grilles, bars, decorative patterns, security hardware
- **Handrails** - Top Rails, Balusters, Newel Posts, Mounting Brackets

### Engineering Capabilities

- **🏭 Semantic Product Breakdown** - Automatic component identification and cataloging by category
- **📐 Vector-Based Geometry** - Lossless SVG format with three functional layers (Chassis, Infill, Hardware)
- **⚙️ Parametric Engineering** - Static (never stretch), Dynamic (scale linearly), Iterative (multiply) component rules
- **🎨 Material & Color Matrix** - Material class grouping with unique IDs and modification hooks
- **📊 Manufacturing BOM** - Complete Bill of Materials with component counts and specifications
- **🔧 3D Volume Data** - Z-depth assignments for 3D orbit reconstruction
- **🤖 AI-Powered Analysis** - Google Gemini AI for advanced product deconstruction
- **🧹 Background Removal** - Automatic white background removal from uploaded images
- **📏 Dimension Analysis** - Automatic product dimension detection
- **🎯 Anchor Mapping** - Component coordinates as percentage (0.0-1.0) of total dimensions
- **💻 Technical Manifest Export** - Structured output in JSON format

## Quick Start

### For Production-Ready Schema Generation

1. **Start Local Server**
   ```bash
   python3 -m http.server 8080
   ```

2. **Open in Browser**
   ```
   http://localhost:8080
   ```

3. **Deconstruct a Product**
   - Step 1: Select product category (Gates, Doors, Fences, Window Protection, Handrails)
   - Step 2: Choose pattern/style (optional - for predefined products)
   - Step 3: Upload product image for analysis
   - Step 4: Generate technical manifest with all specifications

## Product Deconstruction Workflow

### 1. Semantic Product Breakdown

Upload a product image and the system automatically:

- **Identifies Product Category** - Gates, Doors, Fences, Window Protection, or Handrails
- **Catalogs Technical Components**:
  - **Gates/Fences/Window Protection**: Frame, Pickets/Bars, Ornamental Filigree (scrolls, rosettes, finials), Hinges, Latches
  - **Doors**: Core Slab, Stiles, Rails, Decorative Inlays, Handle Sets, Thresholds  
  - **Handrails**: Top Rails, Balusters, Newel Posts, Mounting Brackets
- **Component Classification**: Integrated (molded) vs Applied (attached) elements

### 2. Vector-Based Geometry Extraction

Converts design into lossless mathematical vector paths (SVG format):

- **Primary Chassis Layer** - Main frame and structural foundation
- **Infill/Design Layer** - Internal patterns, bars, decorative elements
- **Hardware/Accents Layer** - Handles, locks, hinges, decorative hardware

Features:
- **Infinite Zoom** - No pixelation at any scale
- **Mathematical Precision** - Bezier curves and polygon vertices
- **Normalized Coordinates** - 0.0-1.0 mapping for universal scaling

### 3. Parametric Engineering Rules

Establishes logic system for dimensional modifications:

- **Static Components** - NEVER stretch or distort
  - Examples: Locks, handles, center ornaments, hinges
  - Maintain absolute size regardless of overall dimensions
  - Anchor position specified as percentage of total dimensions
  
- **Dynamic Components** - Scale linearly with dimensions
  - Examples: Frame lengths, panel sizes, glass sections
  - Stretch/compress to fill available space
  - Min/max scale limits defined

- **Iterative Components** - Multiply to fill space
  - For gates/fences: Calculate number of vertical bars (N) based on width (W) and max spacing (S)
  - Formula: N = floor(W / S) + 1
  - Examples: Vertical bars, horizontal slats, repeating patterns
  - Spacing adjusts automatically to maintain aesthetic balance

### 4. Material & Color Matrix

Groups every visible element by material class with modification hooks:

- **Unique Material IDs**:
  - `METAL_BASE` - Primary structural material
  - `ORNAMENT_GOLD` - Gold-finish decorative elements
  - `GLASS_PANEL` - Transparent sections
  - `METAL_HARDWARE` - Functional hardware components
  - Additional classes as detected

- **Color/Texture Data** for each ID:
  - Hex color codes (#RRGGBB)
  - Reflectivity values (matte/polished/brushed)
  - Texture maps for 3D orbit viewer
  - RGB values for precise color matching

### 5. 3D Volume & Manufacturing Data

**Z-Depth Assignment** for 3D reconstruction:
- Base Layer: 0mm (main surface)
- Embossed/Raised: +1mm to +50mm
- Engraved/Recessed: -1mm to -15mm

**Bill of Materials (BOM)**:
- Component counts (e.g., 24 vertical bars, 2 hinges)
- Total dimensions (width × height × depth)
- Material types and quantities
- Hardware specifications
- Weight calculations
- Manufacturing tolerances

### Output Format

**Technical Manifest** contains:
1. **Vector Map** - SVG paths for all three layers (Chassis, Infill, Hardware)
2. **Material Class Table** - All material IDs with colors and properties
3. **Parametric Scaling Logic** - Rules for static, dynamic, and iterative components
4. **Manufacturing BOM** - Complete parts list with specifications
5. **3D Reconstruction Data** - Z-depth values and layer ordering

Export formats:
- JSON (machine-readable for automated systems)
- Text (human-readable documentation)

## Best Practices

✅ **Image Quality**
- High resolution (1500x1500+ pixels recommended)
- Clear, well-lit photography
- White or neutral background
- Front-facing perpendicular view

✅ **Product Types**
- Professional product photography preferred
- Clear component visibility
- Good contrast and detail
- Clean background for better isolation


## Technical Implementation

### How It Works

1. **Upload Product Image**
   - Automatic background removal
   - Image preprocessing and enhancement
   - Product isolation and edge detection

2. **AI Analysis with Google Gemini**
   - Semantic product category identification
   - Component breakdown and classification
   - Vector path extraction and geometry mapping
   - Material and color detection
   - Parametric rule generation

3. **Technical Manifest Generation**
   - Vector map creation (SVG format)
   - Material class table compilation
   - Parametric scaling logic definition
   - BOM generation with component counts
   - 3D reconstruction data assembly

4. **Export Options**
   - JSON format for automated manufacturing systems
   - Human-readable text documentation
   - Complete technical specifications

### Example Use Cases

**Gate Manufacturing**
- Upload gate design → System identifies 24 vertical bars with spacing formula
- Static components: 2 hinges (never scale), 1 latch mechanism
- Dynamic components: Frame stretches to custom width
- Iterative: Bars multiply/reduce based on width while maintaining spacing

**Custom Door Production**
- Upload door image → Core slab, stiles, rails extracted
- Decorative inlays marked as static (maintain aspect ratio)
- Handle set positioned with anchor coordinates (0.92, 0.50)
- Material classes: WOOD_GRAIN_BASE, METAL_HARDWARE, GLASS_INLAY

**Window Protection Fabrication**
- Upload design → Grid pattern with ornamental scrollwork
- Formula calculates bar count for any window size
- Scrollwork filigree remains fixed size at corners
- BOM outputs exact material lengths and quantities


## Additional Features

### 3D Orbit Viewer
- Real-time WebGL rendering with Three.js
- 360° rotation and zoom capabilities
- Material visualization with textures
- Layer-based visualization (chassis, infill, hardware)

### Dimension Analysis
- Automatic dimension detection from images
- Confidence scores for measurements
- Support for custom dimensions
- Aspect ratio preservation

### Background Processing
- Automatic white background removal
- Image preprocessing and enhancement
- Edge detection and cleanup
- Product isolation algorithms

## Documentation


## Documentation

Complete guides for all features:

- **[UNIVERSAL_PRODUCT_ANALYST_GUIDE.md](UNIVERSAL_PRODUCT_ANALYST_GUIDE.md)** - Complete product deconstruction methodology
- **[VISION_TO_CAD_GUIDE.md](VISION_TO_CAD_GUIDE.md)** - Vector geometry extraction details  
- **[3D_MODEL_GENERATION_GUIDE.md](3D_MODEL_GENERATION_GUIDE.md)** - 3D visualization and reconstruction
- **[AI_DIMENSION_ANALYSIS_GUIDE.md](AI_DIMENSION_ANALYSIS_GUIDE.md)** - Automatic dimension detection
- **[BACKGROUND_REMOVAL_GUIDE.md](BACKGROUND_REMOVAL_GUIDE.md)** - Image preprocessing techniques
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing and validation procedures

## Project Structure

```
ALUMINUMFRAMEWORK/
├── index.html                          # Main application interface
├── script.js                           # Core engineering logic & AI analysis
├── styles.css                          # UI styling
├── lib/                                # Third-party libraries
│   ├── three.min.js                    # Three.js for 3D visualization
│   ├── tf.min.js                       # TensorFlow.js for AI processing
│   └── OrbitControls.js                # 3D camera controls
├── images/                             # Sample product images
│   ├── exterior-doors/
│   ├── interior-doors/
│   ├── exterior-fences/
│   ├── interior-fences/
│   ├── window-protections/
│   └── handrail/
├── UNIVERSAL_PRODUCT_ANALYST_GUIDE.md  # Product deconstruction guide
├── VISION_TO_CAD_GUIDE.md              # Vector extraction guide
├── 3D_MODEL_GENERATION_GUIDE.md        # 3D reconstruction guide
├── AI_DIMENSION_ANALYSIS_GUIDE.md      # Dimension analysis guide
├── BACKGROUND_REMOVAL_GUIDE.md         # Image preprocessing guide
├── TESTING_GUIDE.md                    # Testing procedures
├── IMAGE_REPLACEMENT_GUIDE.md          # Image management guide
├── validate-images.sh                  # Image validation script
└── package.json                        # Dependencies
```

## Technologies

### Core Technologies
- **Google Gemini AI** - Advanced product analysis and component identification
- **Three.js 0.137.0** - 3D visualization and orbit viewer
- **TensorFlow.js** - Image preprocessing and analysis
- **Canvas API** - Image processing and vector extraction
- **Vanilla JavaScript** - Core application logic
- **HTML5 & CSS3** - Modern web interface

### AI-Powered Features
- Semantic product breakdown
- Vector geometry extraction
- Material and color classification
- Parametric rule generation
- Bill of Materials compilation

## Browser Requirements

- **WebGL Support** - Required for 3D visualization
- **Modern Browser** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript Enabled** - Required for all features
- **Internet Connection** - Required for Gemini AI analysis

## Development

### Local Setup

```bash
# Install dependencies
npm install

# Start local server
python3 -m http.server 8080

# Open in browser
http://localhost:8080
```

### Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing procedures:

1. Product deconstruction accuracy
2. Vector geometry extraction
3. Parametric rule generation
4. Material classification
5. BOM generation
6. 3D visualization quality

## Security

- ✅ **Three.js 0.137.0** - Security patches applied
- ✅ **CodeQL scanning** - Regular security audits
- ⚠️ **API Key** - Gemini API key should be moved to backend in production
- ✅ **Client-side processing** - No user data sent to third parties

## License

[Add your license here]

## Contributing

Contributions welcome! Areas for improvement:
- Additional product categories
- Enhanced parametric rules
- Improved vector extraction algorithms
- Manufacturing system integrations
- Export format extensions

## Support

For documentation and guides:
- Product Analysis: [UNIVERSAL_PRODUCT_ANALYST_GUIDE.md](UNIVERSAL_PRODUCT_ANALYST_GUIDE.md)
- Vector Extraction: [VISION_TO_CAD_GUIDE.md](VISION_TO_CAD_GUIDE.md)
- Testing: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- Image Management: [IMAGE_REPLACEMENT_GUIDE.md](IMAGE_REPLACEMENT_GUIDE.md)