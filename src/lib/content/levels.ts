export const LEVELS = ['beginner', 'maker', 'architect'] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_LABELS: Record<Level, string> = {
	beginner: 'Beginner',
	maker: 'Maker',
	architect: 'Architect',
};

export type LevelSections = Partial<Record<Level, string>>;

const HEADING = /^##[ \t]+(.+?)[ \t]*$/;

/** Split an entry body into its `## Beginner / ## Maker / ## Architect` sections. */
export function extractLevels(body: string): LevelSections {
	const sections: LevelSections = {};
	let current: Level | null = null;
	let buffer: string[] = [];

	const flush = () => {
		if (current) sections[current] = buffer.join('\n').trim();
		buffer = [];
	};

	for (const line of body.split(/\r?\n/)) {
		const heading = HEADING.exec(line);
		if (heading) {
			flush();
			const name = heading[1].toLowerCase();
			current = (LEVELS as readonly string[]).includes(name) ? (name as Level) : null;
			continue;
		}
		if (current) buffer.push(line);
	}
	flush();
	return sections;
}

/** The levels an entry is missing (empty counts as missing). */
export function missingLevels(sections: LevelSections): Level[] {
	return LEVELS.filter((level) => !sections[level]?.trim());
}
