import { describe, expect, it } from 'vitest';
import { checkScope } from '@/lib/ask/scope';
import { namedEntries, retrieveEntries, type AskEntry } from '@/lib/ask/retrieval';
import { buildMessages, textAtLevel } from '@/lib/ask/prompt';
import { citedIds, parseAnswer } from '@/lib/ask/citations';
import { fallbackAnswer } from '@/lib/ask/fallback';
import { checkOnDeviceModel } from '@/lib/ask/capabilities';
import { drawsOn } from '@/lib/ask/attribution';

const entry = (id: string, term: string, over: Partial<AskEntry> = {}): AskEntry => ({
	id,
	term,
	aliases: [],
	status: 'ga',
	levels: { beginner: `${term} in plain words.`, architect: `${term} for architects.` },
	...over,
});
const entries = [
	entry('recycle-bin', 'Recycle Bin', { aliases: ['second-stage Recycle Bin'] }),
	entry('hub-site', 'Hub site'),
	entry('sharepoint-add-in', 'SharePoint Add-in', { aliases: ['app for SharePoint'], status: 'retired' }),
	entry('site', 'Site'),
];

describe('checkScope', () => {
	it('says Power Platform and Copilot are not covered yet', () => {
		const dv = checkScope('Difference between a Dataverse table and a SharePoint list?', ['sharepoint']);
		expect(dv).toMatchObject({ kind: 'later', product: 'power-platform', release: 'v1.1' });
		expect(checkScope('What is Copilot Studio?', ['sharepoint'])).toMatchObject({ kind: 'later', release: 'v1.2' });
	});

	it('flags products outside the glossary and lets SharePoint questions through', () => {
		expect(checkScope('How do I set up Intune?', ['sharepoint'])?.kind).toBe('outside');
		expect(checkScope('Can I still use SharePoint Add-ins in SharePoint Online?', ['sharepoint'])).toBeNull();
	});

	it('answers a product once it is available', () => {
		expect(checkScope('What is Dataverse?', ['sharepoint', 'power-platform'])).toBeNull();
	});
});

describe('retrieval', () => {
	it('finds terms and aliases named in the question, whole words only', () => {
		expect(namedEntries('what is the app for SharePoint?', entries).map((e) => e.id)).toEqual(['sharepoint-add-in']);
		expect(namedEntries('is the website ok', entries)).toEqual([]);
		expect(namedEntries('can I still use SharePoint Add-ins?', entries).map((e) => e.id)).toEqual(['sharepoint-add-in']);
		expect(namedEntries('empty the recycle bins', entries).map((e) => e.id)).toEqual(['recycle-bin']);
	});

	it('puts named terms first, then search hits, up to the limit', async () => {
		const search = async () => ['hub-site', 'recycle-bin', 'site'];
		const got = await retrieveEntries('Tell me about the Recycle Bin', entries, search, 3);
		expect(got.map((e) => e.id)).toEqual(['recycle-bin', 'hub-site', 'site']);
	});
});

describe('prompt', () => {
	it('grounds the model in entries at the chosen level', () => {
		const [system, user] = buildMessages('what is a hub?', 'architect', entries.slice(0, 2));
		expect(system.role).toBe('system');
		expect(system.content).toContain('Architect depth');
		expect(system.content).toContain('[recycle-bin] Recycle Bin');
		expect(system.content).toContain('Recycle Bin for architects.');
		expect(system.content).toContain('150 words');
		expect(system.content).toContain('[recycle-bin]'); // the worked citation example uses a real entry id
		expect(user.role).toBe('user');
		expect(user.content.startsWith('what is a hub?')).toBe(true);
		expect(user.content).toContain('[recycle-bin]');
	});

	it('falls back to another level when one is missing and marks non-GA entries', () => {
		expect(textAtLevel(entries[0], 'maker')).toBe('Recycle Bin in plain words.');
		expect(buildMessages('q', 'beginner', [entries[2]])[0].content).toContain('(retired)');
	});
});

describe('citations', () => {
	const known = new Set(['hub-site', 'recycle-bin']);

	it('turns known ids into citations and leaves other brackets alone', () => {
		const parts = parseAnswer('A hub joins sites [hub-site]. See [not-real] too.', known);
		expect(parts).toEqual([
			{ type: 'text', text: 'A hub joins sites ' },
			{ type: 'cite', id: 'hub-site' },
			{ type: 'text', text: '. See [not-real] too.' },
		]);
	});

	it('reports distinct valid citations (none means not grounded)', () => {
		expect(citedIds('x [hub-site] y [hub-site] [recycle-bin]', known)).toEqual(['hub-site', 'recycle-bin']);
		expect(citedIds('no citations here [made-up]', known)).toEqual([]);
	});
});

describe('fallback and capabilities', () => {
	it('shows the first three entries at the chosen level', () => {
		const items = fallbackAnswer(entries, 'architect', 3);
		expect(items.map((i) => i.id)).toEqual(['recycle-bin', 'hub-site', 'sharepoint-add-in']);
		expect(items[0].text).toBe('Recycle Bin for architects.');
	});

	it('detects devices that cannot run the model', async () => {
		expect(await checkOnDeviceModel({})).toEqual({ ok: false, reason: 'no-webgpu' });
		expect(await checkOnDeviceModel({ gpu: { requestAdapter: async () => null } })).toEqual({ ok: false, reason: 'no-adapter' });
		expect(await checkOnDeviceModel({ gpu: { requestAdapter: async () => ({}) }, deviceMemory: 2 })).toEqual({ ok: false, reason: 'low-memory' });
		expect(await checkOnDeviceModel({ gpu: { requestAdapter: async () => ({}) }, deviceMemory: 8 })).toEqual({ ok: true });
	});
});

describe('drawsOn', () => {
	const real: AskEntry[] = [
		entry('sharepoint-add-in', 'SharePoint Add-in', {
			levels: { beginner: 'Add-ins stopped working in SharePoint Online on 2 April 2026, so extras are built with the SharePoint Framework.' },
		}),
		entry('recycle-bin', 'Recycle Bin', { levels: { beginner: 'Deleted items wait here for ninety three days before they are gone.' } }),
	];

	it('finds the entries whose wording an uncited answer reuses', () => {
		const answer = 'No. Add-ins stopped working in SharePoint Online on 2 April 2026. Newer extras use the SharePoint Framework.';
		expect(drawsOn(answer, real)).toEqual(['sharepoint-add-in']);
	});

	it('returns nothing when the answer shares no wording with any entry', () => {
		expect(drawsOn('Bananas are yellow fruit', real)).toEqual([]);
		expect(drawsOn('', real)).toEqual([]);
	});
});
