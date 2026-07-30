# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

For installation and starting the local dev server, see the [repo root README](../README.md).

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Type checking

```bash
npm run typecheck
```

## Testing

### Visual regression

`tests/visual/` contains [Playwright](https://playwright.dev/) screenshot tests that guard against unintended visual changes across the site's custom components (landing page, methodology board, carousels, code blocks, mobile navigation, etc.). They run against a production build (`docusaurus build` + `docusaurus serve`), not the dev server, so what's tested matches what actually ships.

Run the suite:

```bash
npm run test:visual
```

The first run against a fresh clone generates baseline screenshots automatically; after that, `npm run test:visual` compares new runs against the committed baselines in `tests/visual/*-snapshots/`.

If you make an **intentional** visual change, review the diff Playwright reports, then regenerate the baseline:

```bash
npm run test:visual:update
```

Commit the updated `.png` files alongside your code change so reviewers can see exactly what changed.

A dedicated fixture page, `docs/qa-code-sample.md` (unlisted, not in the sidebar), exists purely so the suite has a page with real Prism code blocks to test against.

CI runs this suite on every pull request via `.github/workflows/visual-tests.yml`.

Currently only a light-mode desktop project (`light-desktop`) is configured in `playwright.config.ts`. Dark-mode and mobile-viewport projects, plus automated accessibility scans (via `@axe-core/playwright`), are planned additions once dark-mode theming is complete. Adding a new project is config-only; specs are written against page paths and components, not against a specific theme, so no test-file changes are needed to extend coverage.

### Adding a new visual spec

1. Add a `test(...)` block to an existing file in `tests/visual/`, or create a new `*.spec.ts` file there.
2. Navigate to the page/state you want to cover and assert something meaningful is visible (e.g. a heading) before snapshotting, so a broken page fails with a clear error instead of a confusing screenshot diff.
3. Call `page.emulateMedia({ reducedMotion: 'reduce' })` in a `test.beforeEach` (see existing specs) if the page has CSS animations, to keep snapshots deterministic.
4. Run `npm run test:visual:update` once to generate the new baseline, review the output image, and commit it.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
