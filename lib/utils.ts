import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
	if (url.startsWith('config:')) return null;

	const response = await fetch(url);
	if (!response.ok) {
		const { code, cause } = await response.json();
		throw new Error(`${code} | ${cause}`);
	}
	return response.json();
};
