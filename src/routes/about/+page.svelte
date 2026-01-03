<script lang="ts">
	import type { PageData } from './$types';
	import { Download, Mail } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();

	const siteUrl = 'https://riandyhasan.me';
	const canonicalUrl = $derived(`${siteUrl}${$page.url.pathname}`);
	const ogImage = $derived(data.profile?.photo || `${siteUrl}/myself.jpg`);

	function linkify(text: string): string {
		const urlPattern =
			/(https?:\/\/[^\s<>"']+|(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?:\/[^\s<>"']*)?)/g;

		return text.replace(urlPattern, (url) => {
			if (url.includes('<') || url.includes('>')) {
				return url;
			}

			let href = url;
			if (!url.match(/^https?:\/\//)) {
				href = `https://${url}`;
			}

			return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${url}</a>`;
		});
	}
</script>

<svelte:head>
	<title>About | Riandy Hasan</title>
	<meta
		name="description"
		content="Learn more about Riandy Hasan, a Software Engineer at GoTo Group specializing in scalable solutions across Web, Mobile, and Desktop platforms."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content="About | Riandy Hasan" />
	<meta
		property="og:description"
		content="Learn more about Riandy Hasan, a Software Engineer at GoTo Group specializing in scalable solutions across Web, Mobile, and Desktop platforms."
	/>
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About | Riandy Hasan" />
	<meta
		name="twitter:description"
		content="Learn more about Riandy Hasan, a Software Engineer at GoTo Group specializing in scalable solutions across Web, Mobile, and Desktop platforms."
	/>
	<meta name="twitter:image" content={ogImage} />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

{#if !data.profile}
	<div>Loading...</div>
{:else}
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-16">
				<div class="w-40 h-40 rounded-full overflow-hidden bg-muted mx-auto mb-6">
					<img
						src={data.profile.photo || '/placeholder.svg'}
						alt={data.profile.name}
						class="object-cover w-full h-full"
					/>
				</div>

				<h1 class="text-4xl md:text-5xl font-bold mb-6">{data.profile.name}</h1>

				<div
					class="text-lg leading-relaxed text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto"
				>
					{@html data.profile.bio}
				</div>

				<div class="flex flex-wrap gap-3 justify-center">
					<Button href="mailto:{data.profile.email}" variant="default">
						<Mail class="mr-2 h-4 w-4" />
						Email Me
					</Button>
					<Button
						href={data.profile.linkedin}
						variant="outline"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Linkedin class="mr-2 h-4 w-4" />
						LinkedIn
					</Button>
					{#if data.profile.resumeUrl}
						<Button href={data.profile.resumeUrl} variant="outline" target="_blank">
							<Download class="mr-2 h-4 w-4" />
							Resume
						</Button>
					{/if}
				</div>
			</div>

			<section class="mb-16 py-8 border-t border-border">
				<h2 class="text-2xl font-bold mb-6">Skills & Technologies</h2>
				<div class="flex flex-wrap gap-2">
					{#each data.profile.skills as skill}
						<span class="px-4 py-2 bg-muted rounded-full text-sm font-medium">{skill}</span>
					{/each}
				</div>
			</section>

			<section class="py-8 border-t border-border">
				<h2 class="text-2xl font-bold mb-8">Experience</h2>
				<div class="relative">
					<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

					<div class="space-y-8">
						{#each data.profile.workHistory as job, index}
							<div class="relative pl-12">
								<div
									class="absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background"
								></div>

								<div class="mb-2">
									<h3 class="text-lg font-semibold">{job.company}</h3>
									<p class="text-muted-foreground">
										{job.role}
										{#if job.workType}
											<span class="text-muted-foreground"> • {job.workType}</span>
										{/if}
									</p>
									<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
										<p>{job.period}</p>
										{#if job.location}
											<span>•</span>
											<p>{job.location}</p>
										{/if}
									</div>
								</div>
								<p class="text-muted-foreground leading-relaxed">
									{@html linkify(job.description)}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>
{/if}
