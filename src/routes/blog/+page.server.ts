import { getBlogPosts, getCategories } from '$lib/data-utils';
import type { Category } from '$lib/data';

export async function load() {
	const [posts, allCategories] = await Promise.all([getBlogPosts(), getCategories()]);
	const categories = allCategories.filter((cat: Category) => cat.type === 'blog');
	return {
		posts,
		categories
	};
}
