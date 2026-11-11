const words = (text: string) => text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

/** Overlapping runs of `size` consecutive words. */
export function shingles(text: string, size = 6): Set<string> {
	const w = words(text);
	const result = new Set<string>();
	for (let i = 0; i + size <= w.length; i++) result.add(w.slice(i, i + size).join(' '));
	return result;
}

/**
 * Share of the entry's word runs that also appear in the source (0 to 1).
 * High values mean the entry reuses the source's wording (similarity check).
 */
export function containment(entry: string, source: string, size = 6): number {
	const mine = shingles(entry, size);
	if (mine.size === 0) return 0;
	const theirs = shingles(source, size);
	let shared = 0;
	for (const s of mine) if (theirs.has(s)) shared++;
	return shared / mine.size;
}
