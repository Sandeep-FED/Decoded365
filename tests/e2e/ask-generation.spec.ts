import { expect, test } from '@playwright/test';

// Runs the real on-device model. Needs WebGPU and an ~880 MB download, so it is opt-in:
//   ASK_GPU=1 npx playwright test --project=gpu
test('answers from glossary entries with the on-device model and cites them', async ({ page }) => {
	test.setTimeout(15 * 60_000);
	const pageErrors: string[] = [];
	page.on('pageerror', (e) => pageErrors.push(e.message));

	await page.goto('/ask/');
	await page.getByLabel('Your question').fill('Can I still use SharePoint Add-ins in SharePoint Online?');
	await page.getByRole('button', { name: 'Ask', exact: true }).click();

	// First use: explicit consent before anything is downloaded.
	await expect(page.getByText('One-time download')).toBeVisible({ timeout: 60_000 });
	await page.getByRole('button', { name: 'Download and ask' }).click();

	// The answer streams in, then the entries it used are listed.
	await expect(page.getByText('Entries used')).toBeVisible({ timeout: 14 * 60_000 });
	const answer = page.locator('p[aria-busy="false"]').first();
	await expect(answer).not.toBeEmpty();
	console.log('ANSWER:', (await answer.innerText()).replace(/\s+/g, ' '));

	// The answer is never shown without sources: the model cites them, or we show the entries it draws on.
	const cited = await answer.locator('a[data-term-id]').count();
	const inferred = await page.getByTestId('draws-on').count();
	console.log('CITATIONS:', cited, '| inferred sources:', inferred);
	expect(cited + inferred).toBeGreaterThan(0);
	await expect(page.getByText('This answer cites no glossary entry')).toHaveCount(0);
	expect(pageErrors).toEqual([]);
	await page.screenshot({ path: 'test-results/shots/ask-answer.png', fullPage: true });
});
