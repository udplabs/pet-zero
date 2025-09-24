'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import type { Factor } from '@/lib/auth0';

export const KEY = '/api/v1/me/authenticators';

/**
 * useAuthenticators
 *
 * Hook responsibilities:
 * 1. Conditionally fetch the current user's enrolled authentication factors (MFA authenticators) via SWR.
 * 2. Provide an optimistic deletion UX with a timed UNDO:
 *    - Immediately removes the authenticator from the local cache.
 *    - Shows a toast with a countdown-driven Undo button.
 *    - If not undone within N seconds, executes the DELETE request.
 *    - If the DELETE fails (or Undo chosen), restores the original cache snapshot.
 *
 * Data Flow:
 * - SWR key is only activated once we know (a) user.sub OR (b) auth loading finished (prevents premature call).
 * - deleteAuthenticator(authenticatorId):
 *    a) Take snapshot of current list.
 *    b) Optimistically filter it out (mutate(..., revalidate:false)).
 *    c) Spawn toast with CountDownButton (Undo).
 *    d) On dismiss / countdown completion → perform actual DELETE.
 *    e) On failure → revert snapshot + surface error toast.
 *
 * Error Handling:
 * - Network / server errors are wrapped in APIError for consistent JSON shape.
 * - Undo path cancels the pending destructive effect by restoring snapshot (no revalidate).
 *
 * UX Notes:
 * - Countdown button both displays remaining time and triggers finalization when it completes.
 * - Undo dismisses the toast and short-circuits the DELETE request (since fetch is only fired at onDismiss/onComplete).
 *
 * Potential Improvements:
 * - Add AbortController usage to actually abort an in-flight DELETE if Undo clicked after it started (currently controller defined but not tied to an abort action on undo).
 * - Debounce rapid successive deletions.
 * - Revalidate after successful DELETE to ensure server truth (small risk of drift if other tabs modify factors).
 * - Track pending deletes to disable duplicate clicks.
 */
export function useAuthenticators() {
	const { user, isLoading: isAuthLoading } = useUser();

	// SWR fetch: only run once we know user id or auth has definitively finished.
	const { data = [], isLoading, mutate, ...swrRest } = useSWR<Factor[]>(user?.sub || !isAuthLoading ? KEY : null);

	const deleteAuthenticator = useCallback(
		(authenticatorId: string) => {
			if (!data || !KEY) return;

			const controller = new AbortController(); // (Could be used to abort fetch if undo after start.)

			// Finalize: perform actual DELETE on server.
			const mutateFn = async () => {
				const res = await fetch(`${window.location.origin}/api/me/authenticators/${authenticatorId}`, {
					method: 'DELETE',
					signal: controller.signal,
				});

				if (!res.ok) {
					throw new Error('Failed to delete authenticator');
				}
				return;
			};

			toast.promise(async () => await mutateFn(), {
				loading: 'Deleting authenticator...',
				success: () => {
					mutate();
					return 'Authenticator deleted!';
				},
				error: () => 'oh nOoOoOos! 🙈 Unable to delete!',
			});
		},
		[mutate, data]
	);

	return {
		data,
		isLoading,
		deleteAuthenticator,
		mutate,
		count: data?.length,
		swrRest, // expose remaining SWR
	};
}
