import { z } from 'zod';

/** One row of `content/sources.yml`. Addresses are for maintainers; they are never rendered inside entries. */
export const Source = z.object({
	id: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string(),
	owner: z.string(),
	licence: z.string(),
	address: z.string().optional(),
	release: z.enum(['v1', 'v1.1', 'v1.2']),
	use: z.string(),
});

export type SourceData = z.infer<typeof Source>;
