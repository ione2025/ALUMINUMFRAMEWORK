#!/bin/bash
# Image Validation Script for ALUMINUMFRAMEWORK
# This script checks if all required images are present and meet basic requirements

echo "==================================="
echo "Image Validation Script"
echo "==================================="
echo ""

IMAGES_DIR="images"
# Define categories and their images
CATEGORIES=(
    "exterior-doors"
    "interior-doors"
    "exterior-fences"
    "interior-fences"
    "window-protections"
    "handrail"
)

CATEGORY_IMAGES=(
    "exterior-doors.jpg"
    "interior-doors.jpg"
    "exterior-fences.jpg"
    "interior-fences.jpg"
    "window-protections.jpg"
    "handrail.jpg"
)

PATTERN_IMAGES=(
    # Exterior door patterns
    "exterior-doors/exterior-doors-classic-panel.jpg"
    "exterior-doors/exterior-doors-modern-flush.jpg"
    "exterior-doors/exterior-doors-glass-insert.jpg"
    "exterior-doors/exterior-doors-decorative-relief.jpg"
    # Interior door patterns
    "interior-doors/interior-doors-plain-flush.jpg"
    "interior-doors/interior-doors-panel-design.jpg"
    "interior-doors/interior-doors-glass-panel.jpg"
    "interior-doors/interior-doors-louvered.jpg"
    # Exterior fence patterns
    "exterior-fences/exterior-fences-vertical-bars.jpg"
    "exterior-fences/exterior-fences-horizontal-slats.jpg"
    "exterior-fences/exterior-fences-lattice.jpg"
    "exterior-fences/exterior-fences-privacy-panel.jpg"
    # Interior fence patterns
    "interior-fences/interior-fences-modern-rails.jpg"
    "interior-fences/interior-fences-glass-partition.jpg"
    "interior-fences/interior-fences-mesh-design.jpg"
    "interior-fences/interior-fences-decorative-screen.jpg"
    # Window protection patterns
    "window-protections/window-protections-standard-grid.jpg"
    "window-protections/window-protections-decorative-scroll.jpg"
    "window-protections/window-protections-security-bars.jpg"
    "window-protections/window-protections-mesh-screen.jpg"
    # Handrail patterns
    "handrail/handrail-round-rail.jpg"
    "handrail/handrail-square-rail.jpg"
    "handrail/handrail-ornamental.jpg"
    "handrail/handrail-cable-rail.jpg"
)

MISSING_COUNT=0
PRESENT_COUNT=0
INVALID_SIZE_COUNT=0

echo "Checking category directories..."
echo ""

# Check if category directories exist
for category in "${CATEGORIES[@]}"; do
    CATEGORY_PATH="$IMAGES_DIR/$category"
    if [ -d "$CATEGORY_PATH" ]; then
        echo "✅ Directory: $category/"
    else
        echo "❌ Directory: $category/ - MISSING"
        MISSING_COUNT=$((MISSING_COUNT + 1))
    fi
done

echo ""
echo "Checking category images..."
echo ""

