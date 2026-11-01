/** Plain-text first paragraph of a Markdown section (used for previews and search). */
export function firstParagraph(markdown: string | undefined): string {
	if (!markdown) return '';
	const paragraph = markdown.trim().split(/\n\s*\n/)[0] ?? '';
	return stripMarkdown(paragraph);
}

/** Remove the Markdown syntax decoded365 entries use, keeping the readable text. */
export function stripMarkdown(markdown: string): string {
	return markdown
		.replace(/\[\[([^\]]+)\]\]/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/^\s*[-*]\s+/gm, '')
		.replace(/\s+/g, ' ')
		.trim();
}
