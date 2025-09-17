# Production Environment Setup Guide

This guide covers secure environment variable management and production deployment best practices for PandaGarde.

## Environment Variables

### Required Environment Variables

#### Supabase Configuration
```bash
# Supabase Project URL
VITE_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase Anonymous Key (safe for client-side)
VITE_SUPABASE_ANON_KEY=your-anon-key

# Database Schema Prefix (optional, defaults to 'pandagarde_')
VITE_DB_SCHEMA_PREFIX=pandagarde_

# Supabase Service Role Key (server-side only, never expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Analytics & Monitoring
```bash
# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry Error Tracking
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
VITE_SENTRY_ORG=your-org
VITE_SENTRY_PROJECT=your-project
VITE_SENTRY_AUTH_TOKEN=your-auth-token
```

#### Optional Configuration
```bash
# Application Environment
NODE_ENV=production

# Custom API Endpoints (if using external services)
VITE_API_BASE_URL=https://api.pandagarde.com

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_FAMILY_MANAGEMENT=true
```

## Deployment Platforms

### Manual Deployment

1. **Build Application**
   ```bash
   # Build the application
   npm run build
   
   # Output will be in dist/ directory
   ```

2. **Environment Variables Setup**
   - Configure environment variables on your web server
   - Add all required environment variables
   - Ensure variables are available for production environment

3. **Web Server Configuration**
   ```json
   // web server configuration
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

### Netlify Deployment

1. **Connect Repository**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Deploy
   netlify deploy --prod
   ```

2. **Environment Variables Setup**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add all required environment variables

3. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_ENV = "production"
   ```

### AWS Amplify Deployment

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository

2. **Environment Variables Setup**
   - Go to App Settings → Environment Variables
   - Add all required environment variables

3. **Build Configuration**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```

## Security Best Practices

### 1. Environment Variable Security

#### ✅ DO:
- Use platform-specific environment variable management
- Never commit `.env` files to version control
- Use different values for different environments
- Rotate keys regularly
- Use least-privilege access for service accounts

#### ❌ DON'T:
- Hardcode secrets in source code
- Use the same keys across environments
- Expose service role keys to client-side code
- Share environment variables in plain text

### 2. Supabase Security

#### Row Level Security (RLS)
- All tables have RLS enabled
- Policies are properly configured for user access
- Test all CRUD operations with different user roles

#### API Keys
- Use anonymous key for client-side operations
- Use service role key only for server-side operations
- Regularly rotate API keys

### 3. Client-Side Security

#### Environment Variables
- Only expose variables prefixed with `VITE_`
- Never expose sensitive server-side variables
- Use build-time variable substitution

#### Code Splitting
- Implement proper code splitting
- Lazy load sensitive components
- Use dynamic imports for admin features

## Database Management

### 1. Migrations

#### Local Development
```bash
# Start local Supabase
npx supabase start

# Run migrations
npx supabase db reset

# Generate types
npm run db:types
```

#### Production Deployment
```bash
# Push migrations to production
npx supabase db push --project-ref your-project-ref

# Or use CI/CD pipeline
npm run db:push
```

### 2. Backups

#### Automated Backups
- Supabase provides automated daily backups
- Backups are retained for 7 days (Pro plan) or 30 days (Team plan)

#### Manual Backups
```bash
# Create manual backup
npx supabase db dump --project-ref your-project-ref > backup.sql

# Restore from backup
npx supabase db reset --project-ref your-project-ref < backup.sql
```

### 3. Monitoring

#### Database Performance
- Monitor query performance in Supabase Dashboard
- Set up alerts for slow queries
- Use connection pooling for high-traffic applications

#### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries for React components
- Log aggregation and analysis

## CI/CD Pipeline Integration

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run database migrations
        run: npm run db:push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_PROJECT_REF: ${{ secrets.SUPABASE_PROJECT_REF }}
      
      - name: Build application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_GA4_MEASUREMENT_ID: ${{ secrets.VITE_GA4_MEASUREMENT_ID }}
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Monitoring and Alerting

### 1. Application Monitoring

#### Sentry Configuration
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter out sensitive data
    if (event.exception) {
      event.exception.values?.forEach(exception => {
        if (exception.value?.includes('password')) {
          return null;
        }
      });
    }
    return event;
  },
});
```

#### Custom Analytics
```typescript
// src/lib/analytics.ts
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event, properties);
    }
    
    // Custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties, timestamp: Date.now() })
    }).catch(console.error);
  }
};
```

### 2. Database Monitoring

#### Supabase Dashboard
- Monitor API usage and performance
- Track database connections and queries
- Set up alerts for unusual activity

#### Custom Monitoring
```sql
-- Monitor slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC;

-- Monitor table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
```bash
# Check if variables are properly prefixed
echo $VITE_SUPABASE_URL

# Verify build process includes variables
npm run build
```

#### 2. Database Connection Issues
```bash
# Test Supabase connection
npx supabase status

# Check RLS policies
npx supabase db diff
```

#### 3. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

### Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Environment Variables Documentation](https://docs.example.com/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## Checklist for Production Deployment

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies tested
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Performance monitoring set up
- [ ] Backup strategy implemented
- [ ] CI/CD pipeline configured
- [ ] Security review completed
- [ ] Load testing performed
- [ ] Documentation updated