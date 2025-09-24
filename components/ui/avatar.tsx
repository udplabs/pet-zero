'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

function Avatar({ loading = false, ...props }: AvatarProps) {
	const className = cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', props?.className);

	if (loading) {
		return (
			<div className={className}>
				<Skeleton {...{ className }} />
			</div>
		);
	}

	return (
		<AvatarPrimitive.Root
			data-slot='avatar'
			{...{ ...props, className }}
		/>
	);
}
function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			data-slot='avatar-image'
			className={cn('aspect-square size-full', className)}
			{...props}
		/>
	);
}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot='avatar-fallback'
			className={cn('bg-background flex size-full items-center justify-center rounded-full', className)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback };
export type AvatarProps = AvatarPrimitive.AvatarProps & { loading?: boolean };
export type AvatarImageProps = AvatarPrimitive.AvatarImageProps;
export type AvatarFallbackProps = AvatarPrimitive.AvatarFallbackProps;
