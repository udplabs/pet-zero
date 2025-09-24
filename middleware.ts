import { type NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

// Place any known public paths here.
// Checker will use basic 'startsWith' matching, so be specific where necessary.
const publicPaths = ['/auth', '/'];

export async function middleware(request: NextRequest) {
	// Always run this first. Short-circuit early to avoid unnecessary processing
	if (!auth0) {
		return;
	}

	const authRes = await auth0.middleware(request); // Then always run this second

	const { pathname } = request.nextUrl;

	// We don't want to process authentication for these paths
	if (pathname.startsWith('/auth') || pathname.startsWith('/')) {
		return authRes;
	}

	// Any route that gets to this point will be considered a protected route and require the user to be logged-in to be able to access it
	const { origin } = new URL(request.url);
	const session = await auth0.getSession(request);

	// If the user does not have a session, redirect to login
	if (!session) {
		const returnTo = encodeURIComponent(request.nextUrl.pathname);
		return NextResponse.redirect(`${origin}/auth/login?returnTo=${returnTo}`);
	}

	return authRes;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - sitemap.xml (sitemap file)
		 * - robots.txt (robots file)
		 */
		'/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
