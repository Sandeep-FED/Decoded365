import { cosine, decodeVector } from './vectors';

/** Turns text into a unit vector. Implemented in Node for builds and in a Web Worker for visitors. */
export type Embed = (text: string) => Promise<Float32Array>;

/** Shape of `vectors.json`, written by `scripts/embed.ts`. */
export interface VectorFile {
	model: string;
	dimensions: number;
	chunks: { termId: string; kind: 'level' | 'names'; level?: string; v: string }[];
}

export interface VectorIndex {
	model: string;
	chunks: { termId: string; kind: 'level' | 'names'; level?: string }[];
	vectors: Float32Array[];
}

export interface Scored {
	id: string;
	score: number;
}

export function loadVectorIndex(file: VectorFile): VectorIndex {
	return {
		model: file.model,
		chunks: file.chunks.map(({ termId, kind, level }) => ({ termId, kind, level })),
		vectors: file.chunks.map((c) => decodeVector(c.v)),
	};
}

/** Terms ranked by their best-matching chunk. */
export function rankBySimilarity(query: Float32Array, index: VectorIndex, limit = 10): Scored[] {
	const best = new Map<string, number>();
	index.vectors.forEach((vector, i) => {
		const id = index.chunks[i].termId;
		const score = cosine(query, vector);
		if (score > (best.get(id) ?? -Infinity)) best.set(id, score);
	});
	return [...best].map(([id, score]) => ({ id, score })).sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Reciprocal rank fusion: combine keyword and meaning rankings without having to compare
 * their scores. A term that ranks well in both rises to the top.
 */
export function fuseRankings(rankings: string[][], limit = 10, k = 60): string[] {
	const scores = new Map<string, number>();
	for (const ranking of rankings) {
		ranking.forEach((id, position) => scores.set(id, (scores.get(id) ?? 0) + 1 / (k + position + 1)));
	}
	return [...scores].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([id]) => id);
}

/** Meaning matches below this similarity are noise, whatever the query. */
export const SEMANTIC_FLOOR = 0.2;
/** A match must also be within this share of the best match to count. */
export const SEMANTIC_RELATIVE = 0.75;

/**
 * Keep the meaning matches worth showing. Similarity scores are modest for short queries,
 * so the cut-off is relative to the best hit rather than a fixed number.
 */
export function selectSemanticHits(ranked: Scored[]): Scored[] {
	if (ranked.length === 0) return [];
	const threshold = Math.max(SEMANTIC_FLOOR, ranked[0].score * SEMANTIC_RELATIVE);
	return ranked.filter((hit) => hit.score >= threshold);
}
