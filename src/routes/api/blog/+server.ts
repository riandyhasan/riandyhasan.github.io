import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import type { BlogPost } from '$lib/data';

const BLOG_POSTS_FILE = join(process.cwd(), 'static', 'data', 'blog-posts.json');

export async function POST({ request }) {
	try {
		const postData: BlogPost = await request.json();

		let posts: BlogPost[] = [];
		try {
			const fileContents = await readFile(BLOG_POSTS_FILE, 'utf-8');
			posts = JSON.parse(fileContents);
		} catch (error) {
			posts = [];
		}

		const existingIndex = posts.findIndex((p) => p.id === postData.id);

		if (existingIndex >= 0) {
			posts[existingIndex] = postData;
		} else {
			posts.push(postData);
		}

		await writeFile(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');

		return json({ success: true, post: postData });
	} catch (error) {
		console.error('Error saving blog post:', error);
		return json({ error: 'Failed to save blog post' }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { id } = await request.json();

		let posts: BlogPost[] = [];
		try {
			const fileContents = await readFile(BLOG_POSTS_FILE, 'utf-8');
			posts = JSON.parse(fileContents);
		} catch (error) {
			return json({ error: 'Blog posts file not found' }, { status: 404 });
		}

		posts = posts.filter((p) => p.id !== id);

		await writeFile(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting blog post:', error);
		return json({ error: 'Failed to delete blog post' }, { status: 500 });
	}
}
