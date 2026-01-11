# ✅ Signing Setup - Complete Guide

**All scripts are ready!** Choose the method that works best for you.

---

## 🎯 Quick Start

### Option 1: Interactive Setup (Easiest) ⭐

**Best for**: First-time setup, when you're at your computer

```powershell
.\scripts\setup-signing-simple.ps1
```

This will prompt you for:
- Keystore password
- Key password
- Your name/organization
- City, State, Country

---

### Option 2: Config File Setup (Non-Interactive)

**Best for**: Automated setup, CI/CD, or when you have the info ready

1. **Copy the example config**:
   ```powershell
   Copy-Item keystore-config.example.txt keystore-config.txt
   ```

2. **Edit `keystore-config.txt`** with your values:
   ```
   KEYSTORE_PASSWORD=your-password-here
   KEY_PASSWORD=your-password-here
   KEYSTORE_NAME=Your Name
   KEYSTORE_ORG=PandaGarde
   KEYSTORE_CITY=Your City
   KEYSTORE_STATE=Your State
   KEYSTORE_COUNTRY=US
   ```

3. **Run the script**:
   ```powershell
   .\scripts\setup-signing-from-env.ps1
   ```

**⚠️ Important**: `keystore-config.txt` is in `.gitignore` - never commit it!

---

### Option 3: Environment Variables (Non-Interactive)

**Best for**: CI/CD pipelines, automated builds

```powershell
$env:KEYSTORE_PASSWORD = 'your-password'
$env:KEY_PASSWORD = 'your-password'
$env:KEYSTORE_NAME = 'Your Name'
$env:KEYSTORE_ORG = 'PandaGarde'
$env:KEYSTORE_CITY = 'Your City'
$env:KEYSTORE_STATE = 'Your State'
$env:KEYSTORE_COUNTRY = 'US'

.\scripts\setup-signing-from-env.ps1
```

---

## 📋 What Gets Created

After running any setup script, you'll have:

1. **`pandagarde-familyhub-key.jks`** - Your keystore file
   - Location: Project root
   - **Store this securely!**

2. **`android/keystore.properties`** - Signing configuration
   - Contains passwords and paths
   - **Already in .gitignore**

---

## ✅ Verification

After setup, verify everything works:

```powershell
# Check signing setup
.\scripts\complete-signing-setup.ps1

# Check build readiness
.\scripts\quick-build-check.ps1
```

---

## 🔐 Password Storage

**IMPORTANT**: Store your keystore password securely!

- ✅ Use a password manager (1Password, LastPass, Bitwarden)
- ✅ Store in encrypted file
- ✅ Keep backup in secure location
- ❌ Never commit to Git
- ❌ Never store in plain text

See `KEYSTORE_PASSWORD_STORAGE.md` for detailed guide.

---

## 🚀 Next Steps After Signing Setup

1. **Update app icons** (10-15 min)
   - See `scripts/update-icons.md`

2. **Build release AAB** (5-10 min)
   ```powershell
   .\scripts\build-android.ps1 release
   ```

3. **Create Play Store assets** (1-2 hours)
   - See `scripts/prepare-play-store-assets.ps1`

4. **Complete Play Console** (1-2 hours)
   - See `PLAY_STORE_SUBMISSION_GUIDE.md`

---

## 🛠️ Available Scripts

| Script | Purpose |
|--------|---------|
| `setup-signing-simple.ps1` | Interactive setup (recommended) |
| `setup-signing-from-env.ps1` | Non-interactive (config/env vars) |
| `complete-signing-setup.ps1` | Check setup status |
| `quick-build-check.ps1` | Verify build readiness |
| `build-android.ps1` | Build release AAB |

---

## 📚 Documentation

- **`KEYSTORE_PASSWORD_STORAGE.md`** - Where to store passwords
- **`KEYSTORE_SECURITY.md`** - Quick security guide
- **`scripts/setup-signing.md`** - Manual setup guide
- **`CONTINUE_HERE.md`** - Next steps after signing

---

## ⚠️ Important Reminders

1. **Store keystore securely** - You'll need it forever!
2. **Store password securely** - Multiple secure locations
3. **Never commit to Git** - Already in `.gitignore`
4. **Test before submitting** - Build and test AAB first

---

## 🆘 Troubleshooting

### "Java not found"
- Install Java JDK or Android Studio
- Add Java to your PATH

### "keytool not found"
- Java JDK includes keytool
- Make sure Java is in your PATH

### "Keystore creation failed"
- Check passwords are correct
- Verify Java/keytool is working
- Try interactive script instead

---

**Ready to set up signing?** Choose one of the options above and run the script!

