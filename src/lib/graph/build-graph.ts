import type { ProductName, RelationTypeName, StatusName } from '@/schema/term';

export interface GraphTermInput {
	id: string;
	term: string;
	product: ProductName;
	status: StatusName;
	related: { id: string; type: RelationTypeName }[];
}

export interface GraphNode {
	id: string;
	label: string;
	product: ProductName;
	status: StatusName;
}

export interface GraphEdge {
	source: string;
	target: string;
	type: RelationTypeName;
}

export interface Graph {
	nodes: GraphNode[];
	edges: GraphEdge[];
}

/** Build the typed related-terms graph from each term's `related` field (BRD F5). Unknown targets are dropped. */
export function buildGraph(terms: GraphTermInput[]): Graph {
	const known = new Set(terms.map((t) => t.id));
	return {
		nodes: terms.map(({ id, term, product, status }) => ({ id, label: term, product, status })),
		edges: terms.flatMap((t) =>
			t.related.filter((r) => known.has(r.id)).map((r) => ({ source: t.id, target: r.id, type: r.type })),
		),
	};
}
