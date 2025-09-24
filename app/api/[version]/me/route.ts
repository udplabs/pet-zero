import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { updateUser } from '@/lib/api/user/update-user';
import { getSession, getUser, updateSession } from '@/lib/auth0';
import { getSearchParams } from '@/lib/utils';
import type { UserUpdate } from 'auth0';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Get user profile
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();
		const userId = user.sub;

		const { cached } = getSearchParams<{ cached?: boolean }>(request, ['cached']);

		const data = await getUserProfile({ userId, cached });

		return NextResponse.json(data);
	} catch (error) {
		// TODO: improve error handling
		return NextResponse.json({ error: 'Unable to fetch user profile' }, { status: 500 });
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const body = (await request.json()) as UserUpdate;

		const session = await getSession();

		const data = await updateUser(session.user.sub, body);

		// Force update the user session
		await updateSession(session);

		// Clear cache (for next request)
		revalidateTag('profile');

		return NextResponse.json({ data });
	} catch (error: unknown) {
		// TODO: improve error handling
		return NextResponse.json({ error: 'Unable to update user profile' }, { status: 500 });
	}
}
