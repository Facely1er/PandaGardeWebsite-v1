# 🚀 PandaGarde Deployment Guide

This guide provides instructions for deploying PandaGarde to various hosting platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to your hosting platform
- Supabase project configured

## 🛠️ Build Process

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Verify Build**
   - Check that `dist/` directory is created
   - Verify all assets are included
   - Test the built application locally:
     ```bash
     npm run preview
     ```

## 🌐 Deployment Options

### Option 1: Manual Deployment

1. **Upload Files**
   - Upload the entire `dist/` directory to your web server
   - Ensure your web server serves `index.html` for all routes (SPA routing)

2. **Configure Web Server**
   - Set up proper MIME types for static assets
   - Configure redirects for SPA routing
   - Enable gzip compression

3. **Environment Variables**
   - Set up environment variables on your server
   - Ensure all required variables are available

### Option 2: Netlify

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment Variables**
   - Add environment variables in Netlify dashboard
   - Configure redirects for SPA routing

### Option 3: AWS S3 + CloudFront

1. **Upload to S3**
   - Upload `dist/` contents to S3 bucket
   - Configure bucket for static website hosting

2. **CloudFront Distribution**
   - Create CloudFront distribution
   - Configure custom error pages for SPA routing
   - Set up SSL certificate

## 🔧 Required Environment Variables

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_GA4_MEASUREMENT_ID=your_ga_tracking_id

# Optional: Error Monitoring
VITE_SENTRY_DSN=your_sentry_dsn
VITE_SENTRY_ORG=your_sentry_org
VITE_SENTRY_PROJECT=your_sentry_project
VITE_SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

## 🔍 Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All routes work (SPA routing)
- [ ] Environment variables are set
- [ ] Supabase connection works
- [ ] Analytics tracking (if enabled)
- [ ] Error monitoring (if enabled)
- [ ] SSL certificate is valid
- [ ] Performance is acceptable

## 🚨 Troubleshooting

### Common Issues

1. **404 on Refresh**
   - Configure server to serve `index.html` for all routes
   - Set up proper redirects

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `VITE_`
   - Check variable names match exactly
   - Restart application after adding variables

3. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

## 📞 Support

For deployment issues:
- Check the build logs
- Verify environment variables
- Test locally with `npm run preview`
- Review the main README.md for additional setup instructions