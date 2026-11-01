export interface WordAt {
	word: string;
	line: number;
}

/**
 * Words worth spell-checking in a Markdown file: front matter, code, `[[links]]`, URLs and
 * tokens with digits or capitals in the middle (product names like SharePoint) are skipped.
 */
export function extractWords(markdown: string): WordAt[] {
	const lines = markdown.split(/\r?\n/);
	const words: WordAt[] = [];
	let inFrontMatter = lines[0]?.trim() === '---';
	let inFence = false;

	lines.forEach((raw, index) => {
		const line = raw.trim();
		if (inFrontMatter) {
			if (index > 0 && line === '---') inFrontMatter = false;
			return;
		}
		if (line.startsWith('```')) {
			inFence = !inFence;
			return;
		}
		if (inFence) return;

		const text = raw
			.replace(/`[^`]*`/g, ' ')
			.replace(/\[\[[^\]]*\]\]/g, ' ')
			.replace(/\]\([^)]*\)/g, ' ')
			.replace(/https?:\/\/\S+/g, ' ');

		for (const match of text.matchAll(/[A-Za-z][A-Za-z'’]*(?:-[A-Za-z][A-Za-z'’]*)*/g)) {
			const word = match[0].replace(/’/g, "'").replace(/'+$/, ''); // "developers'" is a plural possessive
			const next = text[(match.index ?? 0) + match[0].length];
			if (/[0-9_#]/.test(next ?? '')) continue; // part of an identifier such as GROUP#0 or x0020
			if (/[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word)) continue; // CamelCase product names
			if (word.length > 1 && word === word.toUpperCase()) continue; // acronyms
			words.push({ word, line: index + 1 });
		}
	});
	return words;
}

/**
 * Misspelled words with their line numbers. `isCorrect` is the dictionary check. A hyphenated
 * compound passes if it is on the allow-list or every part is a word.
 */
export function findMisspellings(markdown: string, isCorrect: (word: string) => boolean, ignore: Set<string>): WordAt[] {
	const ok = (word: string) => isCorrect(word) || isCorrect(word.toLowerCase());
	return extractWords(markdown).filter(({ word }) => {
		if (ignore.has(word.toLowerCase())) return false;
		return !word.split('-').every((part) => ignore.has(part.toLowerCase()) || ok(part));
	});
}
