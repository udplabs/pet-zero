import { toast } from '@/components/toast';
import { useUser } from '@auth0/nextjs-auth0';
import type { GetUsers200ResponseOneOfInner, UserUpdate } from 'auth0';
import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import type { Key, SWRConfiguration, SWRResponse } from 'swr';
import useSWR from 'swr';

const KEY = '/api/me';

interface Address {
	/**
	 * Full mailing address, formatted for display or use on a mailing label.
	 *
	 * This field MAY contain multiple lines, separated by newlines.
	 *
	 * Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
	 */
	formatted?: string;
	street_address?: string;
	street_address_2?: string;
	/**
	 * City or locality
	 */
	locality?: string;
	/**
	 * State, province, or region
	 */
	region?: string;
	postal_code?: string;
	country?: string;
}

export interface UserProfile extends GetUsers200ResponseOneOfInner {
	displayName?: string;
	address?: Address;
}

interface UserProfileSWROptions extends SWRConfiguration {
	fallbackData: UserProfile;
	// onSuccess: (data: UserProfile, key: string) => Promise<void>;
}

type UseUserProfileResponse = SWRResponse<UserProfile, any, UserProfileSWROptions> & {
	isAuthenticated?: boolean;
	updateUser: (data: UserUpdate) => Promise<'undone' | 'success' | void>;
	/**
	 * Whether the user profile is currently being fetched.
	 * This is derived from the SWR `isLoading`.
	 */
	isFetching: boolean;
	/**
	 * Whether the Auth0 user info is currently loaded.
	 * This is derived from the Auth0 useUser() `isLoading`.
	 */
	isLoading: boolean;
	/**
	 * Composite loading state. Returns true if either isLoading or isFetching is true.
	 */
	isPending: boolean;
};

export const useUserProfile = () => {
	const { user, isLoading, error: useUserError } = useUser();

	const { sub: user_id, ...claims } = user || {};

	const isAuthenticated = !!user_id && !isLoading;

	const {
		data,
		isLoading: isFetching,
		mutate,
		error: swrError,
		...swrRest
	} = useSWR<UserProfile, any, Key, UserProfileSWROptions>(isAuthenticated ? KEY : null, {
		fallbackData: {
			user_id,
			...claims,
		} as UserProfile,
		// onSuccess,
	});

	const displayName = data?.nickname || data?.name;

	const updateUserProfile = useCallback(
		async (updateData: UserUpdate) => {
			if (!data || !KEY) return;

			const toastId: string | number | undefined = undefined;

			try {
				const updated = await mutate(
					async () => {
						const res = await fetch(KEY, {
							method: 'PATCH',
							signal: new AbortController().signal,
							body: JSON.stringify(updateData),
						});

						if (!res.ok) {
							throw new Error('Failed to update user profile');
						}

						return (await res.json()) as UserProfile;
					},
					{
						optimisticData: (current) => {
							return {
								...current,
								app_metadata: {
									...current?.app_metadata,
									...updateData?.app_metadata,
								},
								user_metadata: {
									...current?.user_metadata,
									...updateData?.user_metadata,
								},
							} as UserProfile;
						},
						rollbackOnError: true,
						populateCache: true,
						revalidate: false, // we already returned server data
					}
				);

				sonnerToast.dismiss(toastId);
				sonnerToast.success('Profile updated!');

				return updated;
			} catch (error: unknown) {
				if (toastId) {
					toast({
						data: JSON.stringify(error),
						title: 'Something went wrong!',
						description: 'Unable to undo user profile update. Sorry!',
						type: 'error',
					});
				} else {
					console.error(error);
				}
				return undefined;
			}
		},
		[mutate, data]
	);

	return {
		data: {
			...data,
			displayName,
		},
		error: useUserError || swrError,
		isLoading, // from Auth0 useUser()
		isFetching, // isLoading from SWR
		isPending: isLoading || isFetching,
		isAuthenticated,
		mutate,
		updateUser: updateUserProfile,
		...swrRest,
	} as UseUserProfileResponse;
};
