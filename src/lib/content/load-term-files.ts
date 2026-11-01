import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { Term } from '@/schema/term';
import { Source } from '@/schema/source';
import { splitFrontmatter } from './frontmatter';
import type { CorpusEntry, Issue } from './validate';

async function* walk(dir: string): AsyncGenerator<string> {
	for (const dirent of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, dirent.name);
		if (dirent.isDirectory()) yield* walk(path);
		else if (dirent.name.endsWith('.md')) yield path;
	}
}

/** Read and schema-validate every term file (Node only: CI and scripts). */
export async function loadTermFiles(root: string): Promise<{ entries: CorpusEntry[]; issues: Issue[] }> {
	const entries: CorpusEntry[] = [];
	const issues: Issue[] = [];
	for await (const file of walk(join(root, 'content/terms'))) {
		const where = relative(root, file);
		try {
			const { data, body } = splitFrontmatter(await readFile(file, 'utf8'));
			const parsed = Term.safeParse(data);
			if (!parsed.success) {
				for (const issue of parsed.error.issues) {
					issues.push({ where, message: `${issue.path.join('.') || '(root)'}: ${issue.message}` });
				}
				continue;
			}
			entries.push({ data: parsed.data, body, where });
		} catch (error) {
			issues.push({ where, message: error instanceof Error ? error.message : String(error) });
		}
	}
	return { entries, issues };
}

/** Source ids from `content/sources.yml`. */
export async function loadSourceIds(root: string): Promise<Set<string>> {
	const raw = parse(await readFile(join(root, 'content/sources.yml'), 'utf8'));
	return new Set(Source.array().parse(raw).map((s) => s.id));
}
