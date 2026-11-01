import type { Level } from '@/lib/content/levels';

/** A glossary entry as Ask needs it (from `glossary.json`). */
export interface AskEntry {
	id: string;
	term: string;
	aliases: string[];
	status: string;
	levels: Partial<Record<Level, string>>;
}

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Entries whose name or alias appears in the question (singular or plural), longest names first. */
export function namedEntries(question: string, entries: AskEntry[]): AskEntry[] {
	const found: { entry: AskEntry; length: number }[] = [];
	for (const entry of entries) {
		const names = [entry.term, ...entry.aliases].filter((n) => n.trim().length >= 3);
		const longest = names
			.filter((name) => new RegExp(`(?<![A-Za-z0-9])${escape(name)}(?:e?s)?(?![A-Za-z0-9])`, 'i').test(question))
			.sort((a, b) => b.length - a.length)[0];
		if (longest) found.push({ entry, length: longest.length });
	}
	return found.sort((a, b) => b.length - a.length).map((f) => f.entry);
}

/**
 * Entries to ground an answer: every term named in the question first, then the best search hits,
 * up to `max` (BRD 8.4 step 2: top 6–8, always including terms named in the question).
 */
export async function retrieveEntries(
	question: string,
	entries: AskEntry[],
	search: (query: string, limit: number) => Promise<string[]>,
	max = 6,
): Promise<AskEntry[]> {
	const byId = new Map(entries.map((e) => [e.id, e]));
	const chosen = new Map<string, AskEntry>();

	for (const entry of namedEntries(question, entries)) {
		if (chosen.size < max) chosen.set(entry.id, entry);
	}
	for (const id of await search(question, max)) {
		const entry = byId.get(id);
		if (entry && chosen.size < max) chosen.set(id, entry);
	}
	return [...chosen.values()];
}
