import { getProjects, getBlogPosts, getCategories } from '$lib/data-utils';

export async function load() {
	const [projects, posts, categories] = await Promise.all([
		getProjects(),
		getBlogPosts(),
		getCategories()
	]);
	return {
		projects,
		posts,
		categories
	};
}
