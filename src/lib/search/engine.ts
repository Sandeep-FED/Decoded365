import { create, insertMultiple, search, type AnyOrama } from '@orama/orama';
import type { SearchDocument } from './documents';

export interface SearchResult {
	doc: SearchDocument;
	score: number;
	/** Set when the query matched an alias or an old name instead of the current name. */
	matchedName?: { name: string; kind: 'alias' | 'old-name'; rename?: SearchDocument['renames'][number] };
}

export interface SearchEngine {
	search(query: string, limit?: number): Promise<SearchResult[]>;
}

const norm = (value: string) => value.trim().toLowerCase();

/** Which alias or old name (if any) explains why this document matched the query. */
function matchedName(doc: SearchDocument, query: string): SearchResult['matchedName'] {
	const q = norm(query);
	if (!q || norm(doc.term).includes(q)) return undefined;

	const rename = doc.renames.find((r) => norm(r.from).includes(q) || q.includes(norm(r.from)));
	if (rename) return { name: rename.from, kind: 'old-name', rename };

	const alias = doc.aliases.find((a) => norm(a).includes(q) || q.includes(norm(a)));
	return alias ? { name: alias, kind: 'alias' } : undefined;
}

/** Keyword search over term names, aliases, old names, summaries and body text (BRD F4). */
export async function createSearchEngine(docs: SearchDocument[]): Promise<SearchEngine> {
	const byId = new Map(docs.map((d) => [d.id, d]));
	const db: AnyOrama = create({
		schema: {
			id: 'string',
			term: 'string',
			aliases: 'string[]',
			oldNames: 'string[]',
			summary: 'string',
			text: 'string',
		} as const,
	});

	await insertMultiple(
		db,
		docs.map((d) => ({
			id: d.id,
			term: d.term,
			aliases: d.aliases,
			oldNames: d.renames.map((r) => r.from),
			summary: d.summary,
			text: d.text,
		})),
	);

	return {
		async search(query, limit = 8) {
			const term = query.trim();
			if (!term) return [];
			const found = await search(db, {
				term,
				properties: ['term', 'aliases', 'oldNames', 'summary', 'text'],
				boost: { term: 5, aliases: 4, oldNames: 4, summary: 1.5, text: 1 },
				tolerance: term.length > 4 ? 1 : 0,
				limit,
			});
			return found.hits.flatMap((hit) => {
				const doc = byId.get(String(hit.document.id));
				return doc ? [{ doc, score: hit.score, matchedName: matchedName(doc, term) }] : [];
			});
		},
	};
}
