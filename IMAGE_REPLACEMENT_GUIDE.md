# Image Replacement Guide

## Overview
This guide explains how to replace the placeholder images with professional product photography similar to the example: https://nativedoors.com/cdn/shop/files/entry_door_Polaris.webp

## Directory Structure

The application uses a category-based directory structure:
- 6 category images (one per category subdirectory)
- 24 pattern-specific images (4 per category subdirectory)
- All images are organized in category-specific subdirectories under `images/`

```
images/
├── exterior-doors/
│   ├── exterior-doors.jpg
│   ├── exterior-doors-classic-panel.jpg
│   ├── exterior-doors-modern-flush.jpg
│   ├── exterior-doors-glass-insert.jpg
│   └── exterior-doors-decorative-relief.jpg
├── interior-doors/
│   ├── interior-doors.jpg
│   ├── interior-doors-plain-flush.jpg
│   ├── interior-doors-panel-design.jpg
│   ├── interior-doors-glass-panel.jpg
│   └── interior-doors-louvered.jpg
├── exterior-fences/
│   ├── exterior-fences.jpg
│   ├── exterior-fences-vertical-bars.jpg
│   ├── exterior-fences-horizontal-slats.jpg
│   ├── exterior-fences-lattice.jpg
│   └── exterior-fences-privacy-panel.jpg
├── interior-fences/
│   ├── interior-fences.jpg
│   ├── interior-fences-modern-rails.jpg
│   ├── interior-fences-glass-partition.jpg
│   ├── interior-fences-mesh-design.jpg
│   └── interior-fences-decorative-screen.jpg
├── window-protections/
│   ├── window-protections.jpg
│   ├── window-protections-standard-grid.jpg
│   ├── window-protections-decorative-scroll.jpg
│   ├── window-protections-security-bars.jpg
│   └── window-protections-mesh-screen.jpg
└── handrail/
    ├── handrail.jpg
    ├── handrail-round-rail.jpg
    ├── handrail-square-rail.jpg
    ├── handrail-ornamental.jpg
    └── handrail-cable-rail.jpg
```

## Desired Image Quality

### Reference Example
Professional door image: https://nativedoors.com/cdn/shop/files/entry_door_Polaris.webp

**Key characteristics:**
- Clean white or neutral background
- Product centered and well-lit
- High resolution and sharp details
- Professional product photography
- Shows texture and material quality
- Proper color representation

## Image Specifications

### Technical Requirements
- **Format**: JPEG (.jpg) or WEBP (.webp)
- **Resolution**: Minimum 1920x1080 pixels
- **Aspect Ratio**: 16:9 (1.78:1)
- **File Size**: 100-300KB per image (optimized for web)
- **Color Space**: sRGB
- **Quality**: 85-90% JPEG quality

### Visual Requirements
- Professional product photography
- Clean background (white, light gray, or transparent)
- Product centered in frame
- Good lighting (no harsh shadows)
- Sharp focus on product details
- Accurate color representation
- Minimal distractions

## Image List

### Category Images (6 required)

1. **exterior-doors.jpg**
   - Aluminum exterior door (full view)
   - Should show frame, hardware, and finish

2. **interior-doors.jpg**
   - Aluminum interior door (full view)
   - Clean, modern design

3. **exterior-fences.jpg**
   - Aluminum fence panel section
   - Show pattern/design clearly

4. **interior-fences.jpg**
   - Aluminum interior partition or rail
   - Modern architectural look

5. **window-protections.jpg**
   - Window security bars or grills
   - Show protective pattern

6. **handrail.jpg**
   - Aluminum handrail system
   - Show mounting and design

### Pattern Images (24 required)

#### Exterior Doors (4)
1. **exterior-doors-classic-panel.jpg** - Traditional panel design
2. **exterior-doors-modern-flush.jpg** - Contemporary flat surface
3. **exterior-doors-glass-insert.jpg** - Door with glass panels
4. **exterior-doors-decorative-relief.jpg** - Ornamental surface pattern

#### Interior Doors (4)
1. **interior-doors-plain-flush.jpg** - Simple flat door
2. **interior-doors-panel-design.jpg** - Door with panel sections
3. **interior-doors-glass-panel.jpg** - Glass insert door
4. **interior-doors-louvered.jpg** - Slatted/ventilated design

#### Exterior Fences (4)
1. **exterior-fences-vertical-bars.jpg** - Vertical bar pattern
2. **exterior-fences-horizontal-slats.jpg** - Horizontal slat design
3. **exterior-fences-lattice.jpg** - Diagonal lattice pattern
4. **exterior-fences-privacy-panel.jpg** - Solid panel fence

#### Interior Fences (4)
1. **interior-fences-modern-rails.jpg** - Contemporary railing design
2. **interior-fences-glass-partition.jpg** - Glass panel partition
3. **interior-fences-mesh-design.jpg** - Metal mesh pattern
4. **interior-fences-decorative-screen.jpg** - Ornamental screen

