import { expect, test } from '@playwright/test';

const PAGES = ['/', '/browse/', '/terms/recycle-bin/'];

for (const path of PAGES) {
	test(`${path} has no horizontal overflow on a phone`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(path);
		await page.waitForTimeout(1500);

		const { scrollWidth, innerWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			innerWidth: window.innerWidth,
		}));
		// Name the widest offenders so a failure is easy to act on.
		const offenders = await page.evaluate(() =>
			[...document.querySelectorAll('body *')]
				.map((el) => ({ el, right: el.getBoundingClientRect().right }))
				.filter((o) => o.right > window.innerWidth + 1)
				.slice(0, 5)
				.map((o) => `${o.el.tagName.toLowerCase()}.${String(o.el.getAttribute('class')).slice(0, 60)} → ${Math.round(o.right)}px`),
		);
		expect(scrollWidth, offenders.join('\n')).toBeLessThanOrEqual(innerWidth);
	});
}
