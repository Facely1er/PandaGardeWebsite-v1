# 📸 Screenshot Capture - Complete Guide

**Capture screenshots for Play Store submission**

---

## 🎯 Quick Start

### Easiest Method: Android Studio Emulator

1. **Open project**:
   ```powershell
   npx cap open android
   ```

2. **Start emulator**:
   - In Android Studio: Device Manager → Start emulator
   - Recommended: Pixel 5 (1080x2340)

3. **Run app**:
   - Click Run button
   - App launches in emulator

4. **Capture screenshots**:
   - Click camera icon in emulator toolbar
   - Or: View → Tool Windows → Device File Explorer
   - Screenshots saved automatically

5. **Export screenshots**:
   - Right-click screenshot → Save As
   - Save as: `play-store-screenshot-1.png`, etc.

---

## 📋 Required Screenshots

**Minimum**: 2 screenshots  
**Recommended**: 4-5 screenshots

### Screens to Capture:
1. **Family Dashboard** - Main screen
2. **Child Progress** - Progress detail view
3. **Learning Hub** - Games/activities
4. **Privacy Goals** - Goals screen
5. **Family Members** - Management screen

---

## 📐 Screenshot Sizes

### Phone Screenshots (Required):
- **Portrait**: 1080x1920 pixels (9:16 ratio) ⭐ Recommended
- **Landscape**: 1920x1080 pixels (16:9 ratio)
- **Format**: PNG
- **Minimum**: 2 screenshots

### Tablet Screenshots (Optional):
- **Portrait**: 1200x1920 pixels
- **Landscape**: 1920x1200 pixels

---

## 🛠️ Method 1: Android Studio (Easiest) ⭐

### Steps:
1. Open: `npx cap open android`
2. Start emulator (Device Manager)
3. Run app (green play button)
4. Navigate to screens
5. Click camera icon in emulator
6. Save screenshots

**Advantages**:
- ✅ Built into Android Studio
- ✅ Easy to use
- ✅ No additional setup

---

## 🛠️ Method 2: ADB Command Line

### Prerequisites:
- Android device/emulator connected
- ADB in PATH (or use full path)

### Capture Screenshot:
```powershell
# Check device connected
adb devices

# Capture screenshot
adb exec-out screencap -p > play-store-screenshot-1.png

# Or use the script:
.\scripts\capture-screenshots-adb.ps1
```

**Advantages**:
- ✅ Quick and automated
- ✅ Can capture multiple easily
- ✅ Works with physical devices

---

## 🛠️ Method 3: Physical Device

### Steps:
1. **Install app on device**:
   ```powershell
   # Build debug APK
   .\scripts\build-android.ps1
   
   # Install (if ADB available)
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

2. **Capture screenshots**:
   - Use device screenshot (Power + Volume Down)
   - Transfer to computer

3. **Resize if needed**:
   - Use image editor
   - Resize to 1080x1920

---

## 🛠️ Method 4: Browser DevTools (Web App)

Since your app is a web app:

1. **Run dev server**: `npm run dev`
2. **Open in browser**
3. **Open DevTools**: F12
4. **Toggle device mode**: Ctrl+Shift+M
5. **Select device**: Pixel 5 or similar
6. **Navigate to screens**
7. **Capture**: Browser extensions or screenshot tools

---

## 📁 Save Location

Save screenshots as:
- `play-store-screenshot-1.png`
- `play-store-screenshot-2.png`
- `play-store-screenshot-3.png`
- etc.

Or in folder:
- `play-store-assets/screenshots/`

---

## 🎨 Screenshot Tips

### Best Practices:
- ✅ Show key features clearly
- ✅ Use real data (not placeholders)
- ✅ Ensure text is readable
- ✅ Show different screens
- ✅ Consistent style
- ✅ Remove sensitive data

### What Each Screenshot Should Show:
1. **Screenshot 1**: Family Dashboard (main screen)
2. **Screenshot 2**: Child Progress (detailed view)
3. **Screenshot 3**: Learning Hub (activities)
4. **Screenshot 4**: Privacy Goals (goals screen)
5. **Screenshot 5**: Family Members (management)

---

## 🔧 Tools for Editing

### Resize Screenshots:
- **Online**: https://www.iloveimg.com/resize-image
- **Desktop**: GIMP, Photoshop, Paint.NET

### Add Device Frames (Optional):
- **AppMockup**: https://app-mockup.com/
- Makes screenshots look more professional

---

## ✅ Checklist

- [ ] At least 2 screenshots captured
- [ ] Screenshots are 1080x1920 (or correct size)
- [ ] Screenshots show key features
- [ ] Text is readable
- [ ] Saved as PNG format
- [ ] Files named clearly

---

## 🚀 Recommended Workflow

1. **Open Android Studio**: `npx cap open android`
2. **Start emulator**: Pixel 5 or similar
3. **Run app**: Click Run button
4. **Navigate through app**: Visit all key screens
5. **Capture screenshots**: Use emulator camera icon
6. **Save**: Export as `play-store-screenshot-1.png`, etc.
7. **Review**: Ensure quality and clarity

---

## 📚 See Also

- **`scripts/capture-screenshots.md`** - Detailed guide
- **`scripts/capture-screenshots-adb.ps1`** - ADB capture script
- **`scripts/prepare-play-store-assets.ps1`** - Assets guide

---

**Start capturing screenshots now! Use Android Studio emulator for easiest method.**

