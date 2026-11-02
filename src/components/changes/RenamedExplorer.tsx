import { useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { filterChanges, type ChangeEntry } from '@/lib/glossary/changes';
import { PRODUCT_CLASSES, PRODUCT_LABELS } from '@/lib/glossary/labels';
import { formatShortDate } from '@/lib/format-date';
import { cn } from '@/lib/utils';

export interface ChangeRow extends ChangeEntry {
	href: string;
	replacedByHref?: string;
}

interface Props {
	entries: ChangeRow[];
	products: { value: string; label: string }[];
}

/** How many of the newest changes are drawn "lit"; the rest fade back like a roadmap's later stops. */
const LIT = 2;

/**
 * Roadmap-style timeline of renamed and retired terms, newest first: date on the left, a ring on a
 * line in the middle, the change on the right. The first few stops are bright and the rest dim; only
 * the markers and line fade, so the text stays readable.
 */
export default function RenamedExplorer({ entries, products }: Props) {
	const [query, setQuery] = useState('');
	const [product, setProduct] = useState('all');
	const [kind, setKind] = useState<'all' | 'renamed' | 'retired'>('all');

	const shown = useMemo(() => filterChanges(entries, { query, product, kind }) as ChangeRow[], [entries, query, product, kind]);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
				<div className="relative w-full sm:w-64">
					<SearchIcon aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Old or new name…"
						aria-label="Search old and new names"
						className="pl-8"
					/>
				</div>
				<ToggleGroup type="single" value={kind} aria-label="Show renames, retirements or both" onValueChange={(v) => v && setKind(v as typeof kind)}>
					<ToggleGroupItem value="all">All</ToggleGroupItem>
					<ToggleGroupItem value="renamed">Renamed</ToggleGroupItem>
					<ToggleGroupItem value="retired">Retired</ToggleGroupItem>
				</ToggleGroup>
				<ToggleGroup type="single" value={product} aria-label="Filter by product" onValueChange={(v) => v && setProduct(v)} className="max-w-full flex-wrap">
					<ToggleGroupItem value="all">All products</ToggleGroupItem>
					{products.map((p) => (
						<ToggleGroupItem key={p.value} value={p.value}>
							{p.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>

			<p aria-live="polite" className="text-sm text-muted-foreground">
				{shown.length} {shown.length === 1 ? 'change' : 'changes'}, newest first
			</p>

			{shown.length === 0 && <p className="rounded-xl border bg-card/70 p-6 text-sm text-muted-foreground">Nothing matches. Try another name or clear a filter.</p>}

			<ol className="mx-auto max-w-3xl">
				{shown.map((entry, i) => {
					const lit = i < LIT;
					const last = i === shown.length - 1;
					return (
						<li key={`${entry.termId}-${entry.kind}-${i}`} className="grid grid-cols-[5.5rem_1.5rem_1fr] gap-x-3 sm:grid-cols-[7rem_1.5rem_1fr] sm:gap-x-4">
							<p className="pt-0.5 text-right text-sm text-muted-foreground">{formatShortDate(entry.date)}</p>

							<div className="relative flex justify-center" aria-hidden="true">
								<span className={cn('relative z-10 mt-1 size-5 rounded-full border-2 bg-background', lit ? 'border-foreground' : 'border-muted-foreground/40')} />
								{!last && <span className={cn('absolute bottom-0 top-7 w-0.5 rounded-full', lit ? 'bg-foreground' : 'bg-muted-foreground/30')} />}
							</div>

							<div className="space-y-1.5 pb-8">
								<h2 className="text-base font-medium leading-snug">
									{entry.kind === 'renamed' ? (
										<>
											{entry.from} <span aria-hidden="true">→</span>
											<span className="sr-only"> renamed to </span> <a className="underline underline-offset-4" href={entry.href}>{entry.to}</a>
										</>
									) : (
										<>
											<a className="underline underline-offset-4" href={entry.href}>{entry.term}</a> retired in {entry.where}
										</>
									)}
								</h2>
								<p className="text-sm text-muted-foreground">{entry.summary}</p>
								<p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
									<Badge className={PRODUCT_CLASSES[entry.product]}>{PRODUCT_LABELS[entry.product]}</Badge>
									<Badge variant="secondary">{entry.kind === 'retired' ? 'Retired' : 'Renamed'}</Badge>
									{entry.replacedBy && entry.replacedByHref && (
										<span>
											Replaced by <a className="underline underline-offset-4" href={entry.replacedByHref}>{entry.replacedBy}</a>
										</span>
									)}
								</p>
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
