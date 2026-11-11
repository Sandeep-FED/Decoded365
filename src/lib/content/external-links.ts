// Entries are self-contained: no hyperlinks to other sites.
const PATTERNS: RegExp[] = [
	/https?:\/\/\S+/i, // http(s) links and bare addresses
	/\bwww\.[a-z0-9-]+\.[a-z]{2,}/i, // bare www addresses
	/<a\s[^>]*href/i, // raw HTML anchors
	/\]\(\s*(?!\/|#)[a-z][a-z0-9+.-]*:/i, // markdown links with any other scheme (mailto:, ftp:, ...)
];

/** Fragments of a body that look like external links. */
export function findExternalLinks(body: string): string[] {
	const found: string[] = [];
	for (const line of body.split(/\r?\n/)) {
		for (const pattern of PATTERNS) {
			const match = pattern.exec(line);
			if (match) found.push(match[0]);
		}
	}
	return found;
}
