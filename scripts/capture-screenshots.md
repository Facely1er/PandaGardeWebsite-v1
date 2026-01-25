# 📸 Capture Play Store Screenshots Guide

**How to capture screenshots for Play Store submission**

---

## 📋 Required Screenshots

**Minimum**: 2 screenshots  
**Recommended**: 4-5 screenshots

### Recommended Screenshots:
1. **Family Dashboard** - Main screen showing family members
2. **Child Progress Detail** - Individual progress view
3. **Learning Hub / Games** - Activities/games screen
4. **Privacy Goals** - Goals management screen
5. **Family Members** - Add/manage family screen

---

## 📱 Screenshot Requirements

### Phone Screenshots:
- **Ratio**: 16:9 or 9:16
- **Sizes**: 
  - 1080x1920 (9:16 portrait) - Recommended
  - 1920x1080 (16:9 landscape)
- **Format**: PNG
- **Minimum**: 2 screenshots
- **Maximum**: 8 screenshots

### Tablet Screenshots (Optional):
- **Ratio**: 16:9 or 9:16
- **Sizes**:
  - 1200x1920 (9:16 portrait)
  - 1920x1200 (16:9 landscape)

---

## 🛠️ Method 1: Android Studio Emulator (Recommended)

### Step 1: Open Android Project
```powershell
npx cap open android
```

### Step 2: Set Up Emulator
1. In Android Studio, click **Device Manager**
2. Create a new virtual device (or use existing)
3. Recommended: Pixel 5 or similar (1080x2340)
4. Start the emulator

### Step 3: Run the App
1. Click **Run** button in Android Studio
2. Wait for app to launch
3. Navigate to the screens you want to capture

### Step 4: Capture Screenshots
1. In Android Studio, click the **camera icon** in the emulator toolbar
2. Or use: **View → Tool Windows → Device File Explorer**
3. Screenshots are saved automatically
4. Export from emulator or use Android Studio's screenshot tool

### Step 5: Save Screenshots
- Save as: `play-store-screenshot-1.png`, `play-store-screenshot-2.png`, etc.
- Store in project root or `play-store-assets/` folder

---

## 🛠️ Method 2: Physical Device

### Step 1: Install App on Device
```powershell
# Build and install debug APK
.\scripts\build-android.ps1
# Or use: adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Step 2: Capture Screenshots
1. Navigate to the screens you want
2. Use device screenshot (Power + Volume Down)
3. Transfer screenshots to computer

### Step 3: Resize if Needed
- Use image editor to resize to required dimensions
- Recommended: 1080x1920 (9:16 portrait)

---

## 🛠️ Method 3: ADB Screenshot Command

### Capture via ADB:
```powershell
# Connect device or start emulator
adb devices

# Capture screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png play-store-screenshot-1.png

# Or use this one-liner:
adb exec-out screencap -p > play-store-screenshot-1.png
```

---

## 🛠️ Method 4: Browser DevTools (For Web App)

Since your app is a web app, you can also:

1. **Open in browser**: Run `npm run dev` or open deployed site
2. **Open DevTools**: F12
3. **Toggle device toolbar**: Ctrl+Shift+M
4. **Set device**: Choose a phone (e.g., Pixel 5)
5. **Navigate to screens**
6. **Capture**: Use browser extensions or screenshot tools

---

## 📐 Screenshot Sizes Reference

| Device Type | Resolution | Ratio | Use Case |
|-------------|------------|-------|----------|
| Phone Portrait | 1080x1920 | 9:16 | Recommended |
| Phone Landscape | 1920x1080 | 16:9 | Alternative |
| Tablet Portrait | 1200x1920 | 9:16 | Optional |
| Tablet Landscape | 1920x1200 | 16:9 | Optional |

---

## 🎨 Screenshot Tips

### Best Practices:
- ✅ Show key features clearly
- ✅ Use real data (not placeholder)
- ✅ Ensure text is readable
- ✅ Show different screens/features
- ✅ Use consistent style
- ✅ Remove personal/sensitive data

### What to Capture:
1. **Family Dashboard** - Shows main functionality
2. **Progress View** - Shows tracking features
3. **Learning Hub** - Shows educational content
4. **Goals Screen** - Shows goal management
5. **Settings/About** - Shows app info

---

## 🔧 Tools for Editing

### Resize/Edit Screenshots:
- **Online**: https://www.iloveimg.com/resize-image
- **Desktop**: GIMP, Photoshop, Paint.NET
- **Add Frames**: https://app-mockup.com/

### Add Device Frames (Optional):
- **AppMockup**: https://app-mockup.com/
- **Screenshot Builder**: Various online tools

---

## 📁 Save Location

Save screenshots as:
- `play-store-screenshot-1.png`
- `play-store-screenshot-2.png`
- `play-store-screenshot-3.png`
- etc.

Or in a folder:
- `play-store-assets/screenshots/`

---

## ✅ Checklist

- [ ] At least 2 screenshots captured
- [ ] Screenshots are correct size (1080x1920 recommended)
- [ ] Screenshots show key features
- [ ] Text is readable
- [ ] Screenshots are saved as PNG
- [ ] Files named clearly (screenshot-1.png, etc.)

---

## 🚀 Quick Start

**Easiest Method**:
1. Open Android Studio: `npx cap open android`
2. Start emulator
3. Run app
4. Navigate to screens
5. Use Android Studio's screenshot tool
6. Save as `play-store-screenshot-1.png`, etc.

---

**See also**: `scripts/prepare-play-store-assets.ps1` for assets guide

