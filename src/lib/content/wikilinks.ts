// `[[term-id]]` or `[[term-id|custom label]]`
const WIKILINK = /\[\[([^\]\s|]+)(?:\|([^\]]+))?\]\]/g;

/** Ids referenced as `[[term-id]]` in a body. */
export function findWikiLinks(body: string): string[] {
	return [...body.matchAll(WIKILINK)].map((m) => m[1]);
}

/** Replace `[[term-id]]` with Markdown links; `resolve` returns undefined for unknown ids. */
export function replaceWikiLinks(
	body: string,
	resolve: (id: string) => { label: string; href: string } | undefined,
): string {
	return body.replace(WIKILINK, (whole, id: string, label?: string) => {
		const target = resolve(id);
		return target ? `[${label ?? target.label}](${target.href})` : whole;
	});
}
