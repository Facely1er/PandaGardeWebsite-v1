# Family Hub Pilot - Subdomain Configuration

**Date**: December 10, 2025  
**Status**: Configuration Guide

---

## 🎯 Recommended Subdomain

### Primary Recommendation: `family-hub.pandagarde.com`

**Rationale:**
- ✅ Matches the internal route structure (`/family-hub/*`)
- ✅ Clearly identifies the feature
- ✅ Professional and descriptive
- ✅ Easy to remember and communicate
- ✅ Allows for future pilots on other subdomains

### Alternative Options

If you prefer to emphasize it's a pilot:
- `family-hub-pilot.pandagarde.com` (more explicit but longer)
- `pilot.pandagarde.com` (shorter, can host multiple pilots)

---

## 📋 Deployment Configuration

### For Netlify

1. **Create a new site** or use branch deploy for the pilot
2. **Set custom domain**: `family-hub.pandagarde.com`
3. **Environment Variables** (same as main site):
   ```env
   VITE_SUPABASE_URL=https://nkgekxipzzvceesdjsrh.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTc0MTUsImV4cCI6MjA3MzQzMzQxNX0.W-598e6_uv5ES9DqgVr9ExdeY4uzZxcIZulrvioGqpA
   VITE_SITE_URL=https://family-hub.pandagarde.com
   VITE_ADDITIONAL_REDIRECT_URLS=https://family-hub.pandagarde.com/auth/callback,https://pandagarde.com/auth/callback
   ```

4. **Update `netlify.toml`** (if needed for subdomain-specific config):
   - The existing `netlify.toml` should work as-is
   - Security headers will apply to the subdomain

### For Vercel

1. **Create a new project** or use preview deployment
2. **Add custom domain**: `family-hub.pandagarde.com`
3. **Environment Variables** (same as main site):
   ```env
   VITE_SUPABASE_URL=https://nkgekxipzzvceesdjsrh.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTc0MTUsImV4cCI6MjA3MzQzMzQxNX0.W-598e6_uv5ES9DqgVr9ExdeY4uzZxcIZulrvioGqpA
   VITE_SITE_URL=https://family-hub.pandagarde.com
   VITE_ADDITIONAL_REDIRECT_URLS=https://family-hub.pandagarde.com/auth/callback,https://pandagarde.com/auth/callback
   ```

4. **Update `vercel.json`** (if needed):
   - The existing `vercel.json` should work as-is

---

## 🔧 Code Updates Needed

### Option A: Deploy Same Codebase (Recommended)

If deploying the same codebase to the subdomain:
- ✅ No code changes needed
- ✅ Routes will work the same (`/family-hub/*`)
- ✅ All functionality preserved

### Option B: Subdomain-Specific Configuration

If you want subdomain-specific behavior:

1. **Update environment detection** (if needed):
   ```typescript
   const isPilotSubdomain = window.location.hostname === 'family-hub.pandagarde.com';
   ```

2. **Update analytics tracking** (if needed):
   - Add subdomain-specific tracking IDs
   - Tag events with pilot identifier

---

## 🔗 Link Updates

### Current State

Many pages currently link to the old external Family Hub:
- `https://www.hub.pandagarde.com` (external, old implementation)

### Recommended Updates

Since Family Hub is now integrated into the main site, you have two options:

#### Option 1: Internal Routes (Recommended for Same Domain)
Update all links to use internal routes:
- Change `https://www.hub.pandagarde.com` → `/family-hub`
- Remove `target="_blank"` (opens in same tab)
- Better user experience, no page reload

#### Option 2: Subdomain Links (For Separate Deployment)
If deploying to separate subdomain:
- Change `https://www.hub.pandagarde.com` → `https://family-hub.pandagarde.com`
- Keep `target="_blank"` if desired
- Maintains separation between main site and pilot

**Files that need updating** (if using Option 2):
- `src/components/Header.tsx` (line 324)
- `src/components/Footer.tsx` (line 33)
- `src/pages/OverviewPage.tsx` (line 383)
- `src/pages/QuickStartPage.tsx` (line 453)
- `src/pages/GetStartedPage.tsx` (lines 337, 393)
- `src/pages/ParentLandingPage.tsx` (lines 47, 264, 363)
- `src/pages/TeenHandbookPage.tsx` (line 517)
- `src/pages/SupportPage.tsx` (line 384)
- `src/pages/StoryPage.tsx` (line 482)
- `src/pages/PrivacyHandbookPage.tsx` (line 447)
- `src/pages/PrivacyExplorersPage.tsx` (line 392)
- `src/pages/NewsletterPage.tsx` (line 326)
- `src/pages/ModelingBehaviorGuidePage.tsx` (line 466)
- `src/pages/FamilyAgreementPage.tsx` (line 279)
- `src/pages/EducatorToolsPage.tsx` (line 511)
- `src/pages/DigitalRightsPage.tsx` (line 574)
- `src/pages/DigitalCitizenshipPage.tsx` (line 519)
- `src/pages/CertificatesPage.tsx` (line 305)
- `src/pages/CertificatePage.tsx` (line 13)
- `src/pages/ActivityBookPage.tsx` (lines 285, 364, 645)
- `src/pages/family-hub/AuthWrapper.tsx` (line 64)

---

## 🌐 DNS Configuration

### Steps to Configure Subdomain

1. **Add DNS Record** (in your domain registrar):
   ```
   Type: CNAME
   Name: family-hub
   Value: [your-hosting-platform].netlify.app (or vercel.app)
   TTL: 3600 (or auto)
   ```

2. **Verify DNS** (takes 24-48 hours to propagate)

3. **SSL Certificate** (automatic with Netlify/Vercel)

---

## 🔒 Security Considerations

### CORS Configuration

If using Supabase or other APIs:
- Add `https://family-hub.pandagarde.com` to allowed origins
- Update Supabase redirect URLs to include the subdomain

### Cookie Settings

If using authentication cookies:
- Set domain to `.pandagarde.com` to share across subdomains
- Or keep separate for subdomain isolation

---

## 📊 Analytics & Tracking

### Google Analytics

If using GA4:
- Create separate property for pilot (optional)
- Or use same property with subdomain filter
- Tag events with `pilot=true` for segmentation

### Sentry

If using Sentry:
- Same project is fine
- Tag errors with subdomain for filtering

---

## ✅ Deployment Checklist

- [ ] DNS record added for `family-hub.pandagarde.com`
- [ ] Subdomain configured in hosting platform (Netlify/Vercel)
- [ ] Environment variables updated with subdomain URL
- [ ] Supabase redirect URLs updated (if using auth)
- [ ] Links updated (if using separate subdomain deployment)
- [ ] SSL certificate verified (automatic)
- [ ] Test subdomain access
- [ ] Test Family Hub routes (`/family-hub`)
- [ ] Test authentication flow (if applicable)
- [ ] Verify analytics tracking
- [ ] Update documentation with subdomain

---

## 🎯 Recommendation Summary

**Subdomain**: `family-hub.pandagarde.com`

**Deployment Strategy**: 
- Deploy same codebase to subdomain
- Use internal routes (`/family-hub`) for better UX
- Or use subdomain links if you want separation

**Next Steps**:
1. Choose deployment strategy (same domain vs. subdomain)
2. Configure DNS
3. Deploy to subdomain
4. Update links (if using subdomain-specific links)
5. Test thoroughly

---

**Last Updated**: December 10, 2025  
**Status**: Ready for Configuration

