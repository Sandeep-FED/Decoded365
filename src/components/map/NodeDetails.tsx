import { ArrowRightIcon, MousePointerClickIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import type { Neighbour } from '@/lib/graph/neighbourhood';
import type { MapNode } from '@/lib/graph/map-elements';
import { relationLabel } from '@/lib/graph/relation-labels';
import { PRODUCT_CLASSES, PRODUCT_LABELS, STATUS_CLASSES, STATUS_LABELS } from '@/lib/glossary/labels';
import { cn } from '@/lib/utils';

interface Props {
	node: MapNode | null;
	neighbours: Neighbour[];
	onSelect: (id: string) => void;
}

/** What the selected term is and how it connects. This panel is also the keyboard route through the map. */
export default function NodeDetails({ node, neighbours, onSelect }: Props) {
	if (!node) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
				<MousePointerClickIcon aria-hidden="true" className="size-6" />
				<p className="font-medium text-foreground">Select a term</p>
				<p>Click a dot on the map, or find a term by name, to see how it connects.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4 p-5">
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">{node.label}</h2>
				<div className="flex flex-wrap gap-2">
					<Badge className={PRODUCT_CLASSES[node.product]}>{PRODUCT_LABELS[node.product]}</Badge>
					{node.status !== 'ga' && <Badge className={STATUS_CLASSES[node.status]}>{STATUS_LABELS[node.status]}</Badge>}
				</div>
				<p className="text-sm text-muted-foreground">{node.summary}</p>
				<a href={node.href} className={cn(buttonVariants({ size: 'sm' }), 'w-fit')}>
					Open term <ArrowRightIcon />
				</a>
			</div>

			<div className="space-y-2">
				<h3 className="text-sm font-medium">{neighbours.length > 0 ? 'Connected to' : 'No connections yet'}</h3>
				<ul className="space-y-1">
					{neighbours.map((n) => (
						<li key={`${n.node.id}-${n.type}-${n.direction}`}>
							<button
								type="button"
								onClick={() => onSelect(n.node.id)}
								className="flex w-full items-baseline gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
							>
								<span className="w-32 shrink-0 text-xs text-muted-foreground">{relationLabel(n.type, n.direction)}</span>
								<span className="font-medium">{n.node.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
