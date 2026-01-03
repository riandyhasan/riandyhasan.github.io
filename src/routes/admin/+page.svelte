<script lang="ts">
	import type { PageData } from './$types';
	import { isAuthenticated, logout } from '$lib/admin-auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { LogOut, Plus, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	let { data }: { data: PageData } = $props();

	let selectedTab = $state('projects');
	let categories = $state(
		(() => {
			const cats = data.categories;
			return [...cats];
		})()
	);
	let showNewCategoryDialog = $state(false);
	let newCategoryName = $state('');
	let newCategoryType = $state<'blog' | 'project'>('blog');
	let creating = $state(false);
	let deleting = $state<string | null>(null);
	let error = $state('');
	let featuredProjectIds = $state<string[]>([]);
	let savingFeatured = $state(false);

	let blogCategories = $derived(categories.filter((cat) => cat.type === 'blog'));
	let projectCategories = $derived(categories.filter((cat) => cat.type === 'project'));

	onMount(async () => {
		const authenticated = await isAuthenticated();
		if (!authenticated) {
			goto('/admin/login');
			return;
		}
		loadFeaturedProjects();
	});

	async function loadFeaturedProjects() {
		try {
			const response = await fetch('/api/featured-projects');
			if (response.ok) {
				const result = await response.json();
				featuredProjectIds = result.featuredIds || [];
			}
		} catch (error) {
			console.error('Error loading featured projects:', error);
		}
	}

	function toggleFeaturedProject(projectId: string) {
		if (featuredProjectIds.includes(projectId)) {
			featuredProjectIds = featuredProjectIds.filter((id) => id !== projectId);
		} else {
			if (featuredProjectIds.length >= 3) {
				alert('You can only select up to 3 featured projects. Please deselect one first.');
				return;
			}
			featuredProjectIds = [...featuredProjectIds, projectId];
		}
	}

	async function saveFeaturedProjects() {
		if (featuredProjectIds.length > 3) {
			alert('You can only select up to 3 featured projects.');
			return;
		}

		savingFeatured = true;
		try {
			const response = await fetch('/api/featured-projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ projectIds: featuredProjectIds })
			});

			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.error || 'Failed to save featured projects');
			}

			alert('Featured projects saved successfully!');
		} catch (error) {
			console.error('Error saving featured projects:', error);
			alert(error instanceof Error ? error.message : 'Failed to save featured projects');
		} finally {
			savingFeatured = false;
		}
	}

	async function handleLogout() {
		await logout();
		goto('/admin/login');
	}

	async function loadCategories() {
		try {
			const response = await fetch('/api/categories');
			if (response.ok) {
				const result = await response.json();
				categories = result.categories || [];
			}
		} catch (error) {
			console.error('Error loading categories:', error);
		}
	}

	async function handleCreateCategory() {
		if (!newCategoryName.trim()) {
			error = 'Category name is required';
			return;
		}

		creating = true;
		error = '';

		try {
			const response = await fetch('/api/categories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newCategoryName.trim() })
			});

			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.error || 'Failed to create category');
			}

			await loadCategories();

			newCategoryName = '';
			showNewCategoryDialog = false;
		} catch (error) {
			console.error('Error creating category:', error);
			error = error instanceof Error ? error.message : 'Failed to create category';
		} finally {
			creating = false;
		}
	}

	async function handleDeleteCategory(categoryId: string, categoryName: string) {
		if (!confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
			return;
		}

		deleting = categoryId;
		error = '';

		try {
			const response = await fetch('/api/categories', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: categoryId })
			});

			if (!response.ok) {
				const result = await response.json();
				const errorMessage = result.error || 'Failed to delete category';

				alert(errorMessage);
				error = errorMessage;
				return;
			}

			await loadCategories();

			error = '';
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
			alert(errorMessage);
			error = errorMessage;
		} finally {
			deleting = null;
		}
	}
</script>

