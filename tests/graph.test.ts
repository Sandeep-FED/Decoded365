import { describe, expect, it } from 'vitest';
import { buildGraph, type GraphTermInput } from '@/lib/graph/build-graph';
import { neighbourhood } from '@/lib/graph/neighbourhood';
import { relationLabel } from '@/lib/graph/relation-labels';
import { radialLayout } from '@/lib/graph/radial-layout';
import { groupByLetter } from '@/lib/glossary/group-by-letter';
import { isLegacy } from '@/lib/glossary/legacy';

const t = (id: string, related: GraphTermInput['related'] = []): GraphTermInput => ({
	id,
	term: id.toUpperCase(),
	product: 'sharepoint',
	status: 'ga',
	related,
});

describe('graph', () => {
	const graph = buildGraph([
		t('a', [
			{ id: 'b', type: 'requires' },
			{ id: 'c', type: 'often-confused-with' },
			{ id: 'missing', type: 'part-of' },
		]),
		t('b'),
		t('c', [{ id: 'a', type: 'often-confused-with' }]),
		t('d', [{ id: 'a', type: 'part-of' }]),
	]);

	it('drops edges to unknown terms', () => {
		expect(graph.edges.map((e) => e.target)).not.toContain('missing');
	});

	it('returns outgoing and incoming neighbours, showing symmetric relations once', () => {
		const result = neighbourhood(graph, 'a').map((n) => `${n.node.id}:${n.type}:${n.direction}`);
		expect(result.sort()).toEqual(['b:requires:out', 'c:often-confused-with:out', 'd:part-of:in']);
	});

	it('labels relations from the page term’s point of view', () => {
		expect(relationLabel('part-of', 'out')).toBe('Part of');
		expect(relationLabel('part-of', 'in')).toBe('Contains');
		expect(relationLabel('replaced-by', 'in')).toBe('Replaces');
	});
});

describe('radialLayout', () => {
	it('places the first point at the top and spaces points evenly', () => {
		const [p0, p1] = radialLayout(2, 10, { x: 0, y: 0 });
		expect(p0.x).toBeCloseTo(0);
		expect(p0.y).toBeCloseTo(-10);
		expect(p1.y).toBeCloseTo(10);
	});
});

describe('glossary helpers', () => {
	it('groups by first letter, sorted, with # for non-letters', () => {
		const groups = groupByLetter(['beta', 'Alpha', '365 thing', 'apple'], (s) => s);
		expect(groups.map((g) => g.letter)).toEqual(['#', 'A', 'B']);
		expect(groups[1].items).toEqual(['Alpha', 'apple']);
	});

	it('treats legacy, retired and server-only terms as legacy', () => {
		expect(isLegacy({ status: 'ga' })).toBe(false);
		expect(isLegacy({ status: 'legacy' })).toBe(true);
		expect(isLegacy({ status: 'retired' })).toBe(true);
		expect(isLegacy({ status: 'ga', appliesTo: ['sharepoint-server'] })).toBe(true);
		expect(isLegacy({ status: 'ga', appliesTo: ['sharepoint-online', 'sharepoint-server'] })).toBe(false);
	});
});
