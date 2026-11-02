import { describe, expect, it } from 'vitest';
import { assessTerms, byPriority, countWords, filterRows, summarise } from '@/lib/glossary/quality';
import type { GlossaryTerm } from '@/lib/glossary/term-model';

const long = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ');

const term = (over: Partial<GlossaryTerm> & Pick<GlossaryTerm, 'id' | 'term'>): GlossaryTerm =>
	({
		aliases: [],
		product: 'sharepoint',
		category: 'sites',
		status: 'ga',
		renamed: [],
		related: [],
		lastReviewed: new Date('2026-11-02T00:00:00Z'),
		levelSections: { beginner: long(15), maker: long(25), architect: long(25) },
		...over,
	}) as GlossaryTerm;

const now = new Date('2026-11-10T00:00:00Z');

describe('assessTerms', () => {
	it('counts words after stripping Markdown', () => {
		expect(countWords('Use [[hub-site|a hub]] **now**.')).toBe(4);
		expect(countWords(undefined)).toBe(0);
	});

	it('flags missing levels, thin text, no relations and undated renames', () => {
		const rows = assessTerms(
			[
				term({ id: 'full', term: 'Full', related: [{ id: 'thin', type: 'requires' }] }),
				term({ id: 'thin', term: 'Thin', levelSections: { beginner: 'Short.', maker: long(25), architect: long(25) }, renamed: [{ from: 'Old', to: 'Thin', date: null }] }),
				term({ id: 'part', term: 'Part', levelSections: { beginner: long(15) } }),
			],
			now,
		);
		const by = Object.fromEntries(rows.map((r) => [r.id, r]));
		expect(by.full.issues).toEqual([]);
		expect(by.thin.issues).toEqual(['thin', 'undated-rename']);
		expect(by.part.issues).toEqual(['partial', 'orphan']);
	});

	it('counts a relation from either side, so a term others point to is not an orphan', () => {
		const rows = assessTerms([term({ id: 'a', term: 'A', related: [{ id: 'b', type: 'requires' }] }), term({ id: 'b', term: 'B' })], now);
		expect(rows.map((r) => r.links)).toEqual([1, 1]);
		expect(rows.every((r) => !r.issues.includes('orphan'))).toBe(true);
	});

	it('flags terms not reviewed within a year', () => {
		const rows = assessTerms([term({ id: 'old', term: 'Old', lastReviewed: new Date('2025-01-01T00:00:00Z'), related: [{ id: 'old', type: 'requires' }] })], now);
		expect(rows[0].issues).toContain('stale');
	});

	it('reports a missing review field as unmarked', () => {
		const rows = assessTerms([term({ id: 'a', term: 'A', review: 'drafted' }), term({ id: 'b', term: 'B' }), term({ id: 'c', term: 'C', review: 'reviewed' })], now);
		expect(rows.map((r) => r.review)).toEqual(['drafted', 'unmarked', 'reviewed']);
	});
});

describe('summary, priority and filters', () => {
	const rows = assessTerms(
		[
			term({ id: 'a', term: 'A', review: 'drafted', levelSections: { beginner: 'Short.', maker: 'Short.', architect: 'Short.' } }),
			term({ id: 'b', term: 'B', review: 'reviewed', related: [{ id: 'c', type: 'requires' }] }),
			term({ id: 'c', term: 'C', product: 'copilot' }),
		],
		now,
	);

	it('summarises review state, issues and products', () => {
		const s = summarise(rows);
		expect(s.total).toBe(3);
		expect(s.review).toEqual({ reviewed: 1, drafted: 1, unmarked: 1 });
		expect(s.issues.thin).toBe(1);
		expect(s.clean).toBe(2);
		expect(s.byProduct.map((p) => p.product).sort()).toEqual(['copilot', 'sharepoint']);
	});

	it('puts the term with the most issues first', () => {
		expect(byPriority(rows)[0].id).toBe('a');
	});

	it('filters by text, product, review state and issue', () => {
		const base = { query: '', product: 'all', review: 'all' as const, issue: 'all' as const };
		expect(filterRows(rows, { ...base, product: 'copilot' }).map((r) => r.id)).toEqual(['c']);
		expect(filterRows(rows, { ...base, review: 'drafted' }).map((r) => r.id)).toEqual(['a']);
		expect(filterRows(rows, { ...base, issue: 'thin' }).map((r) => r.id)).toEqual(['a']);
		expect(filterRows(rows, { ...base, query: 'b' }).map((r) => r.id)).toEqual(['b']);
	});
});
