# 📊 Deployment Summary

Quick overview of PandaGarde deployment structure.

---

## 🎯 Deployment Targets

### 1. 🌐 Website
- **Purpose**: Main educational platform
- **Domain**: `pandagarde.com`
- **Build**: `npm run build`
- **Output**: `dist/`
- **Config**: `netlify.toml` / `vercel.json`

### 2. 📱 PWA (Progressive Web App)
- **Purpose**: Installable web app (Family Hub)
- **Domain**: `family-hub.pandagarde.com` (or `app.pandagarde.com`)
- **Build**: `npm run build:family-hub`
- **Output**: `family-hub/dist/`
- **Config**: `family-hub-netlify.toml` / `family-hub-vercel.json`

### 3. 📲 Native Apps
- **Purpose**: App store submissions
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **Build**: Capacitor + native build tools

---

## 🔄 Deployment Flow

```
Code Changes
    ↓
Local Testing
    ├── Website: npm run dev
    └── PWA: cd family-hub && npm run dev
    ↓
Build
    ├── Website: npm run build → dist/
    └── PWA: npm run build:family-hub → family-hub/dist/
    ↓
Deploy
    ├── Website → pandagarde.com
    ├── PWA → family-hub.pandagarde.com
    └── Native Apps → App Stores
```

---

## 📋 Quick Commands

### Website
```bash
npm run build
netlify deploy --prod --dir=dist
```

### PWA
```bash
npm run build:family-hub
netlify deploy --prod --dir=family-hub/dist --config=family-hub-netlify.toml
```

### Android
```bash
cd family-hub && npm run build
npx cap sync android
cd android && ./gradlew bundleRelease
```

### iOS
```bash
cd family-hub && npm run build
npx cap sync ios
npx cap open ios  # Build in Xcode
```

---

## ✅ Deployment Checklist

### Website
- [ ] Build succeeds
- [ ] All routes work
- [ ] Mobile responsive
- [ ] HTTPS enabled

### PWA
- [ ] Build succeeds
- [ ] Manifest.json correct
- [ ] Service worker works
- [ ] PWA installs on mobile
- [ ] HTTPS enabled (required)

### Native Apps
- [ ] Web assets built
- [ ] Capacitor sync completed
- [ ] Version numbers updated
- [ ] Code signing configured
- [ ] Tested on devices

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[QUICK_DEPLOYMENT.md](QUICK_DEPLOYMENT.md)** - Quick reference
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Project organization
- **[SEPARATION_GUIDE.md](SEPARATION_GUIDE.md)** - Website/apps separation

---

**Last Updated**: January 2025

