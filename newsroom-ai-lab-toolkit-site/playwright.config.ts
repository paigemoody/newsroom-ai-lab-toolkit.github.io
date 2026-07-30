import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const BASE_PATH = '/newsroom-ai-lab-toolkit.github.io/';
const BASE_URL = `http://localhost:${PORT}${BASE_PATH}`;

/**
 * Visual-regression harness for the Playbook site.
 *
 * Runs against a production build (`docusaurus build` + `docusaurus serve`), per the
 * ticket's requirement to test the real production output rather than the dev server.
 *
 * Only a light-mode desktop project exists today (Phase 0 of the dark-mode rollout).
 * Dark-mode and mobile-viewport projects, plus `@axe-core/playwright` accessibility
 * specs, are added in Phase 9 once dark theming actually exists end-to-end - adding
 * the projects is a config-only change, since specs are written against page
 * paths/components, not against a specific theme.
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
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
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
  ],

  webServer: {
    command: 'npm run build && npm run serve -- --no-open',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
