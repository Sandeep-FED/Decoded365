export interface EvalQuestion {
	q: string;
	/** Any of these term ids counts as a hit. */
	expect: string[];
}

export interface EvalResult {
	hitRate: number;
	hits: number;
	total: number;
	misses: { q: string; expected: string[]; got: string[] }[];
}

/** Share of questions whose expected term appears in the top `k` results (goal: ≥ 80% at k = 5). */
export async function evaluateSearch(
	questions: EvalQuestion[],
	search: (query: string, limit: number) => Promise<string[]>,
	k = 5,
): Promise<EvalResult> {
	const misses: EvalResult['misses'] = [];
	let hits = 0;
	for (const question of questions) {
		const got = await search(question.q, k);
		if (got.some((id) => question.expect.includes(id))) hits++;
		else misses.push({ q: question.q, expected: question.expect, got });
	}
	return { hitRate: questions.length ? hits / questions.length : 0, hits, total: questions.length, misses };
}
