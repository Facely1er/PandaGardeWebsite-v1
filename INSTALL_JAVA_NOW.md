# ☕ Install Java - Quick Guide

**You need Java to create the keystore for Android signing.**

---

## 🚀 Quick Install (Recommended)

### Option 1: Adoptium OpenJDK (Easiest) ⭐

1. **Go to**: https://adoptium.net/temurin/releases/?version=17
2. **Select**:
   - Operating System: Windows
   - Architecture: x64
   - Package Type: JDK
   - Version: 17 (LTS) or later
3. **Click "Download"**
4. **Run the installer**
5. **Important**: Check "Add to PATH" during installation
6. **Restart your terminal** after installation

**Direct Download**: https://adoptium.net/temurin/releases/?version=17

---

## ✅ Verify Installation

After installing, **close and reopen your terminal**, then run:

```powershell
java -version
keytool -version
```

You should see version information. If you see "command not found", Java is not in your PATH.

---

## 🔧 If Java is Not in PATH

### Find Java Installation:
- Usually: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\`
- Or: `C:\Program Files\Java\jdk-17.x.x\bin\`

### Add to PATH:
1. Open "Environment Variables" (search in Windows)
2. Edit "Path" under "System variables"
3. Add: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin`
4. Click OK and restart terminal

---

## 🎯 After Java is Installed

Once Java is working:

```powershell
# Verify Java works
java -version
keytool -version

# Run signing setup (your config is ready!)
.\scripts\setup-signing-from-env.ps1

# Verify signing is set up
.\scripts\complete-signing-setup.ps1
```

---

## 📋 Alternative: Android Studio

If you prefer Android Studio (includes Java):

1. **Download**: https://developer.android.com/studio
2. **Install** Android Studio
3. **Java is included** - usually at:
   - `C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\`

---

## ⚡ Quick Checklist

- [ ] Download Java JDK 17 or later
- [ ] Install Java
- [ ] Check "Add to PATH" during installation
- [ ] Restart terminal
- [ ] Verify: `java -version`
- [ ] Verify: `keytool -version`
- [ ] Run: `.\scripts\setup-signing-from-env.ps1`

---

## 🆘 Troubleshooting

**"java not found" after installation**
- Restart terminal
- Check PATH includes Java bin folder
- Try full path: `"C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\java.exe" -version`

**"keytool not found"**
- keytool is in the same folder as java
- If java works, keytool should work too
- Check both are in PATH

---

**Once Java is installed, your signing setup will work automatically!**

Your config file (`keystore-config.txt`) is already ready with the password.

