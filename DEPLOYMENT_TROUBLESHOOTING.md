# 🚨 PandaGarde Deployment Troubleshooting Guide

**Last Updated:** January 2025

## Quick Diagnosis

If PandaGarde isn't deploying, follow these steps:

### 1. ✅ Verify Build Works Locally

```bash
# Navigate to project directory
cd C:\Users\facel\Downloads\GitHub\PandaGardeWebsite-v1

# Install dependencies (if needed)
npm install

# Build the project
npm run build

# Check if dist folder exists
dir dist
```

**Expected Result:** Build should complete successfully with no errors, and `dist/` folder should contain:
- `index.html`
- `assets/` folder
- `js/` folder
- `images/` folder

### 2. 🔍 Check Common Deployment Issues

#### Issue: Build Fails on Deployment Platform

**Symptoms:**
- Deployment shows build errors
- Build logs show TypeScript or linting errors
- Missing dependencies

**Solutions:**
1. **Check Node.js Version**
   - Netlify: Ensure `NODE_VERSION = "18"` in `netlify.toml` (already configured ✅)
   - Vercel: Check Node.js version in project settings

2. **Clear Build Cache**
   - Netlify: Site Settings > Build & Deploy > Clear build cache
   - Vercel: Project Settings > Clear build cache

3. **Check Build Command**
   - Should be: `npm run build`
   - Output directory: `dist`

#### Issue: Environment Variables Missing

**Symptoms:**
- App loads but features don't work
- Supabase connection fails
- Analytics not tracking

**Required Variables:**
```env
# Optional but recommended
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_SENTRY_DSN=your_sentry_dsn
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

**How to Add:**
- **Netlify:** Site Settings > Environment Variables
- **Vercel:** Project Settings > Environment Variables

**Note:** App will work without these, but some features may be disabled.

#### Issue: 404 Errors on Routes

**Symptoms:**
- Homepage loads, but navigating to other pages shows 404
- Refreshing page shows 404

**Solution:**
- **Netlify:** Already configured in `netlify.toml` ✅
- **Vercel:** Already configured in `vercel.json` ✅
- Ensure SPA redirect is set: `/*` → `/index.html` (status 200)

#### Issue: Favicon 404 Error

**Symptoms:**
- Console shows: `favicon.ico 404`

**Solution:**
- This is a minor issue and won't prevent deployment
- Browser automatically requests `/favicon.ico`
- App uses `/LogoPandagarde.png` as favicon (configured ✅)
- Can be ignored or add redirect (see below)

### 3. 🌐 Platform-Specific Issues

#### Netlify Deployment

**Check:**
1. Build command: `npm run build` ✅
2. Publish directory: `dist` ✅
3. Node version: `18` ✅
4. Environment variables set ✅

**Common Issues:**
- **Build timeout:** Increase in `netlify.toml`:
  ```toml
  [build]
    publish = "dist"
    command = "npm run build"
    timeout = 300  # 5 minutes
  ```

- **Function timeout:** Not applicable (static site)

#### Vercel Deployment

**Check:**
1. Framework preset: `vite` ✅
2. Build command: `npm run build` ✅
3. Output directory: `dist` ✅
4. Environment variables set ✅

**Common Issues:**
- **Build timeout:** Check Vercel dashboard for timeout errors
- **Memory limit:** Free tier has limits, upgrade if needed

### 4. 🔧 Fix Favicon 404 (Optional)

To fix the favicon.ico 404 error, add this to `netlify.toml`:

```toml
# Redirect favicon.ico to LogoPandagarde.png
[[redirects]]
  from = "/favicon.ico"
  to = "/LogoPandagarde.png"
  status = 200
```

Or create a `public/favicon.ico` file (copy from LogoPandagarde.png).

### 5. 📋 Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` completes successfully
- [ ] `dist/` folder exists and contains files
- [ ] Environment variables are set (if using Supabase/Sentry)
- [ ] Build logs show no errors
- [ ] Test locally with `npm run preview`
- [ ] Check browser console for runtime errors

### 6. 🐛 Debugging Steps

#### Step 1: Check Build Logs
- Look for TypeScript errors
- Check for missing dependencies
- Verify Node.js version

#### Step 2: Test Locally
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173` and check:
- Does homepage load?
- Do routes work?
- Any console errors?

#### Step 3: Check Deployment Logs
- Netlify: Deploys > [Latest Deploy] > Build Log
- Vercel: Deployments > [Latest] > Build Logs

#### Step 4: Verify Environment Variables
- Check deployment platform settings
- Ensure variables are prefixed with `VITE_`
- Verify values are correct (no extra spaces)

### 7. 🚀 Quick Fixes

#### Fix 1: Rebuild and Redeploy
```bash
# Clear node_modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
# Then redeploy
```

#### Fix 2: Check for TypeScript Errors
```bash
npx tsc --noEmit
```

#### Fix 3: Check for Linting Errors
```bash
npm run lint
```

### 8. 📞 Still Not Working?

If deployment still fails:

1. **Check Error Messages**
   - Copy exact error from deployment logs
   - Search for error message in codebase

2. **Verify Configuration Files**
   - `netlify.toml` or `vercel.json` are correct
   - `package.json` has correct build script
   - `vite.config.ts` is valid

3. **Test Minimal Build**
   - Comment out optional plugins in `vite.config.ts`
   - Try building without Sentry plugin
   - Remove image optimizer temporarily

4. **Check Dependencies**
   - All dependencies installed?
   - No version conflicts?
   - Try `npm ci` instead of `npm install`

### 9. ✅ Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Site is accessible at deployment URL
- ✅ Homepage loads correctly
- ✅ Navigation works (no 404s)
- ✅ No critical console errors
- ✅ Assets load (images, CSS, JS)

### 10. 📊 Current Status

**Build Status:** ✅ **WORKING**
- Build completes successfully
- `dist/` folder created
- All assets included

**Configuration:** ✅ **READY**
- `netlify.toml` configured
- `vercel.json` configured
- SPA routing set up
- Security headers configured

**Known Minor Issues:**
- ⚠️ `favicon.ico` 404 (cosmetic, doesn't affect functionality)

---

## Quick Reference

### Build Command
```bash
npm run build
```

### Preview Locally
```bash
npm run preview
```

### Check Build Output
```bash
dir dist
```

### Required Environment Variables
- `VITE_SUPABASE_URL` (optional)
- `VITE_SUPABASE_ANON_KEY` (optional)

### Deployment Platforms
- **Netlify:** Use `netlify.toml`
- **Vercel:** Use `vercel.json`
- **Any Static Host:** Upload `dist/` folder

---

**Need More Help?**
- Check deployment platform documentation
- Review build logs for specific errors
- Test locally first with `npm run preview`

