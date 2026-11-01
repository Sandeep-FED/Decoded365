import { stripMarkdown } from '@/lib/content/summary';
import type { AskEntry } from './retrieval';

const STOP = new Set('that this with from have been were they their there which would could should about into than then them these those your what when where while also only just more most some such very'.split(' '));

const contentWords = (text: string) =>
	new Set(
		text
			.toLowerCase()
			.replace(/[^a-z0-9\s'-]/g, ' ')
			.split(/\s+/)
			.filter((w) => w.length >= 4 && !STOP.has(w)),
	);

const entryText = (entry: AskEntry) => `${entry.term} ${Object.values(entry.levels).map((l) => stripMarkdown(l ?? '')).join(' ')}`;

/**
 * Entries an answer draws on, found by shared wording. Used only when a small on-device model
 * ignores the instruction to cite, so the answer is never shown without its sources.
 */
export function drawsOn(answer: string, entries: AskEntry[], max = 3, minShare = 0.3): string[] {
	const words = contentWords(answer);
	if (words.size === 0) return [];

	return entries
		.map((entry) => {
			const theirs = contentWords(entryText(entry));
			let shared = 0;
			for (const w of words) if (theirs.has(w)) shared++;
			const named = answer.toLowerCase().includes(entry.term.toLowerCase()) ? 0.15 : 0;
			return { id: entry.id, score: shared / words.size + named };
		})
		.filter((e) => e.score >= minShare)
		.sort((a, b) => b.score - a.score)
		.slice(0, max)
		.map((e) => e.id);
}
