'use client';

import { useUser } from '@auth0/nextjs-auth0';

export const Greeting = () => {
	const { user, isLoading } = useUser();

	return <h1>Welcome {(!isLoading && user?.given_name) || 'FurParent!'}</h1>;
};
