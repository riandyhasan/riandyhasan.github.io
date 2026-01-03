import { getProjects, getBlogPosts } from '$lib/data-utils';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Project, BlogPost } from '$lib/data';

export async function load() {
	const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()]);

	let featuredIds: string[] = [];
	try {
		const featuredFile = join(process.cwd(), 'static', 'data', 'featured-projects.json');
		const featuredContents = await readFile(featuredFile, 'utf-8');
		featuredIds = JSON.parse(featuredContents);
	} catch (error) {
		featuredIds = projects.slice(0, 3).map((p) => p.id);
	}

	const featuredProjects = featuredIds
		.map((id) => projects.find((p) => p.id === id))
		.filter((p): p is Project => p !== undefined)
		.slice(0, 3);

	const recentPosts = blogPosts.slice(0, 2);

	return {
		featuredProjects,
		recentPosts
	};
}
