import { describe, expect, it } from 'vitest';
import { renderOgImage, clip } from '@/lib/seo/og-image';
import { buildSitemap, robotsTxt } from '@/lib/seo/sitemap';
import { breadcrumbLd, definedTermLd, jsonLdText, websiteLd } from '@/lib/seo/structured-data';

describe('structured data', () => {
	const ld = definedTermLd({ id: 'hub-site', term: 'Hub site', aliases: ['hub'], summary: 'Ties sites together.', url: 'https://x.test/terms/hub-site/', setUrl: 'https://x.test/browse/' });

	it('describes a term as a schema.org DefinedTerm in the Whatsitcalled term set', () => {
		expect(ld['@type']).toBe('DefinedTerm');
		expect(ld.name).toBe('Hub site');
		expect(ld.alternateName).toEqual(['hub']);
		expect(ld.inDefinedTermSet).toMatchObject({ '@type': 'DefinedTermSet', name: 'Whatsitcalled', url: 'https://x.test/browse/' });
	});

	it('leaves out alternateName when there are no aliases', () => {
		expect('alternateName' in definedTermLd({ id: 'a', term: 'A', aliases: [], summary: '', url: 'u', setUrl: 's' })).toBe(false);
	});

	it('numbers breadcrumb items from 1', () => {
		const crumbs = breadcrumbLd([{ name: 'Browse', url: 'https://x.test/browse/' }, { name: 'Hub site', url: 'https://x.test/terms/hub-site/' }]);
		expect(crumbs.itemListElement.map((i) => i.position)).toEqual([1, 2]);
	});

	it('describes the site', () => {
		expect(websiteLd('https://x.test/')).toMatchObject({ '@type': 'WebSite', url: 'https://x.test/' });
	});

	it('cannot be used to close the script tag', () => {
		const text = jsonLdText({ a: '</script><script>alert(1)</script> & more' });
		expect(text).not.toContain('<');
		expect(text).not.toContain('>');
		expect(JSON.parse(text).a).toBe('</script><script>alert(1)</script> & more');
	});
});

describe('sitemap and robots', () => {
	it('lists pages with optional last-modified dates and escapes addresses', () => {
		const xml = buildSitemap([{ loc: 'https://x.test/a?b=1&c=2', lastmod: '2026-11-02' }, { loc: 'https://x.test/' }]);
		expect(xml).toContain('<loc>https://x.test/a?b=1&amp;c=2</loc><lastmod>2026-11-02</lastmod>');
		expect(xml).toContain('<url><loc>https://x.test/</loc></url>');
	});

	it('points robots.txt at the sitemap', () => {
		expect(robotsTxt('https://x.test/sitemap.xml')).toContain('Sitemap: https://x.test/sitemap.xml');
	});
});

describe('link preview image', () => {
	it('clips long text at a word boundary', () => {
		expect(clip('short', 20)).toBe('short');
		expect(clip('one two three four five', 14)).toBe('one two three…');
	});

	it('renders a PNG', async () => {
		const png = await renderOgImage({ title: 'Hub site', summary: 'A hub site ties related sites together.', product: 'sharepoint' });
		expect([...png.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
		expect(png.length).toBeGreaterThan(5000);
	});
});
