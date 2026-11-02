import { loadTermFiles } from '../src/lib/content/load-term-files';
import { toGlossaryTerm } from '../src/lib/glossary/term-model';
import { ISSUES, assessTerms, byPriority, summarise, type IssueKey } from '../src/lib/glossary/quality';

// Where the glossary needs work: who has checked each term, and which terms are thin, unconnected or undated.
const { entries } = await loadTermFiles(process.cwd());
const names = new Map(entries.map((e) => [e.data.id, e.data.term]));
const rows = assessTerms(entries.map((e) => toGlossaryTerm(e.data, e.body, (id) => names.get(id))));
const s = summarise(rows);
const pct = (n: number) => `${Math.round((n / s.total) * 100)}%`;

console.log(`Decoded365 content quality: ${s.total} terms\n`);
console.log(`Reviewed by a person  ${String(s.review.reviewed).padStart(4)}  ${pct(s.review.reviewed)}`);
console.log(`AI-drafted            ${String(s.review.drafted).padStart(4)}  ${pct(s.review.drafted)}`);
console.log(`Not marked            ${String(s.review.unmarked).padStart(4)}  ${pct(s.review.unmarked)}`);
console.log(`\nIssues (a term can have several); ${s.clean} terms have none`);
for (const key of Object.keys(ISSUES) as IssueKey[]) console.log(`  ${ISSUES[key].padEnd(24)} ${String(s.issues[key]).padStart(4)}`);

console.log('\nBy product (reviewed / drafted / not marked)');
for (const p of s.byProduct) console.log(`  ${p.product.padEnd(16)} ${p.review.reviewed} / ${p.review.drafted} / ${p.review.unmarked}  of ${p.total}`);

const top = Number(process.argv.find((a) => a.startsWith('--top='))?.slice(6) ?? 20);
console.log(`\nNeeds the most work first (top ${top}):`);
for (const r of byPriority(rows).slice(0, top)) {
	const words = `${r.words.beginner}/${r.words.maker}/${r.words.architect}`;
	console.log(`  ${r.product}/${r.id}  [${r.review}]  words ${words}  ${r.issues.join(', ') || 'no issues'}`);
}
