import { SearchXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
	query: string;
	onClear: () => void;
}

export default function EmptyState({ query, onClear }: Props) {
	return (
		<div className="flex flex-col items-center gap-3 rounded-lg border border-dashed bg-card/50 px-6 py-12 text-center">
			<SearchXIcon aria-hidden="true" className="size-8 text-muted-foreground" />
			<p className="font-medium">{query ? `No terms match “${query}”` : 'No terms match these filters'}</p>
			<p className="max-w-sm text-sm text-muted-foreground">
				Try fewer words, an old name, or turn on legacy and Server-only terms.
			</p>
			<Button variant="outline" size="sm" onClick={onClear}>
				Clear filters
			</Button>
		</div>
	);
}
