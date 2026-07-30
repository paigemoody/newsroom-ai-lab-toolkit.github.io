import { test, expect } from '@playwright/test';

/**
 * Visual regression for stateful/interactive components: MethodologyBoard's step
 * navigation (most of the hardcoded-color surface area is step-specific, not just
 * step 1) and the mobile navbar menu.
 */

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('how-this-works - MethodologyBoard across steps', async ({ page }) => {
  await page.goto('docs/how-this-works');
  const nextButton = page.getByRole('button', { name: '→' });
  await expect(nextButton).toBeVisible();

  await expect(page).toHaveScreenshot('methodology-board-step-1.png');

  await nextButton.click();
  await expect(page).toHaveScreenshot('methodology-board-step-2.png');

  await nextButton.click();
  await expect(page).toHaveScreenshot('methodology-board-step-3.png');
});

test('mobile navbar menu open state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle navigation bar' }).click();
  await expect(page.locator('.navbar-sidebar')).toBeVisible();
  await expect(page).toHaveScreenshot('mobile-nav-open.png');
});
