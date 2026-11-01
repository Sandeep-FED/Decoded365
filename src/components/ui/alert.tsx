import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva('relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&:has(svg)]:pl-11', {
	variants: {
		variant: {
			default: 'bg-card/70 text-card-foreground',
			warning: 'border-status-preview/40 bg-status-preview/10',
			destructive: 'border-status-retired/40 bg-status-retired/10',
		},
	},
	defaultVariants: { variant: 'default' },
});

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="alert-title" className={cn('font-medium leading-none tracking-tight', className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="alert-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
