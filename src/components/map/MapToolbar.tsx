import { useId, useState } from 'react';
import { MaximizeIcon, MinusIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { MapNode } from '@/lib/graph/map-elements';

interface Props {
	nodes: MapNode[];
	product: string;
	onProductChange: (value: string) => void;
	products: { value: string; label: string; available: boolean }[];
	onFindNode: (id: string) => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onFit: () => void;
}

/** Find-a-term box, product filter and zoom buttons. */
export default function MapToolbar({ nodes, product, onProductChange, products, onFindNode, onZoomIn, onZoomOut, onFit }: Props) {
	const listId = useId();
	const [query, setQuery] = useState('');
	const matches = query.trim()
		? nodes.filter((n) => n.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
		: [];

	const pick = (id: string) => {
		onFindNode(id);
		setQuery('');
	};

	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
			<div className="relative w-full sm:w-64">
				<SearchIcon aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && matches[0]) pick(matches[0].id);
						if (e.key === 'Escape') setQuery('');
					}}
					placeholder="Find a term on the map…"
					aria-label="Find a term on the map"
					aria-controls={matches.length > 0 ? listId : undefined}
					className="pl-8 [&::-webkit-search-cancel-button]:hidden"
				/>
				{matches.length > 0 && (
					<ul id={listId} className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border bg-popover p-1 shadow-md">
						{matches.map((n) => (
							<li key={n.id}>
								<button type="button" onClick={() => pick(n.id)} className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
									{n.label}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			<ToggleGroup type="single" value={product} aria-label="Filter the map by product" onValueChange={(v) => v && onProductChange(v)}>
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				{products.map((p) => (
					<ToggleGroupItem key={p.value} value={p.value} disabled={!p.available}>
						{p.label}
						{!p.available && <span className="text-xs text-muted-foreground">soon</span>}
					</ToggleGroupItem>
				))}
			</ToggleGroup>

			<div className="ml-auto flex items-center gap-1" role="group" aria-label="Zoom">
				<Button variant="outline" size="icon" onClick={onZoomOut} aria-label="Zoom out">
					<MinusIcon />
				</Button>
				<Button variant="outline" size="icon" onClick={onZoomIn} aria-label="Zoom in">
					<PlusIcon />
				</Button>
				<Button variant="outline" size="icon" onClick={onFit} aria-label="Fit the whole map in view">
					<MaximizeIcon />
				</Button>
			</div>
		</div>
	);
}
