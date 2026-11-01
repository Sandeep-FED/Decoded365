/** Prefix a site path with the configured base (e.g. /decoded365 on GitHub Pages). */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}/${path.replace(/^\//, '')}`;
}

export const termPath = (id: string) => withBase(`terms/${id}/`);
export const browsePath = () => withBase('browse/');
export const mapPath = () => withBase('map/');
export const askPath = () => withBase('ask/');
