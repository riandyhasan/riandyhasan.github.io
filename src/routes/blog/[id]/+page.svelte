<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft } from 'lucide-svelte';
	import { marked } from 'marked';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();

	let htmlContent = $derived(marked.parse(data.post.content));

	const siteUrl = 'https://riandyhasan.me';
	const canonicalUrl = $derived(`${siteUrl}${$page.url.pathname}`);
	const ogImage = $derived(data.post.image || `${siteUrl}/myself.jpg`);
	const publishedDate = $derived(new Date(data.post.date).toISOString());
</script>

<svelte:head>
	<title>{data.post.title} | Riandy Hasan</title>
	<meta name="description" content={data.post.excerpt} />
	<meta name="author" content={data.post.author} />
	<meta name="keywords" content={data.post.category} />
	<meta property="article:published_time" content={publishedDate} />
	<meta property="article:author" content={data.post.author} />
	<meta property="article:section" content={data.post.category} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.excerpt} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.excerpt} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Structured Data for Blog Post -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.post.title,
		description: data.post.excerpt,
		image: ogImage,
		datePublished: publishedDate,
		author: {
			'@type': 'Person',
			name: data.post.author,
			url: siteUrl
		},
		publisher: {
			'@type': 'Person',
			name: 'Riandy Hasan',
			url: siteUrl
		}
	})}</script>`}
</svelte:head>

<div class="container mx-auto px-4 py-16">
	<article class="max-w-3xl mx-auto">
		<a
			href="/blog"
			class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
		>
			<ArrowLeft class="mr-2 h-4 w-4" />
			Back to Blog
		</a>

		<header class="mb-12">
			<div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
				<span>{data.post.category}</span>
				<span>•</span>
				<span>{data.post.readTime}</span>
				<span>•</span>
				<time>
					{new Date(data.post.date).toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</time>
			</div>
			<h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight break-words">
				{data.post.title}
			</h1>
			<p class="text-xl text-muted-foreground">{data.post.excerpt}</p>
		</header>

		<div class="prose prose-neutral dark:prose-invert max-w-none">
			{@html htmlContent}
		</div>

		<footer class="mt-12 pt-8 border-t border-border">
			<p class="text-sm text-muted-foreground">Written by {data.post.author}</p>
		</footer>
	</article>
</div>
