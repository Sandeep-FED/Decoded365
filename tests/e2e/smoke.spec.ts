import { expect, test } from '@playwright/test';

const PAGES = ['/', '/browse/', '/compare/', '/renamed/', '/new/', '/downloads/', '/terms/recycle-bin/', '/terms/sharepoint-add-in/'];

for (const path of PAGES) {
	test(`${path} loads without console errors`, async ({ page }, info) => {
		const problems: string[] = [];
		page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
		page.on('pageerror', (e) => problems.push(e.message));
		// Fonts come from Google Fonts; offline CI runners can't reach them.
		page.on('requestfailed', (r) => !r.url().includes('fonts.g') && problems.push(`request failed: ${r.url()}`));

		await page.goto(path);
		await page.waitForLoadState('networkidle');
		await page.screenshot({ path: `test-results/shots/${info.project.name}${path.replace(/\//g, '_')}.png`, fullPage: false });

		expect(problems).toEqual([]);
	});
}
