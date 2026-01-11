# ☕ Java Setup Required for Signing

**Status**: Config file is ready, but Java/keytool is not found in your PATH.

---

## ✅ What's Done

- ✅ Config file created: `keystore-config.txt`
- ✅ Password configured
- ✅ Script ready to run

## ⏭️ What's Needed

**Java JDK or Android Studio** must be installed to create the keystore.

---

## 🔧 Setup Options

### Option 1: Install Java JDK (Recommended)

1. **Download Java JDK**:
   - Go to: https://adoptium.net/ (OpenJDK)
   - Or: https://www.oracle.com/java/technologies/downloads/
   - Download JDK 17 or later for Windows

2. **Install Java JDK**

3. **Add to PATH** (if not automatic):
   - Find Java installation: Usually `C:\Program Files\Java\jdk-XX\bin`
   - Add to System PATH environment variable

4. **Verify**:
   ```powershell
   java -version
   keytool -version
   ```

5. **Run signing setup**:
   ```powershell
   .\scripts\setup-signing-from-env.ps1
   ```

---

### Option 2: Install Android Studio (Includes Java)

1. **Download Android Studio**:
   - Go to: https://developer.android.com/studio
   - Download and install

2. **Android Studio includes Java**:
   - Java is bundled with Android Studio
   - Usually at: `C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\`

3. **Add to PATH**:
   - Add Android Studio's Java bin folder to PATH
   - Or use full path in script

4. **Run signing setup**:
   ```powershell
   .\scripts\setup-signing-from-env.ps1
   ```

---

### Option 3: Use Android Studio's Java Directly

If Android Studio is installed but not in PATH:

1. **Find Java path**:
   - Usually: `C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\keytool.exe`
   - Or: `C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe`

2. **Run keytool directly**:
   ```powershell
   & "C:\Users\YourName\AppData\Local\Android\Sdk\jbr\bin\keytool.exe" -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub -storepass DUyC%x1%grAAIDwB4UWN@rxn -keypass DUyC%x1%grAAIDwB4UWN@rxn -dname "CN=PandaGarde, OU=, O=PandaGarde, L=San Francisco, ST=CA, C=US"
   ```

3. **Then create keystore.properties manually**:
   ```powershell
   @"
   storePassword=DUyC%x1%grAAIDwB4UWN@rxn
   keyPassword=DUyC%x1%grAAIDwB4UWN@rxn
   keyAlias=pandagarde-familyhub
   storeFile=../pandagarde-familyhub-key.jks
   "@ | Out-File -FilePath "android\keystore.properties" -Encoding ASCII -NoNewline
   ```

---

## ✅ After Java is Installed

Once Java/keytool is available:

```powershell
# Verify Java is working
java -version
keytool -version

# Run signing setup
.\scripts\setup-signing-from-env.ps1

# Verify signing is set up
.\scripts\complete-signing-setup.ps1
```

---

## 📋 Quick Checklist

- [ ] Java JDK or Android Studio installed
- [ ] Java/keytool in PATH (or use full path)
- [ ] Config file ready (`keystore-config.txt`)
- [ ] Run signing setup script
- [ ] Verify keystore created

---

## 🆘 Troubleshooting

**"keytool not found"**
- Install Java JDK or Android Studio
- Add Java bin folder to PATH
- Or use full path to keytool.exe

**"Java not found"**
- Install Java JDK from adoptium.net
- Restart terminal after installation
- Verify with `java -version`

---

**Once Java is installed, run: `.\scripts\setup-signing-from-env.ps1`**

