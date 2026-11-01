import { describe, expect, it } from 'vitest';
import { splitFrontmatter } from '@/lib/content/frontmatter';
import { extractLevels, missingLevels } from '@/lib/content/levels';
import { findWikiLinks, replaceWikiLinks } from '@/lib/content/wikilinks';
import { findExternalLinks } from '@/lib/content/external-links';
import { firstParagraph } from '@/lib/content/summary';
import { validateCorpus, type CorpusEntry } from '@/lib/content/validate';
import { Term } from '@/schema/term';

const BODY = `## Beginner
Plain words about a [[other-term]].

## Maker
Second paragraph.

## Architect
Details.
`;

function entry(overrides: Record<string, unknown> = {}, body = BODY, where = 'a.md'): CorpusEntry {
	const data = Term.parse({
		id: 'some-term',
		term: 'Some Term',
		product: 'sharepoint',
		category: 'sites',
		status: 'ga',
		origins: [{ source: 'src', use: 'facts-only' }],
		lastReviewed: '2026-11-01',
		reviewers: ['sandeepps'],
		...overrides,
	});
	return { data, body, where };
}
const other = () => entry({ id: 'other-term', term: 'Other Term' }, BODY.replace('[[other-term]]', 'thing'), 'b.md');
const sources = new Set(['src']);
const messages = (entries: CorpusEntry[]) => validateCorpus(entries, sources).map((i) => i.message);

describe('splitFrontmatter', () => {
	it('separates YAML data from the body', () => {
		const { data, body } = splitFrontmatter('---\nid: x\n---\n## Beginner\nHi');
		expect(data).toEqual({ id: 'x' });
		expect(body).toBe('## Beginner\nHi');
	});

	it('throws without front matter', () => {
		expect(() => splitFrontmatter('# nothing')).toThrow(/front matter/i);
	});
});

describe('extractLevels', () => {
	it('returns each level section trimmed', () => {
		const levels = extractLevels(BODY);
		expect(levels.beginner).toContain('Plain words');
		expect(levels.maker).toBe('Second paragraph.');
		expect(levels.architect).toBe('Details.');
	});

	it('reports missing and empty levels', () => {
		expect(missingLevels(extractLevels('## Beginner\nOnly this\n\n## Maker\n'))).toEqual(['maker', 'architect']);
	});
});

describe('wiki links', () => {
	it('finds and replaces [[ids]], leaving unknown ids untouched', () => {
		expect(findWikiLinks('See [[a-b]] and [[c]].')).toEqual(['a-b', 'c']);
		const out = replaceWikiLinks('See [[a-b]] and [[zzz]].', (id) =>
			id === 'a-b' ? { label: 'A B', href: '/terms/a-b/' } : undefined,
		);
		expect(out).toBe('See [A B](/terms/a-b/) and [[zzz]].');
	});
});

describe('external link detection', () => {
	it.each([
		'Visit https://example.com now',
		'go to www.example.com',
		'<a href="/x">x</a>',
		'[mail](mailto:a@b.c)',
		'[site](http://example.com)',
	])('flags %s', (text) => {
		expect(findExternalLinks(text).length).toBeGreaterThan(0);
	});

	it('allows internal links and plain prose', () => {
		expect(findExternalLinks('See [a term](/terms/x/) and [section](#top). Use HTTP carefully.')).toEqual([]);
	});
});

describe('summary', () => {
	it('returns the first paragraph without Markdown', () => {
		expect(firstParagraph('A **bold** [[x]] and [link](/y).\n\nSecond.')).toBe('A bold x and link.');
	});
});

describe('validateCorpus', () => {
	it('accepts a consistent corpus', () => {
		expect(messages([entry(), other()])).toEqual([]);
	});

	it('flags duplicate ids and duplicate names', () => {
		const dupe = entry({ id: 'some-term', term: 'Different' }, BODY.replace('[[other-term]]', 'x'), 'c.md');
		expect(messages([entry(), other(), dupe]).join('\n')).toMatch(/Duplicate id/);

		const alias = entry({ id: 'third', term: 'Third', aliases: ['other term'] }, BODY.replace('[[other-term]]', 'x'), 'd.md');
		expect(messages([entry(), other(), alias]).join('\n')).toMatch(/possible duplicate/);
	});

	it('flags missing levels unless partial', () => {
		const missing = entry({ id: 'm', term: 'Missing' }, '## Beginner\nOnly');
		expect(messages([missing, other()]).join('\n')).toMatch(/Missing level/);
		const partial = entry({ id: 'm', term: 'Missing', levels: 'partial' }, '## Beginner\nOnly');
		expect(messages([partial, other()])).toEqual([]);
	});

	it('flags unknown wiki links, relations and sources', () => {
		const bad = entry(
			{
				related: [{ id: 'nope', type: 'requires' }],
				origins: [{ source: 'unknown', use: 'adapted' }],
			},
			BODY.replace('[[other-term]]', '[[ghost]]'),
		);
		const text = messages([bad, other()]).join('\n');
		expect(text).toMatch(/\[\[ghost\]\]/);
		expect(text).toMatch(/Relation target "nope"/);
		expect(text).toMatch(/Unknown source "unknown"/);
	});

	it('flags external links and retired terms without a retired block', () => {
		const bad = entry({ status: 'retired' }, BODY.replace('[[other-term]]', 'see https://example.com'));
		const text = messages([bad, other()]).join('\n');
		expect(text).toMatch(/External link/);
		expect(text).toMatch(/needs a "retired" block/);
	});
});
