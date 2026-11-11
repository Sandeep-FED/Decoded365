import type { APIRoute } from 'astro';
import { toCsv } from '@/lib/glossary/exports';
import { getGlossary } from '@/lib/glossary/repository';
import { termPath } from '@/lib/paths';

/** Every term as a spreadsheet: one row per term, each level as plain text. */
export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	const csv = toCsv(await getGlossary(), (id) => new URL(termPath(id), origin).href);
	return new Response(`﻿${csv}`, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } }); // BOM so Excel reads UTF-8
};
