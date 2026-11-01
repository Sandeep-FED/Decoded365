import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadTermFiles } from '../src/lib/content/load-term-files';
import { toGlossaryTerm } from '../src/lib/glossary/term-model';
import { buildChunks } from '../src/lib/search/chunks';
import type { VectorFile } from '../src/lib/search/semantic';
import { encodeVector } from '../src/lib/search/vectors';
import { createNodeEmbedder } from './lib/node-embedder';

// Build-time embeddings on a free CI runner: no API, no cost (BRD 8.3).
const { entries } = await loadTermFiles(process.cwd());
const names = new Map(entries.map((e) => [e.data.id, e.data.term]));
const labelOf = (id: string) => names.get(id);

const chunks = entries.flatMap((e) => buildChunks(toGlossaryTerm(e.data, e.body, labelOf), labelOf));
const { embed, model, dimensions } = await createNodeEmbedder();

const file: VectorFile = { model, dimensions, chunks: [] };
for (const chunk of chunks) {
	const vector = await embed(chunk.text);
	file.chunks.push({ termId: chunk.termId, kind: chunk.kind, level: chunk.level, v: encodeVector(vector) });
}

const out = join(process.cwd(), 'public/vectors.json');
await mkdir(join(process.cwd(), 'public'), { recursive: true });
await writeFile(out, JSON.stringify(file));
console.log(`Embedded ${chunks.length} chunks from ${entries.length} terms with ${model} → public/vectors.json`);
