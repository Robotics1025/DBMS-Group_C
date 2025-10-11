# 🚲 Bike Images Setup Guide

## 📋 Overview

This guide explains how to set up bike images for your BikeRentalDB database.

---

## 📁 Image Directory Structure

### **Required Folder:**

```
public/
└── assets/
    └── images/
        └── bikes/
            ├── city-bike-1.jpg
            ├── city-bike-2.jpg
            ├── city-bike-3.jpg
            ├── city-bike-4.jpg
            ├── city-bike-5.jpg
            ├── electric-bike-1.jpg
            ├── electric-bike-2.jpg
            ├── electric-bike-3.jpg
            ├── electric-bike-4.jpg
            ├── electric-bike-5.jpg
            ├── electric-bike-6.jpg
            ├── hybrid-bike-1.jpg
            ├── hybrid-bike-2.jpg
            ├── hybrid-bike-3.jpg
            ├── mountain-bike-1.jpg
            └── mountain-bike-2.jpg
```

**Total:** 16 bike images

---

## 🖼️ Image Specifications

### **Recommended Dimensions:**
- **Width:** 800-1200px
- **Height:** 600-900px
- **Aspect Ratio:** 4:3 or 16:9
- **Format:** JPG or PNG
- **File Size:** 100-500 KB each

### **Image Quality:**
- **Resolution:** 72-150 DPI (web optimized)
- **Compression:** Medium to High (balance quality/size)

---

## 🎨 Bike Images by Type

### **City Bikes (5 images)**

| File | Bike Model | Serial | Description |
|------|------------|--------|-------------|
| `city-bike-1.jpg` | CityCruiser X1 | B-100001 | Red/Blue city bike with basket |
| `city-bike-2.jpg` | UrbanGlide | B-100004 | Black urban commuter bike |
| `city-bike-3.jpg` | Student Special | B-200001 | Yellow/Green affordable city bike |
| `city-bike-4.jpg` | Campus Cruiser | B-200002 | White modern city bike |
| `city-bike-5.jpg` | ShopperExpress | B-300001 | Silver city bike with cargo rack |

### **Electric Bikes (6 images)**

| File | Bike Model | Serial | Description |
|------|------------|--------|-------------|
| `electric-bike-1.jpg` | SpeedMaster 200 | B-100002 | High-speed e-bike, sleek design |
| `electric-bike-2.jpg` | ThunderBolt E-Bike | B-100005 | Powerful electric bike, battery visible |
| `electric-bike-3.jpg` | E-Scholar | B-200003 | Student-friendly e-bike, affordable |
| `electric-bike-4.jpg` | PowerShop E-Bike | B-300002 | E-bike with cargo capacity |
| `electric-bike-5.jpg` | JetSet Rider | B-400001 | Premium e-bike for travelers |
| `electric-bike-6.jpg` | TravelLight | B-400002 | Lightweight portable e-bike |

### **Hybrid Bikes (3 images)**

| File | Bike Model | Serial | Description |
|------|------------|--------|-------------|
| `hybrid-bike-1.jpg` | EcoRide Pro | B-100003 | Eco-friendly hybrid, green theme |
| `hybrid-bike-2.jpg` | FlexRide Hybrid | B-200004 | Versatile hybrid for all terrains |
| `hybrid-bike-3.jpg` | CargoMaster | B-300003 | Heavy-duty hybrid with cargo box |

### **Mountain Bikes (2 images)**

| File | Bike Model | Serial | Description |
|------|------------|--------|-------------|
| `mountain-bike-1.jpg` | MountainKing Pro | B-100006 | Rugged mountain bike, off-road |
| `mountain-bike-2.jpg` | BeachCruiser Wave | B-500001 | Beach-ready mountain cruiser |

---

## 📥 Image Sources

### **Option 1: Free Stock Photos** (Recommended)

#### **Unsplash** (High Quality, Free)
```
https://unsplash.com/s/photos/city-bike
https://unsplash.com/s/photos/electric-bike
https://unsplash.com/s/photos/hybrid-bike
https://unsplash.com/s/photos/mountain-bike
```

#### **Pexels** (Free, No Attribution)
```
https://www.pexels.com/search/bicycle/
https://www.pexels.com/search/e-bike/
https://www.pexels.com/search/mountain-bike/
```

#### **Pixabay** (Free Commercial Use)
```
https://pixabay.com/images/search/bicycle/
https://pixabay.com/images/search/electric%20bike/
```

### **Option 2: AI-Generated Images**

Use AI tools to generate custom bike images:
- **Midjourney:** Professional bike renders
- **DALL-E:** Custom bike designs
- **Stable Diffusion:** Free alternative

**Prompt Examples:**
```
"Modern city bike with basket, studio lighting, white background"
"High-tech electric bike, sleek design, professional product photo"
"Rugged mountain bike, outdoor setting, action shot"
```

