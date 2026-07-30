import { test, expect } from '@playwright/test';

/**
 * Full-page visual regression baseline. Each spec loads a page that exercises a
 * distinct set of custom components (see docs/qa-code-sample.md for why a dedicated
 * code-block fixture page exists - no such page existed in real content).
 */

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('homepage - landing page, CTA banner, footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});

test('doc page - setup / CopyToDrive button', async ({ page }) => {
  await page.goto('docs/setup/a-setup');
  await expect(page.getByRole('heading', { name: 'Setup' })).toBeVisible();
  await expect(page).toHaveScreenshot('doc-setup.png', { fullPage: true });
});

test('doc page - problem statements overview / BenefitsCarousel + formula', async ({ page }) => {
  await page.goto('docs/define/problem-statements/a-overview');
  await expect(page.getByRole('heading', { name: 'Problem Statements', exact: true })).toBeVisible();
  await expect(page).toHaveScreenshot('doc-problem-statements-overview.png', { fullPage: true });
});

test('doc page - problem statement examples / ProblemStatementCarousel + TaskResources', async ({ page }) => {
  await page.goto('docs/define/problem-statements/b-examples');
  await expect(page.getByRole('heading', { name: /Translate observations/i })).toBeVisible();
  await expect(page).toHaveScreenshot('doc-problem-statement-examples.png', { fullPage: true });
});

test('doc page - QA code sample / Prism code blocks', async ({ page }) => {
  await page.goto('docs/qa-code-sample');
  await expect(page.getByRole('heading', { name: 'QA: Code sample' })).toBeVisible();
  await expect(page).toHaveScreenshot('doc-code-sample.png', { fullPage: true });
});
