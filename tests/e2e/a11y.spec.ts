import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// WCAG 2.2 AA (BRD non-functional requirements).
const PAGES = ['/', '/browse/', '/terms/recycle-bin/', '/terms/sharepoint-add-in/', '/terms/hub-site/'];

for (const path of PAGES) {
	test(`${path} has no axe violations`, async ({ page }) => {
		await page.goto(path);
		await page.waitForTimeout(3500); // let entrance animations settle so contrast is measured on final colours
		const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
		const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
		expect(summary).toEqual([]);
	});
}
