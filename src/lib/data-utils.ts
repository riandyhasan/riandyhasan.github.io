import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Project, BlogPost, Category, ProfileData } from './data';

// Utility functions for data management - SvelteKit version
// These functions read JSON files from the static folder

async function readJsonFile<T>(filename: string): Promise<T> {
	try {
		const filePath = join(process.cwd(), 'static', 'data', filename);
		const fileContents = await readFile(filePath, 'utf-8');
		return JSON.parse(fileContents) as T;
	} catch (error) {
		console.error(`Error loading ${filename}:`, error);
		throw error;
	}
}

export async function getProjects(): Promise<Project[]> {
	try {
		return await readJsonFile<Project[]>('projects.json');
	} catch (error) {
		console.error('Error loading projects:', error);
		return [];
	}
}

export async function getProject(id: string): Promise<Project | null> {
	const projects = await getProjects();
	return projects.find((p) => p.id === id) || null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		return await readJsonFile<BlogPost[]>('blog-posts.json');
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return [];
	}
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
	const posts = await getBlogPosts();
	return posts.find((p) => p.id === id) || null;
}

export async function getCategories(): Promise<Category[]> {
	try {
		return await readJsonFile<Category[]>('categories.json');
	} catch (error) {
		console.error('Error loading categories:', error);
		return [];
	}
}

export async function getProfile(): Promise<ProfileData | null> {
	try {
		return await readJsonFile<ProfileData>('profile.json');
	} catch (error) {
		console.error('Error loading profile:', error);
		return null;
	}
}

// Filter functions moved to client-utils.ts to avoid importing fs in client code
