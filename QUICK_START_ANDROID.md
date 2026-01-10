# 🚀 Quick Start: Android App

Get your Privacy Panda Family Hub Android app built and ready for Play Store in minutes!

---

## ✅ What's Already Done

- ✅ Android project created
- ✅ Capacitor configured
- ✅ Web assets synced
- ✅ Build scripts created
- ✅ Documentation ready

---

## 🎯 Next Steps (Choose Your Path)

### Path 1: Quick Test Build (5 minutes)

Just want to test the app quickly?

```bash
# Windows
.\scripts\build-android.ps1

# Linux/macOS
chmod +x scripts/build-android.sh
./scripts/build-android.sh
```

Then open in Android Studio:
```bash
npx cap open android
```

Build → Build Bundle(s) / APK(s) → Build APK(s)

---

### Path 2: Full Play Store Setup (30-60 minutes)

Ready to prepare for Play Store submission?

#### Step 1: Update App Icons (10 minutes)
1. Go to: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Upload `public/LogoPandagarde.png`
3. Download generated icons
4. Copy to `android/app/src/main/res/mipmap-*/`
5. See `scripts/update-icons.md` for details

#### Step 2: Set Up Signing (15 minutes)
1. Create keystore:
   ```bash
   keytool -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub
   ```
2. Create `android/keystore.properties`:
   ```properties
   storePassword=your-password
   keyPassword=your-password
   keyAlias=pandagarde-familyhub
   storeFile=../pandagarde-familyhub-key.jks
   ```
3. Update `android/app/build.gradle` (see `scripts/setup-signing.md`)

#### Step 3: Build Release Bundle (5 minutes)
```bash
.\scripts\build-android.ps1 release
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

#### Step 4: Play Store Assets (20 minutes)
- App icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots: At least 2 (phone + tablet)
- Store listing text

---

## 📋 Complete Checklist

### Before First Build
- [x] Android project created
- [ ] Update app icons (optional for testing)
- [ ] Open in Android Studio
- [ ] Build debug APK
- [ ] Test on device/emulator

### Before Play Store
- [ ] Update app icons with logo
- [ ] Set up app signing
- [ ] Build release AAB
- [ ] Create Play Store assets
- [ ] Write store listing
- [ ] Complete content rating
- [ ] Submit to Play Store

---

## 🛠️ Common Commands

### Build Commands
```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Build script (Windows)
.\scripts\build-android.ps1

# Build script (Linux/macOS)
./scripts/build-android.sh
```

### Android Studio Commands
```bash
# Build debug APK
cd android
./gradlew assembleDebug

# Build release AAB
cd android
./gradlew bundleRelease
```

---

## 📚 Documentation

- **Build Guide**: `ANDROID_BUILD_GUIDE.md` - Complete build instructions
- **Icon Update**: `scripts/update-icons.md` - How to update icons
- **Signing Setup**: `scripts/setup-signing.md` - App signing guide
- **Play Store**: `PLAY_STORE_READINESS_REPORT.md` - Play Store requirements

---

## 🆘 Troubleshooting

### "SDK location not found"
- Open Android Studio
- File → Project Structure → SDK Location
- Set Android SDK path

### "Gradle sync failed"
- File → Invalidate Caches / Restart
- File → Sync Project with Gradle Files

### "App shows blank screen"
- Check `capacitor.config.ts` has correct `webDir: 'dist'`
- Run `npm run build && npx cap sync android`

---

## ✅ You're Ready!

The Android app is ready to build. Choose your path above and get started!

**Recommended**: Start with Path 1 to test, then move to Path 2 for Play Store.

---

**Last Updated**: January 2025

