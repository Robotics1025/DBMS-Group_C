# Simple Bike Images Directory Setup

Write-Host ""
Write-Host "Creating bike images directory..." -ForegroundColor Cyan
Write-Host ""

# Create directory structure
$bikesPath = "E:\BIKE\DBMS-Group_C\bike_rent\public\assets\images\bikes"
New-Item -ItemType Directory -Force -Path $bikesPath | Out-Null

Write-Host "✅ Created directory:" -ForegroundColor Green
Write-Host "   $bikesPath" -ForegroundColor White
Write-Host ""

# Create placeholder files
$bikeTypes = @{
    "city-bike" = 5
    "electric-bike" = 6
    "hybrid-bike" = 3
    "mountain-bike" = 2
}

Write-Host "Creating 16 placeholder files..." -ForegroundColor Cyan
$count = 0

foreach ($type in $bikeTypes.Keys) {
    for ($i = 1; $i -le $bikeTypes[$type]; $i++) {
        $filename = "$type-$i.txt"
        $filepath = Join-Path $bikesPath $filename
        $placeholderContent = "PLACEHOLDER for $type-$i.jpg`n`nDownload bike image from:`nhttps://unsplash.com/s/photos/$($type.Replace('-',' '))`n`nRename to: $type-$i.jpg"
        Set-Content -Path $filepath -Value $placeholderContent
        $count++
    }
}

Write-Host "✅ Created $count placeholder files" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Download bike images from Unsplash/Pexels" -ForegroundColor White
Write-Host "2. Rename them: city-bike-1.jpg, electric-bike-1.jpg, etc." -ForegroundColor White
Write-Host "3. Copy to: $bikesPath" -ForegroundColor White
Write-Host ""
Write-Host "Opening folder..." -ForegroundColor Cyan
Start-Process explorer.exe $bikesPath
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host ""
