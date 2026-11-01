import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { applyProduct } from '@/lib/preferences';

interface Props {
	products: { value: string; label: string; available: boolean }[];
}

/** Filter the A–Z list by product. Products without content yet are shown disabled. */
export default function ProductFilter({ products }: Props) {
	const [value, setValue] = useState('all');

	return (
		<ToggleGroup
			type="single"
			value={value}
			aria-label="Filter by product"
			onValueChange={(next) => {
				if (!next) return;
				setValue(next);
				applyProduct(next);
			}}
		>
			<ToggleGroupItem value="all">All</ToggleGroupItem>
			{products.map((p) => (
				<ToggleGroupItem key={p.value} value={p.value} disabled={!p.available}>
					{p.label}
					{!p.available && <span className="text-xs text-muted-foreground">soon</span>}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
