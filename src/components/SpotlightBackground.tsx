import type { ReactNode } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';

/** Dark panel with a faint grid and an animated spotlight, for hero sections. Content goes in as children. */
export default function SpotlightBackground({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div className={cn('relative flex min-h-[26rem] w-full overflow-hidden rounded-xl bg-black/[0.96] antialiased md:items-center', className)}>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] [background-size:40px_40px]"
			/>
			<Spotlight className="-top-40 left-0 md:-top-20 md:left-40" fill="white" />
			<div className="relative z-10 w-full p-6 sm:p-10">{children}</div>
		</div>
	);
}
