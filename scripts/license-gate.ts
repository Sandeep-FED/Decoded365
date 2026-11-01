import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isOsiApproved } from '../src/lib/licensing/spdx';

interface LockPackage {
	name?: string;
	version?: string;
	license?: string | { type: string };
	link?: boolean;
}

const root = process.cwd();
const readJson = async <T>(path: string): Promise<T> => JSON.parse(await readFile(join(root, path), 'utf8'));

const lock = await readJson<{ packages: Record<string, LockPackage> }>('package-lock.json');
const { exceptions } = await readJson<{ exceptions: Record<string, string> }>('config/licence-exceptions.json');
const models = await readJson<{
	embedding: { id: string; licence: string };
	chat: { id: string; licence: string };
	candidates: { id: string; licence: string }[];
}>('config/models.json');

const failures: string[] = [];
let checked = 0;

for (const [path, pkg] of Object.entries(lock.packages)) {
	if (!path.startsWith('node_modules/') || pkg.link) continue;
	const name = pkg.name ?? path.replace(/^.*node_modules\//, '');
	let licence = typeof pkg.license === 'string' ? pkg.license : pkg.license?.type;

	// The lockfile omits the licence for some packages; read it from the installed copy.
	if (!licence) {
		try {
			const installed = await readJson<LockPackage>(join(path, 'package.json'));
			licence = typeof installed.license === 'string' ? installed.license : installed.license?.type;
		} catch {
			/* optional dependency for another platform: not installed, nothing to ship */
			continue;
		}
	}

	checked++;
	if (exceptions[name]) continue;
	if (!licence || !isOsiApproved(licence)) failures.push(`${name}@${pkg.version}: ${licence ?? 'no licence declared'}`);
}

for (const [kind, model] of [
	['embedding model', models.embedding],
	['chat model', models.chat],
	...models.candidates.map((m) => ['candidate model', m] as const),
] as const) {
	checked++;
	if (!isOsiApproved(model.licence)) failures.push(`${kind} ${model.id}: ${model.licence}`);
}

if (failures.length) {
	console.error(`Licence gate failed. ${failures.length} item(s) are not under an OSI-approved licence:\n`);
	for (const failure of failures) console.error(`  ${failure}`);
	console.error('\nReplace the item, or add a justified entry to config/licence-exceptions.json.');
	process.exit(1);
}
console.log(`Licence gate passed: ${checked} packages and models checked.`);
