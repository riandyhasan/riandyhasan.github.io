<script lang="ts">
	import { isAuthenticated } from '$lib/admin-auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ArrowLeft, Plus, X, ExternalLink, Upload } from 'lucide-svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';
	import Select from '$lib/components/ui/select.svelte';
	import CategoryMultiSelect from '$lib/components/category-multi-select.svelte';

	let images = $state([] as string[]);
	let outcomes = $state([] as string[]);
	let categories = $state([] as string[]);
	let availableImages = $state<{ value: string; label: string }[]>([]);
	let uploading = $state(false);
	let uploadFile: File | null = $state(null);
	let saving = $state(false);

	let formData = $state({
		title: '',
		description: '',
		fullDescription: '',
		date: '',
		technologies: '',
		githubUrl: '',
		liveUrl: '',
		image: ''
	});

	let newOutcome = $state('');
	let newImage = $state('');

	let previewData = $derived({
		...formData,
		technologies: formData.technologies
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean),
		images,
		outcomes,
		categories
	});

	onMount(async () => {
		const authenticated = await isAuthenticated();
		if (!authenticated) {
			goto('/admin/login');
			return;
		}
		loadAvailableImages();
	});

	async function loadAvailableImages() {
		try {
			const response = await fetch('/api/images');
			const data = await response.json();
			availableImages = data.images.map((img: string) => ({
				value: img,
				label: img.split('/').pop() || img
			}));
		} catch (error) {
			console.error('Error loading images:', error);
		}
	}

	async function handleFileUpload() {
		if (!uploadFile) return;

		uploading = true;
		try {
			const formData = new FormData();
			formData.append('file', uploadFile);

			const response = await fetch('/api/images/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			const result = await response.json();

			await loadAvailableImages();

			formData.image = result.url;

			uploadFile = null;

			alert('Image uploaded successfully!');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Failed to upload image. Please try again.');
		} finally {
			uploading = false;
		}
	}

	function addOutcome() {
		if (newOutcome.trim()) {
			outcomes = [...outcomes, newOutcome.trim()];
			newOutcome = '';
		}
	}

	function removeOutcome(index: number) {
		outcomes = outcomes.filter((_, i) => i !== index);
	}

	function addImage() {
		if (newImage.trim()) {
			images = [...images, newImage.trim()];
			newImage = '';
		}
	}

	function removeImage(index: number) {
		images = images.filter((_, i) => i !== index);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		saving = true;

		try {
			const imagePath = formData.image.startsWith('/') ? formData.image : '/' + formData.image;

			const projectData = {
				...formData,
				image: imagePath,
				technologies: formData.technologies
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean),
				images,
				outcomes,
				categories,
				id: formData.title
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '')
			};

			const response = await fetch('/api/projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(projectData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || 'Failed to save project');
			}

			const result = await response.json();
			alert('Project saved successfully!');
			window.location.href = '/admin';
		} catch (error) {
			console.error('Error saving project:', error);
			alert(error instanceof Error ? error.message : 'Failed to save project. Please try again.');
		} finally {
			saving = false;
		}
	}
</script>

