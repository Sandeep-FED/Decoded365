import { LEVELS, LEVEL_LABELS, type Level } from '@/lib/content/levels';
import { stripMarkdown } from '@/lib/content/summary';
import type { AskEntry } from './retrieval';

export interface ChatMessage {
	role: 'system' | 'user';
	content: string;
}

export const MAX_WORDS = 150;

/** The level's text, or the nearest available level when an entry is partial. */
export function textAtLevel(entry: AskEntry, level: Level): string {
	const order = [level, ...LEVELS.filter((l) => l !== level)];
	const found = order.find((l) => entry.levels[l]?.trim());
	return found ? stripMarkdown(entry.levels[found] ?? '', undefined) : '';
}

/** BRD 8.4 step 3: answer only from the entries, at the visitor's level, short, cited, honest about gaps. */
export function buildMessages(question: string, level: Level, entries: AskEntry[]): ChatMessage[] {
	const block = entries
		.map((e) => `[${e.id}] ${e.term}${e.status === 'ga' ? '' : ` (${e.status})`}\n${textAtLevel(e, level)}`)
		.join('\n\n');

	// Small models follow a concrete example far better than an abstract rule, so show the exact citation format.
	const example = entries[0]?.id ?? 'hub-site';
	const system = [
		'You are the Decoded365 glossary assistant.',
		`Answer only from the entries below, at ${LEVEL_LABELS[level]} depth, in at most ${MAX_WORDS} words.`,
		`Every sentence must end with the id of the entry it came from in square brackets, for example: "That is the short answer [${example}]."`,
		'If the entries do not cover the question, say so plainly and name the closest entries by id in square brackets.',
		'Never use knowledge from outside the entries. Do not write web links.',
		'',
		'Entries:',
		block,
	].join('\n');

	return [
		{ role: 'system', content: system },
		// Repeating the format next to the question helps small models keep to it.
		{ role: 'user', content: `${question}\n\n(Answer from the entries and end each sentence with its entry id in square brackets, like [${example}].)` },
	];
}
