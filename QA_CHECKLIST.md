# PandaGarde QA Checklist

## Pre-Deployment Checklist

### Environment Setup
- [ ] All required environment variables are set in GitHub Secrets
- [ ] `VITE_SUPABASE_URL` points to correct Supabase instance
- [ ] `VITE_SUPABASE_ANON_KEY` is valid and not expired
- [ ] `VITE_DB_SCHEMA_PREFIX` is set for database isolation
- [ ] Optional variables (Sentry, GA4) are configured if needed

### Database
- [ ] Database migrations have been applied successfully
- [ ] RLS policies are properly configured
- [ ] No GRANT ALL permissions exist for anon role
- [ ] Database types have been generated and are up to date
- [ ] Seed data is present and correct

### Security
- [ ] CSP headers are properly configured
- [ ] Security headers (X-Frame-Options, X-Content-Type-Options, etc.) are set
- [ ] No hardcoded secrets in code
- [ ] npm audit passes with no high/critical vulnerabilities
- [ ] All external dependencies are from trusted sources

## Post-Deployment Testing

### Core Functionality
- [ ] **Homepage loads correctly**
  - [ ] Page loads without errors
  - [ ] All images load properly
  - [ ] Navigation works
  - [ ] Responsive design works on mobile/tablet/desktop

- [ ] **User Authentication**
  - [ ] Registration flow works
  - [ ] Login flow works
  - [ ] Password reset works
  - [ ] Logout works
  - [ ] Session persistence works

- [ ] **Activity Book**
  - [ ] All 6 activities load and function
  - [ ] Progress tracking works
  - [ ] Achievement system works
  - [ ] Mobile responsiveness
  - [ ] Print functionality works

- [ ] **Family Hub**
  - [ ] Family creation works
  - [ ] Family member management works
  - [ ] Progress tracking across family members
  - [ ] Family achievements display correctly

- [ ] **Downloads**
  - [ ] All download pages render correctly
  - [ ] PDF generation works
  - [ ] Print functionality works in Chrome and Safari iOS
  - [ ] Files download with correct names and content

### Database Integration
- [ ] **Progress Tracking**
  - [ ] User progress saves to Supabase
  - [ ] Progress loads correctly on page refresh
  - [ ] Family progress aggregation works
  - [ ] Local storage fallback works when offline

- [ ] **Data Persistence**
  - [ ] User profiles save correctly
  - [ ] Family data persists across sessions
  - [ ] Activity completion data is accurate
  - [ ] Search analytics are recorded

### Performance & Accessibility
- [ ] **Performance**
  - [ ] Lighthouse Performance score ≥ 90
  - [ ] First Contentful Paint < 2s
  - [ ] Largest Contentful Paint < 2.5s
  - [ ] Cumulative Layout Shift < 0.1
  - [ ] Page loads quickly on slow connections

- [ ] **Accessibility**
  - [ ] Lighthouse Accessibility score ≥ 90
  - [ ] All images have alt text
  - [ ] Proper heading hierarchy (h1, h2, h3)
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatibility
  - [ ] Color contrast meets WCAG AA standards

- [ ] **SEO**
  - [ ] Lighthouse SEO score ≥ 80
  - [ ] Meta tags are present and correct
  - [ ] Sitemap.xml is accessible
  - [ ] Robots.txt is configured correctly
  - [ ] Structured data is valid

### Browser Compatibility
- [ ] **Desktop Browsers**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

- [ ] **Mobile Browsers**
  - [ ] Chrome Mobile (iOS/Android)
  - [ ] Safari Mobile (iOS)
  - [ ] Samsung Internet (Android)

### Security Testing
- [ ] **CSP Compliance**
  - [ ] No inline scripts blocked
  - [ ] External resources load correctly
  - [ ] No CSP violations in console

- [ ] **Data Security**
  - [ ] No sensitive data in client-side code
  - [ ] API calls use HTTPS
  - [ ] User data is properly protected by RLS

### Error Handling
- [ ] **Network Errors**
  - [ ] Graceful handling of network failures
  - [ ] Offline functionality works
  - [ ] Error messages are user-friendly

- [ ] **Application Errors**
  - [ ] Errors are logged to Sentry
  - [ ] Error boundaries catch React errors
  - [ ] No unhandled promise rejections

### Monitoring & Observability
- [ ] **Sentry Integration**
  - [ ] Error tracking is working
  - [ ] Performance monitoring is active
  - [ ] User context is being set
  - [ ] No sensitive data in error reports

- [ ] **Analytics**
  - [ ] Google Analytics is tracking correctly
  - [ ] Custom events are firing
  - [ ] User journeys are being recorded

## Automated Testing

### CI/CD Pipeline
- [ ] **Type Checking**
  - [ ] TypeScript compilation passes
  - [ ] No type errors

- [ ] **Linting**
  - [ ] ESLint passes with no errors
  - [ ] Code follows project style guidelines

- [ ] **Security Audit**
  - [ ] npm audit passes
  - [ ] No high/critical vulnerabilities

- [ ] **Build Process**
  - [ ] Application builds successfully
  - [ ] All assets are generated
  - [ ] Source maps are created for production

- [ ] **End-to-End Tests**
  - [ ] Playwright tests pass
  - [ ] Smoke tests cover critical paths
  - [ ] Accessibility tests pass

- [ ] **Performance Tests**
  - [ ] Lighthouse CI passes
  - [ ] Performance budgets are met
  - [ ] Accessibility scores are met

### Database Tests
- [ ] **Migration Tests**
  - [ ] Migrations run successfully
  - [ ] Rollback works if needed
  - [ ] No data loss during migration

- [ ] **RLS Policy Tests**
  - [ ] Users can only access their own data
  - [ ] Public data is accessible
  - [ ] Admin functions work correctly

## Production Readiness

### Deployment
- [ ] **Environment Configuration**
  - [ ] Production environment variables are set
  - [ ] Database connection is stable
  - [ ] CDN is configured correctly

- [ ] **Monitoring Setup**
  - [ ] Uptime monitoring is active
  - [ ] Error alerting is configured
  - [ ] Performance monitoring is active

- [ ] **Backup & Recovery**
  - [ ] Database backups are configured
  - [ ] Recovery procedures are documented
  - [ ] Rollback plan is ready

### Documentation
- [ ] **User Documentation**
  - [ ] User guide is up to date
  - [ ] FAQ covers common issues
  - [ ] Contact information is correct

- [ ] **Technical Documentation**
  - [ ] API documentation is current
  - [ ] Deployment guide is updated
  - [ ] Troubleshooting guide exists

## Sign-off

- [ ] **Development Team**
  - [ ] All features implemented and tested
  - [ ] Code review completed
  - [ ] Performance requirements met

- [ ] **QA Team**
  - [ ] All test cases passed
  - [ ] No critical bugs found
  - [ ] User acceptance testing completed

- [ ] **Security Review**
  - [ ] Security scan completed
  - [ ] No vulnerabilities found
  - [ ] Security policies implemented

- [ ] **Product Owner**
  - [ ] Requirements met
  - [ ] User experience approved
  - [ ] Ready for production release

---

**Deployment Date:** ___________  
**Deployed By:** ___________  
**Version:** ___________  
**Sign-off:** ___________