import type { APIRoute } from 'astro';
import { getGlossary } from '@/lib/glossary/repository';

/** The glossary as open data (BRD F16, UC-9): every term with its three levels as Markdown. */
export const GET: APIRoute = async () => {
	const terms = await getGlossary();
	return Response.json({
		name: 'Whatsitcalled',
		licence: 'CC BY 4.0',
		terms: terms.map(({ levelSections, legacy, ...data }) => ({ ...data, legacy, levels: levelSections })),
	});
};
