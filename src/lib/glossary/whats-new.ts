import type { TermChange } from './history';

export interface DayGroup {
	day: string;
	added: TermChange[];
	updated: TermChange[];
}

/** The most recent days, newest first, each with the terms added that day and the terms changed after they were added. */
export function groupByDay(changes: TermChange[], maxDays = 14): DayGroup[] {
	const days = new Map<string, DayGroup>();
	const group = (day: string) => {
		const found = days.get(day) ?? { day, added: [], updated: [] };
		days.set(day, found);
		return found;
	};

	for (const change of changes) {
		group(change.added).added.push(change);
		if (change.updated > change.added) group(change.updated).updated.push(change);
	}

	const byName = (a: TermChange, b: TermChange) => a.term.term.localeCompare(b.term.term, 'en');
	return [...days.values()]
		.sort((a, b) => b.day.localeCompare(a.day))
		.slice(0, maxDays)
		.map((g) => ({ ...g, added: g.added.sort(byName), updated: g.updated.sort(byName) }));
}
