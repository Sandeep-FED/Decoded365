import type { TermData } from '@/schema/term';
import { extractLevels, type LevelSections } from '@/lib/content/levels';
import { firstParagraph, type LabelOf } from '@/lib/content/summary';
import { isLegacy } from './legacy';

/** A term as the site uses it: validated front matter, level sections and derived fields. */
export interface GlossaryTerm extends TermData {
	levelSections: LevelSections;
	/** Plain-text first paragraph of the Beginner level, for lists, previews and search. */
	summary: string;
	legacy: boolean;
}

export function toGlossaryTerm(data: TermData, body: string, labelOf?: LabelOf): GlossaryTerm {
	const levelSections = extractLevels(body);
	return {
		...data,
		levelSections,
		summary: firstParagraph(levelSections.beginner, labelOf),
		legacy: isLegacy(data),
	};
}
