# 🏗️ PandaGarde Project Structure

## Overview

This project is organized into **three distinct parts**:

1. **Website** - Main educational platform (marketing & content)
2. **Apps** - Mobile applications for app store submission
3. **Shared** - Common code shared between website and apps

---

## 📁 Directory Structure

```
PandaGardeWebsite-v1/
├── src/                    # 🌐 WEBSITE - Main PandaGarde website
│   ├── pages/             # Website pages (marketing, content, guides)
│   ├── components/        # Website-specific components
│   └── ...
│
├── apps/                   # 📱 APPS - Mobile applications
│   └── family-hub/        # Family Hub mobile app (for app stores)
│       ├── src/           # App source code
│       ├── public/        # App assets
│       ├── android/       # Android build files
│       ├── ios/           # iOS build files
│       └── capacitor.config.ts
│
├── shared/                 # 🔄 SHARED - Common code
│   ├── components/        # Shared React components
│   ├── activities/        # Activity components (used by both)
│   ├── contexts/          # Shared React contexts
│   ├── lib/               # Shared utilities and services
│   └── types/             # Shared TypeScript types
│
├── public/                 # Website static assets
├── scripts/               # Build and deployment scripts
└── docs/                  # Documentation
```

---

## 🌐 Website (`/src`)

**Purpose**: Main educational platform and marketing website

**Features**:
- Educational content and resources
- Marketing pages
- Feature showcases for app store reviewers
- Download guides and documentation
- Full website navigation

**Target Audience**:
- Parents
- Educators
- Children (ages 5-17)
- App store reviewers

**Deployment**: 
- Main domain: `pandagarde.com`
- Static hosting (Netlify/Vercel)

**Key Pages**:
- Homepage
- Educational content pages
- Feature showcase pages (`/features`, `/app-features`)
- Download guides
- Privacy policy, terms, etc.

---

## 📱 Apps (`/apps`)

**Purpose**: Standalone mobile applications for app store submission

### Family Hub App (`/apps/family-hub`)

**Purpose**: Mobile-first family management and activity app

**Features**:
- Family member management
- Interactive privacy activities
- Progress tracking
- Certificate generation
- PWA support

**Target Audience**:
- Parents (mobile users)
- Families on-the-go

**Deployment**:
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **PWA**: Standalone web app

**App Store Submission**:
- ✅ Android: Ready for Play Store
- ⚠️ iOS: Requires Xcode setup

**Build Commands**:
```bash
cd apps/family-hub
npm run build          # Build web version
npm run build:android  # Build Android APK/AAB
npm run build:ios     # Build iOS app (requires macOS)
```

---

## 🔄 Shared (`/shared`)

**Purpose**: Code shared between website and apps

**Contents**:
- Activity components (Coloring, Maze, Quiz, etc.)
- Common utilities (encryption, analytics, etc.)
- Shared contexts (Theme, Progress, etc.)
- Type definitions

**Usage**:
- Website imports from `../../shared/...`
- Apps import from `../../shared/...`

**Note**: Currently, apps have their own copies. Future refactoring will move shared code here.

---

## 🎯 Feature Showcase for App Stores

The website includes special pages for app store reviewers:

### `/features` - Main Features Page
- Overview of all platform features
- Screenshots and demos
- Feature comparison

### `/app-features` - App-Specific Features
- Family Hub app features
- Interactive demos
- App store assets
- Review guide for app store reviewers

### `/app-store-review` - Reviewer Guide
- Step-by-step feature walkthrough
- Test accounts (if applicable)
- Feature verification checklist
- Links to app downloads

---

## 🚀 Development Workflow

### Working on Website
```bash
# From project root
npm run dev              # Start website dev server
npm run build            # Build website
```

### Working on Family Hub App
```bash
# From project root
cd apps/family-hub
npm run dev              # Start app dev server
npm run build            # Build app
npm run build:android    # Build Android
```

### Working on Shared Code
```bash
# Edit files in /shared
# Both website and apps will use updated code
```

---

## 📦 Build & Deployment

### Website Deployment
```bash
npm run build
# Deploy /dist to hosting service
```

### App Deployment

#### Android
```bash
cd apps/family-hub
npm run build:android
# Upload AAB to Google Play Console
```

#### iOS
```bash
cd apps/family-hub
npm run build:ios
# Archive in Xcode and upload to App Store Connect
```

---

## 🔗 Integration Points

### Website → App
- Website links to app store listings
- Website showcases app features
- Website provides download instructions

### App → Website
- Apps link to website for full content
- Apps reference website privacy policy
- Apps link to website support pages

### Shared Code
- Both website and apps use shared activities
- Both use shared utilities and contexts
- Type definitions shared for consistency

---

## 📝 Key Files

### Website
- `src/App.tsx` - Website main app
- `src/pages/` - Website pages
- `vite.config.ts` - Website build config
- `package.json` - Website dependencies

### Family Hub App
- `apps/family-hub/src/App.tsx` - App main
- `apps/family-hub/src/app/screens/` - App screens
- `apps/family-hub/vite.config.ts` - App build config
- `apps/family-hub/package.json` - App dependencies
- `apps/family-hub/capacitor.config.ts` - Capacitor config

### Shared
- `shared/components/` - Shared components
- `shared/lib/` - Shared utilities
- `shared/types/` - Shared types

---

## 🎨 Design Philosophy

### Website
- **Full-featured**: Complete educational platform
- **Content-rich**: Extensive resources and guides
- **Marketing-focused**: Showcases all features
- **Desktop-optimized**: Full website experience

### Apps
- **Mobile-first**: Optimized for mobile devices
- **Streamlined**: Focused on core features
- **App-store-ready**: Structured for submission
- **PWA-capable**: Installable as web app

### Shared
- **Reusable**: Code used by both website and apps
- **Consistent**: Same functionality across platforms
- **Maintainable**: Single source of truth

---

## 📚 Documentation

- **Website Docs**: `docs/website/`
- **App Docs**: `apps/family-hub/README.md`
- **Shared Docs**: `shared/README.md`
- **Deployment**: `docs/deployment/`
- **App Store**: `docs/app-store/`

---

## ✅ Separation Benefits

1. **Clear Boundaries**: Website and apps are clearly separated
2. **Independent Deployment**: Deploy website and apps separately
3. **App Store Ready**: Apps structured for store submission
4. **Feature Showcase**: Website can demonstrate app features
5. **Code Reuse**: Shared code reduces duplication
6. **Maintainability**: Easier to maintain and update

---

**Last Updated**: January 2025
**Status**: ✅ Structure Established


