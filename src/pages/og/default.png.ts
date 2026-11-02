import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';
import { renderOgImage } from '@/lib/seo/og-image';

/** The link-preview image for pages that are not a single term. */
export const GET: APIRoute = async () => {
	const png = await renderOgImage({ title: 'What does it mean?', summary: SITE.tagline });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
