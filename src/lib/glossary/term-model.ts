import type { TermData } from '@/schema/term';
import { extractLevels, type LevelSections } from '@/lib/content/levels';
import { isLegacy } from './legacy';

/** A term as the site uses it: validated front matter, level sections and derived flags. */
export interface GlossaryTerm extends TermData {
	levelSections: LevelSections;
	legacy: boolean;
}

export function toGlossaryTerm(data: TermData, body: string): GlossaryTerm {
	return { ...data, levelSections: extractLevels(body), legacy: isLegacy(data) };
}
