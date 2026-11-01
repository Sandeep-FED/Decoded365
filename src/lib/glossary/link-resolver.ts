import { termPath } from '@/lib/paths';
import type { LinkTarget } from '@/lib/render/markdown';
import type { GlossaryTerm } from './term-model';

/** Resolve `[[term-id]]` to the term's name and page. */
export function makeLinkResolver(terms: GlossaryTerm[]): (id: string) => LinkTarget | undefined {
	const byId = new Map(terms.map((t) => [t.id, t]));
	return (id) => {
		const target = byId.get(id);
		return target ? { label: target.term, href: termPath(id) } : undefined;
	};
}
