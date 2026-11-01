import { useEffect, useMemo, useState } from 'react';
import BrowseToolbar, { type ProductOption } from './BrowseToolbar';
import EmptyState from './EmptyState';
import LetterNav from './LetterNav';
import TermRow from './TermRow';
import { filterTerms } from '@/lib/glossary/browse-filter';
import type { BrowseTerm } from '@/lib/glossary/browse-term';
import { groupByLetter } from '@/lib/glossary/group-by-letter';
import { PREF_KEYS, applyLegacy, readPref, writePref } from '@/lib/preferences';

interface Props {
	terms: BrowseTerm[];
	products: ProductOption[];
}

/**
 * The A–Z page: sticky filters, jump bar and the grouped list. It is server-rendered with
 * every term (so it works without JavaScript) and starts filtering once it hydrates.
 */
export default function BrowseExplorer({ terms, products }: Props) {
	const [query, setQuery] = useState('');
	const [product, setProduct] = useState('all');
	const [showLegacy, setShowLegacy] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setShowLegacy(readPref(PREF_KEYS.legacy) === 'show');
		// A link such as /browse/?product=copilot opens the list already filtered.
		const wanted = new URLSearchParams(location.search).get('product');
		if (wanted && products.some((p) => p.value === wanted && p.available)) setProduct(wanted);
		setHydrated(true);
	}, [products]);

	const visible = useMemo(
		() => (hydrated ? filterTerms(terms, { query, product, showLegacy }) : terms),
		[hydrated, terms, query, product, showLegacy],
	);
	const groups = useMemo(() => groupByLetter(visible, (t) => t.term), [visible]);
	const available = useMemo(() => new Set(groups.map((g) => g.letter)), [groups]);

	const changeLegacy = (show: boolean) => {
		setShowLegacy(show);
		applyLegacy(show);
		writePref(PREF_KEYS.legacy, show ? 'show' : 'hide');
	};
	const clearFilters = () => {
		setQuery('');
		setProduct('all');
		changeLegacy(true);
	};

	return (
		<div className="space-y-6">
			<div
				data-js-only
				className="sticky top-[var(--header-offset)] z-30 space-y-3 rounded-2xl border bg-background/80 px-4 py-3 shadow-sm backdrop-blur"
			>
				<BrowseToolbar
					query={query}
					onQueryChange={setQuery}
					product={product}
					onProductChange={setProduct}
					products={products}
					showLegacy={showLegacy}
					onShowLegacyChange={changeLegacy}
				/>
				<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
					<LetterNav available={available} />
					<p role="status" aria-live="polite" className="text-sm text-muted-foreground">
						Showing {visible.length} of {terms.length} terms
					</p>
				</div>
			</div>

			{visible.length === 0 ? (
				<EmptyState query={query} onClear={clearFilters} />
			) : (
				<div className="space-y-8">
					{groups.map((group) => (
						<section key={group.letter} id={`letter-${group.letter}`} aria-labelledby={`heading-${group.letter}`} className="scroll-mt-[calc(var(--header-offset)+9rem)]">
							<h2 id={`heading-${group.letter}`} className="mb-3 flex items-center gap-3 text-xl font-semibold">
								<span className="inline-flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
									{group.letter}
								</span>
								<span className="text-sm font-normal text-muted-foreground">
									{group.items.length} {group.items.length === 1 ? 'term' : 'terms'}
								</span>
							</h2>
							<ul className="grid gap-3 sm:grid-cols-2">
								{group.items.map((term) => (
									<TermRow key={term.id} term={term} preload={!hydrated} />
								))}
							</ul>
						</section>
					))}
				</div>
			)}
		</div>
	);
}
