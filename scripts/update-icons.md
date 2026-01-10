# 🎨 App Icon Update Guide

This guide will help you update the Android app icons with the Privacy Panda logo.

---

## Current Status

- ✅ Default Capacitor icons are in place
- ⚠️ Need to replace with Privacy Panda logo (`public/LogoPandagarde.png`)

---

## Required Icon Sizes

Android requires icons in multiple sizes for different screen densities:

| Density | Size | Location |
|---------|------|----------|
| mdpi | 48x48 | `android/app/src/main/res/mipmap-mdpi/` |
| hdpi | 72x72 | `android/app/src/main/res/mipmap-hdpi/` |
| xhdpi | 96x96 | `android/app/src/main/res/mipmap-xhdpi/` |
| xxhdpi | 144x144 | `android/app/src/main/res/mipmap-xxhdpi/` |
| xxxhdpi | 192x192 | `android/app/src/main/res/mipmap-xxxhdpi/` |

---

## Method 1: Online Tools (Easiest)

### Option A: Android Asset Studio (Recommended)
1. Go to: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Upload `public/LogoPandagarde.png`
3. Configure:
   - **Foreground**: Your logo
   - **Background**: Solid color (e.g., #16a34a - teal)
   - **Shape**: Circle or Square
4. Download the ZIP file
5. Extract and copy icons to `android/app/src/main/res/`

### Option B: AppIcon.co
1. Go to: https://www.appicon.co/
2. Upload `public/LogoPandagarde.png`
3. Select "Android"
4. Download and extract
5. Copy icons to `android/app/src/main/res/`

---

## Method 2: Manual Resize (Using ImageMagick)

If you have ImageMagick installed:

```bash
# Create icons from LogoPandagarde.png
SOURCE="public/LogoPandagarde.png"

# mdpi (48x48)
convert "$SOURCE" -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
convert "$SOURCE" -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png
convert "$SOURCE" -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png

# hdpi (72x72)
convert "$SOURCE" -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
convert "$SOURCE" -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png
convert "$SOURCE" -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png

# xhdpi (96x96)
convert "$SOURCE" -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
convert "$SOURCE" -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png
convert "$SOURCE" -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png

# xxhdpi (144x144)
convert "$SOURCE" -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
convert "$SOURCE" -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png
convert "$SOURCE" -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png

# xxxhdpi (192x192)
convert "$SOURCE" -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
convert "$SOURCE" -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png
convert "$SOURCE" -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png
```

---

## Method 3: Using GIMP/Photoshop

1. Open `public/LogoPandagarde.png` in GIMP or Photoshop
2. For each size:
   - Image → Scale Image → Set to required size (e.g., 48x48)
   - Export as PNG
   - Save to appropriate `mipmap-*/` folder
   - Name: `ic_launcher.png`, `ic_launcher_foreground.png`, `ic_launcher_round.png`

---

## Adaptive Icons (Android 8.0+)

For modern Android devices, you may want to create adaptive icons:

### Update `ic_launcher.xml` and `ic_launcher_round.xml`

These files are in `android/app/src/main/res/mipmap-anydpi-v26/`

They reference:
- **Foreground**: `ic_launcher_foreground.png` (your logo)
- **Background**: `ic_launcher_background.xml` (solid color or pattern)

### Background Color

Edit `android/app/src/main/res/values/ic_launcher_background.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#16a34a</color> <!-- Teal color -->
</resources>
```

---

## Icon Files to Update

For each density folder (`mipmap-mdpi`, `mipmap-hdpi`, etc.), update:

1. `ic_launcher.png` - Standard launcher icon
2. `ic_launcher_foreground.png` - Foreground for adaptive icon
3. `ic_launcher_round.png` - Round launcher icon

---

## Verification

After updating icons:

1. **Rebuild the app**:
   ```bash
   npm run build
   npx cap sync android
   ```

2. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

3. **Check in Android Studio**:
   - Right-click `res` folder → New → Image Asset
   - Or check `res/mipmap-*/` folders visually

4. **Test on device/emulator**:
   - Install app
   - Check home screen icon appears correctly

---

## Tips

1. **Use transparent background** for foreground icons
2. **Keep logo centered** in the icon
3. **Leave padding** around edges (10-15% margin)
4. **Test on different devices** to ensure icons look good
5. **Use vector graphics** if possible (better scaling)

---

## Quick Checklist

- [ ] Icons created for all densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- [ ] All three icon types updated (ic_launcher, ic_launcher_foreground, ic_launcher_round)
- [ ] Adaptive icon background color set
- [ ] Icons tested on device/emulator
- [ ] App rebuilt and synced

---

## Next Steps

After updating icons:
1. Rebuild: `npm run build && npx cap sync android`
2. Test in Android Studio
3. Build APK and verify icon appears correctly
4. Proceed with Play Store submission

---

**Last Updated**: January 2025

