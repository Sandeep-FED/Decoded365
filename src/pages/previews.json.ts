import type { APIRoute } from 'astro';
import { getGlossary } from '@/lib/glossary/repository';

/** The little a hover preview needs for each term: its name, product, status and plain-words summary. */
export const GET: APIRoute = async () => {
	const terms = await getGlossary();
	return Response.json(Object.fromEntries(terms.map((t) => [t.id, { term: t.term, product: t.product, status: t.status, summary: t.summary }])));
};
