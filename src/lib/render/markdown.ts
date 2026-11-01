import { marked } from 'marked';
import { replaceWikiLinks } from '@/lib/content/wikilinks';

export interface LinkTarget {
	label: string;
	href: string;
}

/**
 * Render one level section to HTML. `[[term-id]]` becomes an internal link.
 * Entry content is reviewed in pull requests and validated against external
 * links, so it is rendered as trusted Markdown.
 */
export function renderMarkdown(markdown: string, resolve: (id: string) => LinkTarget | undefined): string {
	return marked.parse(replaceWikiLinks(markdown, resolve), { async: false, gfm: true });
}
