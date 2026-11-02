import type { ProductName } from '@/schema/term';
import type { GlossaryTerm } from './term-model';

export type ChangeKind = 'renamed' | 'retired';

/** One row of the "Renamed and retired" page. */
export interface ChangeEntry {
	kind: ChangeKind;
	termId: string;
	/** The term's current name. */
	term: string;
	/** What the term is, in plain words (its Beginner summary). */
	summary: string;
	product: ProductName;
	/** `YYYY-MM-DD` for retirements, `YYYY-MM` for renames, null when the source gives no date. */
	date: string | null;
	/** Renames: the old and new name. */
	from?: string;
	to?: string;
	/** Retirements: where the term stopped working, and what replaces it. */
	where?: string;
	replacedById?: string;
	replacedBy?: string;
}

/** Newest first; entries with no date go last, in A–Z order. */
function compare(a: ChangeEntry, b: ChangeEntry): number {
	if (a.date && b.date) return b.date.localeCompare(a.date) || a.term.localeCompare(b.term, 'en');
	if (a.date) return -1;
	if (b.date) return 1;
	return a.term.localeCompare(b.term, 'en');
}

/** Every rename and retirement in the glossary as one timeline (the data is in each term's front matter). */
export function buildChangeLog(terms: GlossaryTerm[]): ChangeEntry[] {
	const names = new Map(terms.map((t) => [t.id, t.term]));
	const entries: ChangeEntry[] = [];

	for (const t of terms) {
		for (const rename of t.renamed) {
			entries.push({ kind: 'renamed', termId: t.id, term: t.term, summary: t.summary, product: t.product, date: rename.date, from: rename.from, to: rename.to });
		}
		if (t.retired) {
			entries.push({
				kind: 'retired',
				termId: t.id,
				term: t.term,
				summary: t.summary,
				product: t.product,
				date: t.retired.date,
				where: t.retired.where,
				replacedById: t.retired.replacedBy,
				replacedBy: t.retired.replacedBy ? names.get(t.retired.replacedBy) : undefined,
			});
		}
	}
	return entries.sort(compare);
}

/** The year a group heading shows, or "Date not stated". */
export const yearOf = (entry: ChangeEntry): string => (entry.date ? entry.date.slice(0, 4) : 'Date not stated');

export interface ChangeFilter {
	query: string;
	product: string;
	kind: 'all' | ChangeKind;
}

/** Narrow the timeline by product, kind and a text search over the old and new names. */
export function filterChanges(entries: ChangeEntry[], { query, product, kind }: ChangeFilter): ChangeEntry[] {
	const q = query.trim().toLowerCase();
	return entries.filter((e) => {
		if (product !== 'all' && e.product !== product) return false;
		if (kind !== 'all' && e.kind !== kind) return false;
		if (!q) return true;
		return [e.term, e.from, e.to, e.where, e.replacedBy].some((text) => text?.toLowerCase().includes(q));
	});
}
