import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { useUserProfile } from '@/hooks/use-user-profile';
export const NavUser = () => {
	const { data: user, isAuthenticated, isLoading } = useUserProfile();

	if (!isAuthenticated) {
		return <Button href='/auth/login'>Sign In</Button>;
	}

	return (
		<DropdownMenu>
			{isLoading ? (
				<Loader />
			) : (
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='relative h-8 w-8 rounded-full'
					>
						<Avatar className='border border-primary h-8 w-8'>
							<AvatarImage
								{...{
									className: 'rounded-full',
									src: user?.picture ?? `https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.nickname || 'user'}`,
									alt: 'User Profile',
								}}
							/>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
			)}
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm leading-none font-medium'>{user?.name || 'John Doe'}</p>
						<p className='text-muted-foreground text-xs leading-none'>{user?.email || 'john.doe@example.com'}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/profile'>
						<UserIcon className='mr-2 h-4 w-4' />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/auth/logout'>
						<LogOutIcon className='mr-2 h-4 w-4' />
						<span>Log Out</span>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