{#await isAuthenticated() then authenticated}
	{#if authenticated}
		<div class="container mx-auto px-4 py-8">
			<a
				href="/admin"
				class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
			>
				<ArrowLeft class="mr-2 h-4 w-4" />
				Back to Admin
			</a>

			<div class="grid lg:grid-cols-2 gap-8">
				<div class="space-y-6">
					<h1 class="text-3xl font-bold">New Project</h1>

					<form onsubmit={handleSubmit} class="space-y-6">
						<div class="space-y-2">
							<Label for="title">Title *</Label>
							<Input id="title" bind:value={formData.title} required />
						</div>

						<div class="space-y-2">
							<Label for="description">Short Description *</Label>
							<Textarea id="description" bind:value={formData.description} required />
						</div>

						<div class="space-y-2">
							<Label for="fullDescription">Full Description *</Label>
							<Textarea
								id="fullDescription"
								bind:value={formData.fullDescription}
								rows={6}
								required
							/>
						</div>

						<div class="space-y-2">
							<CategoryMultiSelect
								id="categories"
								bind:value={categories}
								label="Categories"
								required
							/>
						</div>

						<div class="space-y-2">
							<Label for="date">Date</Label>
							<Input id="date" type="month" bind:value={formData.date} />
						</div>

						<div class="space-y-2">
							<Label for="technologies">Technologies (comma-separated) *</Label>
							<Input
								id="technologies"
								bind:value={formData.technologies}
								placeholder="React, Next.js, TypeScript"
								required
							/>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="githubUrl">GitHub URL</Label>
								<Input id="githubUrl" type="url" bind:value={formData.githubUrl} />
							</div>

							<div class="space-y-2">
								<Label for="liveUrl">Live URL</Label>
								<Input id="liveUrl" type="url" bind:value={formData.liveUrl} />
							</div>
						</div>

						<div class="space-y-2">
							<Label for="image">Main Image *</Label>
							<Select id="image" bind:value={formData.image} options={availableImages} required />
							<div class="text-xs text-muted-foreground">Or enter a custom URL:</div>
							<Input
								type="text"
								placeholder="Custom image URL or path (e.g., /projects/1.png or https://example.com/image.jpg)"
								bind:value={formData.image}
							/>
							{#if formData.image}
								<div class="text-xs text-muted-foreground mb-2">
									Selected: <code class="bg-muted px-1 py-0.5 rounded">{formData.image}</code>
								</div>
							{/if}
							<div class="mt-2 rounded-lg overflow-hidden border bg-muted">
								{#if formData.image && formData.image.trim() !== ''}
									{@const imageSrc = formData.image.startsWith('/')
										? formData.image
										: '/' + formData.image}
									<div class="w-full" style="height: 192px; overflow: hidden;">
										<img
											src={imageSrc}
											alt="Project preview"
											class="w-full h-full object-cover"
											style="width: 100%; height: 100%; object-fit: cover; display: block;"
										/>
									</div>
								{:else}
									<div
										class="w-full flex items-center justify-center text-muted-foreground bg-muted/50"
										style="height: 192px;"
									>
										<span class="text-sm">No image selected</span>
									</div>
								{/if}
							</div>
						</div>

						<div class="space-y-2">
							<Label>Additional Images</Label>
							<div class="space-y-3">
								{#each images as image, index}
									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<Input value={image} readonly class="flex-1" />
											<Button
												type="button"
												variant="outline"
												size="sm"
												onclick={() => removeImage(index)}
											>
												<X class="h-4 w-4" />
											</Button>
										</div>
										<div class="rounded-lg overflow-hidden border bg-muted">
											<img
												src={image}
												alt="Image preview {index + 1}"
												class="w-full h-32 object-cover"
												onerror={(e) => {
													e.currentTarget.src = '/placeholder.svg';
												}}
											/>
										</div>
									</div>
								{/each}
								<div class="space-y-2">
									<Select
										bind:value={newImage}
										options={availableImages.filter((img) => !images.includes(img.value))}
									/>
									{#if newImage && !images.includes(newImage)}
										<Button
											type="button"
											variant="outline"
											size="sm"
											onclick={() => {
												if (newImage) {
													images = [...images, newImage];
													newImage = '';
												}
											}}
										>
											Add Selected Image
										</Button>
									{/if}
									<div class="text-xs text-muted-foreground">Or enter a custom URL or path:</div>
									<div class="flex gap-2">
										<Input
											bind:value={newImage}
											placeholder="Image URL or path (e.g., /projects/1.png)"
											onkeydown={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													addImage();
												}
											}}
										/>
										<Button type="button" variant="outline" onclick={addImage}>
											<Plus class="h-4 w-4" />
										</Button>
									</div>
									{#if newImage}
										<div class="rounded-lg overflow-hidden border bg-muted">
											<img
												src={newImage}
												alt="Upload preview"
												class="w-full h-32 object-cover"
												onerror={(e) => {
													e.currentTarget.src = '/placeholder.svg';
												}}
											/>
										</div>
									{/if}
								</div>
							</div>
						</div>

						<div class="space-y-2">
							<Label>Key Outcomes</Label>
							<div class="space-y-2">
								{#each outcomes as outcome, index}
									<div class="flex items-center gap-2">
										<Input value={outcome} readonly class="flex-1" />
										<Button
											type="button"
											variant="outline"
											size="sm"
											onclick={() => removeOutcome(index)}
										>
											<X class="h-4 w-4" />
										</Button>
									</div>
								{/each}
								<div class="flex gap-2">
									<Input
										bind:value={newOutcome}
										placeholder="Add an outcome"
										onkeydown={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												addOutcome();
											}
										}}
									/>
									<Button type="button" variant="outline" onclick={addOutcome}>
										<Plus class="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>

						<div class="space-y-2 border-t pt-6">
							<Label>Upload New Image</Label>
							<div class="space-y-3">
								<div class="flex items-center gap-2">
									<Input
										type="file"
										accept="image/*"
										onchange={(e) => {
											const file = (e.target as HTMLInputElement).files?.[0];
											if (file) {
												uploadFile = file;
											}
										}}
										class="flex-1"
									/>
									<Button
										type="button"
										variant="outline"
										onclick={handleFileUpload}
										disabled={!uploadFile || uploading}
									>
										{#if uploading}
											Uploading...
										{:else}
											<Upload class="mr-2 h-4 w-4" />
											Upload
										{/if}
									</Button>
								</div>
								<div class="text-xs text-muted-foreground">
									Upload images to the <code class="bg-muted px-1 py-0.5 rounded"
										>/public/assets</code
									> folder
								</div>
							</div>
						</div>

						<div class="flex gap-4">
							<Button type="submit" disabled={saving}>
								{saving ? 'Saving...' : 'Save Project'}
							</Button>
							<Button href="/admin" variant="outline" type="button" disabled={saving}>
								Cancel
							</Button>
						</div>
					</form>
				</div>

				<div class="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
					<div class="bg-muted/30 rounded-lg p-6 border">
						<h2 class="text-xl font-bold mb-6">Preview</h2>

						<div class="space-y-6">
							<div>
								<div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
									{#if previewData.categories && previewData.categories.length > 0}
										<span>{previewData.categories.join(', ')}</span>
									{:else}
										<span>Categories</span>
									{/if}
									{#if previewData.date}
										<span>•</span>
										<time>
											{new Date(previewData.date + '-01').toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric'
											})}
										</time>
									{/if}
								</div>
								<h1 class="text-3xl font-bold mb-3">{previewData.title || 'Project Title'}</h1>
								<p class="text-muted-foreground mb-4">
									{previewData.description || 'Project description'}
								</p>

								<div class="flex flex-wrap gap-2">
									{#if previewData.liveUrl}
										<Button
											href={previewData.liveUrl}
											size="sm"
											target="_blank"
											rel="noopener noreferrer"
										>
											<ExternalLink class="mr-2 h-3 w-3" />
											View Live
										</Button>
									{/if}
									{#if previewData.githubUrl}
										<Button
											href={previewData.githubUrl}
											variant="outline"
											size="sm"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Github class="mr-2 h-3 w-3" />
											View Code
										</Button>
									{/if}
								</div>
							</div>

							{#if previewData.image}
								<div class="aspect-video overflow-hidden rounded-lg bg-muted">
									<img
										src={previewData.image}
										alt={previewData.title || 'Project image'}
										class="object-cover w-full h-full"
										onerror={(e) => {
											e.currentTarget.src = '/placeholder.svg';
										}}
									/>
								</div>
							{:else}
								<div class="aspect-video rounded-lg bg-muted flex items-center justify-center">
									<span class="text-muted-foreground text-sm">No image URL provided</span>
								</div>
							{/if}

							<div class="grid grid-cols-2 gap-4 text-sm">
								{#if previewData.date}
									<div>
										<h3 class="font-semibold mb-1">Date</h3>
										<p class="text-muted-foreground">
											{new Date(previewData.date + '-01').toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric'
											})}
										</p>
									</div>
								{/if}
								<div>
									<h3 class="font-semibold mb-1">Categories</h3>
									<p class="text-muted-foreground">
										{#if previewData.categories && previewData.categories.length > 0}
											{previewData.categories.join(', ')}
										{:else}
											-
										{/if}
									</p>
								</div>
							</div>

							<div>
								<h2 class="text-xl font-bold mb-2">About the Project</h2>
								<p class="text-muted-foreground leading-relaxed text-sm">
									{previewData.fullDescription || 'Full description will appear here...'}
								</p>
							</div>

							{#if previewData.technologies.length > 0}
								<div>
									<h2 class="text-xl font-bold mb-3">Technologies Used</h2>
									<div class="flex flex-wrap gap-2">
										{#each previewData.technologies as tech}
											<span class="px-3 py-1 bg-muted rounded-full text-xs font-medium">{tech}</span
											>
										{/each}
									</div>
								</div>
							{/if}

							{#if previewData.outcomes && previewData.outcomes.length > 0}
								<div>
									<h2 class="text-xl font-bold mb-3">Key Outcomes</h2>
									<ul class="space-y-1.5">
										{#each previewData.outcomes as outcome}
											<li class="flex items-start text-sm">
												<span class="mr-2 text-muted-foreground">•</span>
												<span class="text-muted-foreground">{outcome}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if previewData.images.length > 0}
								<div>
									<h2 class="text-xl font-bold mb-3">Gallery</h2>
									<div class="grid grid-cols-2 gap-3">
										{#each previewData.images as image, index}
											<div class="aspect-video overflow-hidden rounded-lg bg-muted">
												<img
													src={image}
													alt="{previewData.title} screenshot {index + 1}"
													class="object-cover w-full h-full"
													onerror={(e) => {
														e.currentTarget.src = '/placeholder.svg';
													}}
												/>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/await}
