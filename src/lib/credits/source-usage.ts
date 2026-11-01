import type { TermData } from '@/schema/term';

/** How many terms cite each source in their provenance. */
export function countSourceUsage(terms: Pick<TermData, 'origins'>[]): Map<string, number> {
	const counts = new Map<string, number>();
	for (const term of terms) {
		for (const sourceId of new Set(term.origins.map((o) => o.source))) {
			counts.set(sourceId, (counts.get(sourceId) ?? 0) + 1);
		}
	}
	return counts;
}
