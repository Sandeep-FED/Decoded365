import { Badge } from '@/components/ui/badge';
import type { BrowseTerm } from '@/lib/glossary/browse-term';
import { PRODUCT_CLASSES, PRODUCT_LABELS, STATUS_CLASSES, STATUS_LABELS } from '@/lib/glossary/labels';
import { cn } from '@/lib/utils';

interface Props {
	term: BrowseTerm;
	/** True until the list has hydrated; lets CSS hide legacy terms without a flash. */
	preload: boolean;
}

/** One term in the A–Z list. The whole row is clickable through the title link. */
export default function TermRow({ term, preload }: Props) {
	return (
		<li
			data-legacy-term={term.legacy ? '' : undefined}
			data-preload={preload ? '' : undefined}
			className={cn(
				'group relative rounded-lg border bg-card/70 p-4 backdrop-blur-sm transition-colors hover:bg-accent/60 focus-within:bg-accent/60',
				term.legacy && 'border-dashed',
			)}
		>
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="font-medium">
					<a href={term.href} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
						{term.term}
					</a>
				</h3>
				<Badge className={PRODUCT_CLASSES[term.product]}>{PRODUCT_LABELS[term.product]}</Badge>
				{term.status !== 'ga' && <Badge className={STATUS_CLASSES[term.status]}>{STATUS_LABELS[term.status]}</Badge>}
				{term.legacy && term.status === 'ga' && <Badge variant="secondary">Server only</Badge>}
			</div>
			<p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{term.summary}</p>
			{term.formerly.length > 0 && (
				<p className="mt-2 text-xs text-muted-foreground">Formerly: {term.formerly.join(', ')}</p>
			)}
		</li>
	);
}
