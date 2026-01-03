<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowRight, Mail } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Terminal from '$lib/components/terminal.svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';

	let { data }: { data: PageData } = $props();

	const terminalConfig = {
		whoami: 'Riandy Hasan',
		role: 'Software Engineer • Data Engineer • DevOps Engineer',
		skills: [
			'• Fullstack (Web, Mobile, Desktop)',
			'• Cloud (GCP, AWS, Alibaba)',
			'• Data Pipelines & Distributed Systems'
		],
		typingSpeed: 120,
		outputDelay: 500,
		cursorDelay: 100,
		clearDelay: 1500,
		commandGap: 100
	};
</script>

<div class="container mx-auto px-4">
	<section class="py-24 md:py-32">
		<div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
			<div class="space-y-6">
				<div class="space-y-4">
					<p class="text-lg md:text-xl text-muted-foreground font-medium">Hi, I'm</p>
					<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Riandy Hasan</h1>
				</div>

				<p class="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
					Building scalable systems for experimentation and customer engagement at GoTo. I love to
					craft scalable solutions across Web, Mobile, and Desktop platforms. Passionate about
					solving complex technical challenges and delivering high-impact solutions.
				</p>

				<div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
					<div class="flex items-center gap-4">
						<a
							href="https://github.com/riandyhasan"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="GitHub"
						>
							<Github class="h-5 w-5" />
						</a>
						<a
							href="https://www.linkedin.com/in/riandy-hasan-3836791b5/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="LinkedIn"
						>
							<Linkedin class="h-5 w-5" />
						</a>
						<a
							href="mailto:riandyhsn@gmail.com"
							class="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Email"
						>
							<Mail class="h-5 w-5" />
						</a>
					</div>

					<div class="flex flex-wrap gap-4">
						<Button href="/projects" size="lg">
							View Projects <ArrowRight class="ml-2 h-4 w-4" />
						</Button>
						<Button href="/contact" variant="outline" size="lg">Get in Touch</Button>
					</div>
				</div>
			</div>

			<div class="hidden md:flex items-center justify-center">
				<Terminal config={terminalConfig} />
			</div>
		</div>
	</section>

	<section class="py-16 border-t border-border">
		<div class="flex items-center justify-between mb-12">
			<h2 class="text-3xl font-bold tracking-tight">Featured Work</h2>
			<a
				href="/projects"
				class="text-sm font-medium hover:underline inline-flex items-center gap-1"
			>
				View All <ArrowRight class="h-4 w-4" />
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each data.featuredProjects as project}
				<a
					href="/projects/{project.id}"
					class="group block p-6 rounded-lg border border-border hover:border-foreground transition-colors"
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
					<h3 class="text-xl font-semibold mb-2 group-hover:underline">{project.title}</h3>
					<p class="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="py-16 border-t border-border">
		<div class="flex items-center justify-between mb-12">
			<h2 class="text-3xl font-bold tracking-tight">Latest Writing</h2>
			<a href="/blog" class="text-sm font-medium hover:underline inline-flex items-center gap-1">
				View All <ArrowRight class="h-4 w-4" />
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each data.recentPosts as post}
				<a
					href="/blog/{post.id}"
					class="group block p-6 rounded-lg border border-border hover:border-foreground transition-colors"
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
					<h3 class="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
					<p class="text-muted-foreground line-clamp-2">{post.excerpt}</p>
				</a>
			{/each}
		</div>
	</section>
</div>
