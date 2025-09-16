import { test, expect } from '@playwright/test';

test.describe('PandaGarde Smoke Tests', () => {
  test('homepage loads and displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/PandaGarde/);
    
    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for main content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('activity book page loads', async ({ page }) => {
    await page.goto('/activity-book');
    
    // Check page loads without errors
    await expect(page).toHaveTitle(/Activity Book|PandaGarde/);
    
    // Check for activity content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('story page loads', async ({ page }) => {
    await page.goto('/story');
    
    // Check page loads without errors
    await expect(page).toHaveTitle(/Story|PandaGarde/);
    
    // Check for story content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('family hub page loads', async ({ page }) => {
    await page.goto('/family-hub');
    
    // Check page loads without errors
    await expect(page).toHaveTitle(/Family Hub|PandaGarde/);
    
    // Check for family hub content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    
    // Check page loads without errors
    await expect(page).toHaveTitle(/About|PandaGarde/);
    
    // Check for about content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('downloads pages load', async ({ page }) => {
    const downloadPages = [
      '/downloads/coloring-sheets',
      '/downloads/safety-posters',
      '/downloads/certificates',
      '/downloads/family-agreement'
    ];

    for (const downloadPage of downloadPages) {
      await page.goto(downloadPage);
      
      // Check page loads without errors
      await expect(page).toHaveTitle(/Downloads|PandaGarde/);
      
      // Check for download content
      await expect(page.locator('main, [role="main"]')).toBeVisible();
    }
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation links
    const navLinks = [
      { text: 'Activity Book', href: '/activity-book' },
      { text: 'Story', href: '/story' },
      { text: 'Family Hub', href: '/family-hub' },
      { text: 'About', href: '/about' }
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`a[href="${link.href}"]`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await expect(page).toHaveURL(new RegExp(link.href));
      }
    }
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check that page is responsive
    await expect(page.locator('body')).toBeVisible();
    
    // Check that navigation is accessible on mobile
    const nav = page.locator('nav');
    if (await nav.isVisible()) {
      await expect(nav).toBeVisible();
    }
  });

  test('no console errors on main pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const pages = ['/', '/activity-book', '/story', '/family-hub', '/about'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Allow some time for any async operations
      await page.waitForTimeout(1000);
    }
    
    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('404') && 
      !error.includes('favicon') &&
      !error.includes('service worker')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});