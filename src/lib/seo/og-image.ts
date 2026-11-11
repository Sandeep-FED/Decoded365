import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { PRODUCT_GRAPH_COLOURS, PRODUCT_LABELS } from '@/lib/glossary/labels';
import type { ProductName } from '@/schema/term';

export interface OgCard {
	title: string;
	summary: string;
	product?: ProductName;
}

const WIDTH = 1200;
const HEIGHT = 630;

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[]> | undefined;
/** Inter from the `@fontsource/inter` package (SIL Open Font License), read once. Satori needs TTF, OTF or WOFF. */
const loadFonts = () =>
	(fonts ??= Promise.all(
		([400, 700] as const).map(async (weight) => ({
			name: 'Inter',
			data: await readFile(join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`)),
			weight,
			style: 'normal' as const,
		})),
	));

/** Cut at a word boundary so a long summary fits the card. */
export function clip(text: string, max: number): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max).replace(/\s+\S*$/, '');
	return `${cut.replace(/[.,;:\s]+$/, '')}…`;
}

const div = (style: Record<string, string | number>, children: unknown) => ({ type: 'div', props: { style: { display: 'flex', ...style }, children } });

/** A 1200×630 PNG link preview: product, term name and its plain-words summary. */
export async function renderOgImage({ title, summary, product }: OgCard): Promise<Buffer> {
	const accent = product ? PRODUCT_GRAPH_COLOURS[product] : '#38bdf8';
	const size = title.length > 34 ? 60 : title.length > 22 ? 72 : 84;

	const tree = div({ width: WIDTH, height: HEIGHT, background: '#0a0a0a', color: '#fafafa', fontFamily: 'Inter' }, [
		div({ width: 18, height: HEIGHT, background: accent }, ''),
		div({ flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '56px 72px 52px 64px' }, [
			div({ alignItems: 'center', justifyContent: 'space-between' }, [
				div({ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }, 'Whatsitcalled'),
				product ? div({ fontSize: 26, color: accent, border: `2px solid ${accent}`, borderRadius: 999, padding: '6px 22px' }, PRODUCT_LABELS[product]) : div({}, ''),
			]),
			div({ flexDirection: 'column' }, [
				div({ fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }, clip(title, 70)),
				div({ fontSize: 32, color: '#a3a3a3', lineHeight: 1.4, marginTop: 28 }, clip(summary, 170)),
			]),
			div({ fontSize: 26, color: '#737373' }, 'Every term, written three ways: Beginner, Maker, Architect'),
		]),
	]);

	// Satori reads plain `{ type, props }` trees, so no React is needed.
	const svg = await satori(tree as never, { width: WIDTH, height: HEIGHT, fonts: await loadFonts() });
	return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng());
}
