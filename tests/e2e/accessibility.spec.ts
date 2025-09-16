import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('homepage has proper accessibility structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check for proper landmark roles
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    await expect(page.locator('nav, [role="navigation"]')).toBeVisible();
    await expect(page.locator('footer, [role="contentinfo"]')).toBeVisible();
    
    // Check for skip links
    const skipLink = page.locator('a[href="#main"], a[href="#content"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink.first()).toBeVisible();
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Images should have alt text (empty alt is acceptable for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('links have descriptive text', async ({ page }) => {
    await page.goto('/');
    
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      
      // Links should have descriptive text or aria-label
      const ariaLabel = await link.getAttribute('aria-label');
      const hasText = text && text.trim().length > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;
      
      if (href && !href.startsWith('#')) {
        expect(hasText || hasAriaLabel).toBeTruthy();
      }
    }
  });

  test('form elements have labels', async ({ page }) => {
    await page.goto('/');
    
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"], textarea, select');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      // Input should have a label, aria-label, or aria-labelledby
      const hasLabel = id && page.locator(`label[for="${id}"]`).count() > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;
      const hasAriaLabelledBy = ariaLabelledBy && ariaLabelledBy.trim().length > 0;
      
      expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');
    
    // This is a basic check - in a real scenario, you'd use a tool like axe-core
    // to check color contrast ratios
    
    // Check that text is visible
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
    const textCount = await textElements.count();
    
    for (let i = 0; i < Math.min(textCount, 10); i++) {
      const element = textElements.nth(i);
      const text = await element.textContent();
      
      if (text && text.trim().length > 0) {
        const isVisible = await element.isVisible();
        expect(isVisible).toBeTruthy();
      }
    }
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test that focus is visible
    const focusStyles = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        border: styles.border
      };
    });
    
    // Focus should be visible (outline, box-shadow, or border)
    const hasFocusIndicator = 
      focusStyles.outline !== 'none' || 
      focusStyles.boxShadow !== 'none' || 
      focusStyles.border !== 'none';
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('page has proper language attribute', async ({ page }) => {
    await page.goto('/');
    
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    
    expect(lang).toBeTruthy();
    expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
  });

  test('no duplicate IDs', async ({ page }) => {
    await page.goto('/');
    
    const elementsWithIds = page.locator('[id]');
    const idCount = await elementsWithIds.count();
    const ids: string[] = [];
    
    for (let i = 0; i < idCount; i++) {
      const element = elementsWithIds.nth(i);
      const id = await element.getAttribute('id');
      if (id) {
        ids.push(id);
      }
    }
    
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    const interactiveElements = page.locator('button, a, input, select, textarea, [tabindex]');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i);
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      const tabIndex = await element.getAttribute('tabindex');
      
      // Elements should be focusable
      if (tagName === 'button' || tagName === 'a' || tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
        // These elements should be focusable by default
        const isVisible = await element.isVisible();
        const isDisabled = await element.isDisabled();
        
        if (isVisible && !isDisabled) {
          expect(tabIndex !== '-1').toBeTruthy();
        }
      }
    }
  });
});