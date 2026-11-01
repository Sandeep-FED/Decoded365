import { getCollection } from 'astro:content';
import type { SourceData } from '@/schema/source';
import { validateCorpus, type CorpusEntry } from '@/lib/content/validate';
import { buildGraph, type Graph } from '@/lib/graph/build-graph';
import { toGlossaryTerm, type GlossaryTerm } from './term-model';

let cache: Promise<GlossaryTerm[]> | undefined;

/** Load every term, failing the build if the corpus breaks a rule (BRD 8.1). Sorted A–Z. */
export function getGlossary(): Promise<GlossaryTerm[]> {
	cache ??= load();
	return cache;
}

async function load(): Promise<GlossaryTerm[]> {
	const [entries, sources] = await Promise.all([getCollection('terms'), getSources()]);

	const corpus: CorpusEntry[] = entries.map((e) => ({
		data: e.data,
		body: e.body ?? '',
		where: e.filePath ?? e.id,
	}));
	const issues = validateCorpus(corpus, new Set(sources.keys()));
	if (issues.length) {
		throw new Error(
			`Glossary content is invalid:\n${issues.map((i) => `  ${i.where}: ${i.message}`).join('\n')}`,
		);
	}

	const names = new Map(corpus.map((c) => [c.data.id, c.data.term]));
	return corpus
		.map((c) => toGlossaryTerm(c.data, c.body, (id) => names.get(id)))
		.sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
}

export async function getSources(): Promise<Map<string, SourceData>> {
	const sources = await getCollection('sources');
	return new Map(sources.map((s) => [s.data.id, s.data]));
}

export async function getGraph(): Promise<Graph> {
	return buildGraph(await getGlossary());
}
