import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('GitHub Pages', () => {
	// Pages runs Jekyll on a branch deploy, and Jekyll drops folders that start with an underscore, such as Astro's
	// `_astro`. The site then loads with no styles or scripts. An empty .nojekyll file at the root switches Jekyll off.
	it('ships a .nojekyll file so the _astro folder is served', () => {
		expect(existsSync(join(process.cwd(), 'public/.nojekyll'))).toBe(true);
	});
});
