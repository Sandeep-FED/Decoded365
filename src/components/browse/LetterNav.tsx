import { cn } from '@/lib/utils';

const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '#'];

interface Props {
	/** Letters that currently have at least one visible term. */
	available: Set<string>;
}

/** A–Z jump bar. Letters without terms stay visible but dimmed, so the alphabet doesn't jump around. */
export default function LetterNav({ available }: Props) {
	return (
		<nav aria-label="Jump to letter" className="flex flex-wrap gap-1">
			{ALPHABET.map((letter) =>
				available.has(letter) ? (
					<a
						key={letter}
						href={`#letter-${letter}`}
						className="inline-flex size-7 items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-accent"
					>
						{letter}
					</a>
				) : (
					<span
						key={letter}
						aria-disabled="true"
						className={cn('inline-flex size-7 items-center justify-center rounded-md text-sm text-muted-foreground/40')}
					>
						{letter}
					</span>
				),
			)}
		</nav>
	);
}
