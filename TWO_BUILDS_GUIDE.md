# PandaGarde - Two Builds Configuration Guide

**Date**: December 27, 2025  
**Status**: ✅ **BOTH BUILDS CONFIGURED AND TESTED**

---

## 🎯 Overview

PandaGarde now has **2 separate builds** to support different deployment scenarios:

1. **Main Build** - Full PandaGarde website with all features
2. **Family Hub Build** - Standalone Family Hub pilot for subdomain deployment

---

## 📦 Build 1: Main PandaGarde Website

### Purpose
Complete PandaGarde website with all features, including Family Hub integrated as a route.

### Build Command
```bash
npm run build
```

### Configuration
- **Config File**: `vite.config.ts`
- **Entry Point**: `index.html` → `src/main.tsx`
- **Output**: `dist/index.html` and all assets
- **Routes**: All routes including `/family-hub/*`

### Deployment
- **Primary Domain**: `pandagarde.com` or `www.pandagarde.com`
- **Vercel Config**: `vercel.json`
- **Use Case**: Main production website

### Features Included
- ✅ All main pages and features
- ✅ Family Hub integrated (accessible at `/family-hub`)
- ✅ All educational content
- ✅ All tools and resources
- ✅ Full navigation and routing

---

## 📦 Build 2: Family Hub Standalone

### Purpose
Standalone Family Hub application for pilot subdomain deployment.

### Build Command
```bash
npm run build:family-hub
```

### Configuration
- **Config File**: `vite.family-hub.config.ts`
- **Entry Point**: `family-hub.html` → `src/family-hub-main.tsx`
- **Output**: `dist/family-hub.html` and optimized assets
- **Routes**: Only Family Hub routes (`/`, `/login`, `/profile`, `/certificates`)

### Deployment
- **Subdomain**: `family-hub.pandagarde.com` (recommended)
- **Vercel Config**: `family-hub-vercel.json`
- **Use Case**: Pilot program, separate deployment, focused experience

### Features Included
- ✅ Family Dashboard
- ✅ Child Progress Tracking
- ✅ Feedback Form
- ✅ Family Goals Management
- ✅ Progress Context
- ✅ Authentication (if needed)
- ✅ Profile & Certificates

### Optimizations
- ✅ Smaller bundle size (only Family Hub components)
- ✅ Faster load times
- ✅ Enhanced security headers
- ✅ Mobile-optimized
- ✅ No unnecessary main site code

---

## 🔧 Build Configuration Details

### Main Build (`vite.config.ts`)
```typescript
// Full site configuration
// Includes all pages, components, and routes
// Entry: index.html → src/main.tsx
```

### Family Hub Build (`vite.family-hub.config.ts`)
```typescript
// Standalone Family Hub configuration
// Only Family Hub components and dependencies
// Entry: family-hub.html → src/family-hub-main.tsx
// Optimized chunks for Family Hub only
```

---

## 📊 Build Comparison

| Feature | Main Build | Family Hub Build |
|---------|-----------|------------------|
| **Build Time** | ~18s | ~19s |
| **Bundle Size** | ~646 KB (main) | ~771 KB (vendor) |
| **Entry Point** | `index.html` | `family-hub.html` |
| **Routes** | All routes | Family Hub only |
| **Components** | All components | Family Hub only |
| **Use Case** | Main website | Pilot subdomain |

---

## 🚀 Deployment Scenarios

### Scenario 1: Single Domain (Recommended for Now)
- **Deploy**: Main build only
- **Domain**: `pandagarde.com`
- **Family Hub**: Accessible at `pandagarde.com/family-hub`
- **Benefits**: Single deployment, easier maintenance

### Scenario 2: Subdomain Deployment (For Pilot)
- **Main Site**: Deploy main build to `pandagarde.com`
- **Family Hub**: Deploy Family Hub build to `family-hub.pandagarde.com`
- **Benefits**: Separation, independent scaling, focused experience

---

