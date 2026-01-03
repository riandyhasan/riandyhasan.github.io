import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load() {
	if (process.env.NODE_ENV !== 'development') {
		error(404, 'Not found');
	}
}
