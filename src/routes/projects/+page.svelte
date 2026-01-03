<script lang="ts">
	import type { PageData } from './$types';
	import { trackClick, trackSearch } from '$lib/analytics';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state('all');
	let filteredProjects = $derived(
		selectedCategory === 'all'
			? data.projects
			: data.projects.filter((project) =>
					project.categories?.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
				)
	);
</script>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-6xl mx-auto">
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
			<p class="text-xl text-muted-foreground">A showcase of my recent work and side projects.</p>
		</div>

		<div class="mb-12 flex flex-wrap gap-2">
			<button
				type="button"
				onclick={() => {
					selectedCategory = 'all';
					trackClick('category_filter', { category: 'all', page: 'projects' });
				}}
				class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory ===
				'all'
					? 'bg-foreground text-background'
					: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
			>
				All Projects
			</button>
			{#each data.categories as category}
				<button
					type="button"
					onclick={() => {
						selectedCategory = category.name;
						trackClick('category_filter', { category: category.name, page: 'projects' });
					}}
					class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory ===
					category.name
						? 'bg-foreground text-background'
						: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
				>
					{category.name}
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each filteredProjects as project}
				<a
					href="/projects/{project.id}"
					class="group block p-6 rounded-lg border border-border hover:border-foreground transition-colors"
					onclick={() =>
						trackClick('project_card', {
							project_id: project.id,
							project_title: project.title,
							location: 'projects_page'
						})}
				>
					<div class="aspect-[4/3] overflow-hidden rounded-lg bg-muted mb-4">
						<img
							src={project.image || '/placeholder.svg'}
							alt={project.title}
							class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<div class="flex items-center gap-2 text-xs text-muted-foreground mb-3">
						{#if project.categories && project.categories.length > 0}
							<span>{project.categories.join(', ')}</span>
						{:else}
							<span>Uncategorized</span>
						{/if}
						{#if project.date}
							<span>•</span>
							<time>
								{new Date(project.date).toLocaleDateString('en-US', {
									month: 'short',
									year: 'numeric'
								})}
							</time>
						{/if}
					</div>
					<h2 class="text-2xl font-semibold mb-2 group-hover:underline">{project.title}</h2>
					<p class="text-muted-foreground line-clamp-2">{project.description}</p>
				</a>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="text-center py-16">
				<p class="text-muted-foreground">No projects found in this category.</p>
			</div>
		{/if}
	</div>
</div>
