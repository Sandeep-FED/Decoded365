import type { APIRoute } from 'astro';
import { toAnki } from '@/lib/glossary/exports';
import { getGlossary } from '@/lib/glossary/repository';
import { termPath } from '@/lib/paths';

/** Flashcards for Anki's File > Import: the term on the front, its three levels on the back. */
export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	const cards = toAnki(await getGlossary(), (id) => new URL(termPath(id), origin).href);
	return new Response(cards, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
