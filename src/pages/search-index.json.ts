import type { APIRoute } from 'astro';
import { getGlossary } from '@/lib/glossary/repository';
import { toSearchDocument } from '@/lib/search/documents';

/** Loaded by the browser the first time someone opens search. */
export const GET: APIRoute = async () => {
	const terms = await getGlossary();
	const names = new Map(terms.map((t) => [t.id, t.term]));
	return Response.json(terms.map((t) => toSearchDocument(t, (id) => names.get(id))));
};
