export type LabelOf = (id: string) => string | undefined;

/** Plain-text first paragraph of a Markdown section (used for previews and search). */
export function firstParagraph(markdown: string | undefined, labelOf?: LabelOf): string {
	if (!markdown) return '';
	const paragraph = markdown.trim().split(/\n\s*\n/)[0] ?? '';
	return stripMarkdown(paragraph, labelOf);
}

/**
 * Remove the Markdown syntax Decoded365 entries use, keeping the readable text.
 * `[[term-id]]` becomes the term's name when `labelOf` can resolve it.
 */
export function stripMarkdown(markdown: string, labelOf?: LabelOf): string {
	return markdown
		.replace(/\[\[([^\]\s|]+)\|([^\]]+)\]\]/g, '$2')
		.replace(/\[\[([^\]\s|]+)\]\]/g, (_, id: string) => labelOf?.(id) ?? id)
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/^\s*[-*]\s+/gm, '')
		.replace(/\s+/g, ' ')
		.trim();
}
