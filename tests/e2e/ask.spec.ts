import { expect, test } from '@playwright/test';

// Headless Chromium has no WebGPU, so these cover refusal, the fallback and navigation.
// The generation path needs a GPU: see ask-generation.spec.ts.
test.describe('ask', () => {
	test.setTimeout(120_000);
	test('says when a product is not covered yet', async ({ page }) => {
		await page.goto('/ask/');
		await page.getByLabel('Your question').fill('What is the difference between a Dataverse table and a SharePoint list?');
		await page.getByRole('button', { name: 'Ask', exact: true }).click();
		await expect(page.getByText('Not covered by the glossary')).toBeVisible();
		await expect(page.getByText(/Power Platform terms are not covered yet/)).toBeVisible();
	});

	test('falls back to the best-matching entries when the device cannot run the model', async ({ page }) => {
		await page.goto('/ask/');
		await page.getByLabel('Your question').fill('Can I still use SharePoint Add-ins in SharePoint Online?');
		await page.getByRole('button', { name: 'Ask', exact: true }).click();

		// Headless Chromium has navigator.gpu but no adapter; other browsers have no WebGPU at all.
		await expect(page.getByText(/does not support WebGPU|No graphics adapter|not have enough memory/)).toBeVisible({ timeout: 60_000 });
		const first = page.getByRole('listitem').filter({ has: page.getByRole('link', { name: 'SharePoint Add-in' }) });
		await expect(first.first()).toBeVisible();
		await expect(page.getByRole('button', { name: 'Ask', exact: true })).toBeEnabled(); // ready for a follow-up question
		await expect(page.getByRole('link', { name: 'SharePoint Add-in', exact: true }).first()).toHaveAttribute('href', /\/terms\/sharepoint-add-in\//);
	});

	test('asks from the search palette and from an example question', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('/');
		await page.getByPlaceholder(/Type a term/).fill('what is a hub site');
		await page.getByRole('option', { name: /Ask:/ }).click();
		await expect(page).toHaveURL(/\/ask\/\?q=what%20is%20a%20hub%20site/);
		await expect(page.getByLabel('Your question')).toHaveValue('what is a hub site');
		await expect(page.getByRole('link', { name: 'Hub site' }).first()).toBeVisible({ timeout: 60_000 });
	});
});
