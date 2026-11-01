import { describe, expect, it } from 'vitest';
import { filterTerms } from '@/lib/glossary/browse-filter';
import type { BrowseTerm } from '@/lib/glossary/browse-term';
import { groupByLetter, letterFor } from '@/lib/glossary/group-by-letter';

const term = (over: Partial<BrowseTerm> & Pick<BrowseTerm, 'id' | 'term'>): BrowseTerm => ({
	href: `/terms/${over.id}/`,
	summary: '',
	product: 'sharepoint',
	status: 'ga',
	category: 'sites',
	legacy: false,
	formerly: [],
	search: over.term.toLowerCase(),
	...over,
});

const terms = [
	term({ id: 'hub', term: 'Hub site' }),
	term({ id: 'add-in', term: 'SharePoint Add-in', status: 'retired', legacy: true, search: 'sharepoint add-in app for sharepoint' }),
	term({ id: 'flow', term: 'Power Automate', product: 'power-platform', search: 'power automate microsoft flow' }),
];
const base = { query: '', product: 'all', showLegacy: false };

describe('filterTerms', () => {
	it('hides legacy terms by default and shows them with the switch', () => {
		expect(filterTerms(terms, base).map((t) => t.id)).toEqual(['hub', 'flow']);
		expect(filterTerms(terms, { ...base, showLegacy: true }).map((t) => t.id)).toEqual(['hub', 'add-in', 'flow']);
	});

	it('filters by product', () => {
		expect(filterTerms(terms, { ...base, product: 'power-platform' }).map((t) => t.id)).toEqual(['flow']);
	});

	it('requires every typed word and matches old names', () => {
		expect(filterTerms(terms, { ...base, query: 'microsoft flow' }).map((t) => t.id)).toEqual(['flow']);
		expect(filterTerms(terms, { ...base, query: 'hub nothing' })).toEqual([]);
	});

	it('still finds legacy terms while searching', () => {
		expect(filterTerms(terms, { ...base, query: 'app for sharepoint' }).map((t) => t.id)).toEqual(['add-in']);
	});
});

describe('letters', () => {
	it('buckets non-letters under #', () => {
		expect(letterFor('365 thing')).toBe('#');
		expect(letterFor('  hub')).toBe('H');
		expect(groupByLetter(terms, (t) => t.term).map((g) => g.letter)).toEqual(['H', 'P', 'S']);
	});
});
