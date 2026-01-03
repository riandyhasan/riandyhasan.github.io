<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft, ExternalLink, X } from 'lucide-svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { page } from '$app/stores';
	import { trackClick, trackOutboundLink } from '$lib/analytics';

	let { data }: { data: PageData } = $props();

	let selectedImage = $state<string | null>(null);

	const siteUrl = 'https://riandyhasan.me';
	const canonicalUrl = $derived(`${siteUrl}${$page.url.pathname}`);
	const ogImage = $derived(data.project.image || `${siteUrl}/placeholder-project.jpeg`);

	function openImageModal(imageUrl: string) {
		selectedImage = imageUrl;
		document.body.style.overflow = 'hidden';
		trackClick('image_view', {
			project_id: data.project.id,
			project_title: data.project.title,
			image_url: imageUrl
		});
	}

	function closeImageModal() {
		selectedImage = null;
		document.body.style.overflow = '';
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && selectedImage) {
			closeImageModal();
		}
	}
</script>

<svelte:head>
	<title>{data.project.title} | Riandy Hasan</title>
	<meta name="description" content={data.project.description} />
	<meta name="keywords" content={data.project.categories?.join(', ') || 'portfolio, project'} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={data.project.title} />
	<meta property="og:description" content={data.project.description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.project.title} />
	<meta name="twitter:description" content={data.project.description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Structured Data for Project -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: data.project.title,
		description: data.project.description,
		image: ogImage,
		creator: {
			'@type': 'Person',
			name: 'Riandy Hasan',
			url: siteUrl
		},
		...(data.project.date && { dateCreated: new Date(data.project.date).toISOString() }),
		...(data.project.liveUrl && { url: data.project.liveUrl }),
		keywords: data.project.categories?.join(', ') || '',
		...(data.project.technologies && {
			about: data.project.technologies.map((tech) => ({
				'@type': 'Thing',
				name: tech
			}))
		})
	})}</script>`}
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<div class="container mx-auto px-4 py-16">
	<div class="max-w-4xl mx-auto">
		<a
			href="/projects"
			class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
			onclick={() =>
				trackClick('back_link', { from: 'project_detail', project_id: data.project.id })}
		>
			<ArrowLeft class="mr-2 h-4 w-4" />
			Back to Projects
		</a>

		<div class="mb-12">
			<div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
				{#if data.project.categories && data.project.categories.length > 0}
					<span>{data.project.categories.join(', ')}</span>
				{:else}
					<span>Uncategorized</span>
				{/if}
				{#if data.project.date}
					<span>•</span>
					<time>
						{new Date(data.project.date).toLocaleDateString('en-US', {
							month: 'long',
							year: 'numeric'
						})}
					</time>
				{/if}
			</div>
			<h1 class="text-4xl md:text-5xl font-bold mb-4 text-balance">{data.project.title}</h1>
			<p class="text-xl text-muted-foreground mb-6">{data.project.description}</p>

			<div class="flex flex-wrap gap-3">
				{#if data.project.liveUrl}
					<a
						href={data.project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => {
							trackOutboundLink(data.project.liveUrl || '');
							trackClick('project_live_link', {
								project_id: data.project.id,
								project_title: data.project.title
							});
						}}
					>
						<Button>
							<ExternalLink class="mr-2 h-4 w-4" />
							View Live
						</Button>
					</a>
				{/if}
				{#if data.project.githubUrl}
					<a
						href={data.project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => {
							trackOutboundLink(data.project.githubUrl || '');
							trackClick('project_github_link', {
								project_id: data.project.id,
								project_title: data.project.title
							});
						}}
					>
						<Button variant="outline">
							<Github class="mr-2 h-4 w-4" />
							View Code
						</Button>
					</a>
				{/if}
			</div>
		</div>

		<button
			type="button"
			onclick={() => openImageModal(data.project.image || '/placeholder.svg')}
			class="relative w-full aspect-video overflow-hidden rounded-lg bg-muted mb-12 cursor-pointer hover:opacity-90 transition-opacity group"
		>
			<img
				src={data.project.image || '/placeholder.svg'}
				alt={data.project.title}
				class="w-full h-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"
			></div>
		</button>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			{#if data.project.date}
				<div>
					<h3 class="font-semibold mb-2">Date</h3>
					<p class="text-muted-foreground">
						{new Date(data.project.date).toLocaleDateString('en-US', {
							month: 'long',
							year: 'numeric'
						})}
					</p>
				</div>
			{/if}
			<div>
				<h3 class="font-semibold mb-2">Categories</h3>
				<p class="text-muted-foreground">
					{#if data.project.categories && data.project.categories.length > 0}
						{data.project.categories.join(', ')}
					{:else}
						Uncategorized
					{/if}
				</p>
			</div>
		</div>

		<div class="prose prose-neutral dark:prose-invert max-w-none mb-12">
			<h2>About the Project</h2>
			<p class="text-muted-foreground leading-relaxed">{data.project.fullDescription}</p>
		</div>

		<div class="mb-12">
			<h2 class="text-2xl font-bold mb-4">Technologies Used</h2>
			<div class="flex flex-wrap gap-2">
				{#each data.project.technologies as tech}
					<span class="px-4 py-2 bg-muted rounded-full text-sm font-medium">{tech}</span>
				{/each}
			</div>
		</div>

		{#if data.project.outcomes && data.project.outcomes.length > 0}
			<div class="mb-12">
				<h2 class="text-2xl font-bold mb-4">Key Outcomes</h2>
				<ul class="space-y-2">
					{#each data.project.outcomes as outcome}
						<li class="flex items-start">
							<span class="mr-3 text-muted-foreground">•</span>
							<span class="text-muted-foreground">{outcome}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if data.project.images && data.project.images.length > 1}
			<div class="mb-12">
				<h2 class="text-2xl font-bold mb-6">Gallery</h2>
				<div class="grid md:grid-cols-2 gap-4">
					{#each data.project.images.slice(1) as image, index}
						<button
							type="button"
							onclick={() => openImageModal(image)}
							class="relative overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-90 transition-opacity group"
						>
							<img
								src={image || '/placeholder.svg'}
								alt="{data.project.title} screenshot {index + 2}"
								class="w-full h-auto object-contain"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
							></div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if selectedImage}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
				role="dialog"
				aria-modal="true"
				tabindex="-1"
				onclick={(e) => {
					if (e.target === e.currentTarget) {
						closeImageModal();
					}
				}}
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						closeImageModal();
					}
				}}
			>
				<div class="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
					<button
						type="button"
						onclick={closeImageModal}
						class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
						aria-label="Close modal"
					>
						<X class="h-6 w-6" />
					</button>
					<div role="presentation" onmousedown={(e) => e.stopPropagation()}>
						<img src={selectedImage} alt="" class="max-w-full max-h-full object-contain" />
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