### **Option 3: Placeholder Service**

For development/testing:
```
https://placehold.co/800x600/png?text=City+Bike+1
https://placehold.co/800x600/png?text=Electric+Bike+1
```

---

## 🚀 Quick Setup Script

### **PowerShell Script (Windows)**

Save as `setup-bike-images.ps1`:

```powershell
# Create bike images directory
$bikesPath = "E:\BIKE\DBMS-Group_C\bike_rent\public\assets\images\bikes"
New-Item -ItemType Directory -Force -Path $bikesPath

Write-Host "✅ Created directory: $bikesPath" -ForegroundColor Green
Write-Host ""
Write-Host "📥 Next steps:" -ForegroundColor Cyan
Write-Host "1. Download 16 bike images from Unsplash/Pexels"
Write-Host "2. Rename them according to the naming convention:"
Write-Host "   - city-bike-1.jpg to city-bike-5.jpg (5 images)"
Write-Host "   - electric-bike-1.jpg to electric-bike-6.jpg (6 images)"
Write-Host "   - hybrid-bike-1.jpg to hybrid-bike-3.jpg (3 images)"
Write-Host "   - mountain-bike-1.jpg to mountain-bike-2.jpg (2 images)"
Write-Host "3. Copy them to: $bikesPath"
Write-Host ""
Write-Host "🎨 Image specifications:" -ForegroundColor Yellow
Write-Host "   - Size: 800x600 to 1200x900 pixels"
Write-Host "   - Format: JPG or PNG"
Write-Host "   - File size: 100-500 KB each"
Write-Host ""

# Create placeholder images using text files
$bikes = @{
    "city-bike" = 5
    "electric-bike" = 6
    "hybrid-bike" = 3
    "mountain-bike" = 2
}

Write-Host "📝 Creating placeholder text files..." -ForegroundColor Cyan

foreach ($type in $bikes.Keys) {
    $count = $bikes[$type]
    for ($i = 1; $i -le $count; $i++) {
        $filename = "$type-$i.txt"
        $filepath = Join-Path $bikesPath $filename
        
        $content = @"
PLACEHOLDER: $type-$i.jpg

Replace this file with an actual bike image.

Type: $($type.Replace('-', ' ').ToUpper())
Number: $i

Recommended sources:
- Unsplash: https://unsplash.com/s/photos/$($type.Replace('-', ' '))
- Pexels: https://www.pexels.com/search/$($type.Replace('-', ' '))/

Rename the downloaded image to: $type-$i.jpg
"@
        
        Set-Content -Path $filepath -Value $content
        Write-Host "   Created: $filename" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "   $((Get-ChildItem $bikesPath).Count) placeholder files created" -ForegroundColor Green
```

**Run:**
```powershell
.\setup-bike-images.ps1
```

---

## 🔧 Alternative: Use Existing Images

If you already have bike images in your project:

### **Option A: Update Database**

```sql
USE BikeRentalDB;

-- Update with your existing image paths
UPDATE Bike SET bike_image = '/uploads/bikes/my-city-bike-1.jpg' WHERE BikeID = 1;
UPDATE Bike SET bike_image = '/uploads/bikes/my-electric-1.jpg' WHERE BikeID = 2;
-- ... etc
```

### **Option B: Copy Images to New Location**

```powershell
# Copy existing images
Copy-Item "E:\BIKE\DBMS-Group_C\bike_rent\public\uploads\bikes\*" `
          -Destination "E:\BIKE\DBMS-Group_C\bike_rent\public\assets\images\bikes\"
```

---

## 🎯 Database Image Paths

After setup, your database will have these image paths:

| BikeID | Serial | Type | Image Path |
|--------|--------|------|------------|
| 1 | B-100001 | City | `/assets/images/bikes/city-bike-1.jpg` |
| 2 | B-100002 | Electric | `/assets/images/bikes/electric-bike-1.jpg` |
| 3 | B-100003 | Hybrid | `/assets/images/bikes/hybrid-bike-1.jpg` |
| 4 | B-100004 | City | `/assets/images/bikes/city-bike-2.jpg` |
| 5 | B-100005 | Electric | `/assets/images/bikes/electric-bike-2.jpg` |
| 6 | B-100006 | Mountain | `/assets/images/bikes/mountain-bike-1.jpg` |
| 7 | B-200001 | City | `/assets/images/bikes/city-bike-3.jpg` |
| 8 | B-200002 | City | `/assets/images/bikes/city-bike-4.jpg` |
| 9 | B-200003 | Electric | `/assets/images/bikes/electric-bike-3.jpg` |
| 10 | B-200004 | Hybrid | `/assets/images/bikes/hybrid-bike-2.jpg` |
| 11 | B-300001 | City | `/assets/images/bikes/city-bike-5.jpg` |
| 12 | B-300002 | Electric | `/assets/images/bikes/electric-bike-4.jpg` |
| 13 | B-300003 | Hybrid | `/assets/images/bikes/hybrid-bike-3.jpg` |
| 14 | B-400001 | Electric | `/assets/images/bikes/electric-bike-5.jpg` |
| 15 | B-400002 | Electric | `/assets/images/bikes/electric-bike-6.jpg` |
| 16 | B-500001 | Mountain | `/assets/images/bikes/mountain-bike-2.jpg` |

---

## 🖼️ Using Images in Your App

### **Next.js Image Component**

```typescript
import Image from 'next/image';

