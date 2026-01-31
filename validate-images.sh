#!/bin/bash
# Image Validation Script for ALUMINUMFRAMEWORK
# This script checks if all required images are present and meet basic requirements

echo "==================================="
echo "Image Validation Script"
echo "==================================="
echo ""

IMAGES_DIR="images"
REQUIRED_IMAGES=(
    # Category images
    "exterior-doors.jpg"
    "interior-doors.jpg"
    "exterior-fences.jpg"
    "interior-fences.jpg"
    "window-protections.jpg"
    "handrail.jpg"
    # Exterior door patterns
    "exterior-doors-classic-panel.jpg"
    "exterior-doors-modern-flush.jpg"
    "exterior-doors-glass-insert.jpg"
    "exterior-doors-decorative-relief.jpg"
    # Interior door patterns
    "interior-doors-plain-flush.jpg"
    "interior-doors-panel-design.jpg"
    "interior-doors-glass-panel.jpg"
    "interior-doors-louvered.jpg"
    # Exterior fence patterns
    "exterior-fences-vertical-bars.jpg"
    "exterior-fences-horizontal-slats.jpg"
    "exterior-fences-lattice.jpg"
    "exterior-fences-privacy-panel.jpg"
    # Interior fence patterns
    "interior-fences-modern-rails.jpg"
    "interior-fences-glass-partition.jpg"
    "interior-fences-mesh-design.jpg"
    "interior-fences-decorative-screen.jpg"
    # Window protection patterns
    "window-protections-standard-grid.jpg"
    "window-protections-decorative-scroll.jpg"
    "window-protections-security-bars.jpg"
    "window-protections-mesh-screen.jpg"
    # Handrail patterns
    "handrail-round-rail.jpg"
    "handrail-square-rail.jpg"
    "handrail-ornamental.jpg"
    "handrail-cable-rail.jpg"
)

MISSING_COUNT=0
PRESENT_COUNT=0
INVALID_SIZE_COUNT=0

echo "Checking for required images..."
echo ""

for image in "${REQUIRED_IMAGES[@]}"; do
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

echo ""
echo "==================================="
echo "Summary"
echo "==================================="
echo "Total required images: ${#REQUIRED_IMAGES[@]}"
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
