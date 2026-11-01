import type { ElementDefinition } from 'cytoscape';
import type { GraphEdge, GraphNode } from './build-graph';
import { SYMMETRIC } from './relation-labels';

/** A graph node plus what the map UI shows when it is selected. */
export interface MapNode extends GraphNode {
	href: string;
	summary: string;
	legacy: boolean;
}

/**
 * Cytoscape elements for the explorer. Node size follows how connected a term is.
 * A symmetric relation declared on both sides ("often confused with") becomes one edge.
 */
export function toElements(nodes: MapNode[], edges: GraphEdge[]): ElementDefinition[] {
	const degree = new Map<string, number>();
	const seen = new Set<string>();
	const unique: GraphEdge[] = [];

	for (const edge of edges) {
		const key = SYMMETRIC.has(edge.type)
			? `${[edge.source, edge.target].sort().join('|')}|${edge.type}`
			: `${edge.source}|${edge.target}|${edge.type}`;
		if (seen.has(key)) continue;
		seen.add(key);
		unique.push(edge);
		degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
		degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
	}

	return [
		...nodes.map((n) => ({
			group: 'nodes' as const,
			data: {
				id: n.id,
				label: n.label,
				product: n.product,
				status: n.status,
				href: n.href,
				legacy: n.legacy,
				degree: degree.get(n.id) ?? 0,
			},
		})),
		...unique.map((e, i) => ({
			group: 'edges' as const,
			data: {
				id: `edge-${i}`,
				source: e.source,
				target: e.target,
				label: e.type.replaceAll('-', ' '),
				symmetric: SYMMETRIC.has(e.type),
			},
		})),
	];
}
