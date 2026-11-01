import type { ProductName } from '@/schema/term';

export type ScopeVerdict =
	| { kind: 'later'; product: ProductName; release: string; message: string }
	| { kind: 'outside'; message: string };

const LATER: { product: ProductName; release: string; label: string; pattern: RegExp }[] = [
	{
		product: 'power-platform',
		release: 'v1.1',
		label: 'Power Platform',
		pattern: /\b(power\s?apps?|power\s?automate|power\s?pages?|power\s?bi|power\s?platform|dataverse|model-driven|canvas app|common data service)\b/i,
	},
	{
		product: 'copilot',
		release: 'v1.2',
		label: 'Copilot',
		pattern: /\b(copilot|copilot studio|agent builder|declarative agent|custom engine agent)\b/i,
	},
];

const OUTSIDE = /\b(fabric|defender|intune|exchange|entra|purview|windows 365|azure|sql server|teams admin)\b/i;

/**
 * Decide whether a question is about something the glossary does not cover yet (Power Platform,
 * Copilot) or at all (BRD UC-3: a clear "not covered yet" reply). Only products in `available` are answered.
 */
export function checkScope(question: string, available: ProductName[]): ScopeVerdict | null {
	for (const later of LATER) {
		if (!available.includes(later.product) && later.pattern.test(question)) {
			return {
				kind: 'later',
				product: later.product,
				release: later.release,
				message: `${later.label} terms are not covered yet. They are planned for version ${later.release}. For now Decoded365 answers questions about SharePoint.`,
			};
		}
	}
	if (OUTSIDE.test(question)) {
		return { kind: 'outside', message: 'That product is outside what Decoded365 covers. The glossary is about SharePoint, Power Platform and Copilot.' };
	}
	return null;
}
