# 🔐 App Signing Setup Guide

This guide will help you set up app signing for release builds.

---

## Step 1: Create a Keystore

### On Windows (PowerShell):
```powershell
keytool -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub
```

### On macOS/Linux:
```bash
keytool -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub
```

### What you'll need to provide:
- **Keystore password**: Choose a strong password (save it securely!)
- **Key password**: Can be same as keystore password
- **Name**: Your name or organization name
- **Organizational Unit**: Department (optional)
- **Organization**: PandaGarde (or your organization)
- **City**: Your city
- **State**: Your state/province
- **Country Code**: Two-letter code (e.g., US, CA, GB)

**⚠️ IMPORTANT**: 
- Save the keystore file (`pandagarde-familyhub-key.jks`) in a secure location
- **Never commit it to Git!**
- You'll need this file for ALL future app updates
- If you lose it, you cannot update your app on Play Store

---

## Step 2: Create Signing Configuration

### Option A: Using keystore.properties (Recommended)

1. Create `android/keystore.properties` file:
```properties
storePassword=your-keystore-password
keyPassword=your-key-password
keyAlias=pandagarde-familyhub
storeFile=../pandagarde-familyhub-key.jks
```

2. Add to `.gitignore`:
```
android/keystore.properties
pandagarde-familyhub-key.jks
```

3. Update `android/app/build.gradle` to use it (see below)

### Option B: Environment Variables

Set environment variables:
- `KEYSTORE_PASSWORD`
- `KEY_PASSWORD`
- `KEY_ALIAS`
- `KEYSTORE_FILE`

---

## Step 3: Update build.gradle

Add this to `android/app/build.gradle` (before the `android` block):

```gradle
// Load keystore properties
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Then update the `android` block:

```gradle
android {
    // ... existing config ...
    
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## Step 4: Test Signing

Build a release APK to test:
```bash
cd android
./gradlew assembleRelease
```

The signed APK will be at:
`android/app/build/outputs/apk/release/app-release.apk`

---

## Step 5: Build Release Bundle (AAB)

For Play Store submission:
```bash
cd android
./gradlew bundleRelease
```

The signed AAB will be at:
`android/app/build/outputs/bundle/release/app-release.aab`

---

## Security Best Practices

1. **Never commit keystore files to Git**
   - Add to `.gitignore`:
     ```
     *.jks
     *.keystore
     keystore.properties
     ```

2. **Store keystore securely**
   - Use a password manager
   - Backup in secure location
   - Consider using Google Play App Signing (recommended)

3. **Use Google Play App Signing** (Recommended)
   - Google manages your signing key
   - You upload an upload key (different from signing key)
   - More secure and easier to manage
   - Can recover if upload key is lost

---

## Google Play App Signing Setup

1. **Create Upload Keystore** (different from signing keystore)
   ```bash
   keytool -genkey -v -keystore upload-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```

2. **Upload to Play Console**
   - First app upload: Google creates signing key
   - You provide upload key
   - Google manages signing key

3. **Benefits**
   - Google manages signing key securely
   - Can recover if upload key is lost
   - Automatic key rotation
   - Smaller app size (optimized signing)

---

## Troubleshooting

### Error: "Keystore file not found"
- Check path in `keystore.properties`
- Use relative path from `android/app/` directory

### Error: "Wrong password"
- Verify keystore password
- Check key alias matches

### Error: "Key alias not found"
- Verify alias name matches keystore
- List aliases: `keytool -list -v -keystore pandagarde-familyhub-key.jks`

---

## Next Steps

After signing is configured:
1. Build release bundle: `./gradlew bundleRelease`
2. Upload AAB to Play Console
3. Complete Play Store listing
4. Submit for review

---

**Last Updated**: January 2025

