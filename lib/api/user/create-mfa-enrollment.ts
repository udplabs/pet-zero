import { auth0Management } from '@/lib/auth0';

type AuthenticatorType = 'totp' | 'sms' | 'push' | 'email';

// This call is 'pure' / raw
// Cache invalidation only occurs in API
export const createMFAEnrollment = async (user_id: string, authenticator: AuthenticatorType = 'push') => {
	if (!auth0Management) {
		console.warn('Auth0 Management API client is not initialized.');
		return;
	}
	const {
		data: { ticket_url },
	} = await auth0Management.guardian.createEnrollmentTicket({
		user_id,
		factor: getAuthenticatorType(authenticator),
		allow_multiple_enrollments: true,
		send_mail: false,
	});

	return ticket_url;
};

export function getAuthenticatorType(type: AuthenticatorType) {
	switch (type) {
		case 'totp':
			return 'otp';
		case 'sms':
			return 'phone';
		case 'push':
			return 'push-notification';
		case 'email':
			return 'email';
		default:
			throw new Error(`Unknown authenticator type: ${type}`);
	}
}
