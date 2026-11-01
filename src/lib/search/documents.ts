import type { GlossaryTerm } from '@/lib/glossary/term-model';
import { firstParagraph, stripMarkdown } from '@/lib/content/summary';
import { LEVELS } from '@/lib/content/levels';
import type { ProductName, StatusName } from '@/schema/term';

/** The record shipped to the browser in `search-index.json` (one per term). */
export interface SearchDocument {
	id: string;
	term: string;
	aliases: string[];
	/** Names the term used to have, with when they changed. */
	renames: { from: string; to: string; date: string | null }[];
	summary: string;
	text: string;
	product: ProductName;
	status: StatusName;
	legacy: boolean;
}

export function toSearchDocument(term: GlossaryTerm): SearchDocument {
	return {
		id: term.id,
		term: term.term,
		aliases: term.aliases,
		renames: term.renamed,
		summary: firstParagraph(term.levelSections.beginner),
		text: LEVELS.map((level) => stripMarkdown(term.levelSections[level] ?? '')).join(' '),
		product: term.product,
		status: term.status,
		legacy: term.legacy,
	};
}
