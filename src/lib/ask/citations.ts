export type AnswerPart = { type: 'text'; text: string } | { type: 'cite'; id: string };

const CITATION = /\[([a-z0-9-]+)\]/g;

/** Split an answer into text and citations. Only ids that exist become citations. */
export function parseAnswer(answer: string, known: Set<string>): AnswerPart[] {
	const parts: AnswerPart[] = [];
	let last = 0;
	for (const match of answer.matchAll(CITATION)) {
		if (!known.has(match[1])) continue;
		const start = match.index ?? 0;
		if (start > last) parts.push({ type: 'text', text: answer.slice(last, start) });
		parts.push({ type: 'cite', id: match[1] });
		last = start + match[0].length;
	}
	if (last < answer.length) parts.push({ type: 'text', text: answer.slice(last) });
	return parts;
}

/** Distinct valid ids cited in an answer. An answer with none is not grounded. */
export function citedIds(answer: string, known: Set<string>): string[] {
	return [...new Set(parseAnswer(answer, known).flatMap((p) => (p.type === 'cite' ? [p.id] : [])))];
}
