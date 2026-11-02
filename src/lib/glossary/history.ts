import { execFileSync } from 'node:child_process';
import type { GlossaryTerm } from './term-model';

/** When a term file was first committed and last changed, as `YYYY-MM-DD`. */
export interface FileHistory {
	added: string;
	updated: string;
}

/**
 * Read `git log --name-status --format=@<date>` output (newest commit first) into per-file dates.
 * A file's `updated` is the newest commit that touched it; `added` is the oldest that added it.
 */
export function parseGitHistory(output: string): Map<string, FileHistory> {
	const history = new Map<string, FileHistory>();
	let day = '';

	for (const line of output.split('\n')) {
		if (line.startsWith('@')) {
			day = line.slice(1, 11);
			continue;
		}
		const [status, path] = line.split('\t');
		if (!day || !path || (status !== 'A' && status !== 'M')) continue;

		const known = history.get(path);
		if (!known) history.set(path, { added: day, updated: day });
		else if (status === 'A') known.added = day;
	}
	return history;
}

/** Git history of the term files, or null when git or the history is not available (a shallow clone has little). */
export function readGitHistory(cwd = process.cwd()): Map<string, FileHistory> | null {
	try {
		const output = execFileSync('git', ['log', '--name-status', '--diff-filter=AM', '--format=@%aI', '--', 'content/terms'], {
			cwd,
			encoding: 'utf8',
			maxBuffer: 64 * 1024 * 1024,
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		const history = parseGitHistory(output);
		return history.size > 0 ? history : null;
	} catch {
		return null;
	}
}

export interface TermChange {
	term: GlossaryTerm;
	added: string;
	updated: string;
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

/** Each term with its dates; terms git does not know fall back to the day they were last reviewed. */
export function termChanges(terms: GlossaryTerm[], history: Map<string, FileHistory> | null): TermChange[] {
	return terms.map((term) => {
		const known = history?.get(`content/terms/${term.product}/${term.id}.md`);
		const reviewed = isoDay(term.lastReviewed);
		return { term, added: known?.added ?? reviewed, updated: known?.updated ?? reviewed };
	});
}
