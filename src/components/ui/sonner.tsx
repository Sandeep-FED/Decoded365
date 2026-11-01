import { Toaster as Sonner, type ToasterProps } from 'sonner';

/** Toasts for feedback confirmations. The site is dark-only, so the theme is fixed. */
function Toaster(props: ToasterProps) {
	return (
		<Sonner
			theme="dark"
			className="toaster group"
			style={{ '--normal-bg': 'var(--popover)', '--normal-text': 'var(--popover-foreground)', '--normal-border': 'var(--border)' } as React.CSSProperties}
			{...props}
		/>
	);
}

export { Toaster };
