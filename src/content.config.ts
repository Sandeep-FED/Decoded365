import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { Term } from '@/schema/term';
import { Source } from '@/schema/source';

const terms = defineCollection({
	loader: glob({
		base: './content/terms',
		pattern: '**/*.md',
		// The term id in the front matter is the public id (not the file path).
		generateId: ({ data }) => String(data.id),
	}),
	schema: Term,
});

const sources = defineCollection({
	loader: file('./content/sources.yml'),
	schema: Source,
});

export const collections = { terms, sources };
