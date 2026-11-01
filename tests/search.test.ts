import { describe, expect, it } from 'vitest';
import { createSearchEngine } from '@/lib/search/engine';
import type { SearchDocument } from '@/lib/search/documents';

const doc = (over: Partial<SearchDocument> & Pick<SearchDocument, 'id' | 'term'>): SearchDocument => ({
	aliases: [],
	renames: [],
	summary: '',
	text: '',
	product: 'sharepoint',
	status: 'ga',
	legacy: false,
	...over,
});

const docs: SearchDocument[] = [
	doc({
		id: 'recycle-bin',
		term: 'Recycle Bin',
		aliases: ['second-stage Recycle Bin'],
		summary: 'Where deleted files wait before they are gone for good.',
		text: 'Deleted items are kept for 93 days.',
	}),
	doc({
		id: 'sharepoint-add-in',
		term: 'SharePoint Add-in',
		aliases: ['add-in'],
		renames: [{ from: 'app for SharePoint', to: 'SharePoint Add-in', date: null }],
		status: 'retired',
		legacy: true,
	}),
	doc({
		id: 'onedrive',
		term: 'OneDrive',
		renames: [{ from: 'OneDrive for Business', to: 'OneDrive', date: '2025-10' }],
	}),
	doc({ id: 'hub-site', term: 'Hub site', summary: 'Links related sites together.' }),
];

describe('search engine', () => {
	it('finds a term by its name, including a prefix', async () => {
		const engine = await createSearchEngine(docs);
		expect((await engine.search('recycle'))[0].doc.id).toBe('recycle-bin');
		expect((await engine.search('hub si'))[0].doc.id).toBe('hub-site');
	});

	it('finds a term by what it means, using summary and body text', async () => {
		const engine = await createSearchEngine(docs);
		expect((await engine.search('deleted files gone for good'))[0].doc.id).toBe('recycle-bin');
	});

	it('lands on the current term from an old name and reports the rename', async () => {
		const engine = await createSearchEngine(docs);
		const [first] = await engine.search('app for SharePoint');
		expect(first.doc.id).toBe('sharepoint-add-in');
		expect(first.matchedName).toMatchObject({ kind: 'old-name', name: 'app for SharePoint' });

		const [onedrive] = await engine.search('OneDrive for Business');
		expect(onedrive.doc.id).toBe('onedrive');
		expect(onedrive.matchedName?.rename?.date).toBe('2025-10');
	});

	it('returns nothing for an empty query and tolerates a typo', async () => {
		const engine = await createSearchEngine(docs);
		expect(await engine.search('   ')).toEqual([]);
		expect((await engine.search('recyle bin'))[0]?.doc.id).toBe('recycle-bin');
	});
});

describe('stop words', () => {
	it('ignores filler words but keeps queries that are only filler', async () => {
		const { meaningfulWords } = await import('@/lib/search/engine');
		expect(meaningfulWords('where do the deleted files go')).toBe('deleted files go');
		expect(meaningfulWords('what is a')).toBe('what is a');
	});
});

describe('exact names', () => {
	it('puts the term whose old name was typed exactly ahead of chattier entries', async () => {
		const engine = await createSearchEngine([
			doc({ id: 'agent', term: 'Agent', summary: 'An agent is an assistant. Agents use virtual power and many agents.', text: 'power virtual agents agents agents' }),
			doc({ id: 'studio', term: 'Copilot Studio', aliases: ['Power Virtual Agents'], renames: [{ from: 'Power Virtual Agents', to: 'Copilot Studio', date: null }], summary: 'Build agents.' }),
		]);
		expect((await engine.search('Power Virtual Agents'))[0].doc.id).toBe('studio');
	});
});
