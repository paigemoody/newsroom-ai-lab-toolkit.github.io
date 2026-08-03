import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const BASE_PATH = '/newsroom-ai-lab-toolkit.github.io/';
const BASE_URL = `http://localhost:${PORT}${BASE_PATH}`;

/**
 * Visual-regression + accessibility harness for the Playbook site.
 *
 * Runs against a production build (`docusaurus build` + `docusaurus serve`), per the
 * ticket's requirement to test the real production output rather than the dev server.
 *
 * dark-desktop relies on Docusaurus's `respectPrefersColorScheme` reading the
 * OS-level `prefers-color-scheme` on a *fresh* context (no stored theme choice) -
 * verified empirically that `colorScheme: 'dark'` alone is sufficient to flip
 * `data-theme` to `dark` on first load, no `localStorage` seeding required.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  expect: {
    toHaveScreenshot: {
      // Freezes CSS animations/transitions to a completed state and hides carets so
      // MethodologyBoard's arc-travel keyframe and carousel transitions don't flake.
      // No aggregate diff tolerance (maxDiffPixelRatio/maxDiffPixels) - pages are fully
      // static and deterministic, so any real content/style change should be reviewed
      // rather than silently tolerated. Playwright's default per-pixel perceptual
      // threshold (0.2) already absorbs anti-aliasing/font-hinting jitter.
      animations: 'disabled',
    },
  },

  projects: [
    {
      name: 'light-desktop',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
      },
    },
    {
      name: 'dark-desktop',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
      },
    },
    {
      name: 'mobile-light',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'light',
      },
    },
  ],

  webServer: {
    command: 'npm run build && npm run serve -- --no-open',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
