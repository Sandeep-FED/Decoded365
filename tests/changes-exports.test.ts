import { describe, expect, it } from 'vitest';
import { buildChangeLog, filterChanges, yearOf } from '@/lib/glossary/changes';
import { csvField, toAnki, toCsv } from '@/lib/glossary/exports';
import { parseGitHistory, termChanges } from '@/lib/glossary/history';
import { buildAtom, xmlEscape } from '@/lib/glossary/feed';
import { compareRows, findTerms, type CompareTerm } from '@/lib/glossary/compare-data';
import type { GlossaryTerm } from '@/lib/glossary/term-model';

const term = (over: Partial<GlossaryTerm> & Pick<GlossaryTerm, 'id' | 'term'>): GlossaryTerm =>
	({
		aliases: [],
		product: 'sharepoint',
		category: 'sites',
		status: 'ga',
		renamed: [],
		related: [],
		origins: [{ source: 's', use: 'terms-only' }],
		levels: 'complete',
		lastReviewed: new Date('2026-11-02T00:00:00Z'),
		reviewers: ['x'],
		levelSections: { beginner: 'Plain, with "quotes".', maker: 'Uses [[hub]].', architect: 'Deep\nline' },
		summary: 'Plain',
		legacy: false,
		...over,
	}) as GlossaryTerm;

const terms = [
	term({ id: 'hub', term: 'Hub site' }),
	term({
		id: 'add-in',
		term: 'SharePoint Add-in',
		status: 'retired',
		retired: { date: '2026-04-02', where: 'SharePoint Online', replacedBy: 'hub' },
		renamed: [{ from: 'app for SharePoint', to: 'SharePoint Add-in', date: null }],
	}),
	term({ id: 'chat', term: 'Copilot Chat', product: 'copilot', renamed: [{ from: 'Bing Chat Enterprise', to: 'Copilot Chat', date: '2024-12' }] }),
];

describe('buildChangeLog', () => {
	const log = buildChangeLog(terms);

	it('lists renames and retirements, newest first, undated last', () => {
		expect(log.map((e) => `${e.kind}:${e.termId}:${e.date}`)).toEqual(['retired:add-in:2026-04-02', 'renamed:chat:2024-12', 'renamed:add-in:null']);
	});

	it('names what replaced a retired term', () => {
		expect(log[0].replacedBy).toBe('Hub site');
	});

	it('groups by year, or says the date is not stated', () => {
		expect(yearOf(log[0])).toBe('2026');
		expect(yearOf(log[2])).toBe('Date not stated');
	});
});

describe('filterChanges', () => {
	const log = buildChangeLog(terms);
	const base = { query: '', product: 'all', kind: 'all' as const };

	it('filters by product and kind', () => {
		expect(filterChanges(log, { ...base, product: 'copilot' }).map((e) => e.termId)).toEqual(['chat']);
		expect(filterChanges(log, { ...base, kind: 'retired' }).map((e) => e.termId)).toEqual(['add-in']);
	});

	it('searches old and new names', () => {
		expect(filterChanges(log, { ...base, query: 'bing' }).map((e) => e.termId)).toEqual(['chat']);
		expect(filterChanges(log, { ...base, query: 'nothing here' })).toEqual([]);
	});
});

describe('csv and Anki exports', () => {
	it('quotes fields that hold commas, quotes or line breaks', () => {
		expect(csvField('plain')).toBe('plain');
		expect(csvField('a,b')).toBe('"a,b"');
		expect(csvField('say "hi"')).toBe('"say ""hi"""');
		expect(csvField('two\nlines')).toBe('"two\nlines"');
	});

	it('writes a header and one row per term with plain-text levels', () => {
		const lines = toCsv(terms, (id) => `/terms/${id}/`).split('\r\n');
		expect(lines[0]).toBe('id,term,aliases,product,category,status,applies_to,beginner,maker,architect,related,url');
		expect(lines).toHaveLength(5); // header, three terms, trailing break
		expect(lines[1]).toContain('"Plain, with ""quotes""."');
		expect(lines[1]).toContain('Uses Hub site.'); // [[hub]] resolved to its name
	});

	it('writes tab-separated Anki cards with HTML on and tags', () => {
		const out = toAnki(terms, (id) => `/terms/${id}/`).split('\n');
		expect(out.slice(0, 2)).toEqual(['#separator:tab', '#html:true']);
		const card = out.find((l) => l.startsWith('<b>Hub site</b>'))!;
		expect(card.split('\t')).toHaveLength(3);
		expect(card).toContain('whatsitcalled sharepoint ga');
		expect(card).not.toContain('\n');
		expect(card).toContain('Whatsitcalled, CC BY 4.0');
	});
});

