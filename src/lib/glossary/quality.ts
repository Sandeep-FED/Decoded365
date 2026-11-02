import { LEVELS, type Level } from '@/lib/content/levels';
import { stripMarkdown } from '@/lib/content/summary';
import { staleTerms } from '@/lib/content/freshness';
import type { ProductName } from '@/schema/term';
import type { GlossaryTerm } from './term-model';

/** Fewest words a level should have before it is flagged as thin. */
export const MIN_WORDS: Record<Level, number> = { beginner: 12, maker: 20, architect: 20 };

export const ISSUES = {
	partial: 'Missing a level',
	thin: 'Thin text',
	orphan: 'No related terms',
	'undated-rename': 'Rename without a date',
	stale: 'Not reviewed in a year',
} as const;
export type IssueKey = keyof typeof ISSUES;

export type ReviewLabel = 'reviewed' | 'drafted' | 'unmarked';

export interface QualityRow {
	id: string;
	term: string;
	product: ProductName;
	category: string;
	review: ReviewLabel;
	words: Record<Level, number>;
	issues: IssueKey[];
	/** Relations this term declares plus those other terms declare to it. */
	links: number;
}

export const countWords = (markdown: string | undefined): number => stripMarkdown(markdown ?? '').split(/\s+/).filter(Boolean).length;

/** How complete and well connected each term is, and where a person has (not) checked it. */
export function assessTerms(terms: GlossaryTerm[], now = new Date()): QualityRow[] {
	const inbound = new Map<string, number>();
	for (const t of terms) for (const r of t.related) inbound.set(r.id, (inbound.get(r.id) ?? 0) + 1);
	const stale = new Set(staleTerms(terms, now).map((t) => t.id));

	return terms.map((t) => {
		const words = Object.fromEntries(LEVELS.map((l) => [l, countWords(t.levelSections[l])])) as Record<Level, number>;
		const links = t.related.length + (inbound.get(t.id) ?? 0);
		const issues: IssueKey[] = [];
		if (LEVELS.some((l) => words[l] === 0)) issues.push('partial');
		if (LEVELS.some((l) => words[l] > 0 && words[l] < MIN_WORDS[l])) issues.push('thin');
		if (links === 0) issues.push('orphan');
		if (t.renamed.some((r) => r.date === null)) issues.push('undated-rename');
		if (stale.has(t.id)) issues.push('stale');
		return { id: t.id, term: t.term, product: t.product, category: t.category, review: t.review ?? 'unmarked', words, issues, links };
	});
}

export interface QualitySummary {
	total: number;
	review: Record<ReviewLabel, number>;
	issues: Record<IssueKey, number>;
	/** Terms with no flagged issue. */
	clean: number;
	byProduct: { product: ProductName; total: number; review: Record<ReviewLabel, number> }[];
}

const emptyReview = (): Record<ReviewLabel, number> => ({ reviewed: 0, drafted: 0, unmarked: 0 });

export function summarise(rows: QualityRow[]): QualitySummary {
	const issues = Object.fromEntries(Object.keys(ISSUES).map((k) => [k, 0])) as Record<IssueKey, number>;
	const review = emptyReview();
	const products = new Map<ProductName, { product: ProductName; total: number; review: Record<ReviewLabel, number> }>();

	for (const row of rows) {
		review[row.review]++;
		for (const issue of row.issues) issues[issue]++;
		const entry = products.get(row.product) ?? { product: row.product, total: 0, review: emptyReview() };
		entry.total++;
		entry.review[row.review]++;
		products.set(row.product, entry);
	}
	return { total: rows.length, review, issues, clean: rows.filter((r) => r.issues.length === 0).length, byProduct: [...products.values()] };
}

const REVIEW_ORDER: Record<ReviewLabel, number> = { drafted: 0, unmarked: 1, reviewed: 2 };

/** Terms that most need work first: most flagged issues, then drafted before unmarked before reviewed, then fewest words. */
export function byPriority(rows: QualityRow[]): QualityRow[] {
	const total = (r: QualityRow) => r.words.beginner + r.words.maker + r.words.architect;
	return [...rows].sort(
		(a, b) => b.issues.length - a.issues.length || REVIEW_ORDER[a.review] - REVIEW_ORDER[b.review] || total(a) - total(b) || a.term.localeCompare(b.term, 'en'),
	);
}

export interface QualityFilter {
	query: string;
	product: string;
	review: 'all' | ReviewLabel;
	issue: 'all' | IssueKey;
}

export function filterRows(rows: QualityRow[], { query, product, review, issue }: QualityFilter): QualityRow[] {
	const q = query.trim().toLowerCase();
	return rows.filter(
		(r) =>
			(product === 'all' || r.product === product) &&
			(review === 'all' || r.review === review) &&
			(issue === 'all' || r.issues.includes(issue)) &&
			(!q || r.term.toLowerCase().includes(q) || r.id.includes(q)),
	);
}
