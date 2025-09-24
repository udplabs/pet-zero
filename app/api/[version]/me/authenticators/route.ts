import { NextResponse } from 'next/server';

import { getAuthenticators } from '@/lib/api/user/get-authenticators';
import { getUser } from '@/lib/auth0';
// Get user authenticators
export async function GET() {
	try {
		const user = await getUser();
		const userId = user.sub;

		const data = await getAuthenticators({ userId });

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
	}
}
