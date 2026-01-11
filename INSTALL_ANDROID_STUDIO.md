# 📱 Install Android Studio - Complete Guide

**Android Studio includes Java, so you'll get everything you need!**

---

## 🚀 Quick Install

### Step 1: Download Android Studio

**Go to**: https://developer.android.com/studio

**Or direct download**: https://developer.android.com/studio#downloads

### Step 2: Install

1. **Run the installer** (`.exe` file)
2. **Follow the installation wizard**:
   - Choose installation location (default is fine)
   - Select components (all are fine)
   - Accept license agreements
3. **Let it install** (this may take 10-20 minutes)
4. **Launch Android Studio** when installation completes

### Step 3: First Launch Setup

1. **Welcome screen** appears
2. **Choose "Standard" installation** (recommended)
3. **Let it download SDK components** (this may take a while)
4. **Wait for setup to complete**

---

## ✅ After Installation

### Verify Java is Available

Android Studio includes Java. After installation, run:

```powershell
.\scripts\setup-signing-with-android-studio.ps1
```

This script will:
- Find Android Studio's Java automatically
- Use it to create your keystore
- Set up signing configuration

---

## 🎯 Quick Setup Script

Once Android Studio is installed, just run:

```powershell
.\scripts\setup-signing-with-android-studio.ps1
```

This will:
- ✅ Find Android Studio's Java
- ✅ Read your config file (`keystore-config.txt`)
- ✅ Create the keystore
- ✅ Set up signing configuration

---

## 📋 What Gets Installed

Android Studio includes:
- ✅ Java JDK (for building and signing)
- ✅ Android SDK (for building Android apps)
- ✅ Android Emulator (for testing)
- ✅ Gradle (build system)
- ✅ All tools needed for Android development

---

## 🔧 Manual Setup (If Needed)

If the script doesn't find Android Studio automatically:

### Find Java Path

Android Studio's Java is usually at:
- `C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\keytool.exe`
- Or: `C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe`

### Add to PATH (Optional)

1. Find the Java bin folder (see above)
2. Add to System PATH environment variable
3. Restart terminal

---

## ✅ Verification

After Android Studio is installed:

```powershell
# Run the Android Studio signing script
.\scripts\setup-signing-with-android-studio.ps1

# Verify signing is set up
.\scripts\complete-signing-setup.ps1

# Check build readiness
.\scripts\quick-build-check.ps1
```

---

## 🎉 Benefits of Android Studio

- ✅ Includes Java (no separate installation needed)
- ✅ Includes Android SDK
- ✅ Includes build tools
- ✅ Can open and build Android projects directly
- ✅ Includes emulator for testing
- ✅ Full Android development environment

---

## 📚 Next Steps After Installation

1. **Install Android Studio** (if not done)
2. **Run signing setup**:
   ```powershell
   .\scripts\setup-signing-with-android-studio.ps1
   ```
3. **Verify signing**:
   ```powershell
   .\scripts\complete-signing-setup.ps1
   ```
4. **Build release AAB**:
   ```powershell
   .\scripts\build-android.ps1 release
   ```

---

## 🆘 Troubleshooting

**"Android Studio Java not found"**
- Make sure Android Studio is fully installed
- Check if SDK is installed (Android Studio → SDK Manager)
- Try running Android Studio once to complete setup

**"keytool not found"**
- Android Studio's Java should include keytool
- Check path: `C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\`
- Run Android Studio once to ensure SDK is set up

---

**Once Android Studio is installed, run: `.\scripts\setup-signing-with-android-studio.ps1`**

Your config file is already ready!

