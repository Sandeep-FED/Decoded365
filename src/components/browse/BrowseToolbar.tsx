import { useId } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface ProductOption {
	value: string;
	label: string;
	available: boolean;
}

interface Props {
	query: string;
	onQueryChange: (value: string) => void;
	product: string;
	onProductChange: (value: string) => void;
	products: ProductOption[];
	showLegacy: boolean;
	onShowLegacyChange: (value: boolean) => void;
}

/** Live filter, product filter and the legacy switch. Purely presentational: state lives in the parent. */
export default function BrowseToolbar({
	query,
	onQueryChange,
	product,
	onProductChange,
	products,
	showLegacy,
	onShowLegacyChange,
}: Props) {
	const legacyId = useId();

	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
			<div className="relative w-full sm:w-72">
				<SearchIcon aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					onKeyDown={(e) => e.key === 'Escape' && onQueryChange('')}
					placeholder="Filter terms, aliases, old names…"
					aria-label="Filter terms"
					className="pl-8 pr-8 [&::-webkit-search-cancel-button]:hidden"
				/>
				{query && (
					<button
						type="button"
						onClick={() => onQueryChange('')}
						aria-label="Clear filter"
						className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
					>
						<XIcon className="size-4" />
					</button>
				)}
			</div>

			<ToggleGroup
				type="single"
				value={product}
				aria-label="Filter by product"
				onValueChange={(value) => value && onProductChange(value)}
			>
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				{products.map((p) => (
					<ToggleGroupItem key={p.value} value={p.value} disabled={!p.available}>
						{p.label}
						{!p.available && <span className="text-xs text-muted-foreground">soon</span>}
					</ToggleGroupItem>
				))}
			</ToggleGroup>

			<div className="flex items-center gap-2">
				<Switch id={legacyId} checked={showLegacy} onCheckedChange={onShowLegacyChange} />
				<label htmlFor={legacyId} className="text-sm">
					Legacy &amp; Server-only
				</label>
			</div>
		</div>
	);
}
