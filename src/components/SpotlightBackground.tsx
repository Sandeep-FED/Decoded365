import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';

/**
 * Site-wide background: a faint grid and an animated spotlight behind every page.
 * Fixed to the viewport and ignored by assistive technology. It follows the theme:
 * a sky-blue beam on light, a white beam on dark (the beam's fill is `currentColor`).
 */
export default function SpotlightBackground({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				'pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden bg-white [--grid:#e5e5e5] dark:bg-black/[0.96] dark:[--grid:#171717]',
				className,
			)}
		>
			<div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:40px_40px]" />
			<Spotlight className="-top-40 left-0 text-sky-600 md:-top-20 md:left-60 dark:text-white" fill="currentColor" />
		</div>
	);
}
