import { SITE } from '@/config/site';

/** Safe to place inside a `<script type="application/ld+json">` tag: no `</script>` can end it early. */
export function jsonLdText(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export interface TermLd {
	id: string;
	term: string;
	aliases: string[];
	summary: string;
	url: string;
	setUrl: string;
}

/** schema.org `DefinedTerm`: lets search engines read a term page as a definition within the Decoded365 glossary. */
export function definedTermLd(t: TermLd) {
	return {
		'@context': 'https://schema.org',
		'@type': 'DefinedTerm',
		'@id': `${t.url}#term`,
		name: t.term,
		...(t.aliases.length > 0 && { alternateName: t.aliases }),
		description: t.summary,
		termCode: t.id,
		url: t.url,
		inLanguage: 'en',
		inDefinedTermSet: { '@type': 'DefinedTermSet', name: SITE.name, url: t.setUrl },
	};
}

/** schema.org `BreadcrumbList` for the trail shown on a page. The last item may leave `url` out. */
export function breadcrumbLd(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
	};
}

/** schema.org `WebSite` for the home page. */
export function websiteLd(homeUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.name,
		description: SITE.tagline,
		url: homeUrl,
		inLanguage: 'en',
		isAccessibleForFree: true,
	};
}
