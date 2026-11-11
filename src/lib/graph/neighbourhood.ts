import type { RelationTypeName } from '@/schema/term';
import type { Graph, GraphNode } from './build-graph';
import { SYMMETRIC, type Direction } from './relation-labels';

export interface Neighbour {
	node: GraphNode;
	type: RelationTypeName;
	direction: Direction;
}

/** The 1-hop neighbours of a term: outgoing and incoming relations. */
export function neighbourhood(graph: Graph, id: string): Neighbour[] {
	const nodes = new Map(graph.nodes.map((n) => [n.id, n]));
	const seen = new Set<string>();
	const result: Neighbour[] = [];

	const add = (otherId: string, type: RelationTypeName, direction: Direction) => {
		const node = nodes.get(otherId);
		if (!node || otherId === id) return;
		// A symmetric relation declared on both sides is shown once.
		const effective = SYMMETRIC.has(type) ? 'out' : direction;
		const key = `${otherId}|${type}|${effective}`;
		if (seen.has(key)) return;
		seen.add(key);
		result.push({ node, type, direction: effective });
	};

	for (const edge of graph.edges) {
		if (edge.source === id) add(edge.target, edge.type, 'out');
		else if (edge.target === id) add(edge.source, edge.type, 'in');
	}
	return result;
}
