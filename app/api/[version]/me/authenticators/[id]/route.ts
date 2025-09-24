import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { auth0Management, getUser } from '@/lib/auth0';

// Delete user authenticator
export async function DELETE(request: NextRequest, { params }: { params: Promise<ApiPathParams> }) {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return new Response(null, {
				status: 501,
				statusText: 'Auth0 Management API client is not yet initialized.',
			});
		}

		const { id: authentication_method_id } = await params;

		const user = await getUser();

		if (!authentication_method_id) {
			throw new Error('bad_request:api');
		}

		const userId = user.sub;

		await auth0Management.users.deleteAuthenticationMethod({
			id: userId,
			authentication_method_id,
		});

		revalidateTag('authenticators');

		return new Response(null, { status: 204 });
	} catch (error) {
		console.info('API error:', error);

		return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
	}
}
