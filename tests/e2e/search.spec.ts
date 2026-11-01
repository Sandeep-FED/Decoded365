import { expect, test } from '@playwright/test';

test.describe('search', () => {
	test('finds a term by an old name instantly', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Search the glossary' }).click();
		await page.getByPlaceholder(/Type a term/).fill('app for SharePoint');
		const hit = page.getByRole('option', { name: /SharePoint Add-in/ });
		await expect(hit).toBeVisible();
		await expect(hit).toContainText('Formerly "app for SharePoint"');
	});

	test('finds a term by meaning, with the model served from our own origin', async ({ page }) => {
		const external: string[] = [];
		page.on('request', (r) => {
			const url = new URL(r.url());
			const isWeb = url.protocol === 'http:' || url.protocol === 'https:'; // blob: and data: stay on this origin
			if (isWeb && url.hostname !== 'localhost' && !url.hostname.includes('fonts.g')) external.push(r.url());
		});

		await page.goto('/');
		await page.getByRole('button', { name: 'Search the glossary' }).click();
		await page.getByPlaceholder(/Type a term/).fill('automatically extract data from invoices');

		// "invoices" appears in no entry, so only the meaning search can find this term.
		await expect(page.getByRole('option', { name: /Document Processing for Microsoft 365/ })).toBeVisible({ timeout: 90_000 });
		await expect(page.getByText('Searching by name and meaning, on your device.')).toBeVisible();
		expect(external).toEqual([]);
	});

	test('lands on the term page when a result is chosen', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('/');
		await page.getByPlaceholder(/Type a term/).fill('recycle');
		await page.getByRole('option', { name: /Recycle Bin/ }).click();
		await expect(page).toHaveURL(/\/terms\/recycle-bin\//);
	});
});
