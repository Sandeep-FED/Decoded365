import { firstParagraph } from '@/lib/content/summary';
import type { LabelOf } from '@/lib/content/summary';
import { APPLIES_TO_LABELS, STATUS_LABELS } from './labels';
import type { GlossaryTerm } from './term-model';

export interface ComparisonRow {
	label: string;
	left: string;
	right: string;
}

/** Where a term applies. Only SharePoint terms have a default (both editions); other products leave it blank. */
const appliesTo = (term: GlossaryTerm) => {
	if (term.appliesTo && term.appliesTo.length > 0) return term.appliesTo.map((a) => APPLIES_TO_LABELS[a]).join(', ');
	return term.product === 'sharepoint' ? 'SharePoint Online and Server' : '';
};

/** Side-by-side facts for two terms people mix up. Rows with nothing to say for either term are left out. */
export function comparisonRows(a: GlossaryTerm, b: GlossaryTerm, labelOf?: LabelOf): ComparisonRow[] {
	const rows: ComparisonRow[] = [
		{ label: 'In plain words', left: firstParagraph(a.levelSections.beginner, labelOf), right: firstParagraph(b.levelSections.beginner, labelOf) },
		{ label: 'When to use it', left: firstParagraph(a.levelSections.maker, labelOf), right: firstParagraph(b.levelSections.maker, labelOf) },
		{ label: 'Status', left: STATUS_LABELS[a.status], right: STATUS_LABELS[b.status] },
		{ label: 'Applies to', left: appliesTo(a), right: appliesTo(b) },
	];
	return rows.filter((row) => row.left || row.right);
}
