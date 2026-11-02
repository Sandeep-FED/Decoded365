import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** How far down the page (in px) before the button appears. */
const SHOW_AFTER = 400;

/** Floating button that returns to the top of the page. Smooth scrolling comes from the CSS `scroll-behavior`, which is off for reduced-motion visitors. */
export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const update = () => setVisible(window.scrollY > SHOW_AFTER);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	}, []);

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			aria-label="Back to top"
			title="Back to top"
			// A hidden button must not stay reachable by keyboard or assistive tech.
			tabIndex={visible ? 0 : -1}
			aria-hidden={!visible}
			className={cn(
				'fixed bottom-4 right-4 z-40 rounded-full bg-background/70 shadow-lg backdrop-blur-md transition-[opacity,transform] sm:bottom-6 sm:right-6',
				visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
			)}
			onClick={() => {
				window.scrollTo({ top: 0 });
				// The button is about to fade out; hand focus to the top of the page so keyboard users don't lose their place.
				document.querySelector<HTMLElement>('a[href="#main"]')?.focus({ preventScroll: true });
			}}
		>
			<ArrowUp />
		</Button>
	);
}
