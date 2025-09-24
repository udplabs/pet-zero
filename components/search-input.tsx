import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
	mobile?: boolean;
}

export const SearchInput = ({ mobile = false }: SearchInputProps) => {
	return (
		<div className={cn('relative', { 'mb-4': mobile })}>
			<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder='Search...'
				className={cn('w-[200px] md:w-[250px] pl-8 rounded-full bg-muted', { 'w-full': mobile })}
			/>
		</div>
	);
};

function SearchIcon({ className }: { className?: string }) {
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
				d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
			/>
		</svg>
	);
}
