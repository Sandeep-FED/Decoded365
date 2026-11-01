import type { TermData } from '@/schema/term';
import type { SourceData } from '@/schema/source';

const USE_LABELS = {
	adapted: 'definition adapted',
	'terms-only': 'term name only',
	'facts-only': 'facts only',
} as const;

export interface Attribution {
	/** Required CC BY 4.0 notice, only when text was adapted from a CC BY source. */
	notice?: string;
	/** One plain-text line per source (never a link). */
	sources: string[];
}

export function attributionFor(origins: TermData['origins'], sources: Map<string, SourceData>): Attribution {
	const lines: string[] = [];
	let adaptedFromCcBy = false;

	for (const origin of origins) {
		const source = sources.get(origin.source);
		if (!source) continue;
		lines.push(`${source.title} (${source.owner}): ${USE_LABELS[origin.use]}`);
		if (origin.use === 'adapted' && source.licence.includes('CC BY 4.0')) adaptedFromCcBy = true;
	}

	return {
		notice: adaptedFromCcBy ? 'Adapted from Microsoft documentation, licensed CC BY 4.0. Changes made.' : undefined,
		sources: lines,
	};
}
