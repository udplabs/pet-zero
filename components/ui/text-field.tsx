import { Input, type InputProps } from '@/components/ui/input';
import { Label, LabelProps } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

export const TextField = ({
	label,
	id = `text-field-${label?.toLowerCase().replace(/\s+/g, '-')}`,
	LabelProps,
	loading = false,
	...props
}: TextFieldProps) => {
	return (
		<div className='flex flex-col gap-2'>
			{label && (
				<Label
					{...{
						htmlFor: id,
						...LabelProps,
					}}
				>
					{label}
				</Label>
			)}
			{loading ? (
				<Skeleton className='h-10 w-full' />
			) : (
				<Input
					{...{
						...props,
						id,
						className: cn('disabled:opacity-100', props?.className),
					}}
				/>
			)}
		</div>
	);
};

export interface TextFieldProps extends InputProps {
	label?: string;
	LabelProps?: LabelProps;
	loading?: boolean;
}
