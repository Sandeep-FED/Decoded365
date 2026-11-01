import { describe, expect, it } from 'vitest';
import { toElements, type MapNode } from '@/lib/graph/map-elements';

const node = (id: string): MapNode => ({
	id,
	label: id,
	product: 'sharepoint',
	status: 'ga',
	href: `/terms/${id}/`,
	summary: '',
	legacy: false,
});

describe('toElements', () => {
	const elements = toElements(
		[node('a'), node('b'), node('c')],
		[
			{ source: 'a', target: 'b', type: 'requires' },
			{ source: 'a', target: 'c', type: 'often-confused-with' },
			{ source: 'c', target: 'a', type: 'often-confused-with' },
		],
	);
	const edges = elements.filter((e) => e.group === 'edges');
	const nodes = elements.filter((e) => e.group === 'nodes');

	it('merges a symmetric relation declared on both sides into one edge', () => {
		expect(edges).toHaveLength(2);
		expect(edges.find((e) => e.data.target === 'c')?.data.symmetric).toBe(true);
	});

	it('counts connections per node for sizing', () => {
		const degree = Object.fromEntries(nodes.map((n) => [n.data.id, n.data.degree]));
		expect(degree).toEqual({ a: 2, b: 1, c: 1 });
	});

	it('writes edge labels without hyphens', () => {
		expect(edges.map((e) => e.data.label)).toContain('often confused with');
	});
});
