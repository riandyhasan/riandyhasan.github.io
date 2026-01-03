import { getProjects, getCategories } from '$lib/data-utils';
import type { Category } from '$lib/data';

export async function load() {
	const [projects, allCategories] = await Promise.all([getProjects(), getCategories()]);
	const categories = allCategories.filter((cat: Category) => cat.type === 'project');
	return {
		projects,
		categories
	};
}
