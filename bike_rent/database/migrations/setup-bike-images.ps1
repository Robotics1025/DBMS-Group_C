# ============================================================================
# Bike Images Setup Script
# ============================================================================
# This script creates the bike images directory structure and placeholder files
# Run this to prepare your project for bike images
# ============================================================================

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              🚲 Bike Images Setup Script                        ║" -ForegroundColor Cyan
Write-Host "║              Preparing image directories and files               ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# Step 1: Define paths
# ============================================================================
$projectRoot = "E:\BIKE\DBMS-Group_C\bike_rent"
$publicPath = Join-Path $projectRoot "public"
$assetsPath = Join-Path $publicPath "assets"
$imagesPath = Join-Path $assetsPath "images"
$bikesPath = Join-Path $imagesPath "bikes"

Write-Host "[1/4] Creating directory structure..." -ForegroundColor Yellow

# ============================================================================
# Step 2: Create directories
# ============================================================================
try {
    if (-not (Test-Path $publicPath)) {
        New-Item -ItemType Directory -Force -Path $publicPath | Out-Null
        Write-Host "   ✅ Created: public/" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Exists: public/" -ForegroundColor Gray
    }

    if (-not (Test-Path $assetsPath)) {
        New-Item -ItemType Directory -Force -Path $assetsPath | Out-Null
        Write-Host "   ✅ Created: public/assets/" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Exists: public/assets/" -ForegroundColor Gray
    }

    if (-not (Test-Path $imagesPath)) {
        New-Item -ItemType Directory -Force -Path $imagesPath | Out-Null
        Write-Host "   ✅ Created: public/assets/images/" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Exists: public/assets/images/" -ForegroundColor Gray
    }

    if (-not (Test-Path $bikesPath)) {
        New-Item -ItemType Directory -Force -Path $bikesPath | Out-Null
        Write-Host "   ✅ Created: public/assets/images/bikes/" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Exists: public/assets/images/bikes/" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Error creating directories: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================================================
# Step 3: Define bike image requirements
# ============================================================================
Write-Host "[2/4] Setting up bike image placeholders..." -ForegroundColor Yellow

$bikeImages = @{
    "city-bike" = @{
        count = 5
        description = "City bikes for urban commuting"
        examples = @(
            "CityCruiser X1 - Red/Blue city bike with basket"
            "UrbanGlide - Black urban commuter bike"
            "Student Special - Yellow/Green affordable city bike"
            "Campus Cruiser - White modern city bike"
            "ShopperExpress - Silver city bike with cargo rack"
        )
    }
    "electric-bike" = @{
        count = 6
        description = "Electric bikes with battery power"
        examples = @(
            "SpeedMaster 200 - High-speed e-bike, sleek design"
            "ThunderBolt E-Bike - Powerful electric bike"
            "E-Scholar - Student-friendly e-bike"
            "PowerShop E-Bike - E-bike with cargo capacity"
            "JetSet Rider - Premium e-bike for travelers"
            "TravelLight - Lightweight portable e-bike"
        )
    }
    "hybrid-bike" = @{
        count = 3
        description = "Hybrid bikes for versatile riding"
        examples = @(
            "EcoRide Pro - Eco-friendly hybrid"
            "FlexRide Hybrid - Versatile for all terrains"
            "CargoMaster - Heavy-duty hybrid with cargo"
        )
    }
    "mountain-bike" = @{
        count = 2
        description = "Mountain bikes for rugged terrain"
        examples = @(
            "MountainKing Pro - Rugged off-road bike"
            "BeachCruiser Wave - Beach-ready cruiser"
        )
    }
}

$totalFiles = 0

foreach ($type in $bikeImages.Keys) {
    $info = $bikeImages[$type]
    $count = $info.count
    
    Write-Host "   📁 $($type.Replace('-', ' ').ToUpper()): $count images" -ForegroundColor Cyan
    
    for ($i = 1; $i -le $count; $i++) {
        $filename = "$type-$i.txt"
        $filepath = Join-Path $bikesPath $filename
        $example = if ($i -le $info.examples.Count) { $info.examples[$i-1] } else { "Bike #$i" }
        
        $content = @"
╔════════════════════════════════════════════════════════════════╗
║  PLACEHOLDER: $type-$i.jpg
╚════════════════════════════════════════════════════════════════╝

📦 FILE INFO:
   Type: $($type.Replace('-', ' ').ToUpper())
   Number: $i
   Description: $($info.description)
   
🚲 BIKE DETAILS:
   $example

📥 DOWNLOAD SOURCES:
   • Unsplash: https://unsplash.com/s/photos/$($type.Replace('-', ' '))
   • Pexels: https://www.pexels.com/search/$($type.Replace('-', ' '))/
   • Pixabay: https://pixabay.com/images/search/$($type.Replace('-', ' '))/

🎨 IMAGE SPECIFICATIONS:
   • Width: 800-1200 pixels
   • Height: 600-900 pixels
   • Format: JPG (preferred) or PNG
   • File size: 100-500 KB
   • Aspect ratio: 4:3 or 16:9

📝 INSTRUCTIONS:
   1. Download a bike image from one of the sources above
   2. Rename it to: $type-$i.jpg
   3. Replace this .txt file with the .jpg file
   4. Verify the image loads in your browser

🔗 TEST URL (after dev server running):
   http://localhost:3000/assets/images/bikes/$type-$i.jpg

✅ CHECKLIST:
   [ ] Downloaded high-quality bike image
   [ ] Renamed to $type-$i.jpg
   [ ] Copied to: public/assets/images/bikes/
   [ ] Tested loading in browser
   [ ] Optimized file size (< 500 KB)

"@
        
        Set-Content -Path $filepath -Value $content -Encoding UTF8
        Write-Host "      ✓ Created placeholder: $filename" -ForegroundColor Gray
        $totalFiles++
    }
}

Write-Host ""

# ============================================================================
# Step 4: Create README in bikes folder
# ============================================================================
Write-Host "[3/4] Creating README..." -ForegroundColor Yellow

$readmeText = "# Bike Images Directory`n`n"
$readmeText += "## Required Images (16 total)`n`n"
$readmeText += "### City Bikes (5 images)`n"
$readmeText += "- city-bike-1.jpg - CityCruiser X1`n"
$readmeText += "- city-bike-2.jpg - UrbanGlide`n"
$readmeText += "- city-bike-3.jpg - Student Special`n"
$readmeText += "- city-bike-4.jpg - Campus Cruiser`n"
$readmeText += "- city-bike-5.jpg - ShopperExpress`n`n"
$readmeText += "### Electric Bikes (6 images)`n"
$readmeText += "- electric-bike-1.jpg - SpeedMaster 200`n"
$readmeText += "- electric-bike-2.jpg - ThunderBolt E-Bike`n"
$readmeText += "- electric-bike-3.jpg - E-Scholar`n"
$readmeText += "- electric-bike-4.jpg - PowerShop E-Bike`n"
$readmeText += "- electric-bike-5.jpg - JetSet Rider`n"
$readmeText += "- electric-bike-6.jpg - TravelLight`n`n"
$readmeText += "### Hybrid Bikes (3 images)`n"
$readmeText += "- hybrid-bike-1.jpg - EcoRide Pro`n"
$readmeText += "- hybrid-bike-2.jpg - FlexRide Hybrid`n"
$readmeText += "- hybrid-bike-3.jpg - CargoMaster`n`n"
$readmeText += "### Mountain Bikes (2 images)`n"
$readmeText += "- mountain-bike-1.jpg - MountainKing Pro`n"
$readmeText += "- mountain-bike-2.jpg - BeachCruiser Wave`n`n"
$readmeText += "## Image Sources`n`n"
$readmeText += "Unsplash: https://unsplash.com/s/photos/bicycle`n"
$readmeText += "Pexels: https://www.pexels.com/search/bicycle/`n"
$readmeText += "Pixabay: https://pixabay.com/images/search/bicycle/`n`n"
$readmeText += "Last Updated: $(Get-Date -Format 'MMMM dd, yyyy')`n"

$readmePath = Join-Path $bikesPath "README.md"
Set-Content -Path $readmePath -Value $readmeText -Encoding UTF8
Write-Host "   ✅ Created README.md in bikes folder" -ForegroundColor Green

Write-Host ""

# ============================================================================
# Step 5: Create image download helper list
# ============================================================================
Write-Host "[4/4] Creating download helper file..." -ForegroundColor Yellow

$downloadText = "Bike Images Download List`n`n"
$downloadText += "UNSPLASH SEARCH QUERIES`n`n"
$downloadText += "City Bikes:`n"
$downloadText += "https://unsplash.com/s/photos/city-bike`n`n"
$downloadText += "Electric Bikes:`n"
$downloadText += "https://unsplash.com/s/photos/electric-bike`n`n"
$downloadText += "Hybrid Bikes:`n"
$downloadText += "https://unsplash.com/s/photos/hybrid-bicycle`n`n"
$downloadText += "Mountain Bikes:`n"
$downloadText += "https://unsplash.com/s/photos/mountain-bike`n"

$downloadListPath = Join-Path $bikesPath "DOWNLOAD_LIST.txt"
Set-Content -Path $downloadListPath -Value $downloadText -Encoding UTF8
Write-Host "   ✅ Created DOWNLOAD_LIST.txt" -ForegroundColor Green

Write-Host ""

# ============================================================================
# Step 6: Display summary
# ============================================================================
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ Setup Complete!                              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   ✅ Created bikes directory: $bikesPath" -ForegroundColor Green
Write-Host "   ✅ Generated $totalFiles placeholder files" -ForegroundColor Green
Write-Host "   ✅ Created README.md with instructions" -ForegroundColor Green
Write-Host "   ✅ Created DOWNLOAD_LIST.txt for reference" -ForegroundColor Green
Write-Host ""
Write-Host "📥 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open the bikes folder:" -ForegroundColor White
Write-Host "   $bikesPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Download 16 bike images from:" -ForegroundColor White
Write-Host "   • Unsplash: https://unsplash.com/s/photos/bicycle" -ForegroundColor Cyan
Write-Host "   • Pexels: https://www.pexels.com/search/bicycle/" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Rename downloaded images:" -ForegroundColor White
Write-Host "   city-bike-1.jpg, city-bike-2.jpg, etc." -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Copy images to the bikes folder" -ForegroundColor White
Write-Host ""
Write-Host "5. Delete .txt placeholder files (optional)" -ForegroundColor White
Write-Host ""
Write-Host "6. Test image loading:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host "   http://localhost:3000/assets/images/bikes/city-bike-1.jpg" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   database/migrations/BIKE_IMAGES_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Ready to add bike images! 🚲" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Open folder in explorer
Write-Host "💡 Tip: Opening bikes folder in File Explorer..." -ForegroundColor Yellow
Start-Process explorer.exe $bikesPath
Write-Host "   ✅ Folder opened!" -ForegroundColor Green
Write-Host ""
