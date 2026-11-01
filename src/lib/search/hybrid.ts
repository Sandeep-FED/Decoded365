import type { SearchDocument } from './documents';
import { createSearchEngine, type SearchEngine, type SearchResult } from './engine';
import { fuseRankings, rankBySimilarity, selectSemanticHits, type Embed, type VectorIndex } from './semantic';

export interface HybridOptions {
	/** Pre-computed chunk vectors. Without them (or without `embed`) search is keyword-only. */
	index?: VectorIndex;
	embed?: Embed;
}

export interface HybridEngine extends SearchEngine {
	/** Keyword results only: instant, no model needed. */
	keyword: SearchEngine['search'];
}

/** Hybrid search: keyword and meaning rankings fused with reciprocal rank fusion (BRD F4). */
export async function createHybridEngine(docs: SearchDocument[], options: HybridOptions = {}): Promise<HybridEngine> {
	const keywordEngine = await createSearchEngine(docs);
	const byId = new Map(docs.map((d) => [d.id, d]));

	return {
		keyword: keywordEngine.search,
		async search(query, limit = 8) {
			const keywordHits = await keywordEngine.search(query, 20);
			const { index, embed } = options;
			if (!index || !embed || !query.trim()) return keywordHits.slice(0, limit);

			const semanticHits = selectSemanticHits(rankBySimilarity(await embed(query), index, 20));
			const keywordById = new Map(keywordHits.map((r) => [r.doc.id, r]));
			const scoreById = new Map(semanticHits.map((h) => [h.id, h.score]));

			const fused = fuseRankings([keywordHits.map((r) => r.doc.id), semanticHits.map((h) => h.id)], limit);
			return fused.flatMap((id): SearchResult[] => {
				const existing = keywordById.get(id);
				const doc = byId.get(id);
				if (existing) return [existing];
				return doc ? [{ doc, score: scoreById.get(id) ?? 0 }] : [];
			});
		},
	};
}
