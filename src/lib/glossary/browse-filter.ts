import type { BrowseTerm } from './browse-term';

export interface BrowseFilter {
	query: string;
	/** A product id, or "all". */
	product: string;
	showLegacy: boolean;
}

/**
 * Apply the A–Z filters. Every word typed must appear in a term's name, aliases,
 * old names, category or summary. Legacy terms stay hidden unless the switch is on,
 * except while searching: typing an old or legacy name should still find it.
 */
export function filterTerms(terms: BrowseTerm[], { query, product, showLegacy }: BrowseFilter): BrowseTerm[] {
	const words = query.toLowerCase().split(/\s+/).filter(Boolean);
	const searching = words.length > 0;

	return terms.filter((t) => {
		if (product !== 'all' && t.product !== product) return false;
		if (searching) return words.every((w) => t.search.includes(w));
		return showLegacy || !t.legacy;
	});
}
