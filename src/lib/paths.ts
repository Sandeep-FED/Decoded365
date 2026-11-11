/** Prefix a site path with the configured base (e.g. /whatsitcalled on GitHub Pages). */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}/${path.replace(/^\//, '')}`;
}

export const termPath = (id: string) => withBase(`terms/${id}/`);
export const browsePath = () => withBase('browse/');
export const comparePath = (a?: string, b?: string) => withBase(`compare/${a && b ? `?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}` : ''}`);
export const renamedPath = () => withBase('renamed/');
export const newPath = () => withBase('new/');
export const downloadsPath = () => withBase('downloads/');
export const feedPath = () => withBase('feed.xml');
export const downloadPath = (file: string) => withBase(`downloads/${file}`);
export const qualityPath = () => withBase('quality/');
