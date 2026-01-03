import { getBlogPost, getBlogPosts } from '$lib/data-utils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await getBlogPost(params.id);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		post
	};
}

export async function entries() {
	const posts = await getBlogPosts();
	return posts.map((post) => ({
		id: post.id
	}));
}
