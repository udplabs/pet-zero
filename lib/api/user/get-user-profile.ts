import type { UserProfile } from '@/hooks/use-user-profile';
import { auth0Management } from '@/lib/auth0';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

async function fetchUserProfile(id: string): Promise<UserProfile | undefined> {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return;
		}

		console.debug('fetching profile...');

		const { data: user } = await auth0Management.users.get({ id });

		return user;
	} catch (error: unknown) {
		throw new Error('server_error:api | ' + (error instanceof Error ? error.message : String(error)));
	}
}

export async function getUserProfile({ userId, key, tags, cached: useCache = true }: ActionOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['profile'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'profile'];
	}

	tags = [...new Set(tags)];

	if (useCache) {
		const cached = unstable_cache(() => fetchUserProfile(userId), [key], {
			revalidate: 150,
			tags,
		});

		return cached();
	}

	return fetchUserProfile(userId);
}
