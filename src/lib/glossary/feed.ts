export interface FeedEntry {
	id: string;
	title: string;
	url: string;
	/** ISO date or date-time. */
	updated: string;
	summary: string;
}

export interface FeedInfo {
	title: string;
	subtitle: string;
	homeUrl: string;
	feedUrl: string;
}

export const xmlEscape = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** An Atom 1.0 feed. Dates without a time are read as midnight UTC. */
export function buildAtom(info: FeedInfo, entries: FeedEntry[]): string {
	const stamp = (value: string) => (value.length === 10 ? `${value}T00:00:00Z` : value);
	const latest = entries.map((e) => stamp(e.updated)).sort().at(-1) ?? '1970-01-01T00:00:00Z';

	const items = entries.map(
		(e) => `  <entry>
    <id>${xmlEscape(e.id)}</id>
    <title>${xmlEscape(e.title)}</title>
    <link href="${xmlEscape(e.url)}"/>
    <updated>${stamp(e.updated)}</updated>
    <summary>${xmlEscape(e.summary)}</summary>
  </entry>`,
	);

	return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${xmlEscape(info.feedUrl)}</id>
  <title>${xmlEscape(info.title)}</title>
  <subtitle>${xmlEscape(info.subtitle)}</subtitle>
  <link rel="self" href="${xmlEscape(info.feedUrl)}"/>
  <link href="${xmlEscape(info.homeUrl)}"/>
  <updated>${latest}</updated>
${items.join('\n')}
</feed>
`;
}
