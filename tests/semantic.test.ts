import { describe, expect, it } from 'vitest';
import { buildChunks } from '@/lib/search/chunks';
import { fuseRankings, loadVectorIndex, rankBySimilarity, selectSemanticHits, type VectorFile } from '@/lib/search/semantic';
import { cosine, decodeVector, encodeVector } from '@/lib/search/vectors';
import { toGlossaryTerm } from '@/lib/glossary/term-model';
import { Term } from '@/schema/term';

const unit = (values: number[]) => {
	const norm = Math.hypot(...values);
	return values.map((v) => v / norm);
};

describe('vectors', () => {
	it('round-trips through base64 int8 with small error', () => {
		const v = unit([0.5, -0.5, 0.25, -0.75, 0.1, 0.3]);
		const back = decodeVector(encodeVector(v));
		expect(back).toHaveLength(v.length);
		expect(cosine(v, back)).toBeGreaterThan(0.999);
	});

	it('computes cosine similarity', () => {
		expect(cosine([1, 0], [1, 0])).toBeCloseTo(1);
		expect(cosine([1, 0], [0, 1])).toBeCloseTo(0);
		expect(cosine([0, 0], [1, 0])).toBe(0);
	});
});

describe('rankBySimilarity', () => {
	const file: VectorFile = {
		model: 'test',
		dimensions: 2,
		chunks: [
			{ termId: 'a', kind: 'level', level: 'beginner', v: encodeVector(unit([1, 0.1])) },
			{ termId: 'a', kind: 'level', level: 'maker', v: encodeVector(unit([0, 1])) },
			{ termId: 'b', kind: 'names', v: encodeVector(unit([0.2, 1])) },
		],
	};

	it('scores each term by its best chunk', () => {
		const ranked = rankBySimilarity(Float32Array.from(unit([1, 0])), loadVectorIndex(file));
		expect(ranked.map((r) => r.id)).toEqual(['a', 'b']);
		expect(ranked[0].score).toBeGreaterThan(0.9);
	});
});

describe('fuseRankings', () => {
	it('puts terms that rank well in both lists first', () => {
		expect(fuseRankings([['a', 'b', 'c'], ['d', 'b', 'e']])[0]).toBe('b');
	});

	it('keeps terms found by only one list and honours the limit', () => {
		const fused = fuseRankings([['a'], ['z']], 5);
		expect(fused.sort()).toEqual(['a', 'z']);
		expect(fuseRankings([['a', 'b', 'c']], 2)).toHaveLength(2);
	});
});

describe('buildChunks', () => {
	const data = Term.parse({
		id: 'x',
		term: 'Example',
		aliases: ['Ex'],
		product: 'sharepoint',
		category: 'sites',
		status: 'ga',
		renamed: [{ from: 'Old Example', to: 'Example', date: null }],
		origins: [{ source: 's', use: 'terms-only' }],
		lastReviewed: '2026-11-01',
		reviewers: ['r'],
	});

	it('makes one chunk per level plus one for names', () => {
		const chunks = buildChunks(toGlossaryTerm(data, '## Beginner\nOne.\n\n## Maker\nTwo [[y]].'), (id) => (id === 'y' ? 'Why' : undefined));
		expect(chunks.map((c) => `${c.kind}:${c.level ?? '-'}`)).toEqual(['level:beginner', 'level:maker', 'names:-']);
		expect(chunks[1].text).toBe('Example. Two Why.');
		expect(chunks[2].text).toBe('Example. Also known as Ex, Old Example.');
	});
});

describe('selectSemanticHits', () => {
	const hits = (scores: number[]) => scores.map((score, i) => ({ id: `t${i}`, score }));

	it('keeps a modest top hit and close followers', () => {
		expect(selectSemanticHits(hits([0.26, 0.22, 0.1])).map((h) => h.id)).toEqual(['t0', 't1']);
	});

	it('drops matches far below a strong top hit', () => {
		expect(selectSemanticHits(hits([0.63, 0.56, 0.46])).map((h) => h.id)).toEqual(['t0', 't1']);
	});

	it('returns nothing when even the best hit is noise', () => {
		expect(selectSemanticHits(hits([0.12, 0.1]))).toEqual([]);
		expect(selectSemanticHits([])).toEqual([]);
	});
});

describe('exactNameMatches', () => {
	it('finds terms by exact name, alias or old name, ignoring case and spacing', async () => {
		const { exactNameMatches } = await import('@/lib/search/engine');
		const doc = (id: string, term: string, aliases: string[] = [], from: string[] = []) => ({
			id, term, aliases, renames: from.map((f) => ({ from: f, to: term, date: null })),
			summary: '', text: '', product: 'sharepoint' as const, status: 'ga' as const, legacy: false,
		});
		const docs = [doc('dp', 'Document Processing', ['SharePoint Premium']), doc('flow', 'Power Automate', [], ['Microsoft Flow'])];
		expect(exactNameMatches(docs, '  sharepoint   premium ')).toEqual(['dp']);
		expect(exactNameMatches(docs, 'microsoft flow')).toEqual(['flow']);
		expect(exactNameMatches(docs, 'premium')).toEqual([]);
		expect(exactNameMatches(docs, '')).toEqual([]);
	});
});