{#await isAuthenticated() then authenticated}
	{#if authenticated}
		<div class="container mx-auto px-4 py-16">
			<div class="max-w-6xl mx-auto">
				<div class="flex items-center justify-between mb-8">
					<h1 class="text-4xl font-bold">Admin Panel</h1>
					<Button variant="outline" onclick={handleLogout}>
						<LogOut class="mr-2 h-4 w-4" />
						Logout
					</Button>
				</div>

				<div class="w-full">
					<div
						class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4"
					>
						<button
							type="button"
							onclick={() => (selectedTab = 'projects')}
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all {selectedTab ===
							'projects'
								? 'bg-background text-foreground shadow-sm'
								: 'hover:bg-background/50 hover:text-foreground'}"
						>
							Projects
						</button>
						<button
							type="button"
							onclick={() => (selectedTab = 'blog')}
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all {selectedTab ===
							'blog'
								? 'bg-background text-foreground shadow-sm'
								: 'hover:bg-background/50 hover:text-foreground'}"
						>
							Blog Posts
						</button>
						<button
							type="button"
							onclick={() => (selectedTab = 'categories')}
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all {selectedTab ===
							'categories'
								? 'bg-background text-foreground shadow-sm'
								: 'hover:bg-background/50 hover:text-foreground'}"
						>
							Categories
						</button>
					</div>

					{#if selectedTab === 'projects'}
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<h2 class="text-2xl font-semibold">Manage Projects</h2>
								<Button href="/admin/projects/new">
									<Plus class="mr-2 h-4 w-4" />
									New Project
								</Button>
							</div>

							<div class="p-6 border rounded-lg bg-muted/30">
								<div class="flex items-center justify-between mb-4">
									<div>
										<h3 class="font-semibold mb-1">Featured Projects</h3>
										<p class="text-sm text-muted-foreground">
											Select up to 3 projects to feature on the homepage ({featuredProjectIds.length}/3
											selected)
										</p>
									</div>
									<Button
										onclick={saveFeaturedProjects}
										disabled={savingFeatured || featuredProjectIds.length > 3}
										size="sm"
									>
										{savingFeatured ? 'Saving...' : 'Save Featured'}
									</Button>
								</div>

								<div class="space-y-2">
									{#each data.projects as project}
										<label
											class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-background transition-colors {featuredProjectIds.includes(
												project.id
											)
												? 'border-foreground bg-background'
												: 'border-border'}"
										>
											<input
												type="checkbox"
												checked={featuredProjectIds.includes(project.id)}
												onchange={() => toggleFeaturedProject(project.id)}
												class="w-4 h-4 rounded border-input"
											/>
											<div class="flex-1">
												<div class="font-medium">{project.title}</div>
												<div class="text-sm text-muted-foreground">
													{#if project.categories && project.categories.length > 0}
														{project.categories.join(', ')}
													{:else}
														Uncategorized
													{/if}
												</div>
											</div>
											{#if featuredProjectIds.includes(project.id)}
												<span class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded">
													Featured
												</span>
											{/if}
										</label>
									{/each}
								</div>
							</div>

							<div class="border rounded-lg divide-y">
								{#if data.projects.length === 0}
									<div class="p-8 text-center text-muted-foreground">No projects yet</div>
								{:else}
									{#each data.projects as project}
										<div class="p-4 flex items-center justify-between hover:bg-muted/50">
											<div>
												<h3 class="font-semibold">{project.title}</h3>
												<p class="text-sm text-muted-foreground">
													{#if project.categories && project.categories.length > 0}
														{project.categories.join(', ')}
													{:else}
														Uncategorized
													{/if}
												</p>
											</div>
											<div class="flex gap-2">
												<Button href="/admin/projects/{project.id}" variant="outline" size="sm">
													Edit
												</Button>
												<Button variant="outline" size="sm">Delete</Button>
											</div>
										</div>
									{/each}
								{/if}
							</div>
						</div>
					{/if}

					{#if selectedTab === 'blog'}
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<h2 class="text-2xl font-semibold">Manage Blog Posts</h2>
								<Button href="/admin/blog/new">
									<Plus class="mr-2 h-4 w-4" />
									New Post
								</Button>
							</div>

							<div class="border rounded-lg divide-y">
								{#if data.posts.length === 0}
									<div class="p-8 text-center text-muted-foreground">No blog posts yet</div>
								{:else}
									{#each data.posts as post}
										<div class="p-4 flex items-center justify-between hover:bg-muted/50">
											<div>
												<h3 class="font-semibold">{post.title}</h3>
												<p class="text-sm text-muted-foreground">{post.category}</p>
											</div>
											<div class="flex gap-2">
												<Button href="/admin/blog/{post.id}" variant="outline" size="sm">
													Edit
												</Button>
												<Button variant="outline" size="sm">Delete</Button>
											</div>
										</div>
									{/each}
								{/if}
							</div>
						</div>
					{/if}

					{#if selectedTab === 'categories'}
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<h2 class="text-2xl font-semibold">Manage Categories</h2>
								<Button onclick={() => (showNewCategoryDialog = true)}>
									<Plus class="mr-2 h-4 w-4" />
									New Category
								</Button>
							</div>

							{#if error}
								<div
									class="p-4 border border-destructive bg-destructive/10 text-destructive rounded-lg"
								>
									{error}
								</div>
							{/if}

							{#if categories.length === 0}
								<div class="border rounded-lg p-8 text-center text-muted-foreground">
									No categories yet
								</div>
							{:else}
								<div class="space-y-4">
									<div>
										<h3 class="text-lg font-semibold mb-3">Blog Categories</h3>
										<div class="border rounded-lg divide-y">
											{#if blogCategories.length === 0}
												<div class="p-4 text-center text-sm text-muted-foreground">
													No blog categories yet
												</div>
											{:else}
												{#each blogCategories as category}
													<div class="p-4 flex items-center justify-between hover:bg-muted/50">
														<div>
															<h3 class="font-semibold">{category.name}</h3>
															<p class="text-sm text-muted-foreground">{category.slug}</p>
														</div>
														<Button
															variant="outline"
															size="sm"
															onclick={() => handleDeleteCategory(category.id, category.name)}
															disabled={deleting === category.id}
														>
															{deleting === category.id ? 'Deleting...' : 'Delete'}
														</Button>
													</div>
												{/each}
											{/if}
										</div>
									</div>

									<div>
										<h3 class="text-lg font-semibold mb-3">Project Categories</h3>
										<div class="border rounded-lg divide-y">
											{#if projectCategories.length === 0}
												<div class="p-4 text-center text-sm text-muted-foreground">
													No project categories yet
												</div>
											{:else}
												{#each projectCategories as category}
													<div class="p-4 flex items-center justify-between hover:bg-muted/50">
														<div>
															<h3 class="font-semibold">{category.name}</h3>
															<p class="text-sm text-muted-foreground">{category.slug}</p>
														</div>
														<Button
															variant="outline"
															size="sm"
															onclick={() => handleDeleteCategory(category.id, category.name)}
															disabled={deleting === category.id}
														>
															{deleting === category.id ? 'Deleting...' : 'Delete'}
														</Button>
													</div>
												{/each}
											{/if}
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>

		{#if showNewCategoryDialog}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
				role="dialog"
				aria-modal="true"
				tabindex="-1"
				onclick={(e) => {
					if (e.target === e.currentTarget) {
						showNewCategoryDialog = false;
						newCategoryName = '';
						newCategoryType = 'blog';
						error = '';
					}
				}}
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						showNewCategoryDialog = false;
						newCategoryName = '';
						newCategoryType = 'blog';
						error = '';
					}
				}}
			>
				<div class="bg-background border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold">New Category</h3>
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							onclick={() => {
								showNewCategoryDialog = false;
								newCategoryName = '';
								newCategoryType = 'blog';
								error = '';
							}}
						>
							<X class="h-4 w-4" />
						</Button>
					</div>

					<div class="space-y-4">
						<div class="space-y-2">
							<Label for="category-name">Category Name *</Label>
							<input
								id="category-name"
								type="text"
								bind:value={newCategoryName}
								placeholder="e.g., Design, Development, Career"
								required
								onkeydown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleCreateCategory();
									}
								}}
								class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>

						<div class="space-y-2">
							<Label for="category-type">Category Type *</Label>
							<select
								id="category-type"
								bind:value={newCategoryType}
								class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="blog">Blog</option>
								<option value="project">Project</option>
							</select>
						</div>

						{#if error}
							<div
								class="p-3 border border-destructive bg-destructive/10 text-destructive rounded-lg text-sm"
							>
								{error}
							</div>
						{/if}

						<div class="flex gap-2 pt-4">
							<Button
								type="button"
								onclick={handleCreateCategory}
								disabled={creating || !newCategoryName.trim()}
								class="flex-1"
							>
								{creating ? 'Creating...' : 'Create Category'}
							</Button>
							<Button
								type="button"
								variant="outline"
								onclick={() => {
									showNewCategoryDialog = false;
									newCategoryName = '';
									newCategoryType = 'blog';
									error = '';
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
{/await}
