module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/activity-book',
        'http://localhost:3000/story',
        'http://localhost:3000/family-hub',
        'http://localhost:3000/about',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': ['warn', { minScore: 0.6 }],
        
        // Performance specific assertions
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        
        // Accessibility specific assertions
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'heading-order': 'warn',
        'html-has-lang': 'error',
        'html-lang-valid': 'error',
        
        // Best practices
        'is-on-https': 'warn',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error',
        'csp-xss': 'warn',
        
        // SEO
        'document-title': 'error',
        'meta-description': 'warn',
        'link-text': 'warn',
        'crawlable-anchors': 'warn',
        'is-crawlable': 'warn',
        'robots-txt': 'warn',
        'hreflang': 'warn',
        'canonical': 'warn',
        'font-display': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};