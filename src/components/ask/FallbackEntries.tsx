import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FallbackItem } from '@/lib/ask/fallback';
import { termPath } from '@/lib/paths';

/** The best-matching entries, shown instead of a generated answer. */
export default function FallbackEntries({ items }: { items: FallbackItem[] }) {
	return (
		<ul className="grid gap-3">
			{items.map((item) => (
				<li key={item.id}>
					<Card className="bg-card/70 py-4 backdrop-blur-sm">
						<CardHeader className="px-4">
							<CardTitle className="text-base">
								<a href={termPath(item.id)} data-term-id={item.id} className="underline-offset-4 hover:underline">
									{item.term}
								</a>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 text-sm text-muted-foreground">{item.text}</CardContent>
					</Card>
				</li>
			))}
		</ul>
	);
}
