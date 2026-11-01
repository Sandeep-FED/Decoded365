export interface LetterGroup<T> {
	letter: string;
	items: T[];
}

/** Group items A–Z by the first letter of their label (digits and symbols go under "#"). */
export function groupByLetter<T>(items: T[], label: (item: T) => string): LetterGroup<T>[] {
	const groups = new Map<string, T[]>();
	const sorted = [...items].sort((a, b) => label(a).localeCompare(label(b), 'en', { sensitivity: 'base' }));
	for (const item of sorted) {
		const first = label(item).trim().charAt(0).toUpperCase();
		const letter = /[A-Z]/.test(first) ? first : '#';
		groups.set(letter, [...(groups.get(letter) ?? []), item]);
	}
	return [...groups].map(([letter, list]) => ({ letter, items: list }));
}
