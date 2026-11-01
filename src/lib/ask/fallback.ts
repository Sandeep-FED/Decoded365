import type { Level } from '@/lib/content/levels';
import { firstParagraph } from '@/lib/content/summary';
import { textAtLevel } from './prompt';
import type { AskEntry } from './retrieval';

export interface FallbackItem {
	id: string;
	term: string;
	text: string;
}

/** No generated text: the best-matching entries at the visitor's level (BRD 8.4 step 5). */
export function fallbackAnswer(entries: AskEntry[], level: Level, count = 3): FallbackItem[] {
	return entries.slice(0, count).map((e) => ({ id: e.id, term: e.term, text: firstParagraph(textAtLevel(e, level)) || textAtLevel(e, level) }));
}
