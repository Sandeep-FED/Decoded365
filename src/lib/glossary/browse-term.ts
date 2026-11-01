import type { ProductName, StatusName } from '@/schema/term';
import type { GlossaryTerm } from './term-model';

/** The serialisable slice of a term that the A–Z list needs. */
export interface BrowseTerm {
	id: string;
	term: string;
	href: string;
	summary: string;
	product: ProductName;
	status: StatusName;
	category: string;
	legacy: boolean;
	/** Names the term used to have (shown as "Formerly"). */
	formerly: string[];
	/** Lower-cased text the live filter matches against. */
	search: string;
}

export function toBrowseTerm(term: GlossaryTerm, href: string): BrowseTerm {
	const formerly = term.renamed.map((r) => r.from);
	return {
		id: term.id,
		term: term.term,
		href,
		summary: term.summary,
		product: term.product,
		status: term.status,
		category: term.category,
		legacy: term.legacy,
		formerly,
		search: [term.term, ...term.aliases, ...formerly, term.category, term.summary].join(' ').toLowerCase(),
	};
}
