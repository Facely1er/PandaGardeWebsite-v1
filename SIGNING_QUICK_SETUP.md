# 🔐 Signing Quick Setup - Copy & Paste

**Quick setup for Android app signing**

---

## Option 1: Using Config File (Easiest) ⭐

### Step 1: Create Config File

Copy this and save as `keystore-config.txt` in the project root:

```
KEYSTORE_PASSWORD=YourSecurePassword123!
KEY_PASSWORD=YourSecurePassword123!
KEYSTORE_NAME=PandaGarde
KEYSTORE_ORG=PandaGarde
KEYSTORE_ORG_UNIT=
KEYSTORE_CITY=Your City
KEYSTORE_STATE=Your State
KEYSTORE_COUNTRY=US
```

**Replace these values:**
- `YourSecurePassword123!` - Your keystore password (use a strong password!)
- `Your City` - Your actual city
- `Your State` - Your actual state/province
- `US` - Your country code (US, CA, GB, etc.)

### Step 2: Run Setup

```powershell
.\scripts\setup-signing-from-env.ps1
```

---

## Option 2: Using Environment Variables (PowerShell)

**Copy and paste this entire block into PowerShell:**

```powershell
$env:KEYSTORE_PASSWORD = 'YourSecurePassword123!'
$env:KEY_PASSWORD = 'YourSecurePassword123!'
$env:KEYSTORE_NAME = 'PandaGarde'
$env:KEYSTORE_ORG = 'PandaGarde'
$env:KEYSTORE_ORG_UNIT = ''
$env:KEYSTORE_CITY = 'Your City'
$env:KEYSTORE_STATE = 'Your State'
$env:KEYSTORE_COUNTRY = 'US'

.\scripts\setup-signing-from-env.ps1
```

**Replace the values:**
- `'YourSecurePassword123!'` - Your actual password
- `'Your City'` - Your actual city
- `'Your State'` - Your actual state
- `'US'` - Your country code

---

## Option 3: Manual Keytool Command

**If you prefer to run keytool directly, copy this:**

```powershell
keytool -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub -storepass YourPassword -keypass YourPassword -dname "CN=PandaGarde, OU=, O=PandaGarde, L=YourCity, ST=YourState, C=US"
```

**Replace:**
- `YourPassword` - Your keystore password
- `YourCity` - Your city
- `YourState` - Your state
- `US` - Your country code

**Then create `android/keystore.properties`:**

```properties
storePassword=YourPassword
keyPassword=YourPassword
keyAlias=pandagarde-familyhub
storeFile=../pandagarde-familyhub-key.jks
```

---

## ⚠️ Important Notes

1. **Password**: Use a strong password (16+ characters recommended)
2. **Store Password**: Save it securely (you'll need it forever!)
3. **Java Required**: Make sure Java JDK or Android Studio is installed
4. **Never Commit**: The keystore and config files are in `.gitignore`

---

## ✅ After Setup

Once signing is set up, verify:

```powershell
.\scripts\complete-signing-setup.ps1
```

Then build:

```powershell
.\scripts\build-android.ps1 release
```

---

## 🆘 Troubleshooting

**"Java not found"**
- Install Java JDK or Android Studio
- Add Java to your PATH

**"keytool not found"**
- Java JDK includes keytool
- Make sure Java is in your PATH

---

**Quick Tip**: Use Option 1 (config file) - it's the easiest!