<Image 
  src={bike.bike_image} 
  alt={bike.Model}
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### **Regular HTML Image**

```typescript
<img 
  src={bike.bike_image} 
  alt={bike.Model}
  className="w-full h-64 object-cover rounded-lg"
/>
```

### **With Fallback**

```typescript
<Image 
  src={bike.bike_image || '/assets/images/bikes/default-bike.jpg'} 
  alt={bike.Model}
  width={800}
  height={600}
  onError={(e) => {
    e.currentTarget.src = '/assets/images/bikes/default-bike.jpg';
  }}
/>
```

---

## ✅ Verification Checklist

After setting up images:

- [ ] Created `/public/assets/images/bikes/` folder
- [ ] Downloaded/generated 16 bike images
- [ ] Renamed images according to naming convention
- [ ] Copied images to the bikes folder
- [ ] Verified image paths in database
- [ ] Tested image loading in browser
- [ ] Created default/fallback image (optional)
- [ ] Optimized images for web (< 500 KB each)

---

## 🔍 Test Image Loading

### **Quick Test URL**

After running your dev server:

```
http://localhost:3000/assets/images/bikes/city-bike-1.jpg
http://localhost:3000/assets/images/bikes/electric-bike-1.jpg
http://localhost:3000/assets/images/bikes/hybrid-bike-1.jpg
http://localhost:3000/assets/images/bikes/mountain-bike-1.jpg
```

If images load, you're all set! ✅

### **Test in Database**

```sql
USE BikeRentalDB;

-- Show all bike images
SELECT 
    BikeSerialNumber,
    Model,
    BikeType,
    bike_image
FROM Bike
ORDER BY BikeType, BikeID;
```

---

## 🎨 Image Optimization

### **Using ImageMagick (Batch Process)**

```bash
# Resize all images to 800x600
mogrify -resize 800x600 -quality 85 *.jpg

# Convert PNG to JPG
mogrify -format jpg *.png
```

### **Using Online Tools**

- **TinyPNG:** https://tinypng.com/ (Compress JPG/PNG)
- **Squoosh:** https://squoosh.app/ (Google's image optimizer)
- **ImageOptim:** https://imageoptim.com/ (Mac app)

---

## 📚 Additional Resources

### **Free Bike Image Libraries**

1. **Unsplash Collections:**
   - https://unsplash.com/collections/1538150/bikes
   - https://unsplash.com/collections/8847704/bicycles

2. **Pexels Collections:**
   - https://www.pexels.com/search/bicycle/
   - High-quality, free commercial use

3. **Freepik:**
   - https://www.freepik.com/search?format=search&query=bicycle
   - Free with attribution

### **Bike Photography Tips**

If taking your own photos:
- Use natural lighting
- Clean background (white/gray)
- Show full bike from side angle
- Include key features (basket, battery, etc.)
- Consistent angle for all bikes

---

## 🆘 Troubleshooting

### **Images not loading**

**Problem:** 404 error when accessing images

**Solutions:**
1. Check folder path: `/public/assets/images/bikes/`
2. Verify file names match database
3. Check file permissions
4. Restart dev server: `npm run dev`

### **Slow loading**

**Problem:** Images take long to load

**Solutions:**
1. Optimize images (reduce file size)
2. Use Next.js Image component (automatic optimization)
3. Consider using CDN for production

### **Wrong images showing**

**Problem:** Database points to wrong images

**Solution:**
```sql
-- Update all image paths at once
UPDATE Bike 
SET bike_image = CONCAT('/assets/images/bikes/', 
    LOWER(BikeType), '-bike-', 
    ROW_NUMBER() OVER (PARTITION BY BikeType ORDER BY BikeID), 
    '.jpg'
);
```

---

## 🎯 Quick Reference

### **Directory:**
```
public/assets/images/bikes/
```

### **Naming Convention:**
```
{type}-bike-{number}.jpg
```

### **Types:**
- `city` (5 images)
- `electric` (6 images)
- `hybrid` (3 images)
- `mountain` (2 images)

### **Access in App:**
```typescript
bike.bike_image // Returns: "/assets/images/bikes/city-bike-1.jpg"
```

---

**Last Updated:** October 10, 2025  
**Status:** ✅ Image paths configured in database  
**Next Step:** Download and place 16 bike images in the folder
