import { useEffect, useId, useMemo, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { compareRows, findTerms, type CompareTerm } from '@/lib/glossary/compare-data';
import { PRODUCT_CLASSES, PRODUCT_LABELS, STATUS_CLASSES, STATUS_LABELS } from '@/lib/glossary/labels';
import { termPath, withBase } from '@/lib/paths';
import type { ProductName, StatusName } from '@/schema/term';

type Slot = 'a' | 'b';

/** A search box that picks one term; the choice shows as a chip with a clear button. */
function TermPicker({ label, terms, value, onChange, otherId }: { label: string; terms: CompareTerm[]; value: CompareTerm | undefined; onChange: (id: string | undefined) => void; otherId?: string }) {
	const listId = useId();
	const [query, setQuery] = useState('');
	const matches = useMemo(() => findTerms(terms, query).filter((t) => t.id !== otherId), [terms, query, otherId]);

	if (value) {
		return (
			<div className="space-y-1">
				<p className="text-sm font-medium">{label}</p>
				<div className="flex items-center justify-between gap-2 rounded-md border bg-card/70 px-3 py-2">
					<span className="font-medium">{value.term}</span>
					<Button variant="ghost" size="icon" className="size-7" onClick={() => onChange(undefined)} aria-label={`Change ${label.toLowerCase()}`}>
						<XIcon />
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="relative space-y-1">
			<label htmlFor={`${listId}-input`} className="text-sm font-medium">
				{label}
			</label>
			<div className="relative">
				<SearchIcon aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					id={`${listId}-input`}
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && matches[0]) onChange(matches[0].id);
						if (e.key === 'Escape') setQuery('');
					}}
					placeholder="Search by name, alias or old name…"
					aria-controls={matches.length > 0 ? listId : undefined}
					className="pl-8 [&::-webkit-search-cancel-button]:hidden"
				/>
			</div>
			{matches.length > 0 && (
				<ul id={listId} className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border bg-popover p-1 shadow-md">
					{matches.map((t) => (
						<li key={t.id}>
							<button type="button" onClick={() => onChange(t.id)} className="flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
								<span>{t.term}</span>
								<span className="text-xs text-muted-foreground">{PRODUCT_LABELS[t.product as ProductName]}</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

const readParams = () => {
	const params = new URLSearchParams(window.location.search);
	return { a: params.get('a') ?? undefined, b: params.get('b') ?? undefined };
};

/** Pick any two terms and see them side by side at every level. The choice lives in the address so it can be shared. */
export default function CompareExplorer() {
	const [terms, setTerms] = useState<CompareTerm[]>([]);
	const [failed, setFailed] = useState(false);
	const [ids, setIds] = useState<Record<Slot, string | undefined>>({ a: undefined, b: undefined });

	useEffect(() => {
		setIds(readParams());
		fetch(withBase('glossary.json'))
			.then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
			.then((data: { terms: CompareTerm[] }) => setTerms(data.terms))
			.catch(() => setFailed(true));
	}, []);

	const byId = useMemo(() => new Map(terms.map((t) => [t.id, t])), [terms]);
	const left = ids.a ? byId.get(ids.a) : undefined;
	const right = ids.b ? byId.get(ids.b) : undefined;

	const choose = (slot: Slot, id: string | undefined) => {
		const next = { ...ids, [slot]: id };
		setIds(next);
		const params = new URLSearchParams();
		if (next.a) params.set('a', next.a);
		if (next.b) params.set('b', next.b);
		window.history.replaceState(null, '', `${window.location.pathname}${params.size ? `?${params}` : ''}`);
	};

	const rows = left && right ? compareRows(left, right, (id) => byId.get(id)?.term) : [];

	if (failed) return <p className="rounded-xl border bg-card/70 p-6 text-sm">The glossary data could not be loaded. Refresh the page to try again.</p>;

	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2">
				<TermPicker label="First term" terms={terms} value={left} onChange={(id) => choose('a', id)} otherId={right?.id} />
				<TermPicker label="Second term" terms={terms} value={right} onChange={(id) => choose('b', id)} otherId={left?.id} />
			</div>

			{!(left && right) && <p className="rounded-xl border bg-card/70 p-6 text-sm text-muted-foreground">Choose two terms to compare them. Try "Dataverse table" and "SharePoint list".</p>}

			{left && right && (
				<div className="overflow-x-auto rounded-xl border bg-card/70 backdrop-blur-sm">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<span className="sr-only">Aspect</span>
								</TableHead>
								{[left, right].map((t) => (
									<TableHead key={t.id} className="min-w-56 align-top">
										<a className="text-base font-semibold underline underline-offset-4" href={termPath(t.id)}>
											{t.term}
										</a>
										<div className="mt-1 flex flex-wrap gap-1">
											<Badge className={PRODUCT_CLASSES[t.product as ProductName]}>{PRODUCT_LABELS[t.product as ProductName]}</Badge>
											<Badge className={STATUS_CLASSES[t.status as StatusName]}>{STATUS_LABELS[t.status as StatusName]}</Badge>
										</div>
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.label}>
									<TableHead scope="row" className="w-28 align-top text-muted-foreground">
										{row.label}
									</TableHead>
									<TableCell className="whitespace-normal align-top">{row.left || '—'}</TableCell>
									<TableCell className="whitespace-normal align-top">{row.right || '—'}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
