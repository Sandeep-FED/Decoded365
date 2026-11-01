import { useEffect, useMemo, useRef, useState } from 'react';
import type { Core } from 'cytoscape';
import MapToolbar from './MapToolbar';
import NodeDetails from './NodeDetails';
import type { GraphEdge } from '@/lib/graph/build-graph';
import { toElements, type MapNode } from '@/lib/graph/map-elements';
import { graphStyle } from '@/lib/graph/map-style';
import { neighbourhood } from '@/lib/graph/neighbourhood';

interface Props {
	nodes: MapNode[];
	edges: GraphEdge[];
	products: { value: string; label: string; available: boolean }[];
}

// Strong repulsion and overlap avoidance keep labels readable; fit makes the graph fill the canvas.
const LAYOUT = {
	name: 'cose',
	nodeRepulsion: () => 140000,
	idealEdgeLength: () => 85,
	nodeOverlap: 30,
	componentSpacing: 50,
	gravity: 1.2,
	numIter: 1500,
	fit: true,
	padding: 40,
} as const;
const isDark = () => document.documentElement.classList.contains('dark');
const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Full-site related-terms map (Cytoscape.js). Select a term to highlight its connections and
 * read about it in the side panel; double-click to open it. Everything the canvas offers is
 * also reachable by keyboard through the find box and the panel.
 */
export default function GraphExplorer({ nodes, edges, products }: Props) {
	const container = useRef<HTMLDivElement>(null);
	const cyRef = useRef<Core | null>(null);
	const [product, setProduct] = useState('all');
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const graph = useMemo(() => ({ nodes, edges }), [nodes, edges]);
	const selected = nodes.find((n) => n.id === selectedId) ?? null;
	const neighbours = useMemo(() => (selectedId ? neighbourhood(graph, selectedId) : []), [graph, selectedId]);

	// Create the canvas once.
	useEffect(() => {
		let disposed = false;
		let observer: MutationObserver | undefined;

		(async () => {
			const { default: cytoscape } = await import('cytoscape');
			if (disposed || !container.current) return;

			const cy = cytoscape({
				container: container.current,
				elements: toElements(nodes, edges),
				style: graphStyle(isDark()),
				layout: { ...LAYOUT, animate: !prefersReducedMotion() },
				minZoom: 0.3,
				maxZoom: 3,
				wheelSensitivity: 0.3,
			});
			cyRef.current = cy;

			cy.on('tap', 'node', (event) => setSelectedId(event.target.id()));
			cy.on('tap', (event) => event.target === cy && setSelectedId(null));
			cy.on('dbltap', 'node', (event) => {
				window.location.href = event.target.data('href');
			});
			cy.on('mouseover', 'node', () => container.current && (container.current.style.cursor = 'pointer'));
			cy.on('mouseout', 'node', () => container.current && (container.current.style.cursor = 'default'));

			observer = new MutationObserver(() => cy.style(graphStyle(isDark())));
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		})();

		return () => {
			disposed = true;
			observer?.disconnect();
			cyRef.current?.destroy();
			cyRef.current = null;
		};
	}, [nodes, edges]);

	// Highlight the selection and its connections; centre on it.
	useEffect(() => {
		const cy = cyRef.current;
		if (!cy) return;
		cy.batch(() => {
			cy.elements().removeClass('faded selected active');
			if (!selectedId) return;
			const node = cy.getElementById(selectedId);
			if (node.empty()) return;
			const around = node.closedNeighborhood();
			cy.elements().not(around).addClass('faded');
			node.addClass('selected');
			node.connectedEdges().addClass('active');
		});
		const node = cy.getElementById(selectedId ?? '');
		if (node.nonempty()) {
			cy.animate({ center: { eles: node }, zoom: Math.max(cy.zoom(), 1) }, { duration: prefersReducedMotion() ? 0 : 300 });
		}
	}, [selectedId]);

	// Product filter: hide other products and re-run the layout on what's left.
	useEffect(() => {
		const cy = cyRef.current;
		if (!cy) return;
		cy.batch(() => {
			cy.nodes().forEach((n) => {
				n.toggleClass('filtered-out', product !== 'all' && n.data('product') !== product);
			});
		});
		cy.elements(':visible').layout({ ...LAYOUT, animate: !prefersReducedMotion() }).run();
		// Drop the selection if its term was just filtered out.
		setSelectedId((id) => (id && product !== 'all' && nodes.find((n) => n.id === id)?.product !== product ? null : id));
	}, [product, nodes]);

	const zoomBy = (factor: number) => {
		const cy = cyRef.current;
		if (cy) cy.zoom({ level: cy.zoom() * factor, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
	};

	return (
		<div className="space-y-3">
			<MapToolbar
				nodes={nodes}
				product={product}
				onProductChange={setProduct}
				products={products}
				onFindNode={setSelectedId}
				onZoomIn={() => zoomBy(1.3)}
				onZoomOut={() => zoomBy(1 / 1.3)}
				onFit={() => cyRef.current?.fit(undefined, 40)}
			/>
			<div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
				<div
					ref={container}
					role="img"
					aria-label="Map of how glossary terms relate. Use the find box and the details panel to explore with a keyboard, or the list below the map."
					className="h-[34rem] w-full rounded-xl border bg-card/70 backdrop-blur-sm"
				/>
				<aside aria-live="polite" aria-label="Selected term" className="min-h-48 rounded-xl border bg-card/70 backdrop-blur-sm lg:h-[34rem] lg:overflow-y-auto">
					<NodeDetails node={selected} neighbours={neighbours} onSelect={setSelectedId} />
				</aside>
			</div>
		</div>
	);
}
