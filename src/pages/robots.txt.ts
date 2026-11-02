import type { APIRoute } from 'astro';
import { withBase } from '@/lib/paths';
import { robotsTxt } from '@/lib/seo/sitemap';

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	return new Response(robotsTxt(new URL(withBase('sitemap.xml'), origin).href), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
