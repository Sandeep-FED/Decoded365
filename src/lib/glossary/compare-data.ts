import { LEVELS, LEVEL_LABELS } from '@/lib/content/levels';
import { stripMarkdown } from '@/lib/content/summary';

/** The slice of `glossary.json` that the compare page reads. */
export interface CompareTerm {
	id: string;
	term: string;
	aliases: string[];
	product: string;
	status: string;
	appliesTo?: string[];
	renamed: { from: string }[];
	related: { id: string }[];
	levels: Partial<Record<'beginner' | 'maker' | 'architect', string>>;
}

export interface CompareRow {
	label: string;
	left: string;
	right: string;
}

/** Terms whose name, alias or old name contains the query, best (name starts with it) first. */
export function findTerms(terms: CompareTerm[], query: string, limit = 8): CompareTerm[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const scored: { term: CompareTerm; score: number }[] = [];
	for (const term of terms) {
		const names = [term.term, ...term.aliases, ...term.renamed.map((r) => r.from)].map((n) => n.toLowerCase());
		if (names[0].startsWith(q)) scored.push({ term, score: 0 });
		else if (names.some((n) => n.startsWith(q))) scored.push({ term, score: 1 });
		else if (names.some((n) => n.includes(q))) scored.push({ term, score: 2 });
	}
	return scored.sort((a, b) => a.score - b.score || a.term.term.localeCompare(b.term.term, 'en')).slice(0, limit).map((s) => s.term);
}

const SERVER_LABELS: Record<string, string> = { 'sharepoint-online': 'SharePoint Online', 'sharepoint-server': 'SharePoint Server' };

/** Every level of both terms side by side, plus names and relations. Rows with nothing for either side are left out. */
export function compareRows(a: CompareTerm, b: CompareTerm, labelOf: (id: string) => string | undefined): CompareRow[] {
	const text = (t: CompareTerm, level: (typeof LEVELS)[number]) => stripMarkdown(t.levels[level] ?? '', labelOf);
	const rows: CompareRow[] = [
		...LEVELS.map((level) => ({ label: LEVEL_LABELS[level], left: text(a, level), right: text(b, level) })),
		{ label: 'Also known as', left: a.aliases.join(', '), right: b.aliases.join(', ') },
		{ label: 'Formerly', left: a.renamed.map((r) => r.from).join(', '), right: b.renamed.map((r) => r.from).join(', ') },
		{
			label: 'Applies to',
			left: (a.appliesTo ?? []).map((x) => SERVER_LABELS[x] ?? x).join(', '),
			right: (b.appliesTo ?? []).map((x) => SERVER_LABELS[x] ?? x).join(', '),
		},
		{ label: 'Related terms', left: a.related.map((r) => labelOf(r.id) ?? r.id).join(', '), right: b.related.map((r) => labelOf(r.id) ?? r.id).join(', ') },
	];
	return rows.filter((row) => row.left || row.right);
}
