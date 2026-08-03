---
title: QA - Code Sample
---

import Head from '@docusaurus/Head';

<Head>
  <meta name="robots" content="noindex, nofollow" />
</Head>

# QA: Code sample

This page exists only for automated testing of Prism code blocks (inline code, fenced
code, and line highlighting). It lives in `src/pages/`, not `docs/`, specifically so it
has no association with any docs sidebar and never appears in site navigation or search.

Used by the visual-regression suite (light, dark, and mobile-light projects) and by the
`@axe-core/playwright` accessibility scan in `tests/a11y/`.

Inline code: `const example = true;`

```js
// highlight-next-line
function greet(name) {
  const message = `Hello, ${name}!`;
  return message;
}

greet('Newsroom AI Lab');
```

```bash
npm install
npm run build
```
