import { Skeleton } from '@/components/ui/skeleton';
import { parseAnswer } from '@/lib/ask/citations';
import { termPath } from '@/lib/paths';

interface Props {
	text: string;
	/** Term name by id: the ids the model may cite. */
	terms: Map<string, string>;
	streaming: boolean;
}

/** The streamed answer, with `[term-id]` citations turned into internal links. */
export default function AnswerView({ text, terms, streaming }: Props) {
	if (!text) {
		return (
			<div className="space-y-2" aria-label="Writing the answer">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-11/12" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		);
	}

	return (
		<p className="whitespace-pre-wrap leading-7" aria-busy={streaming}>
			{parseAnswer(text, new Set(terms.keys())).map((part, i) =>
				part.type === 'text' ? (
					<span key={i}>{part.text}</span>
				) : (
					<a key={i} href={termPath(part.id)} data-term-id={part.id} className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-sm font-medium underline-offset-4 hover:underline">
						{terms.get(part.id)}
					</a>
				),
			)}
		</p>
	);
}
