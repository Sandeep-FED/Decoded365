import type { StylesheetJson } from 'cytoscape';
import { PRODUCT_GRAPH_COLOURS } from '@/lib/glossary/labels';

const ACCENT = '#0ea5e9';

/**
 * Cytoscape stylesheet. The canvas can't read CSS variables, so colours are chosen per theme.
 * Edge labels only appear for the selected term's relationships, which keeps the map readable.
 */
export function graphStyle(dark: boolean): StylesheetJson {
	const text = dark ? '#e5e5e5' : '#171717';
	const edge = dark ? '#737373' : '#a3a3a3';

	return [
		{
			selector: 'node',
			style: {
				label: 'data(label)',
				color: text,
				// Hubs get bigger labels, and labels that would render too small are hidden until you zoom in
				// or select a term (its neighbourhood is exempt, see `.neighbour`).
				'font-size': 'mapData(degree, 0, 10, 12, 20)',
				'min-zoomed-font-size': 9,
				'text-valign': 'bottom',
				'text-margin-y': 5,
				'text-outline-width': 3,
				'text-outline-color': dark ? '#0a0a0a' : '#ffffff',
				'background-color': (el: cytoscape.NodeSingular) =>
					PRODUCT_GRAPH_COLOURS[el.data('product') as keyof typeof PRODUCT_GRAPH_COLOURS],
				width: 'mapData(degree, 0, 8, 16, 34)',
				height: 'mapData(degree, 0, 8, 16, 34)',
				'border-width': 0,
				'transition-property': 'opacity, border-width',
				'transition-duration': 150,
			},
		},
		{
			selector: 'node[?legacy]',
			style: { opacity: 0.65, 'border-width': 2, 'border-style': 'dashed', 'border-color': text },
		},
		{
			selector: 'edge',
			style: {
				width: 1.25,
				'line-color': edge,
				'target-arrow-color': edge,
				'target-arrow-shape': 'triangle',
				'curve-style': 'bezier',
				'font-size': 11,
				color: text,
				'text-background-color': dark ? '#0a0a0a' : '#ffffff',
				'text-background-opacity': 0.85,
				'text-background-padding': '2px',
				'text-rotation': 'autorotate',
			},
		},
		{ selector: 'edge[?symmetric]', style: { 'target-arrow-shape': 'none', 'line-style': 'dashed' } },
		{ selector: '.faded', style: { opacity: 0.12, 'text-opacity': 0.2 } },
		{ selector: 'edge.active', style: { label: 'data(label)', width: 2.5, 'line-color': ACCENT, 'target-arrow-color': ACCENT } },
		{ selector: 'node.neighbour', style: { 'min-zoomed-font-size': 0 } },
		{ selector: 'node.selected', style: { 'border-width': 4, 'border-style': 'solid', 'border-color': ACCENT, opacity: 1 } },
		{ selector: '.filtered-out', style: { display: 'none' } },
	];
}