## 📝 Deployment Commands

### Deploy Main Build to Vercel
```bash
cd PandaGardeWebsite-v1
vercel --prod
# Uses vercel.json
```

### Deploy Family Hub Build to Vercel
```bash
cd PandaGardeWebsite-v1
vercel --prod --config family-hub-vercel.json
# Uses family-hub-vercel.json
# Note: You may need to create a separate Vercel project
```

### Alternative: Deploy Both to Same Project
1. Deploy main build first
2. Create a separate Vercel project for Family Hub
3. Configure subdomain in Vercel dashboard
4. Deploy Family Hub build to subdomain project

---

## ✅ Build Verification

### Test Main Build
```bash
npm run build
# Verify: dist/index.html exists
# Verify: All assets generated
```

### Test Family Hub Build
```bash
npm run build:family-hub
# Verify: dist/family-hub.html exists
# Verify: Family Hub assets generated
```

### Test Both Builds
```bash
# Build main
npm run build

# Build Family Hub (won't overwrite main build)
npm run build:family-hub

# Both builds coexist in dist/
```

---

## 🔍 File Structure

```
PandaGardeWebsite-v1/
├── index.html                    # Main build entry
├── family-hub.html              # Family Hub build entry
├── vite.config.ts               # Main build config
├── vite.family-hub.config.ts    # Family Hub build config
├── vercel.json                  # Main deployment config
├── family-hub-vercel.json       # Family Hub deployment config
├── src/
│   ├── main.tsx                 # Main app entry
│   ├── family-hub-main.tsx      # Family Hub app entry
│   ├── App.tsx                  # Main app component
│   └── FamilyHubApp.tsx         # Family Hub app component
└── dist/                        # Build output
    ├── index.html               # Main build
    ├── family-hub.html          # Family Hub build
    └── assets/                  # Shared assets
```

---

## 🎯 Recommendations

### Current Status
- ✅ Both builds configured
- ✅ Both builds tested and working
- ✅ Ready for deployment

### Recommended Approach
1. **Start with Main Build**: Deploy main build to production
2. **Family Hub Accessible**: Users access via `/family-hub` route
3. **Future Option**: Deploy Family Hub to subdomain if needed for pilot separation

### When to Use Family Hub Build
- ✅ Running a separate pilot program
- ✅ Want independent scaling
- ✅ Need focused, lightweight deployment
- ✅ Want to test Family Hub in isolation

---

## 📋 Deployment Checklist

### Main Build Deployment
- [ ] Run `npm run build`
- [ ] Verify `dist/index.html` exists
- [ ] Deploy to Vercel using `vercel.json`
- [ ] Test all routes including `/family-hub`
- [ ] Verify analytics tracking

### Family Hub Build Deployment
- [ ] Run `npm run build:family-hub`
- [ ] Verify `dist/family-hub.html` exists
- [ ] Create separate Vercel project (if using subdomain)
- [ ] Configure subdomain in Vercel
- [ ] Deploy using `family-hub-vercel.json`
- [ ] Test Family Hub routes
- [ ] Verify security headers

---

## 🔗 Related Documentation

- `FAMILY_HUB_INTEGRATION_COMPLETE.md` - Integration details
- `FAMILY_HUB_PILOT_SUBDOMAIN.md` - Subdomain configuration
- `BUILD_READINESS_REPORT.md` - Build status
- `vercel.json` - Main deployment config
- `family-hub-vercel.json` - Family Hub deployment config

---

## ✅ Summary

**Both builds are ready!**

- **Main Build**: ✅ Configured and tested
- **Family Hub Build**: ✅ Configured and tested
- **Deployment**: Ready for both scenarios

You can now:
1. Deploy main build to production
2. Deploy Family Hub build to subdomain (if needed)
3. Or use main build with Family Hub at `/family-hub` route

---

**Last Updated**: December 27, 2025  
**Status**: ✅ **BOTH BUILDS READY FOR DEPLOYMENT**

