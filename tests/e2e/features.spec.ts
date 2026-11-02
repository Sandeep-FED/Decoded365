import { expect, test } from '@playwright/test';

test('hovering a link to another term previews it, and Escape closes the preview', async ({ page }) => {
	await page.goto('/terms/app-catalog/');
	await page.getByRole('radio', { name: 'Maker' }).click();
	await page.locator('.entry-prose a[href*="/terms/"]:visible').first().hover();
	const preview = page.getByRole('tooltip');
	await expect(preview).toBeVisible();
	await expect(preview).toContainText('SharePoint Framework');
	await page.keyboard.press('Escape');
	await expect(preview).toBeHidden();
});

test('compare shows two terms side by side and keeps the choice in the address', async ({ page }) => {
	await page.goto('/compare/?a=dataverse-table&b=sharepoint-list');
	await expect(page.getByRole('link', { name: 'Dataverse table' })).toBeVisible();
	await expect(page.getByRole('rowheader', { name: 'Architect' })).toBeVisible();

	await page.goto('/compare/');
	await page.getByLabel('First term').fill('host web');
	await page.getByRole('button', { name: /Host web/ }).first().click();
	await expect(page).toHaveURL(/a=host-web/);
});

test('the renamed page finds an old name', async ({ page }) => {
	await page.goto('/renamed/');
	await page.getByLabel('Search old and new names').fill('yammer');
	await expect(page.getByRole('link', { name: 'Viva Engage' })).toBeVisible();
	await expect(page.locator('main ol > li')).toHaveCount(1);
});

test('downloads are served', async ({ request }) => {
	const csv = await request.get('/downloads/decoded365.csv');
	expect(csv.ok()).toBe(true);
	expect(await csv.text()).toContain('id,term,aliases');
	const anki = await request.get('/downloads/decoded365-anki.txt');
	expect((await anki.text()).startsWith('#separator:tab')).toBe(true);
	const feed = await request.get('/feed.xml');
	expect(await feed.text()).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
});

test('discovery files and page metadata are in place', async ({ page, request }) => {
	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap).toContain('/terms/host-web/');
	expect(sitemap).not.toContain('/quality/');
	expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:');
	const image = await request.get('/og/host-web.png');
	expect(image.headers()['content-type']).toBe('image/png');

	await page.goto('/terms/host-web/');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/terms\/host-web\/$/);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\/host-web\.png$/);
	const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}');
	expect(data['@type']).toBe('DefinedTerm');
});

test('the quality dashboard filters terms and stays out of search results', async ({ page }) => {
	await page.goto('/quality/');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
	await page.getByRole('radio', { name: 'Not marked' }).click();
	await page.getByRole('radio', { name: 'Power Platform' }).click();
	await expect(page.getByText('26 terms')).toBeVisible();
});
