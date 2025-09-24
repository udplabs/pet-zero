'use client';

import Link from 'next/link';
import { NavDropdown } from './nav-dropdown';
import { SearchInput } from './search-input';

interface NavMenuProps extends React.HTMLProps<HTMLElement> {
	mobile?: boolean;
}

export const NavMenu = ({
	mobile,
	className = mobile ? 'flex flex-col space-y-4' : 'hidden md:flex gap-6',
	...props
}: NavMenuProps) => {
	return (
		<div className={mobile ? 'md:hidden border-t p-4 space-y-4 bg-background' : 'hidden md:flex'}>
			{mobile && <SearchInput mobile />}
			<nav
				{...{
					className,
					...props,
				}}
			>
				<Link
					href='/'
					className='text-sm font-medium transition-colors hover:text-primary'
				>
					Home
				</Link>
				<Link
					href='/shop'
					className='text-sm font-medium transition-colors hover:text-primary'
				>
					Shop
				</Link>
				<NavDropdown {...{ mobile }} />
				<Link
					href='/about'
					className='text-sm font-medium transition-colors hover:text-primary'
				>
					About
				</Link>
				<Link
					href='/contact'
					className='text-sm font-medium transition-colors hover:text-primary'
				>
					Contact
				</Link>
			</nav>
		</div>
	);
};
