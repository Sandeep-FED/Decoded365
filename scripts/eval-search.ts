import { readFile } from 'node:fs/promises';
import { loadTermFiles } from '../src/lib/content/load-term-files';
import { toGlossaryTerm } from '../src/lib/glossary/term-model';
import { toSearchDocument } from '../src/lib/search/documents';
import { createSearchEngine } from '../src/lib/search/engine';
import { evaluateSearch, type EvalQuestion } from '../src/lib/search/evaluate';

const TARGET = 0.8;
const root = process.cwd();

const { entries } = await loadTermFiles(root);
const names = new Map(entries.map((e) => [e.data.id, e.data.term]));
const docs = entries.map((e) => toSearchDocument(toGlossaryTerm(e.data, e.body, (id) => names.get(id)), (id) => names.get(id)));
const engine = await createSearchEngine(docs);

const questions: EvalQuestion[] = JSON.parse(await readFile(`${root}/evals/search-questions.json`, 'utf8'));
const result = await evaluateSearch(questions, async (q, k) => (await engine.search(q, k)).map((r) => r.doc.id));

console.log(`Search eval (keyword): ${result.hits}/${result.total} in top 5 = ${(result.hitRate * 100).toFixed(0)}% (target ${TARGET * 100}%)`);
for (const miss of result.misses) console.log(`  MISS "${miss.q}" expected ${miss.expected.join('|')} got ${miss.got.join(', ') || '(nothing)'}`);
process.exit(result.hitRate >= TARGET ? 0 : 1);
