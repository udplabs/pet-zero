'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { useAuthenticators } from '@/hooks/use-authenticators';
import { AuthenticatorCard } from './authenticator-card';

export const Authenticators = () => {
	const { data = [], isLoading } = useAuthenticators();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Authenticators</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				{data.length === 0 ? (
					isLoading ? (
						<Loader className='size-12' />
					) : (
						<p className='pb-4 text-base font-medium'>You do not currently have any authenticators.</p>
					)
				) : (
					data.map((a) => (
						<AuthenticatorCard
							key={`${a.type}-${a.id}-2`}
							data={a}
						/>
					))
				)}
			</CardContent>
		</Card>
	);
};
