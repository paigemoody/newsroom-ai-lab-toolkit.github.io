# newsroom-ai-lab-toolkit

WIP toolkit based on the Hacks/Hackers Newsroom AI Lab handbook. The site (`newsroom-ai-lab-toolkit-site/`) is built with [Docusaurus](https://docusaurus.io/).

## Setup

### 1. Open in dev container

**Local:** Clone the repo, open in VS Code, and accept the prompt to **Reopen in Container** (or run `Dev Containers: Reopen in Container` from the command palette). Dependencies install automatically on first build.

### 2. [optional] Authenticate Claude Code

1. Open the Claude panel in VS Code (or run `claude` in the terminal).
2. Follow the browser prompt to sign in at claude.ai.
3. Persist credentials across rebuilds (only needed once):

```bash
cp -r ~/.claude /workspaces/newsroom-ai-lab-toolkit/.claude-credentials
```

### 3. Run the site

All commands run from `newsroom-ai-lab-toolkit-site/`:

```bash
cd newsroom-ai-lab-toolkit-site
npm run start       # dev server at localhost:3000
npm run build       # static build to build/
npm run typecheck   # tsc
```

> **Dev container users:** use `npm run start -- --host 0.0.0.0` so the server is reachable via port forwarding. In Codespaces, use the forwarded port URL from the **Ports** tab in VS Code.

Deployment to GitHub Pages is automatic on push to `main` via `.github/workflows/static.yml` — no manual deploy step.

## Testing

### Visual regression

`newsroom-ai-lab-toolkit-site/tests/visual/` contains [Playwright](https://playwright.dev/) screenshot tests covering the site's custom components (landing page, methodology board, carousels, code blocks, mobile navigation). Tests run against a production build (`docusaurus build` + `docusaurus serve`), not the dev server, so what's tested matches what actually ships.

```bash
cd newsroom-ai-lab-toolkit-site
npm run test:visual
```

New clone or new spec: this generates baseline screenshots on first run. After that, it compares against the committed baselines in `tests/visual/*-snapshots/`.

Intentional visual change: review the reported diff, then regenerate and commit the baseline:

```bash
npm run test:visual:update
```

`src/pages/qa-code-sample.md` is a fixture page (lives outside `docs/`, so it has no sidebar association and never appears in navigation or search) that exists solely so the suite has real Prism code blocks to test against.

CI runs this suite on pull requests that change files under `newsroom-ai-lab-toolkit-site/` via `.github/workflows/visual-tests.yml`.

Three projects are configured in `playwright.config.ts`: `light-desktop`, `dark-desktop` (forces `prefers-color-scheme: dark`, which Docusaurus's color-mode provider follows on a fresh page load), and `mobile-light` (Pixel 5 viewport). Every spec in `tests/visual/` runs under all three automatically — no per-spec setup needed.

### Accessibility (axe)

`newsroom-ai-lab-toolkit-site/tests/a11y/` runs [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) against the same page set as `tests/visual/`, across all three projects above. Only **serious/critical** impact violations fail the test — axe's moderate/minor findings involve enough judgment calls (redundant alt text, landmark regions, etc.) that gating on them would make this a noisy check rather than a meaningful one.

```bash
npm run test:a11y
```

A failure prints a summary of each serious/critical violation (impact, rule id, description, and node count) — there's no baseline image to regenerate here, just a real issue to fix.

### Adding a visual spec

A "spec" is just a test file: a small script that opens a page in a real (headless) browser, checks it loaded correctly, then takes a screenshot and compares it pixel-by-pixel against a saved "baseline" image. If a change accidentally moves something or breaks a color, the screenshot won't match and the test fails — that's the whole mechanism.

The easiest way to add one is to copy an existing test and adapt it. Minimal example, based on `tests/visual/pages.spec.ts`:

```ts
test('doc page - my new page', async ({ page }) => {
  await page.goto('docs/my-new-page');
  await expect(page.getByRole('heading', { name: 'My New Page' })).toBeVisible();
  await expect(page).toHaveScreenshot('my-new-page.png', { fullPage: true });
});
```

Step by step:

1. **Add the test.** Put a `test(...)` block like the one above into an existing file in `tests/visual/`, or create a new file there ending in `.spec.ts` — Playwright picks those up automatically.
2. **Navigate and assert.** `page.goto(...)` opens the page (paths are relative to the site — no need to write out `http://localhost:3000/...`). The `expect(...).toBeVisible()` line isn't strictly required, but it's good practice: it fails with a clear "heading not found" error if the page is broken, instead of only showing a confusing screenshot diff that's harder to debug.
3. **Handle animations, if the page has any.** If something moves/fades/transitions on its own (e.g. MethodologyBoard's arc animation), add `await page.emulateMedia({ reducedMotion: 'reduce' })` inside a `test.beforeEach` at the top of the file (see the existing specs for an example). Without this, the screenshot might get taken mid-animation and come out slightly different every run — a "flaky" test that fails randomly for no real reason.
4. **Generate the baseline image.** Run:
   ```bash
   npm run test:visual:update
   ```
   This is the only way to create the first screenshot for a brand-new test — there's nothing to compare against yet, so Playwright just saves whatever it sees as the new baseline.
5. **Review and commit.** Open the generated `.png` in `tests/visual/*-snapshots/` and actually look at it — a test can "pass" while showing a broken page, if that broken page is what got saved as the baseline. Commit the image alongside your code change; it's what future test runs will compare against.
