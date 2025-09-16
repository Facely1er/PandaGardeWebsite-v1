# Testing Setup Guide

## E2E Testing with Playwright

### Initial Setup
Before running E2E tests, you need to install Playwright browsers:

```bash
npm run test:setup
```

This will install all required browsers and dependencies for Playwright testing.

### Running Tests

#### Local Development
```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/smoke.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed
```

#### CI/CD
The GitHub Actions workflow automatically handles browser installation and runs tests. No manual setup required.

### Test Structure
- `tests/e2e/smoke.spec.ts` - Basic smoke tests for all pages
- `tests/e2e/accessibility.spec.ts` - Accessibility compliance tests
- `playwright.config.ts` - Playwright configuration

### Troubleshooting

#### Browsers Not Installed
If you get errors about missing browsers:
```bash
npm run test:e2e:install
```

#### Permission Issues (Linux/macOS)
```bash
npx playwright install-deps
```

#### Windows Issues
```bash
npx playwright install --with-deps
```

### Test Development

#### Adding New Tests
1. Create new test files in `tests/e2e/`
2. Follow the existing patterns for page objects and assertions
3. Use `test.describe()` for grouping related tests
4. Use `test.beforeEach()` for setup if needed

#### Best Practices
- Use descriptive test names
- Test both happy path and error scenarios
- Include accessibility checks
- Test responsive design
- Use data-testid attributes for reliable element selection

### Debugging Tests

#### Debug Mode
```bash
npx playwright test --debug
```

#### Trace Viewer
```bash
npx playwright show-trace test-results/trace.zip
```

#### Screenshots and Videos
Failed tests automatically generate screenshots and videos in `test-results/`

### Performance Testing

#### Lighthouse CI
```bash
npm run lighthouse:ci
```

This runs Lighthouse audits with performance and accessibility budgets.

#### Manual Lighthouse Testing
1. Start the preview server: `npm run preview`
2. Open http://localhost:3000
3. Use Chrome DevTools Lighthouse tab
4. Run audits for Performance, Accessibility, Best Practices, and SEO

### Continuous Integration

The CI pipeline automatically:
1. Installs dependencies
2. Installs Playwright browsers
3. Runs E2E tests
4. Runs Lighthouse CI
5. Reports results

No manual intervention required for CI/CD testing.