import { stripMarkdown } from '@/lib/content/summary';
import { LEVELS, LEVEL_LABELS } from '@/lib/content/levels';
import { PRODUCT_LABELS, STATUS_LABELS } from './labels';
import type { GlossaryTerm } from './term-model';

const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;

/** One CSV field: quoted when it holds a comma, quote or line break (RFC 4180). */
export function csvField(value: string): string {
	return /[",\r\n]/.test(value) ? quote(value) : value;
}

const COLUMNS = ['id', 'term', 'aliases', 'product', 'category', 'status', 'applies_to', 'beginner', 'maker', 'architect', 'related', 'url'];

/** The whole glossary as CSV, one row per term, with each level as plain text. */
export function toCsv(terms: GlossaryTerm[], urlFor: (id: string) => string): string {
	const names = new Map(terms.map((t) => [t.id, t.term]));
	const labelOf = (id: string) => names.get(id);
	const rows = terms.map((t) => [
		t.id,
		t.term,
		t.aliases.join('; '),
		PRODUCT_LABELS[t.product],
		t.category,
		STATUS_LABELS[t.status],
		(t.appliesTo ?? []).join('; '),
		...LEVELS.map((level) => stripMarkdown(t.levelSections[level] ?? '', labelOf)),
		t.related.map((r) => names.get(r.id) ?? r.id).join('; '),
		urlFor(t.id),
	]);
	return [COLUMNS, ...rows].map((row) => row.map(csvField).join(',')).join('\r\n') + '\r\n';
}

const html = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Anki's text import splits on tabs and rows, so neither may appear inside a field. */
const flat = (text: string) => text.replace(/[\t\r\n]+/g, ' ').trim();

const CREDIT = 'Whatsitcalled, CC BY 4.0';

/**
 * Flashcards for Anki's "Import File" (tab-separated, HTML on). Front: the term; back: its three levels.
 * Columns: front, back, tags (product and status).
 */
export function toAnki(terms: GlossaryTerm[], urlFor: (id: string) => string): string {
	const names = new Map(terms.map((t) => [t.id, t.term]));
	const labelOf = (id: string) => names.get(id);
	const header = ['#separator:tab', '#html:true', '#tags column:3', '#notetype:Basic', '#deck:Whatsitcalled'];

	const cards = terms.map((t) => {
		const front = `<b>${html(t.term)}</b><br><i>${html(PRODUCT_LABELS[t.product])}</i>`;
		const levels = LEVELS.filter((l) => t.levelSections[l]).map(
			(l) => `<b>${LEVEL_LABELS[l]}</b><br>${html(stripMarkdown(t.levelSections[l] ?? '', labelOf))}`,
		);
		const back = `${levels.join('<br><br>')}<br><br><small>${CREDIT}. ${html(urlFor(t.id))}</small>`;
		const tags = `whatsitcalled ${t.product} ${t.status}`;
		return [front, back, tags].map(flat).join('\t');
	});
	return [...header, ...cards].join('\n') + '\n';
}
