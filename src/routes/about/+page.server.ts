import { getProfile } from '$lib/data-utils';

export async function load() {
	const profile = await getProfile();
	return {
		profile
	};
}
