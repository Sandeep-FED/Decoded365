import { useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PRODUCT_CLASSES, PRODUCT_LABELS } from '@/lib/glossary/labels';
import { ISSUES, MIN_WORDS, filterRows, type IssueKey, type QualityFilter, type QualityRow, type ReviewLabel } from '@/lib/glossary/quality';

export interface QualityListRow extends QualityRow {
	href: string;
	editHref: string;
}

interface Props {
	rows: QualityListRow[];
	products: { value: string; label: string }[];
}

const REVIEW_TEXT: Record<ReviewLabel, string> = { reviewed: 'Reviewed', drafted: 'AI-drafted', unmarked: 'Not marked' };
const PAGE = 50;

/** Every term with who has checked it, how much it says and what is missing; filterable. Rows arrive most-in-need first. */
export default function QualityExplorer({ rows, products }: Props) {
	const [filter, setFilter] = useState<QualityFilter>({ query: '', product: 'all', review: 'all', issue: 'all' });
	const [limit, setLimit] = useState(PAGE);
	const change = (patch: Partial<QualityFilter>) => {
		setFilter((f) => ({ ...f, ...patch }));
		setLimit(PAGE);
	};

	const shown = useMemo(() => filterRows(rows, filter) as QualityListRow[], [rows, filter]);

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
				<div className="relative w-full sm:w-64">
					<SearchIcon aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input type="search" value={filter.query} onChange={(e) => change({ query: e.target.value })} placeholder="Find a term…" aria-label="Find a term" className="pl-8" />
				</div>
				<ToggleGroup type="single" value={filter.product} aria-label="Filter by product" onValueChange={(v) => v && change({ product: v })} className="max-w-full flex-wrap">
					<ToggleGroupItem value="all">All products</ToggleGroupItem>
					{products.map((p) => (
						<ToggleGroupItem key={p.value} value={p.value}>
							{p.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				<ToggleGroup type="single" value={filter.review} aria-label="Filter by review state" onValueChange={(v) => v && change({ review: v as QualityFilter['review'] })} className="max-w-full flex-wrap">
					<ToggleGroupItem value="all">Any state</ToggleGroupItem>
					{(Object.keys(REVIEW_TEXT) as ReviewLabel[]).map((r) => (
						<ToggleGroupItem key={r} value={r}>
							{REVIEW_TEXT[r]}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				<ToggleGroup type="single" value={filter.issue} aria-label="Filter by issue" onValueChange={(v) => v && change({ issue: v as QualityFilter['issue'] })} className="max-w-full flex-wrap">
					<ToggleGroupItem value="all">Any issue</ToggleGroupItem>
					{(Object.keys(ISSUES) as IssueKey[]).map((k) => (
						<ToggleGroupItem key={k} value={k}>
							{ISSUES[k]}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>

			<p aria-live="polite" className="text-sm text-muted-foreground">
				{shown.length} {shown.length === 1 ? 'term' : 'terms'}, most in need of work first
			</p>

			{shown.length === 0 && <p className="rounded-xl border bg-card/70 p-6 text-sm text-muted-foreground">No terms match these filters.</p>}

			<ul className="divide-y rounded-xl border bg-card/70 backdrop-blur-sm">
				{shown.slice(0, limit).map((row) => (
					<li key={row.id} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 text-sm">
						<a className="min-w-40 font-medium underline underline-offset-4" href={row.href}>
							{row.term}
						</a>
						<Badge className={PRODUCT_CLASSES[row.product]}>{PRODUCT_LABELS[row.product]}</Badge>
						<Badge variant={row.review === 'reviewed' ? 'secondary' : 'outline'}>{REVIEW_TEXT[row.review]}</Badge>
						<span className="text-xs text-muted-foreground" title={`Words in the Beginner, Maker and Architect levels (aim for ${MIN_WORDS.beginner}, ${MIN_WORDS.maker} and ${MIN_WORDS.architect} or more)`}>
							{row.words.beginner} / {row.words.maker} / {row.words.architect} words
						</span>
						<span className="flex flex-wrap gap-1">
							{row.issues.map((i) => (
								<Badge key={i} variant="secondary" className="font-normal">
									{ISSUES[i]}
								</Badge>
							))}
						</span>
						<a className="ml-auto text-xs underline underline-offset-4" href={row.editHref}>
							Edit
						</a>
					</li>
				))}
			</ul>

			{shown.length > limit && (
				<Button variant="outline" onClick={() => setLimit((n) => n + PAGE)}>
					Show {Math.min(PAGE, shown.length - limit)} more
				</Button>
			)}
		</div>
	);
}
