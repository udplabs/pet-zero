import * as React from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

function Card({ className, ...props }: CardProps) {
	return (
		<div
			data-slot='card'
			className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 shadow-sm', className)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: CardHeaderProps) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				'container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				// 'flex flex-col space-y-1.5 p-6',
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ children, className, loading = false, ...props }: CardTitleProps) {
	return (
		<div
			data-slot='card-title'
			className={cn('leading-none font-semibold', 'text-2xl tracking-tight', className)}
			{...props}
		>
			{loading ? <Skeleton className='h-4 w-1/2' /> : children}
		</div>
	);
}

function CardDescription({ children, className, loading = false, ...props }: CardDescriptionProps) {
	return (
		<div
			data-slot='card-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		>
			{loading ? <Skeleton className='h-4 w-1/2' /> : children}
		</div>
	);
}
function CardAction({ className, ...props }: CardActionProps) {
	return (
		<div
			data-slot='card-action'
			className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
			{...props}
		/>
	);
}
function CardContent({ className, ...props }: CardContentProps) {
	return (
		<div
			data-slot='card-content'
			className={cn('px-6 pt-0', className)}
			{...props}
		/>
	);
}
function CardFooter({ className, ...props }: CardFooterProps) {
	return (
		<div
			data-slot='card-footer'
			className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
			{...props}
		/>
	);
}

export { Card, CardAction, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

export type CardProps = React.ComponentProps<'div'>;
export type CardActionProps = React.ComponentProps<'div'>;
export type CardHeaderProps = React.ComponentProps<'div'>;
export type CardFooterProps = React.ComponentProps<'div'>;
export type CardTitleProps = React.ComponentProps<'div'> & {
	loading?: boolean;
	skeleton?: boolean;
};
export type CardDescriptionProps = React.ComponentProps<'div'> & {
	loading?: boolean;
	skeleton?: boolean;
};
export type CardContentProps = React.ComponentProps<'div'> & {
	skeleton?: boolean;
};
