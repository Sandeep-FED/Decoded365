import { test } from '@playwright/test';

// Not assertions: settled screenshots for eyeballing layout (see test-results/shots).
const SHOTS: { name: string; path: string; wait: number; fullPage?: boolean }[] = [
	{ name: 'home', path: '/', wait: 3500, fullPage: true },
	{ name: 'term', path: '/terms/sharepoint-add-in/', wait: 800, fullPage: true },
];

for (const viewport of [
	{ label: 'desktop', width: 1280, height: 800 },
	{ label: 'mobile', width: 390, height: 844 },
]) {
	for (const shot of SHOTS) {
		test(`visual ${shot.name} ${viewport.label}`, async ({ page }) => {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto(shot.path);
			await page.waitForTimeout(shot.wait);
			await page.screenshot({ path: `test-results/shots/v-${shot.name}-${viewport.label}.png`, fullPage: shot.fullPage });
		});
	}
}
