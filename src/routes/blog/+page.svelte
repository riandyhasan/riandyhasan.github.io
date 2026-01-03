<script lang="ts">
	import type { PageData } from './$types';
	import { filterPostsByCategory } from '$lib/client-utils';
	import type { BlogPost } from '$lib/data';
	import { trackClick } from '$lib/analytics';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state('all');
	let filteredPosts = $derived(
		selectedCategory === 'all'
			? data.posts
			: filterPostsByCategory(
					data.posts,
					data.categories.find((c) => c.slug === selectedCategory)?.name || ''
				)
	);
</script>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-4xl mx-auto">
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
			<p class="text-xl text-muted-foreground">
				Thoughts on design, development, and everything in between.
			</p>
		</div>

		<div class="mb-12 flex flex-wrap gap-2">
			<button
				type="button"
				onclick={() => {
					selectedCategory = 'all';
					trackClick('category_filter', { category: 'all', page: 'blog' });
				}}
				class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory ===
				'all'
					? 'bg-foreground text-background'
					: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
			>
				All Posts
			</button>
			{#each data.categories as category}
				<button
					type="button"
					onclick={() => {
						selectedCategory = category.slug;
						trackClick('category_filter', { category: category.name, page: 'blog' });
					}}
					class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory ===
					category.slug
						? 'bg-foreground text-background'
						: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
				>
					{category.name}
				</button>
			{/each}
		</div>

		<div class="space-y-8">
			{#each filteredPosts as post}
				<a
					href="/blog/{post.id}"
					class="block group p-6 rounded-lg border border-border hover:border-foreground transition-colors"
					onclick={() =>
						trackClick('blog_card', {
							post_id: post.id,
							post_title: post.title,
							location: 'blog_page'
						})}
				>
					<div class="flex items-center gap-2 text-xs text-muted-foreground mb-3">
						<span>{post.category}</span>
						<span>•</span>
						<span>{post.readTime}</span>
						<span>•</span>
						<time>
							{new Date(post.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</time>
					</div>
					<h2 class="text-2xl font-semibold mb-2 group-hover:underline">{post.title}</h2>
					<p class="text-muted-foreground line-clamp-2">{post.excerpt}</p>
				</a>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<div class="text-center py-16">
				<p class="text-muted-foreground">No posts found in this category.</p>
			</div>
		{/if}
	</div>
</div>
