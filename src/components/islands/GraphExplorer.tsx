import { useEffect, useRef, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { GraphEdge, GraphNode } from '@/lib/graph/build-graph';
import { PRODUCT_GRAPH_COLOURS } from '@/lib/glossary/labels';

interface Props {
	nodes: (GraphNode & { href: string })[];
	edges: GraphEdge[];
	products: { value: string; label: string; available: boolean }[];
}

/** Full-site related-terms map (Cytoscape.js), filterable by product. A text list alternative is on the page. */
export default function GraphExplorer({ nodes, edges, products }: Props) {
	const container = useRef<HTMLDivElement>(null);
	const [product, setProduct] = useState('all');

	useEffect(() => {
		let destroy = () => {};
		(async () => {
			const { default: cytoscape } = await import('cytoscape');
			if (!container.current) return;

			const visible = new Set(nodes.filter((n) => product === 'all' || n.product === product).map((n) => n.id));
			const dark = document.documentElement.classList.contains('dark');
			const text = dark ? '#e5e5e5' : '#171717';
			const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

			const cy = cytoscape({
				container: container.current,
				elements: [
					...nodes
						.filter((n) => visible.has(n.id))
						.map((n) => ({ data: { id: n.id, label: n.label, product: n.product, status: n.status, href: n.href } })),
					...edges
						.filter((e) => visible.has(e.source) && visible.has(e.target))
						.map((e, i) => ({ data: { id: `e${i}`, source: e.source, target: e.target, label: e.type } })),
				],
				layout: { name: 'cose', animate: !reduceMotion, nodeRepulsion: () => 9000, idealEdgeLength: () => 90 },
				style: [
					{
						selector: 'node',
						style: {
							label: 'data(label)',
							color: text,
							'font-size': 11,
							'text-valign': 'bottom',
							'text-margin-y': 4,
							'background-color': (el: cytoscape.NodeSingular) =>
								PRODUCT_GRAPH_COLOURS[el.data('product') as keyof typeof PRODUCT_GRAPH_COLOURS],
							width: 18,
							height: 18,
						},
					},
					{ selector: 'node[status = "retired"], node[status = "legacy"]', style: { opacity: 0.6, 'border-width': 2, 'border-style': 'dashed', 'border-color': text } },
					{
						selector: 'edge',
						style: {
							width: 1.5,
							'line-color': '#a3a3a3',
							'target-arrow-color': '#a3a3a3',
							'target-arrow-shape': 'triangle',
							'curve-style': 'bezier',
							label: 'data(label)',
							'font-size': 8,
							color: text,
							'text-rotation': 'autorotate',
						},
					},
				],
			});

			cy.on('tap', 'node', (event) => {
				window.location.href = event.target.data('href');
			});
			destroy = () => cy.destroy();
		})();
		return () => destroy();
	}, [nodes, edges, product]);

	return (
		<div className="space-y-3">
			<ToggleGroup type="single" value={product} aria-label="Filter the map by product" onValueChange={(v) => v && setProduct(v)}>
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				{products.map((p) => (
					<ToggleGroupItem key={p.value} value={p.value} disabled={!p.available}>
						{p.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<div
				ref={container}
				role="img"
				aria-label="Map of how glossary terms relate. A keyboard-friendly list of the same relationships follows."
				className="h-[560px] w-full rounded-xl border bg-card"
			/>
		</div>
	);
}
