import { appendFile } from 'node:fs/promises';
import { loadSourceIds, loadTermFiles } from '../src/lib/content/load-term-files';
import { freshnessReport, staleTerms } from '../src/lib/content/freshness';

const { entries } = await loadTermFiles(process.cwd());
await loadSourceIds(process.cwd());

const stale = staleTerms(
	entries.map((e) => ({ id: e.data.id, term: e.data.term, product: e.data.product, lastReviewed: e.data.lastReviewed })),
	new Date(),
);
const report = freshnessReport(stale);
console.log(report);

if (process.env.GITHUB_OUTPUT) {
	await appendFile(process.env.GITHUB_OUTPUT, `stale_count=${stale.length}\n`);
}
