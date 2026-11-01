import { useReducedMotion } from 'motion/react';
import { FlipWords } from '@/components/ui/flip-words';

interface Props {
	before: string;
	words: string[];
	after?: string;
}

/**
 * A headline that cycles through several titles ("What is a hub site? … a recycle bin?").
 * Respects reduced motion by showing the first title still, and exposes the full list
 * to screen readers once instead of announcing every change.
 */
export default function FlipTitle({ before, words, after = '' }: Props) {
	const reduceMotion = useReducedMotion();

	return (
		<>
			<span className="sr-only">
				{before} {words.join(', ')} {after}
			</span>
			<span aria-hidden="true">
				{before}
				{reduceMotion ? (
					<span className="px-2 text-sky-600 dark:text-sky-400">{words[0]}</span>
				) : (
					<FlipWords words={words} duration={2500} className="text-sky-600 dark:text-sky-400" />
				)}
				{after}
			</span>
		</>
	);
}
