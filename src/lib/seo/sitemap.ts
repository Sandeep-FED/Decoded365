import { xmlEscape } from '@/lib/glossary/feed';

export interface SitemapUrl {
	loc: string;
	/** `YYYY-MM-DD`, when known. */
	lastmod?: string;
}

/** A sitemap.xml listing the given pages. */
export function buildSitemap(urls: SitemapUrl[]): string {
	const items = urls.map((u) => `  <url><loc>${xmlEscape(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`);
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>
`;
}

/** robots.txt that lets everything be crawled and points at the sitemap. */
export function robotsTxt(sitemapUrl: string): string {
	return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}
