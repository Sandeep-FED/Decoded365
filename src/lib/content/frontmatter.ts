import { parse } from 'yaml';

export interface ParsedFile {
	data: unknown;
	body: string;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Split a Markdown file into its YAML front matter and body. */
export function splitFrontmatter(raw: string): ParsedFile {
	const match = FRONTMATTER.exec(raw);
	if (!match) throw new Error('Missing YAML front matter (--- block) at the top of the file.');
	return { data: parse(match[1]), body: match[2] };
}
