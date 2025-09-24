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

type SortOrder = 'asc' | 'desc';

// Implementing our own sortBy to improve app performance when developing locally.
// Local development requires reloading over and over.
// Loading lodash-es is heavier than you'd think and lengthens compile time.
export function sortBy<T, K extends keyof T>(array: readonly T[], keys: K[], order: SortOrder[] = ['asc']) {
	const indexed: SortIndex<T>[] = array.map((item, idx) => ({ item, idx }));

	const compare = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);

	const sorted = indexed.toSorted((a, b) => {
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const dir = order[i] === 'asc' ? 1 : -1;

			const av = (a.item as any)[key];
			const bv = (b.item as any)[key];

			// Always push nullish to the end (independent of order)
			if (av == null && bv == null) continue;
			if (av == null) return 1;
			if (bv == null) return -1;

			const diff = compare(av, bv);
			if (diff !== 0) return diff * dir;
		}

		// fallback to original index to maintain stable sort
		return a.idx - b.idx;
	});

	return sorted.map((r) => r.item) as T[];
}

type SortIndex<T> = {
	item: T;
	idx: number;
};
