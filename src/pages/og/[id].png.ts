import type { APIRoute } from 'astro';
import { getGlossary } from '@/lib/glossary/repository';
import { renderOgImage } from '@/lib/seo/og-image';

export async function getStaticPaths() {
	const terms = await getGlossary();
	return terms.map((term) => ({ params: { id: term.id }, props: { term } }));
}

/** The link-preview image for a term page, drawn at build time. */
export const GET: APIRoute = async ({ props }) => {
	const { term } = props;
	const png = await renderOgImage({ title: term.term, summary: term.summary, product: term.product });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
