# 🚀 PandaGarde Deployment Guide

Complete guide for deploying the PandaGarde website, PWA, and native apps.

---

## 📋 Overview

PandaGarde has **3 deployment targets**:

1. **🌐 Website** - Main educational platform (`pandagarde.com`)
2. **📱 PWA** - Installable web app (`family-hub.pandagarde.com`)
3. **📲 Native Apps** - Android & iOS for app stores

---

## 🌐 1. Website Deployment

### Purpose
Deploy the main PandaGarde educational platform with full content, features, and resources.

### Build Command
```bash
# From project root
npm run build
```

### Output Directory
```
dist/
```

### Deployment Options

#### Option A: Netlify

**Configuration**: `netlify.toml` (root)

**Steps**:
1. **Install Netlify CLI** (if not installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build the website**:
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Or link to existing site**:
   ```bash
   netlify link
   netlify deploy --prod
   ```

**Via Netlify Dashboard**:
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Add new site → Import from Git
3. Connect your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)
5. Deploy site

**Domain**: Configure custom domain in Netlify dashboard

---

#### Option B: Vercel

**Configuration**: `vercel.json` (root)

**Steps**:
1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

**Via Vercel Dashboard**:
1. Go to [Vercel Dashboard](https://vercel.com)
2. Add new project → Import Git repository
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy

**Domain**: Configure custom domain in Vercel dashboard

---

#### Option C: Other Static Hosting

**Steps**:
1. **Build**:
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting service:
   - AWS S3 + CloudFront
   - GitHub Pages
   - Azure Static Web Apps
   - Any static hosting service

---

### Website Deployment Checklist

- [ ] Build completes successfully (`npm run build`)
- [ ] `dist/` folder contains all files
- [ ] Test locally: `npm run preview`
- [ ] Deploy to hosting service
- [ ] Verify custom domain is configured
- [ ] Test all routes work correctly
- [ ] Verify HTTPS is enabled
- [ ] Check security headers are applied
- [ ] Test on mobile devices
- [ ] Verify analytics tracking (if configured)

---

## 📱 2. PWA/Mobile App Deployment

### Purpose
Deploy the Family Hub as an installable Progressive Web App (PWA) that works in browsers and can be installed on devices.

### Build Command
```bash
# Option 1: From project root
npm run build:family-hub

# Option 2: From family-hub directory
cd family-hub
npm run build
```

### Output Directory
```
family-hub/dist/
```

### Deployment Options

#### Option A: Netlify (Recommended)

**Configuration**: `family-hub-netlify.toml` (root)

**Steps**:
1. **Build the PWA**:
   ```bash
   npm run build:family-hub
   ```

2. **Deploy to Netlify**:
   ```bash
   # From project root
   netlify deploy --prod --dir=family-hub/dist --config=family-hub-netlify.toml
   ```

**Via Netlify Dashboard**:
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Add new site → Import from Git
3. Connect your repository
4. Build settings:
   - **Build command**: `npm run build:family-hub`
   - **Publish directory**: `family-hub/dist`
   - **Base directory**: (leave empty)
5. **Add build configuration**:
   - Create `netlify.toml` in `family-hub/` directory OR
   - Use `family-hub-netlify.toml` from root
6. Deploy site

**Recommended Domain**: `family-hub.pandagarde.com` or `app.pandagarde.com`

---

#### Option B: Vercel

**Configuration**: `family-hub-vercel.json` (root)

**Steps**:
1. **Build the PWA**:
   ```bash
   npm run build:family-hub
   ```

2. **Deploy to Vercel**:
   ```bash
   # From project root
   cd family-hub
   vercel --prod
   ```

**Via Vercel Dashboard**:
1. Go to [Vercel Dashboard](https://vercel.com)
2. Add new project → Import Git repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `family-hub`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy

**Recommended Domain**: `family-hub.pandagarde.com` or `app.pandagarde.com`

---

#### Option C: GitHub Pages

**Steps**:
1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add script to `family-hub/package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   cd family-hub
   npm run deploy
   ```

4. **Configure in GitHub**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Custom domain: `family-hub.pandagarde.com`

---

### PWA Deployment Checklist

- [ ] Build completes successfully (`npm run build:family-hub`)
- [ ] `family-hub/dist/` folder contains all files
- [ ] Test locally: `cd family-hub && npm run preview`
- [ ] Verify `manifest.json` is correct
- [ ] Verify service worker (`sw.js`) is included
- [ ] Deploy to hosting service
- [ ] Configure subdomain (e.g., `family-hub.pandagarde.com`)
- [ ] Test PWA installation on mobile devices
- [ ] Verify offline functionality works
- [ ] Test on iOS Safari (PWA support)
- [ ] Test on Android Chrome (PWA support)
- [ ] Verify HTTPS is enabled (required for PWA)
- [ ] Check security headers are applied

---

## 📲 3. Native App Builds

### Purpose
Build native Android and iOS apps for submission to app stores.

---

### 3.1 Android App Build

#### Prerequisites
- ✅ Java Development Kit (JDK) 17 or higher
- ✅ Android Studio installed
- ✅ Android SDK configured
- ✅ Keystore for signing (already configured)

#### Build Steps

**1. Build Web Assets**:
```bash
# From project root
cd family-hub
npm run build
```

**2. Sync to Android**:
```bash
# From project root
npx cap sync android
```

**3. Build Android App Bundle (AAB)**:
```bash
# From project root
cd android
./gradlew bundleRelease

# Or on Windows:
gradlew.bat bundleRelease
```

**4. Output Location**:
```
android/app/build/outputs/bundle/release/app-release.aab
```

**5. Build APK (for testing)**:
```bash
cd android
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk
```

#### Android Deployment Checklist

- [ ] Web assets built (`npm run build` in family-hub)
- [ ] Capacitor sync completed (`npx cap sync android`)
- [ ] Keystore configured in `android/app/build.gradle`
- [ ] Version code incremented in `build.gradle`
- [ ] Version name updated in `build.gradle`
- [ ] AAB file generated (`app-release.aab`)
- [ ] Test APK installed and tested on device
- [ ] Upload AAB to Google Play Console
- [ ] Complete store listing
- [ ] Submit for review

#### Google Play Store Submission

1. **Go to [Google Play Console](https://play.google.com/console)**
2. **Create new app** (if first time)
3. **Upload AAB file**:
   - Go to Production → Create new release
   - Upload `app-release.aab`
4. **Complete store listing**:
   - App name, description, screenshots
   - Privacy policy URL
   - Content rating
5. **Submit for review**

---

### 3.2 iOS App Build

#### Prerequisites
- ⚠️ **macOS required** (cannot build on Windows)
- ✅ Xcode installed
- ✅ Apple Developer account ($99/year)
- ✅ CocoaPods installed

#### Setup Steps

**1. Install iOS Platform** (if not done):
```bash
# From project root
npm install @capacitor/ios
npx cap add ios
```

**2. Install CocoaPods Dependencies**:
```bash
cd ios/App
pod install
cd ../..
```

**3. Build Web Assets**:
```bash
# From project root
cd family-hub
npm run build
```

**4. Sync to iOS**:
```bash
# From project root
npx cap sync ios
```

**5. Open in Xcode**:
```bash
npx cap open ios
```

**6. Build in Xcode**:
- Select target device or "Any iOS Device"
- Product → Archive
- Distribute App → App Store Connect
- Follow distribution wizard

#### iOS Deployment Checklist

- [ ] macOS and Xcode available
- [ ] Apple Developer account active
- [ ] iOS platform added (`npx cap add ios`)
- [ ] CocoaPods dependencies installed
- [ ] Web assets built (`npm run build` in family-hub)
- [ ] Capacitor sync completed (`npx cap sync ios`)
- [ ] Bundle identifier configured in Xcode
- [ ] Code signing configured in Xcode
- [ ] App icons added (all required sizes)
- [ ] Launch screen configured
- [ ] Archive created in Xcode
- [ ] Uploaded to App Store Connect
- [ ] Store listing completed
- [ ] Submitted for review

#### Apple App Store Submission

1. **Go to [App Store Connect](https://appstoreconnect.apple.com)**
2. **Create new app** (if first time)
3. **Upload IPA** (via Xcode Archive)
4. **Complete store listing**:
   - App name, description, screenshots
   - Privacy policy URL
   - Age rating
   - Privacy nutrition labels
5. **Submit for review**

---

## 🔄 Deployment Workflow

### Typical Deployment Flow

```
1. Make code changes
   ↓
2. Test locally
   ├── Website: npm run dev
   └── PWA: cd family-hub && npm run dev
   ↓
3. Build
   ├── Website: npm run build
   └── PWA: npm run build:family-hub
   ↓
4. Deploy
   ├── Website → Main domain
   ├── PWA → Subdomain
   └── Native Apps → App stores (when ready)
```

---

## 🌍 Domain Configuration

### Recommended Setup

```
pandagarde.com              → Website (main platform)
family-hub.pandagarde.com   → PWA (installable web app)
app.pandagarde.com          → Alternative PWA domain
```

### DNS Configuration

**For Netlify**:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS records as shown in Netlify dashboard

**For Vercel**:
1. Go to Project Settings → Domains
2. Add domain
3. Configure DNS records as shown in Vercel dashboard

---

## 🔐 Security Headers

Both deployments include security headers:

### Website Headers
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security
- Content-Security-Policy

### PWA Headers (Enhanced)
- All website headers PLUS:
- Permissions-Policy
- Cross-Origin-Embedder-Policy
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy

---

## 📊 Monitoring & Analytics

### After Deployment

1. **Verify Analytics**:
   - Google Analytics (if configured)
   - Check tracking is working

2. **Monitor Performance**:
   - Lighthouse scores
   - Core Web Vitals
   - Error tracking (Sentry)

3. **Test Functionality**:
   - All routes work
   - Activities load correctly
   - Progress tracking works
   - PWA installation works

---

## 🐛 Troubleshooting

### Build Issues

**Problem**: Build fails
- **Solution**: Check Node.js version (requires 18+)
- **Solution**: Delete `node_modules` and reinstall
- **Solution**: Clear build cache

**Problem**: TypeScript errors
- **Solution**: Run `npm run lint` to see errors
- **Solution**: Fix type errors before building

### Deployment Issues

**Problem**: Routes don't work after deployment
- **Solution**: Verify redirect/rewrite rules in deployment config
- **Solution**: Check SPA fallback is configured

**Problem**: PWA doesn't install
- **Solution**: Verify HTTPS is enabled (required for PWA)
- **Solution**: Check `manifest.json` is accessible
- **Solution**: Verify service worker is registered

**Problem**: Assets not loading
- **Solution**: Check base path in `vite.config.ts`
- **Solution**: Verify asset paths in build output

---

## 📝 Quick Reference

### Build Commands
```bash
# Website
npm run build

# PWA
npm run build:family-hub
# OR
cd family-hub && npm run build

# Android
cd family-hub && npm run build
npx cap sync android
cd android && ./gradlew bundleRelease

# iOS
cd family-hub && npm run build
npx cap sync ios
npx cap open ios  # Then build in Xcode
```

### Deployment Commands
```bash
# Website (Netlify)
netlify deploy --prod --dir=dist

# PWA (Netlify)
netlify deploy --prod --dir=family-hub/dist --config=family-hub-netlify.toml

# Website (Vercel)
vercel --prod

# PWA (Vercel)
cd family-hub && vercel --prod
```

---

## ✅ Pre-Deployment Checklist

### Website
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Preview works locally
- [ ] All routes accessible
- [ ] Mobile responsive
- [ ] Analytics configured
- [ ] Error tracking configured

### PWA
- [ ] Build succeeds
- [ ] Preview works locally
- [ ] Manifest.json correct
- [ ] Service worker works
- [ ] Offline functionality tested
- [ ] PWA installs on mobile
- [ ] HTTPS configured

### Native Apps
- [ ] Web assets built
- [ ] Capacitor sync completed
- [ ] Version numbers updated
- [ ] Icons and assets added
- [ ] Code signing configured
- [ ] Tested on devices
- [ ] Store listings prepared

---

## 📚 Additional Resources

- **Website Deployment**: See `netlify.toml` and `vercel.json`
- **PWA Deployment**: See `family-hub-netlify.toml` and `family-hub-vercel.json`
- **Android Build**: See `ANDROID_BUILD_GUIDE.md`
- **iOS Build**: See `APP_STORE_READINESS_REPORT.md`
- **Family Hub**: See `family-hub/README.md`

---

**Last Updated**: January 2025  
**Status**: ✅ Complete Deployment Guide


