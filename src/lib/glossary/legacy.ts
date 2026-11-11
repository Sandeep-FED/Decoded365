import type { TermData } from '@/schema/term';

/** Legacy = legacy or retired, or applies to SharePoint Server only. */
export function isLegacy(term: Pick<TermData, 'status' | 'appliesTo'>): boolean {
	if (term.status === 'legacy' || term.status === 'retired') return true;
	const applies = term.appliesTo;
	return !!applies && applies.length > 0 && applies.every((a) => a === 'sharepoint-server');
}
