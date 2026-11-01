import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			className={cn('inline-flex w-fit max-w-full items-center overflow-x-auto rounded-md border bg-background shadow-xs', className)}
			{...props}
		/>
	);
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			className={cn(
				'inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap px-3 text-sm font-medium outline-none transition-colors first:rounded-l-md last:rounded-r-md hover:bg-muted hover:text-muted-foreground focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&:not(:first-child)]:border-l',
				className,
			)}
			{...props}
		/>
	);
}

export { ToggleGroup, ToggleGroupItem };
