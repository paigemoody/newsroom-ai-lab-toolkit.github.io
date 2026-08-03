import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated accessibility scan of the same page set tests/visual covers, run across
 * every project (light-desktop, dark-desktop, mobile-light) so each theme/viewport
 * combination gets checked, not just one. Filtered to serious/critical impact only -
 * axe's moderate/minor findings include a lot of judgment calls (redundant alt text,
 * region landmarks, etc.) that would make this a noisy gate rather than a meaningful
 * one; serious/critical are the categories that reliably mean "a real user is blocked."
 */

const PAGES: Array<[string, string]> = [
  ['homepage', './'],
  ['doc page - setup', 'docs/setup/a-setup'],
  ['doc page - problem statements overview', 'docs/define/problem-statements/a-overview'],
  ['doc page - problem statement examples', 'docs/define/problem-statements/b-examples'],
  ['page - QA code sample', 'qa-code-sample'],
  ['doc page - how-this-works (MethodologyBoard)', 'docs/how-this-works'],
];

for (const [label, path] of PAGES) {
  test(`a11y - ${label}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter(
      v => v.impact === 'serious' || v.impact === 'critical'
    );
    const summary = seriousOrCritical
      .map(v => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`)
      .join('\n');
    expect(seriousOrCritical, summary).toEqual([]);
  });
}
