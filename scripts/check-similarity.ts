import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { containment } from '../src/lib/content/similarity';
import { loadTermFiles } from '../src/lib/content/load-term-files';
import { extractLevels } from '../src/lib/content/levels';

// Text of sources that must not be copied (not openly licensed) is cached locally by the importer
// and is never committed. Without it there is nothing to compare against.
const DIR = join(process.cwd(), '.cache/restricted-sources');
const THRESHOLD = 0.3;

let files: string[];
try {
	files = (await readdir(DIR)).filter((f) => f.endsWith('.txt'));
} catch {
	files = [];
}
if (files.length === 0) {
	console.log('Similarity check skipped: no cached restricted sources (.cache/restricted-sources/*.txt).');
	process.exit(0);
}

const sources = await Promise.all(files.map(async (f) => ({ name: f, text: await readFile(join(DIR, f), 'utf8') })));
const { entries } = await loadTermFiles(process.cwd());
const flagged: string[] = [];

for (const entry of entries) {
	const levels = extractLevels(entry.body);
	for (const [level, text] of Object.entries(levels)) {
		for (const source of sources) {
			const score = containment(text ?? '', source.text);
			if (score >= THRESHOLD) flagged.push(`${entry.where} (${level}) reuses ${Math.round(score * 100)}% of ${source.name}`);
		}
	}
}

if (flagged.length) {
	console.error('Entries too close to a source that may not be copied:\n');
	for (const line of flagged) console.error(`  ${line}`);
	process.exit(1);
}
console.log(`Similarity check passed against ${sources.length} source(s).`);
