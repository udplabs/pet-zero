'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { NavMenu } from './nav-menu';
import { cn } from '@/lib/utils';
import { SearchInput } from './search-input';
import { NavUser } from './nav-user';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background'>
			<div className='container flex h-16 items-center justify-between px-4 md:px-6'>
				<div className='flex items-center gap-6 md:gap-10'>
					<Link
						href='/'
						className='flex items-center gap-2'
					>
						<Image
							src='https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3'
							alt='PetDo Logo'
							width={40}
							height={40}
							className='rounded-full bg-primary'
						/>
						<span className='text-xl font-bold'>PetDo</span>
					</Link>
					<NavMenu />
				</div>
				<div className='hidden md:flex'>
					<SearchInput />
				</div>
				<div className='flex items-center gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='relative'
							>
								<GlobeIcon className='h-5 w-5' />
								<span className='sr-only'>Language</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>English</DropdownMenuItem>
							<DropdownMenuItem>Spanish</DropdownMenuItem>
							<DropdownMenuItem>French</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<NavUser />
					<Button
						variant='ghost'
						size='icon'
						className='relative'
						asChild
					>
						<Link href='/cart'>
							<ShoppingCartIcon className='h-5 w-5' />
							<Badge className='absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary'>
								3
							</Badge>
							<span className='sr-only'>Cart</span>
						</Link>
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='md:hidden'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <XIcon className='h-5 w-5' /> : <MenuIcon className='h-5 w-5' />}
						<span className='sr-only'>Menu</span>
					</Button>
				</div>
			</div>
			{/* Mobile Menu */}
			{mobileMenuOpen && <NavMenu mobile />}
		</header>
	);
}

function ShoppingCartIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z'
			/>
		</svg>
	);
}

function GlobeIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
			/>
		</svg>
	);
}

function MenuIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M4 6h16M4 12h16M4 18h16'
			/>
		</svg>
	);
}

const XIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M6 18L18 6M6 6l12 12'
			/>
		</svg>
	);
};
