// Client-side utility functions (no Node.js dependencies)
import type { BlogPost, Project } from './data';

export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
	if (!category || category === 'all') return posts;
	return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function filterProjectsByCategory(projects: Project[], category: string): Project[] {
	if (!category || category === 'all') return projects;
	return projects.filter((project) =>
		project.categories?.some((cat) => cat.toLowerCase() === category.toLowerCase())
	);
}
