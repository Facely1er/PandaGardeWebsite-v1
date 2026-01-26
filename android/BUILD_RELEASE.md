# Building Release Bundle for Store Submission

## Prerequisites

1. **Java Development Kit (JDK) 17** - Required for building
2. **Android SDK** - Installed via Android Studio
3. **Keystore File** - Located at `../../pandagarde-familyhub-key.jks`
4. **Keystore Properties** - Configured in `keystore.properties`

## Build Steps

### 1. Verify Keystore Configuration

Check that `keystore.properties` exists and contains:
```properties
storePassword=your_password
keyPassword=your_password
keyAlias=pandagarde-familyhub
storeFile=../../pandagarde-familyhub-key.jks
```

### 2. Clean Previous Builds (Optional)

```bash
cd android
./gradlew clean
```

### 3. Build Release Bundle

```bash
./gradlew bundleRelease
```

**Windows:**
```cmd
gradlew.bat bundleRelease
```

### 4. Locate the Bundle

The signed AAB file will be created at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### 5. Verify Bundle

- Check file size (should be reasonable, typically 5-50MB)
- Ensure file exists and is not corrupted
- File should be signed (you can verify with `jarsigner`)

## Alternative: Build APK (for testing)

If you need an APK for testing (not for store submission):

```bash
./gradlew assembleRelease
```

APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

### Error: Keystore file not found
- Verify the path in `keystore.properties` is correct
- Ensure the keystore file exists at the specified location

### Error: Signing configuration not found
- Check that `keystore.properties` exists
- Verify all properties are set correctly

### Error: Build failed
- Run `./gradlew clean` and try again
- Check Android SDK is properly configured
- Verify JDK 17 is installed and JAVA_HOME is set

## Next Steps

After building the bundle:
1. Upload `app-release.aab` to Google Play Console
2. Follow the steps in `STORE_SUBMISSION_GUIDE.md`
3. Complete all required sections in Play Console
4. Submit for review

