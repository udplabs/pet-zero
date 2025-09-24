import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuItemProps,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface NavDropdownProps {
	/**
	 * @default Categories <ChevronDownIcon className="h-4 w-4" />
	 */
	label?: React.ReactNode;
	mobile?: boolean;
	NavDropdownItemsProps?: DropdownMenuItemProps;
	/**
	 * @default 'mt-2 ml-4 flex flex-col space-y-2'
	 */
	MobileNavClassName?: string;
}

export const NavDropdown = ({
	label,
	mobile = false,
	MobileNavClassName = 'mt-2 ml-4 flex flex-col space-y-2',
	NavDropdownItemsProps,
}: NavDropdownProps) => {
	if (mobile) {
		return (
			<details className='group'>
				<summary className='flex cursor-pointer items-center justify-between text-sm font-medium transition-colors hover:text-primary'>
					{label ?? (
						<>
							Categories <ChevronDownIcon className='h-4 w-4' />
						</>
					)}
				</summary>
				<nav className={MobileNavClassName}>
					<NavDropdownItems {...{ mobile, ...NavDropdownItemsProps }} />
				</nav>
			</details>
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary'>
				Categories <ChevronDownIcon className='h-4 w-4' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<NavDropdownItems {...{ mobile, ...NavDropdownItemsProps }} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface NavDropdownItemsProps extends DropdownMenuItemProps {
	mobile: boolean;
	/**
	 * Will override all Link props (including `className`)
	 */
	LinkProps?: React.ComponentProps<typeof Link>;
}

interface DropdownItems {
	label: string;
	href: string;
	DropdownMenuItemClassName?: string;
	/**
	 * @default 'w-full'
	 * @default (mobile) 'text-sm transition-colors hover:text-primary'
	 */
	LinkClassName?: string;
}

const NavDropdownItems = ({ mobile, LinkProps, ...props }: NavDropdownItemsProps) => {
	const mobileLinkClassName = 'text-sm transition-colors hover:text-primary';

	const dropdownItems: DropdownItems[] = [
		{
			label: 'Food',
			href: '/category/food',
		},
		{
			label: 'Accessories',
			href: '/category/accessories',
		},
		{
			label: 'Toys',
			href: '/category/toys',
		},
		{
			label: 'Grooming',
			href: '/category/grooming',
		},
	];

	return (
		<>
			{dropdownItems.map(
				({ href, LinkClassName = mobile ? mobileLinkClassName : 'w-full', label, DropdownMenuItemClassName }, i) => {
					const link = <Link {...{ href, className: LinkClassName, ...LinkProps }}>{label}</Link>;

					if (mobile) {
						return link;
					}

					return (
						<DropdownMenuItem
							key={`menu-item-${label}-${i}`}
							{...{ ...props, className: DropdownMenuItemClassName }}
						>
							{link}
						</DropdownMenuItem>
					);
				}
			)}
		</>
	);
};

function ChevronDownIcon({ className }: { className?: string }) {
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
				d='M19 9l-7 7-7-7'
			/>
		</svg>
	);
}
