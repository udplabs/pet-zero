import { Loader2Icon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps extends LucideProps {
	label?: React.ReactNode;
	LabelProps?: React.HTMLAttributes<HTMLSpanElement>;
	ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Loader = ({ label, LabelProps, ContainerProps, ...props }: LoaderProps) => {
	return (
		<div
			{...{
				...ContainerProps,
				className: cn('flex flex-col gap-2 items-center self-center', ContainerProps?.className),
			}}
		>
			<Loader2Icon {...{ ...props, className: cn('animate-spin', props.className) }} />
			{label && typeof label === 'string' ? (
				<span {...{ ...LabelProps, className: cn('text-sm text-gray-400', LabelProps?.className) }}>{label}</span>
			) : (
				label
			)}
		</div>
	);
};
