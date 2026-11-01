import type { RelationTypeName } from '@/schema/term';

export type Direction = 'out' | 'in';

const OUTGOING: Record<RelationTypeName, string> = {
	'part-of': 'Part of',
	requires: 'Requires',
	'used-by': 'Used by',
	'alternative-to': 'Alternative to',
	'often-confused-with': 'Often confused with',
	'replaced-by': 'Replaced by',
};

const INCOMING: Record<RelationTypeName, string> = {
	'part-of': 'Contains',
	requires: 'Required by',
	'used-by': 'Uses',
	'alternative-to': 'Alternative to',
	'often-confused-with': 'Often confused with',
	'replaced-by': 'Replaces',
};

/** Relations that read the same in both directions. */
export const SYMMETRIC: ReadonlySet<RelationTypeName> = new Set(['alternative-to', 'often-confused-with']);

/** Human label for a relation as seen from the term the page is about. */
export function relationLabel(type: RelationTypeName, direction: Direction): string {
	return (direction === 'out' ? OUTGOING : INCOMING)[type];
}
