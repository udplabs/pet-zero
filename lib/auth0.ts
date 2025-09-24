// lib/auth0.js
import assert from 'assert';
import { ManagementClient } from 'auth0';
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import type { SessionData } from '@auth0/nextjs-auth0/types';
import type { ManagementClientOptionsWithClientSecret as ManagementClientOptions } from 'auth0';
import { sortBy } from '@/lib/utils';

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
	// Options are loaded from environment variables by default
	// Ensure necessary environment variables are properly set
	// domain: process.env.AUTH0_DOMAIN,
	// clientId: process.env.AUTH0_CLIENT_ID,
	// clientSecret: process.env.AUTH0_CLIENT_SECRET,
	// appBaseUrl: process.env.APP_BASE_URL,
	// secret: process.env.AUTH0_SECRET,

	authorizationParameters: {
		// In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables for API authorized applications are no longer automatically picked up by the SDK.
		// Instead, we need to provide the values explicitly.
		scope: process.env.AUTH0_SCOPE,
		audience: process.env.AUTH0_AUDIENCE,
	},
});

/**
 * Get the current server session.
 *
 * Overloads
 * - getSession(): Promise<SessionData | null> — returns null when not authenticated.
 * - getSession(true): Promise<SessionData>   — throws APIError('unauthorized:auth') when missing.
 */
export async function getSession(): Promise<SessionData>;
export async function getSession(throwError: false): Promise<SessionData | null>;
export async function getSession(throwError = false): Promise<SessionData | null> {
	if (!auth0) {
		return null;
	}
	const session = await auth0.getSession();

	if (throwError && !session) {
		throw new Error('Unauthorized');
	}

	return session;
}

export interface Factor {
	id?: string;
	enrolled?: boolean;
	type: FactorType;
	displayName?: string;
	createdAt?: string;
	enrolledAt?: string;
	lastAuthAt?: string;
}

export type FactorType =
	| 'totp'
	| 'recovery-code'
	| 'sms'
	| 'push'
	| 'email'
	| 'push'
	| 'phone'
	| 'webauthn-roaming'
	| 'webauthn-platform'
	| 'passkey'
	| 'password';
class Auth0ManagementClient extends ManagementClient {
	domain: string;
	clientId: string;
	clientSecret: string;

	constructor(options?: ManagementClientOptions) {
		const {
			domain = process.env.AUTH0_MANAGEMENT_API_DOMAIN || process.env.AUTH0_DOMAIN,
			clientId = process.env.AUTH0_MANAGEMENT_API_CLIENT_ID || process.env.AUTH0_CLIENT_ID,
			clientSecret = process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET || process.env.AUTH0_CLIENT_SECRET,
		} = options || {};

		assert.ok(domain, "You must include your API application's domain");
		assert.ok(clientId, "You must include your API application's clientId");
		assert.ok(clientSecret, "You must include your API application's clientSecret");

		super({ domain, clientId, clientSecret });

		this.domain = domain;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	async getFactors(id: string) {
		const { data: user } = await this.users.get({ id });

		const { data: allFactors } = await this.guardian.getFactors();

		const { data: enrollments = [] } = await this.users.getAuthenticationMethods({ id });

		const enabledFactors: Factor[] = allFactors.flatMap((factor) => {
			if (factor.enabled && factor?.name && factor.name !== 'duo') {
				switch (factor.name) {
					case 'otp':
						return [{ type: 'totp', enrolled: false } as Factor];
					case 'push-notification':
						return [{ type: 'push', enrolled: false } as Factor];
					case 'email':
						return [{ type: 'email', enrolled: user?.email_verified } as Factor];
					default:
						return [{ type: factor.name, enrolled: false } as Factor];
				}
			}

			return [];
		});

		const enrolledFactors: Factor[] = enrollments.flatMap((enrollment) => {
			const {
				id,
				type: enrollmentType,
				enrolled_at: enrolledAt,
				created_at: createdAt,
				last_auth_at: lastAuthAt,
				authentication_methods = [],
				name: displayName,
			} = enrollment || {};

			const factor: Factor = {
				createdAt,
				displayName,
				enrolled: true,
				enrolledAt,
				lastAuthAt,
				type: enrollmentType as FactorType,
			};

			if (authentication_methods.length > 0) {
				return authentication_methods?.flatMap((method) => {
					if (method?.type) {
						return [
							{
								...factor,
								...method,
							} as Factor,
						];
					}
					return [];
				});
			}

			return [
				{
					id,
					displayName,
					enrolled: true,
					type: enrollmentType,
				} as Factor,
			];
		});

		return sortBy([...(enabledFactors ?? []), ...(enrolledFactors ?? [])], ['enrolled', 'type'], ['desc', 'asc']);
	}
}

export const auth0Management = new Auth0ManagementClient();
