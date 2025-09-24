'use client';

import { ChevronDownCircle as CollapseIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, type CardProps, CardTitle } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	type CollapsibleContentProps,
	type CollapsibleProps,
	CollapsibleTrigger,
	type CollapsibleTriggerProps,
} from '@/components/ui/collapsible';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import type { TokenSet } from '@auth0/nextjs-auth0/types';

export const DebugCard = ({
	tokenSet,
	CardContentProps,
	CollapsibleProps,
	CollapsibleContentProps,
	CollapsibleTriggerProps,
	...props
}: DebugCardProps) => {
	const [showAccessToken, toggleAccessToken] = useState(false);
	const [showIdToken, toggleIdToken] = useState(false);
	const { accessToken, idToken } = tokenSet || {};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Debug Data</CardTitle>
			</CardHeader>
			<CardContent
				{...{
					...CardContentProps,
					className: cn('flex flex-col gap-4', CardContentProps?.className),
				}}
			>
				<Collapsible
					open={showAccessToken}
					onOpenChange={toggleAccessToken}
				>
					<div className='flex justify-between items-baseline'>
						<CollapsibleTrigger>
							<div className='flex items-center gap-2'>
								Access Token
								<CollapseIcon
									className={cn('h-4 w-4 transition-transform duration-200', showAccessToken && 'rotate-180')}
								/>
							</div>
						</CollapsibleTrigger>
						<Button
							asChild
							variant='ghost'
							className='float-end mt-4'
						>
							<Link
								target='_blank'
								href={`https://jwt.io/#token=${accessToken}`}
								className='flex items-center gap-2'
							>
								Decode Token
								<ExternalLinkIcon className='h-4 w-4' />
							</Link>
						</Button>
					</div>
					<CollapsibleContent className='flex flex-col gap-4 pt-4'>
						<div className='grid grid-cols-2 gap-4'>
							<TextField
								readOnly
								label='Expires'
								value={tokenSet?.expiresAt ? new Date(tokenSet.expiresAt * 1000).toLocaleString() : 'N/A'}
							/>
							<TextField
								readOnly
								label='Scopes'
								value={tokenSet?.scope || 'N/A'}
							/>
						</div>
						<Textarea
							readOnly
							value={accessToken}
							className='resize-none rounded font-mono text-xs'
							rows={10}
						/>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible
					open={showIdToken}
					onOpenChange={toggleIdToken}
				>
					<div className='flex justify-between items-baseline'>
						<CollapsibleTrigger>
							<div className='flex items-center gap-2'>
								Id Token
								<CollapseIcon
									className={cn('h-4 w-4 transition-transform duration-200', showIdToken && 'rotate-180')}
								/>
							</div>
						</CollapsibleTrigger>
						<Button
							asChild
							variant='ghost'
							className='float-end mt-4'
						>
							<Link
								target='_blank'
								href={`https://jwt.io/#token=${idToken}`}
								className='flex items-center gap-2'
							>
								Decode Token
								<ExternalLinkIcon className='h-4 w-4' />
							</Link>
						</Button>
					</div>
					<CollapsibleContent className='flex flex-col gap-4 pt-4'>
						<Textarea
							readOnly
							value={idToken}
							className='resize-none rounded font-mono text-xs'
							rows={10}
						/>
					</CollapsibleContent>
				</Collapsible>
			</CardContent>
		</Card>
	);
};

export interface DebugCardProps extends CardProps {
	CardContentProps?: CardProps;
	CollapsibleProps?: CollapsibleProps;
	CollapsibleContentProps?: CollapsibleContentProps;
	CollapsibleTriggerProps?: CollapsibleTriggerProps;
	tokenSet?: TokenSet;
}
