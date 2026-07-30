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

`docs/qa-code-sample.md` is an unlisted fixture page (not in the sidebar) that exists solely so the suite has real Prism code blocks to test against.

CI runs this suite on every pull request via `.github/workflows/visual-tests.yml`.

Only a light-mode desktop project (`light-desktop`) is configured in `playwright.config.ts` today. Dark-mode and mobile-viewport projects, plus `@axe-core/playwright` accessibility scans, are planned once dark-mode theming is complete — adding those is config-only, since specs target page paths/components rather than a specific theme.

### Adding a visual spec

1. Add a `test(...)` to an existing file in `tests/visual/`, or create a new `*.spec.ts` there.
2. Navigate to the page/state, and assert something meaningful is visible (e.g. a heading) before snapshotting.
3. If the page has CSS animations, call `page.emulateMedia({ reducedMotion: 'reduce' })` in `test.beforeEach` to keep snapshots deterministic.
4. Run `npm run test:visual:update`, review the generated image, commit it.
