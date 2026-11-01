import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import nspell from 'nspell';
import british from 'dictionary-en-gb';
import american from 'dictionary-en';
import { findMisspellings } from '../src/lib/content/spelling';

const root = process.cwd();
// Accept British or American spelling; entries only need to be consistent within themselves.
const gb = nspell(Buffer.from(british.aff), Buffer.from(british.dic));
const us = nspell(Buffer.from(american.aff), Buffer.from(american.dic));
const isCorrect = (word: string) => gb.correct(word) || us.correct(word);

const ignore = new Set(
	(await readFile(join(root, 'config/spelling-words.txt'), 'utf8')).split('\n').map((l) => l.trim().toLowerCase()).filter((l) => l && !l.startsWith('#')),
);

async function* markdownFiles(dir: string): AsyncGenerator<string> {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* markdownFiles(path);
		else if (entry.name.endsWith('.md')) yield path;
	}
}

const files = [join(root, 'README.md'), join(root, 'CONTRIBUTING.md')];
for (const dir of ['content/terms', 'docs']) for await (const f of markdownFiles(join(root, dir))) files.push(f);

let problems = 0;
for (const file of files) {
	for (const { word, line } of findMisspellings(await readFile(file, 'utf8'), isCorrect, ignore)) {
		console.error(`${file.replace(`${root}/`, '')}:${line}  unknown word "${word}"`);
		problems++;
	}
}

if (problems) {
	console.error(`\n${problems} possible misspelling(s). Fix them, or add real jargon to config/spelling-words.txt.`);
	process.exit(1);
}
console.log(`Spelling OK: ${files.length} files checked.`);
