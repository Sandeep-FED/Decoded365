import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';
import { buildAtom, type FeedEntry } from '@/lib/glossary/feed';
import { readGitHistory, termChanges } from '@/lib/glossary/history';
import { getGlossary } from '@/lib/glossary/repository';
import { feedPath, termPath, withBase } from '@/lib/paths';

const MAX_ENTRIES = 50;

/** Atom feed of added and updated terms, so people can follow the glossary in a feed reader. */
export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	const absolute = (path: string) => new URL(path, origin).href;
	const terms = await getGlossary();

	const entries: FeedEntry[] = termChanges(terms, readGitHistory()).flatMap(({ term, added, updated }) => {
		const item = (kind: 'New' | 'Updated', day: string): FeedEntry => ({
			id: `${absolute(termPath(term.id))}#${kind.toLowerCase()}-${day}`,
			title: `${kind}: ${term.term}`,
			url: absolute(termPath(term.id)),
			updated: day,
			summary: term.summary,
		});
		return updated > added ? [item('New', added), item('Updated', updated)] : [item('New', added)];
	});
	entries.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, 'en'));

	const body = buildAtom(
		{ title: `${SITE.name}: new and updated terms`, subtitle: SITE.tagline, homeUrl: absolute(withBase('/')), feedUrl: absolute(feedPath()) },
		entries.slice(0, MAX_ENTRIES),
	);
	return new Response(body, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
};
