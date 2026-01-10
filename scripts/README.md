# 📱 Android Build Scripts

This directory contains scripts and guides for building the Privacy Panda Family Hub Android app.

---

## 📄 Scripts

### Build Scripts

- **`build-android.sh`** - Linux/macOS build script
- **`build-android.ps1`** - Windows PowerShell build script

**Usage:**
```bash
# Debug build (default)
./scripts/build-android.sh
# or on Windows:
.\scripts\build-android.ps1

# Release build
./scripts/build-android.sh release
# or on Windows:
.\scripts\build-android.ps1 release
```

### Setup Guides

- **`setup-signing.md`** - Guide for setting up app signing
- **`update-icons.md`** - Guide for updating app icons

---

## 🚀 Quick Start

### 1. Build Debug APK
```bash
# On Windows
.\scripts\build-android.ps1

# On Linux/macOS
chmod +x scripts/build-android.sh
./scripts/build-android.sh
```

### 2. Build Release AAB (for Play Store)
```bash
# First, set up signing (see setup-signing.md)
# Then:
.\scripts\build-android.ps1 release
```

---

## 📋 Manual Build Steps

If you prefer to build manually:

```bash
# 1. Build web app
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Build Android
cd android
./gradlew assembleDebug        # Debug APK
./gradlew bundleRelease        # Release AAB
```

---

## 🔐 App Signing

Before building release versions, you need to set up app signing:

1. Read `setup-signing.md`
2. Create keystore
3. Configure `android/app/build.gradle`
4. Build release bundle

---

## 🎨 App Icons

To update app icons with your logo:

1. Read `update-icons.md`
2. Use online tool (easiest) or manual resize
3. Replace icons in `android/app/src/main/res/mipmap-*/`
4. Rebuild and test

---

## 📚 Additional Resources

- **Main Build Guide**: `../ANDROID_BUILD_GUIDE.md`
- **Conversion Summary**: `../ANDROID_CONVERSION_SUMMARY.md`
- **Play Store Guide**: `../PLAY_STORE_READINESS_REPORT.md`

---

## ⚠️ Important Notes

1. **Keystore Security**: Never commit keystore files to Git
2. **Icon Sizes**: Must provide icons in all required sizes
3. **Testing**: Always test on device/emulator before release
4. **Version Numbers**: Update version code/name before each release

---

**Last Updated**: January 10, 2026
