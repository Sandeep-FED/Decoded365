import type { AppliesToName, ProductName, StatusName } from '@/schema/term';

export const PRODUCT_LABELS: Record<ProductName, string> = {
	sharepoint: 'SharePoint',
	'power-platform': 'Power Platform',
	copilot: 'Copilot',
	'cross-platform': 'Cross-platform',
};

/** Products with published content. Others show as "coming soon" (v1.1, v1.2). */
export const AVAILABLE_PRODUCTS: ProductName[] = ['sharepoint'];

export const STATUS_LABELS: Record<StatusName, string> = {
	ga: 'Generally available',
	preview: 'Preview',
	legacy: 'Legacy',
	retired: 'Retired',
};

export const APPLIES_TO_LABELS: Record<AppliesToName, string> = {
	'sharepoint-online': 'SharePoint Online',
	'sharepoint-server': 'SharePoint Server',
};

/** Tailwind classes per product / status, using the theme tokens in global.css. */
export const PRODUCT_CLASSES: Record<ProductName, string> = {
	sharepoint: 'border-sharepoint/40 text-sharepoint',
	'power-platform': 'border-power-platform/40 text-power-platform',
	copilot: 'border-copilot/40 text-copilot',
	'cross-platform': 'border-cross-platform/40 text-cross-platform',
};

export const STATUS_CLASSES: Record<StatusName, string> = {
	ga: 'border-status-ga/40 text-status-ga',
	preview: 'border-status-preview/40 text-status-preview',
	legacy: 'border-status-legacy/40 text-status-legacy',
	retired: 'border-status-retired/40 text-status-retired',
};

/** Hex colours for the canvas graph, which cannot read CSS variables. */
export const PRODUCT_GRAPH_COLOURS: Record<ProductName, string> = {
	sharepoint: '#0e7490',
	'power-platform': '#7e22ce',
	copilot: '#2563eb',
	'cross-platform': '#525252',
};
