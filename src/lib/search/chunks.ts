import { LEVELS, type Level } from '@/lib/content/levels';
import { stripMarkdown, type LabelOf } from '@/lib/content/summary';
import type { GlossaryTerm } from '@/lib/glossary/term-model';

export interface Chunk {
	termId: string;
	kind: 'level' | 'names';
	level?: Level;
	/** The text that gets embedded. */
	text: string;
}

/**
 * One chunk per term per level, plus one for the names a term goes by (aliases and old names),
 * so "Flow" or "PVA" land on the current term.
 */
export function buildChunks(term: GlossaryTerm, labelOf?: LabelOf): Chunk[] {
	const chunks: Chunk[] = [];
	for (const level of LEVELS) {
		const body = term.levelSections[level];
		if (body) chunks.push({ termId: term.id, kind: 'level', level, text: `${term.term}. ${stripMarkdown(body, labelOf)}` });
	}
	const names = [...term.aliases, ...term.renamed.map((r) => r.from)];
	if (names.length > 0) {
		chunks.push({ termId: term.id, kind: 'names', text: `${term.term}. Also known as ${[...new Set(names)].join(', ')}.` });
	}
	return chunks;
}
