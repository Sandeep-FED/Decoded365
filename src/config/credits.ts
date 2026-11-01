import { ORIGIN_USES } from '@/schema/term';

/** What each provenance label means, in plain words (shown on the Credits page). */
export const USE_EXPLAINED: Record<(typeof ORIGIN_USES)[number], { title: string; text: string }> = {
	adapted: {
		title: 'Adapted',
		text: 'The definition was rewritten from a source whose licence allows it. The entry carries a plain-text credit and says changes were made.',
	},
	'facts-only': {
		title: 'Facts only',
		text: 'Facts such as dates and renames were checked against the source, but the wording is new.',
	},
	'terms-only': {
		title: 'Term name only',
		text: 'The term appears in the source. Everything we say about it is written fresh.',
	},
};

/** Open-source building blocks (BRD 8.8). Licences are checked in CI. */
export const STACK = [
	{ name: 'Astro', purpose: 'Site framework', licence: 'MIT' },
	{ name: 'React', purpose: 'Interactive parts', licence: 'MIT' },
	{ name: 'Tailwind CSS', purpose: 'Styling', licence: 'MIT' },
	{ name: 'shadcn/ui and Radix UI', purpose: 'Components', licence: 'MIT' },
	{ name: 'Lucide', purpose: 'Icons', licence: 'ISC' },
	{ name: 'Zod', purpose: 'Content validation', licence: 'MIT' },
	{ name: 'Orama', purpose: 'Search', licence: 'Apache-2.0' },
	{ name: 'Cytoscape.js', purpose: 'Related-terms map', licence: 'MIT' },
	{ name: 'Motion', purpose: 'Animation', licence: 'MIT' },
	{ name: 'Inter', purpose: 'Body typeface (served by Google Fonts)', licence: 'SIL Open Font License 1.1' },
	{ name: 'Montserrat', purpose: 'Heading typeface (served by Google Fonts)', licence: 'SIL Open Font License 1.1' },
	{ name: 'Aceternity UI', purpose: 'Spotlight and Flip Words effects', licence: 'To be confirmed' },
] as const;
