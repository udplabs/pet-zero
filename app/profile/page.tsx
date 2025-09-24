import { getSession } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { UserProfileCard } from '@/components/user-profile/user-profile-card';
import { LinkedAccounts } from '@/components/user-profile/linked-accounts';
import { Authenticators } from '@/components/user-profile/authenticators/authenticators';
import { DebugCard } from '@/components/user-profile/debug-card';
export default async function ProfilePage() {
	const { tokenSet, user } = await getSession();

	if (!user?.sub) {
		redirect('/');
	}

	return (
		<div className='bg-background mx-auto flex size-full min-w-0 flex-col gap-6 overflow-auto p-4 pb-8 md:max-w-4xl md:p-6'>
			{/* User profile info */}
			<UserProfileCard />

			{/* Linked accounts */}
			<LinkedAccounts />

			{/* Authenticators */}
			<Authenticators />

			{/* Debug / full tokens */}
			<DebugCard {...{ tokenSet }} />
		</div>
	);
}