#### Window Protections (4)
1. **window-protections-standard-grid.jpg** - Standard bar grid
2. **window-protections-decorative-scroll.jpg** - Decorative scrollwork
3. **window-protections-security-bars.jpg** - Heavy-duty security bars
4. **window-protections-mesh-screen.jpg** - Fine mesh screen

#### Handrails (4)
1. **handrail-round-rail.jpg** - Round tube handrail
2. **handrail-square-rail.jpg** - Square tube handrail
3. **handrail-ornamental.jpg** - Decorative handrail design
4. **handrail-cable-rail.jpg** - Cable railing system

## How to Source Images

### Option 1: Stock Photography (Recommended)
Purchase high-quality images from:
- **Shutterstock** - shutterstock.com
- **Adobe Stock** - stock.adobe.com
- **Getty Images** - gettyimages.com
- **iStock** - istockphoto.com

**Search terms:**
- "aluminum door"
- "metal fence panel"
- "window security bars"
- "aluminum handrail"
- "architectural aluminum"

### Option 2: Royalty-Free Sources
Use free high-quality images from:
- **Unsplash** - unsplash.com
- **Pexels** - pexels.com
- **Pixabay** - pixabay.com

**Note:** Verify licensing allows commercial use

### Option 3: Professional Photography
Commission product photography:
1. Hire a professional product photographer
2. Photograph actual aluminum products
3. Ensure proper lighting and background
4. Edit for consistency

### Option 4: Manufacturer Images
Contact aluminum product manufacturers:
1. Request product image libraries
2. Obtain proper licensing/permissions
3. Ensure images meet quality standards

## Image Replacement Steps

### Step 1: Prepare Your Images
1. Download/obtain professional images
2. Resize to 1920x1080 if needed
3. Optimize file size (100-300KB)
4. Rename to match required filenames

### Step 2: Backup Current Images
```bash
cd /path/to/ALUMINUMFRAMEWORK
mkdir images_backup
cp -r images/ images_backup/
```

### Step 3: Replace Images
```bash
cd /path/to/ALUMINUMFRAMEWORK

# Copy your new images to the appropriate category directory
# Example for exterior doors:
cp /path/to/your/professional-door-image.jpg images/exterior-doors/exterior-doors.jpg
cp /path/to/your/panel-door.jpg images/exterior-doors/exterior-doors-classic-panel.jpg

# Example for interior doors:
cp /path/to/your/interior-door.jpg images/interior-doors/interior-doors.jpg

# ... repeat for all 31 images in their respective category directories
```

### Step 4: Verify Images
```bash
# Check all category directories exist
ls -la images/

# Check all images are present (should show 30 total pattern + category images)
find images -type f -name "*.jpg" | wc -l

# Check file sizes in each category
ls -lh images/exterior-doors/*.jpg
ls -lh images/interior-doors/*.jpg
ls -lh images/exterior-fences/*.jpg
ls -lh images/interior-fences/*.jpg
ls -lh images/window-protections/*.jpg
ls -lh images/handrail/*.jpg

# Or use the validation script
./validate-images.sh
```

### Step 5: Test in Browser
```bash
# Start local server
python3 -m http.server 8080

# Open browser to http://localhost:8080
# Navigate through all pages to verify images display correctly
```

## Image Optimization

### Reduce File Size (if needed)
Using ImageMagick:
```bash
# Install ImageMagick if not available
# Ubuntu/Debian: sudo apt-get install imagemagick

# Optimize all images
cd images
for img in *.jpg; do
    convert "$img" -quality 85 -resize 1920x1080 "optimized_$img"
done
```

Using online tools:
- TinyPNG - tinypng.com
- Squoosh - squoosh.app
- Optimizilla - imagecompressor.com

## Quality Checklist

Before finalizing, verify each image:
- [ ] Professional quality
- [ ] Clean background
- [ ] Proper resolution (1920x1080)
- [ ] Optimized file size (100-300KB)
- [ ] Correct filename
- [ ] Product clearly visible
- [ ] Good lighting and focus
- [ ] Accurate colors
- [ ] Loads quickly in browser
- [ ] Displays correctly in all steps

## Legal Considerations

⚠️ **Important:** Ensure you have proper rights to use all images!

### Licensing Requirements
- Commercial use allowed
- No attribution required (or attribution provided if required)
- Modification allowed (for cropping/resizing)
- Redistribution allowed (if selling products)

### Avoid
- Using images without permission
- Downloading from competitor websites
- Using copyrighted material
- Violating terms of service

## Support

If you need help with image replacement:
1. Review this guide
2. Check image dimensions with `file` command
3. Verify images load in browser
4. Ensure filenames match exactly

## Future Improvements

Consider:
- Converting to WEBP format for better compression
- Adding retina/@2x versions for high-DPI displays
- Implementing lazy loading for better performance
- Adding image CDN for faster delivery
- Creating multiple sizes for responsive design