describe('git history', () => {
	const log = ['@2026-11-02T10:00:00+05:30', 'M\tcontent/terms/sharepoint/a.md', 'A\tcontent/terms/copilot/b.md', '', '@2026-11-01T09:00:00+05:30', 'A\tcontent/terms/sharepoint/a.md'].join('\n');
	const history = parseGitHistory(log);

	it('takes the newest change as updated and the oldest add as added', () => {
		expect(history.get('content/terms/sharepoint/a.md')).toEqual({ added: '2026-11-01', updated: '2026-11-02' });
		expect(history.get('content/terms/copilot/b.md')).toEqual({ added: '2026-11-02', updated: '2026-11-02' });
	});

	it('falls back to the review date when git does not know a term', () => {
		const changes = termChanges([term({ id: 'a', term: 'A' }), term({ id: 'zzz', term: 'Z' })], history);
		expect(changes[0]).toMatchObject({ added: '2026-11-01', updated: '2026-11-02' });
		expect(changes[1]).toMatchObject({ added: '2026-11-02', updated: '2026-11-02' });
		expect(termChanges([term({ id: 'a', term: 'A' })], null)[0].added).toBe('2026-11-02');
	});
});

describe('buildAtom', () => {
	const xml = buildAtom(
		{ title: 'Whatsitcalled <new>', subtitle: 'sub', homeUrl: 'https://x.test/', feedUrl: 'https://x.test/feed.xml' },
		[
			{ id: 'https://x.test/terms/a/', title: 'New: A & B', url: 'https://x.test/terms/a/', updated: '2026-11-01', summary: 'It\'s "fine"' },
			{ id: 'https://x.test/terms/b/', title: 'Updated: B', url: 'https://x.test/terms/b/', updated: '2026-11-03', summary: '' },
		],
	);

	it('escapes text and dates entries as midnight UTC', () => {
		expect(xmlEscape('<a & "b">')).toBe('&lt;a &amp; &quot;b&quot;&gt;');
		expect(xml).toContain('<title>Whatsitcalled &lt;new&gt;</title>');
		expect(xml).toContain('New: A &amp; B');
		expect(xml).toContain('<updated>2026-11-01T00:00:00Z</updated>');
	});

	it('uses the newest entry as the feed date', () => {
		expect(xml).toMatch(/<\/subtitle>[\s\S]*<updated>2026-11-03T00:00:00Z<\/updated>\n {2}<entry>/);
	});
});

describe('compare data', () => {
	const t = (id: string, name: string, over: Partial<CompareTerm> = {}): CompareTerm => ({
		id,
		term: name,
		aliases: [],
		product: 'sharepoint',
		status: 'ga',
		renamed: [],
		related: [],
		levels: { beginner: `${name} basics`, maker: `Maker [[${id}]]` },
		...over,
	});
	const list = [t('dataverse-table', 'Dataverse table', { aliases: ['entity'] }), t('sharepoint-list', 'SharePoint list'), t('list-view', 'List view')];

	it('finds terms by name, alias or old name, best matches first', () => {
		expect(findTerms(list, 'list').map((x) => x.id)).toEqual(['list-view', 'sharepoint-list']);
		expect(findTerms(list, 'entity').map((x) => x.id)).toEqual(['dataverse-table']);
		expect(findTerms(list, '  ')).toEqual([]);
	});

	it('shows every level and leaves out empty rows', () => {
		const rows = compareRows(list[0], list[1], (id) => list.find((x) => x.id === id)?.term);
		expect(rows.map((r) => r.label)).toEqual(['Beginner', 'Maker', 'Also known as']);
		expect(rows[1].left).toBe('Maker Dataverse table');
	});
});
