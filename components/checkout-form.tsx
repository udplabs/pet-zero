'use client';

import { useUserProfile } from '@/hooks/use-user-profile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextField } from '@/components/ui/text-field';

export const CheckoutForm = () => {
	const { data: user, isLoading: loading } = useUserProfile();
	return (
		<div className='grid gap-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<TextField
					required
					{...{ label: 'First Name', loading, value: user?.given_name, autoComplete: 'given_name' }}
				/>
				<TextField
					required
					{...{ label: 'Last Name', loading, value: user?.family_name, autoComplete: 'family_name' }}
				/>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<TextField
					required
					{...{ label: 'Email', loading, value: user?.email, id: 'email', autoComplete: 'shipping home email' }}
				/>
				<TextField
					required
					{...{
						label: 'Phone',
						loading,
						value: user?.phone,
						id: 'phone',
						type: 'tel',
						autoComplete: 'shipping mobile tel',
					}}
				/>
			</div>
			<div className='space-y-2'>
				<TextField
					required
					{...{
						label: 'Address',
						value: user?.address?.street_address,
						id: 'address-line1',
						autoComplete: 'shipping address-line1',
						loading,
					}}
				/>
			</div>
			<div className='space-y-2'>
				<TextField
					{...{
						label: 'Apartment, suite, etc. (optional)',
						value: user?.address?.street_address_2,
						id: 'address-line2',
						autoComplete: 'shipping address-line2',
						loading,
					}}
				/>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<TextField
					{...{
						label: 'City',
						value: user?.address?.locality,
						loading,
						id: 'city',
						autoComplete: 'shipping address-level2',
					}}
				/>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='state'>State</Label>
					<Select>
						<SelectTrigger id='state'>
							<SelectValue placeholder='Select state' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='NY'>New York</SelectItem>
							<SelectItem value='CA'>California</SelectItem>
							<SelectItem value='TX'>Texas</SelectItem>
							<SelectItem value='FL'>Florida</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<TextField
					{...{
						label: 'ZIP Code',
						value: user?.address?.postal_code,
						id: 'postal-code',
						autoComplete: 'shipping postal-code',
						loading,
					}}
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='country'>Country</Label>
				<Select defaultValue='US'>
					<SelectTrigger id='country'>
						<SelectValue placeholder='Select country' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='US'>United States</SelectItem>
						<SelectItem value='CA'>Canada</SelectItem>
						<SelectItem value='UK'>United Kingdom</SelectItem>
						<SelectItem value='AU'>Australia</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
