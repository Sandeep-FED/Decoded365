import type { APIRoute } from 'astro';
import { readGitHistory, termChanges } from '@/lib/glossary/history';
import { getGlossary } from '@/lib/glossary/repository';
import { browsePath, comparePath, downloadsPath, newPath, renamedPath, termPath, withBase } from '@/lib/paths';
import { buildSitemap } from '@/lib/seo/sitemap';

/** Every public page, with each term's last change from git when known. The quality dashboard is left out on purpose. */
export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	const absolute = (path: string) => new URL(path, origin).href;
	const changes = termChanges(await getGlossary(), readGitHistory());

	const pages = [withBase('/'), browsePath(), comparePath(), renamedPath(), newPath(), downloadsPath()].map((path) => ({ loc: absolute(path) }));
	const terms = changes.map(({ term, updated }) => ({ loc: absolute(termPath(term.id)), lastmod: updated }));
	return new Response(buildSitemap([...pages, ...terms]), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
