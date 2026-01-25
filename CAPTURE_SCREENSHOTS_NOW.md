# 📸 Capture Screenshots - Quick Start

**Follow these steps to capture Play Store screenshots**

---

## 🚀 Method 1: Android Studio Emulator (Easiest)

### Step 1: Open Android Studio
```powershell
npx cap open android
```

### Step 2: Start Emulator
1. In Android Studio, click **Device Manager** (left sidebar)
2. Click **Create Device** (if no emulator exists)
   - Choose: **Pixel 5** or **Pixel 6** (recommended)
   - System Image: Latest Android (API 33+)
3. Click **Play** button to start emulator
4. Wait for emulator to boot

### Step 3: Run Your App
1. Click the **green Play button** (Run) in Android Studio
2. Wait for app to build and install
3. App launches in emulator

### Step 4: Navigate and Capture
1. **Navigate to Family Dashboard** (main screen)
2. Click the **camera icon** in emulator toolbar (top right)
3. Screenshot is captured automatically
4. **Save as**: `play-store-assets/screenshots/play-store-screenshot-1.png`

5. **Navigate to Child Progress** screen
6. Capture screenshot → Save as `play-store-screenshot-2.png`

7. **Navigate to Learning Hub** screen
8. Capture screenshot → Save as `play-store-screenshot-3.png`

9. **Navigate to Privacy Goals** screen
10. Capture screenshot → Save as `play-store-screenshot-4.png`

### Step 5: Export Screenshots
- Screenshots are saved in emulator
- In Android Studio: **View → Tool Windows → Device File Explorer**
- Navigate to: `/sdcard/Pictures/Screenshots/`
- Right-click → Save As
- Save to: `play-store-assets/screenshots/`

---

## 🚀 Method 2: ADB Command (If Device/Emulator Running)

### Quick Capture:
```powershell
# Make sure device/emulator is running
adb devices

# Capture screenshots one by one
adb exec-out screencap -p > play-store-assets/screenshots/play-store-screenshot-1.png
adb exec-out screencap -p > play-store-assets/screenshots/play-store-screenshot-2.png
adb exec-out screencap -p > play-store-assets/screenshots/play-store-screenshot-3.png
```

### Or Use Script:
```powershell
.\scripts\capture-screenshots-adb.ps1
```

---

## 📋 Screenshots to Capture

**Minimum 2, Recommended 4-5:**

1. ✅ **Family Dashboard** - Main screen
2. ✅ **Child Progress** - Progress detail
3. ✅ **Learning Hub** - Games/activities
4. ✅ **Privacy Goals** - Goals screen
5. ✅ **Family Members** - Management screen

---

## 📐 Screenshot Size

**Required**: 1080x1920 pixels (9:16 portrait) ⭐

**If screenshots are different size**, resize using:
- https://www.iloveimg.com/resize-image
- Or image editor (GIMP, Photoshop)

---

## ✅ After Capturing

1. **Verify screenshots**:
   - Check file sizes (should be reasonable)
   - Check dimensions (1080x1920 recommended)
   - Ensure text is readable

2. **Save location**:
   - `play-store-assets/screenshots/play-store-screenshot-1.png`
   - `play-store-assets/screenshots/play-store-screenshot-2.png`
   - etc.

3. **Ready for upload**:
   - Screenshots are ready for Play Console upload

---

## 🎯 Quick Checklist

- [ ] Open Android Studio
- [ ] Start emulator
- [ ] Run app
- [ ] Capture at least 2 screenshots
- [ ] Save to `play-store-assets/screenshots/`
- [ ] Verify screenshot quality

---

## 📚 Detailed Guides

- **`SCREENSHOT_CAPTURE_GUIDE.md`** - Complete guide
- **`scripts/capture-screenshots.md`** - Detailed instructions
- **`scripts/capture-screenshots-adb.ps1`** - ADB script

---

**Start with Android Studio emulator - it's the easiest method!**

