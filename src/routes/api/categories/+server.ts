import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import type { Category } from '$lib/data';

const CATEGORIES_FILE = join(process.cwd(), 'static', 'data', 'categories.json');
const BLOG_POSTS_FILE = join(process.cwd(), 'static', 'data', 'blog-posts.json');
const PROJECTS_FILE = join(process.cwd(), 'static', 'data', 'projects.json');

export async function GET({ url }) {
	try {
		const fileContents = await readFile(CATEGORIES_FILE, 'utf-8');
		let categories: Category[] = JSON.parse(fileContents);

		const type = url.searchParams.get('type');
		if (type === 'blog' || type === 'project') {
			categories = categories.filter((cat) => cat.type === type);
		}

		return json({ categories });
	} catch (error) {
		console.error('Error loading categories:', error);
		return json({ categories: [] });
	}
}

export async function POST({ request }) {
	try {
		const { name, type } = await request.json();

		if (!name || !name.trim()) {
			return json({ error: 'Category name is required' }, { status: 400 });
		}

		if (!type || (type !== 'blog' && type !== 'project')) {
			return json({ error: 'Category type must be "blog" or "project"' }, { status: 400 });
		}

		let categories: Category[] = [];
		try {
			const fileContents = await readFile(CATEGORIES_FILE, 'utf-8');
			categories = JSON.parse(fileContents);
		} catch (error) {
			categories = [];
		}

		const existingCategory = categories.find(
			(cat) => cat.name.toLowerCase() === name.trim().toLowerCase() && cat.type === type
		);

		if (existingCategory) {
			return json({ category: existingCategory });
		}

		const slug = name
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');

		const maxId = categories.reduce((max, cat) => {
			const num = parseInt(cat.id.replace('cat-', '')) || 0;
			return Math.max(max, num);
		}, 0);
		const id = `cat-${maxId + 1}`;

		const newCategory: Category = {
			id,
			name: name.trim(),
			slug,
			type: type as 'blog' | 'project'
		};

		categories.push(newCategory);

		await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');

		return json({ category: newCategory });
	} catch (error) {
		console.error('Error saving category:', error);
		return json({ error: 'Failed to save category' }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { id } = await request.json();

		if (!id) {
			return json({ error: 'Category ID is required' }, { status: 400 });
		}

		let categories: Category[] = [];
		try {
			const fileContents = await readFile(CATEGORIES_FILE, 'utf-8');
			categories = JSON.parse(fileContents);
		} catch (error) {
			return json({ error: 'Categories file not found' }, { status: 404 });
		}

		const categoryToDelete = categories.find((cat) => cat.id === id);
		if (!categoryToDelete) {
			return json({ error: 'Category not found' }, { status: 404 });
		}

		let blogPosts: any[] = [];
		try {
			const blogContents = await readFile(BLOG_POSTS_FILE, 'utf-8');
			blogPosts = JSON.parse(blogContents);
		} catch (error) {}

		const usedInBlogs =
			categoryToDelete.type === 'blog' &&
			blogPosts.some(
				(post) => post.category?.toLowerCase() === categoryToDelete.name.toLowerCase()
			);

		let projects: any[] = [];
		try {
			const projectsContents = await readFile(PROJECTS_FILE, 'utf-8');
			projects = JSON.parse(projectsContents);
		} catch (error) {}

		const usedInProjects =
			categoryToDelete.type === 'project' &&
			projects.some((project) =>
				project.categories?.some((cat) => cat.toLowerCase() === categoryToDelete.name.toLowerCase())
			);

		if (usedInBlogs || usedInProjects) {
			const usedIn = [];
			if (usedInBlogs) usedIn.push('blog posts');
			if (usedInProjects) usedIn.push('projects');
			return json(
				{
					error: `Cannot delete category. It is currently used in ${usedIn.join(' and ')}.`,
					usedIn: {
						blogs: usedInBlogs,
						projects: usedInProjects
					}
				},
				{ status: 400 }
			);
		}

		categories = categories.filter((cat) => cat.id !== id);

		await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting category:', error);
		return json({ error: 'Failed to delete category' }, { status: 500 });
	}
}
