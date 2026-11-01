export interface LetterGroup<T> {
	letter: string;
	items: T[];
}

/** The A–Z bucket for a label: its first letter, or "#" for digits and symbols. */
export function letterFor(label: string): string {
	const first = label.trim().charAt(0).toUpperCase();
	return /[A-Z]/.test(first) ? first : '#';
}

/** Group items A–Z by the first letter of their label. */
export function groupByLetter<T>(items: T[], label: (item: T) => string): LetterGroup<T>[] {
	const groups = new Map<string, T[]>();
	const sorted = [...items].sort((a, b) => label(a).localeCompare(label(b), 'en', { sensitivity: 'base' }));
	for (const item of sorted) {
		const letter = letterFor(label(item));
		groups.set(letter, [...(groups.get(letter) ?? []), item]);
	}
	return [...groups].map(([letter, list]) => ({ letter, items: list }));
}
