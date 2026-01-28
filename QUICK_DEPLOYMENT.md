# ⚡ Quick Deployment Reference

Quick commands for deploying PandaGarde components.

---

## 🌐 Website Deployment

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
vercel --prod
```

---

## 📱 PWA Deployment

### Netlify
```bash
npm run build:family-hub
netlify deploy --prod --dir=family-hub/dist --config=family-hub-netlify.toml
```

### Vercel
```bash
cd family-hub
npm run build
vercel --prod
```

---

## 📲 Native App Builds

### Android
```bash
cd family-hub && npm run build
npx cap sync android
cd android && ./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS (macOS required)
```bash
cd family-hub && npm run build
npx cap sync ios
npx cap open ios
# Then build in Xcode
```

---

## 🔗 Deployment URLs

- **Website**: `pandagarde.com`
- **PWA**: `family-hub.pandagarde.com` (or `app.pandagarde.com`)
- **Android**: Google Play Store
- **iOS**: Apple App Store

---

## ✅ Quick Checklist

### Before Deploying
- [ ] Code tested locally
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Preview works

### After Deploying
- [ ] All routes work
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] Analytics tracking

---

**See `DEPLOYMENT_GUIDE.md` for detailed instructions.**

