import { expect, test } from '@playwright/test';

test.describe('all three products', () => {
	test('the A–Z list can be opened already filtered by product', async ({ page }) => {
		await page.goto('/browse/?product=copilot');
		await expect(page.getByRole('link', { name: 'Copilot Studio', exact: true })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Dataverse', exact: true })).toHaveCount(0);
		await expect(page.getByRole('link', { name: 'Hub site', exact: true })).toHaveCount(0);

		await page.goto('/browse/?product=power-platform');
		await expect(page.getByRole('link', { name: 'Dataverse', exact: true })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Copilot Studio', exact: true })).toHaveCount(0);
	});

	test('an old name opens the current term with its rename timeline', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Search the glossary' }).click();
		await page.getByPlaceholder(/Type a term/).fill('Power Virtual Agents');
		const hit = page.getByRole('option').first();
		await expect(hit).toContainText('Copilot Studio');
		await hit.click();
		await expect(page).toHaveURL(/\/terms\/copilot-studio\//);
		await expect(page.getByText('Name history')).toBeVisible();
		const timeline = page.locator('ol li').filter({ hasText: '→' });
		await expect(timeline.filter({ hasText: 'Power Virtual Agents for Teams' })).toContainText('November 2023');
	});

	test('a renamed-then-reverted name shows every step in order', async ({ page }) => {
		await page.goto('/terms/agent-builder/');
		const items = page.locator('ol li').filter({ hasText: '→' });
		await expect(items).toHaveCount(2);
		await expect(items.nth(0)).toContainText(/Agent Builder.*Copilot Studio Lite/s);
		await expect(items.nth(1)).toContainText(/Copilot Studio Lite.*Agent Builder/s);
		await expect(items.nth(0)).toContainText('September 2025');
		await expect(items.nth(1)).toContainText('November 2025');
	});

	test('comparison table appears for terms people mix up', async ({ page }) => {
		await page.goto('/terms/dataverse-table/');
		await expect(page.getByRole('heading', { name: 'Often confused with' })).toBeVisible();
		await expect(page.getByRole('columnheader', { name: 'SharePoint list' })).toBeVisible();
	});
});
