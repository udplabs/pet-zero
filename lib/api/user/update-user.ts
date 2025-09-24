import type { UserProfile } from '@/hooks/use-user-profile';
import { auth0Management } from '@/lib/auth0';

import type { UserUpdate } from 'auth0';

// This call is 'pure' / raw
// Cache invalidation only occurs in API
export const updateUser = async (id: string, data: UserUpdate): Promise<UserProfile | undefined> => {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return;
		}

		const { data: user } = await auth0Management.users.update({ id }, data);

		return user;
	} catch (error: unknown) {
		throw new Error('server_error:api | ' + (error instanceof Error ? error.message : String(error)));
	}
};
