---
title: QA - Code Sample
unlisted: true
pagination_prev: null
pagination_next: null
---

# QA: Code sample

This page exists only for automated testing of Prism code blocks (inline code, fenced
code, and line highlighting). It is not linked from the sidebar or search.

Currently used by the light-mode visual-regression suite. Dark-theme and accessibility
(`@axe-core/playwright`) coverage of this page are planned once dark-mode theming
lands - see the project's dark-mode tracking plan.

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