# Check category images (stored in category subdirectories)
for i in "${!CATEGORIES[@]}"; do
    category="${CATEGORIES[$i]}"
    image="${CATEGORY_IMAGES[$i]}"
    IMAGE_PATH="$IMAGES_DIR/$category/$image"
    
    if [ -f "$IMAGE_PATH" ]; then
        PRESENT_COUNT=$((PRESENT_COUNT + 1))
        
        # Check file size
        FILE_SIZE=$(stat -f%z "$IMAGE_PATH" 2>/dev/null || stat -c%s "$IMAGE_PATH" 2>/dev/null)
        FILE_SIZE_KB=$((FILE_SIZE / 1024))
        
        # Check if file is a valid JPEG
        FILE_TYPE=$(file -b --mime-type "$IMAGE_PATH")
        
        if [ "$FILE_TYPE" = "image/jpeg" ] || [ "$FILE_TYPE" = "image/jpg" ]; then
            if [ $FILE_SIZE_KB -lt 10 ]; then
                echo "⚠️  $category/$image - PRESENT but suspiciously small (${FILE_SIZE_KB}KB)"
                INVALID_SIZE_COUNT=$((INVALID_SIZE_COUNT + 1))
            elif [ $FILE_SIZE_KB -gt 500 ]; then
                echo "⚠️  $category/$image - PRESENT but large (${FILE_SIZE_KB}KB) - consider optimizing"
            else
                echo "✅ $category/$image - OK (${FILE_SIZE_KB}KB)"
            fi
        else
            echo "❌ $category/$image - PRESENT but not a valid JPEG (type: $FILE_TYPE)"
            INVALID_SIZE_COUNT=$((INVALID_SIZE_COUNT + 1))
        fi
    else
        echo "❌ $category/$image - MISSING"
        MISSING_COUNT=$((MISSING_COUNT + 1))
    fi
done

echo ""
echo "Checking pattern images..."
echo ""

# Check pattern images
for image in "${PATTERN_IMAGES[@]}"; do
    IMAGE_PATH="$IMAGES_DIR/$image"
    
    if [ -f "$IMAGE_PATH" ]; then
        PRESENT_COUNT=$((PRESENT_COUNT + 1))
        
        # Check file size
        FILE_SIZE=$(stat -f%z "$IMAGE_PATH" 2>/dev/null || stat -c%s "$IMAGE_PATH" 2>/dev/null)
        FILE_SIZE_KB=$((FILE_SIZE / 1024))
        
        # Check if file is a valid JPEG
        FILE_TYPE=$(file -b --mime-type "$IMAGE_PATH")
        
        if [ "$FILE_TYPE" = "image/jpeg" ] || [ "$FILE_TYPE" = "image/jpg" ]; then
            if [ $FILE_SIZE_KB -lt 10 ]; then
                echo "⚠️  $image - PRESENT but suspiciously small (${FILE_SIZE_KB}KB)"
                INVALID_SIZE_COUNT=$((INVALID_SIZE_COUNT + 1))
            elif [ $FILE_SIZE_KB -gt 500 ]; then
                echo "⚠️  $image - PRESENT but large (${FILE_SIZE_KB}KB) - consider optimizing"
            else
                echo "✅ $image - OK (${FILE_SIZE_KB}KB)"
            fi
        else
            echo "❌ $image - PRESENT but not a valid JPEG (type: $FILE_TYPE)"
            INVALID_SIZE_COUNT=$((INVALID_SIZE_COUNT + 1))
        fi
    else
        echo "❌ $image - MISSING"
        MISSING_COUNT=$((MISSING_COUNT + 1))
    fi
done

TOTAL_REQUIRED=$((${#CATEGORY_IMAGES[@]} + ${#PATTERN_IMAGES[@]}))

echo ""
echo "==================================="
echo "Summary"
echo "==================================="
echo "Total required images: $TOTAL_REQUIRED"
echo "Present: $PRESENT_COUNT"
echo "Missing: $MISSING_COUNT"
echo "Issues: $INVALID_SIZE_COUNT"
echo ""

if [ $MISSING_COUNT -eq 0 ] && [ $INVALID_SIZE_COUNT -eq 0 ]; then
    echo "✅ All images are present and appear valid!"
    echo ""
    echo "Next steps:"
    echo "1. Verify images display correctly in browser"
    echo "2. Check that images are professional quality"
    echo "3. Ensure images meet the quality requirements in IMAGE_REPLACEMENT_GUIDE.md"
    exit 0
else
    echo "⚠️  Some images are missing or have issues."
    echo ""
    echo "Next steps:"
    echo "1. Review IMAGE_REPLACEMENT_GUIDE.md for instructions"
    echo "2. Replace missing or problematic images"
    echo "3. Run this script again to verify"
    exit 1
fi
