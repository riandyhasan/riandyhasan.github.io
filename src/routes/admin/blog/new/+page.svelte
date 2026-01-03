<script lang="ts">
	import { isAuthenticated } from '$lib/admin-auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { marked } from 'marked';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import MarkdownEditor from '$lib/components/markdown-editor.svelte';
	import CategoryAutocomplete from '$lib/components/category-autocomplete.svelte';

	let formData = $state({
		title: '',
		excerpt: '',
		content: '',
		category: '',
		readTime: '',
		author: 'Riandy Hasan',
		date: new Date().toISOString().split('T')[0]
	});

	let saving = $state(false);

	let htmlContent = $derived(marked.parse(formData.content || ''));

	function calculateReadTime(content: string): string {
		if (!content || !content.trim()) {
			return '1 min read';
		}

		let text = content.replace(/```[\s\S]*?```/g, '');
		text = text.replace(/`[^`]+`/g, '');
		text = text.replace(/^#{1,6}\s+/gm, '');
		text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
		text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '');
		text = text.replace(/\*\*([^\*]+)\*\*/g, '$1');
		text = text.replace(/\*([^\*]+)\*/g, '$1');
		text = text.replace(/^[\s]*[-*+]\s+/gm, '');
		text = text.replace(/^[\s]*\d+\.\s+/gm, '');
		text = text.replace(/^>\s+/gm, '');
		text = text.replace(/^---$/gm, '');

		const words = text
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0);
		const wordCount = words.length;

		const readingSpeed = 200;
		const minutes = Math.ceil(wordCount / readingSpeed);

		return minutes === 1 ? '1 min read' : `${minutes} min read`;
	}

	$effect(() => {
		if (formData.content) {
			formData.readTime = calculateReadTime(formData.content);
		}
	});

	onMount(async () => {
		const authenticated = await isAuthenticated();
		if (!authenticated) {
			goto('/admin/login');
			return;
		}
		formData.readTime = '1 min read';
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		saving = true;

		try {
			const postData = {
				...formData,
				id: formData.title
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '')
			};

			const response = await fetch('/api/blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || 'Failed to save post');
			}

			const result = await response.json();
			alert('Blog post saved successfully!');
			window.location.href = '/admin';
		} catch (error) {
			console.error('Error saving post:', error);
			alert(error instanceof Error ? error.message : 'Failed to save post. Please try again.');
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
					<h1 class="text-3xl font-bold">New Blog Post</h1>

					<form onsubmit={handleSubmit} class="space-y-6">
						<div class="space-y-2">
							<Label for="title">Title *</Label>
							<Input id="title" bind:value={formData.title} required />
						</div>

						<div class="space-y-2">
							<Label for="excerpt">Excerpt *</Label>
							<textarea
								id="excerpt"
								bind:value={formData.excerpt}
								rows={3}
								class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								required
							></textarea>
						</div>

						<div class="space-y-2">
							<Label for="content">Content (Markdown) *</Label>
							<MarkdownEditor bind:value={formData.content} rows={20} required />
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<CategoryAutocomplete
									id="category"
									bind:value={formData.category}
									label="Category"
									required
								/>
							</div>

							<div class="space-y-2">
								<Label for="readTime">Read Time (auto-calculated)</Label>
								<Input
									id="readTime"
									bind:value={formData.readTime}
									placeholder="Auto-calculated"
									readonly
									class="bg-muted cursor-not-allowed"
								/>
								<p class="text-xs text-muted-foreground">
									Automatically calculated from content length
								</p>
							</div>
						</div>

						<div class="space-y-2">
							<Label for="author">Author *</Label>
							<Input id="author" bind:value={formData.author} required />
						</div>

						<div class="space-y-2">
							<Label for="date">Date *</Label>
							<Input id="date" type="date" bind:value={formData.date} required />
						</div>

						<div class="flex gap-4">
							<Button type="submit" disabled={saving}>
								{saving ? 'Saving...' : 'Publish Post'}
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
							<header>
								<div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
									<span>{formData.category || 'Category'}</span>
									<span>•</span>
									<span>{formData.readTime || 'Read time'}</span>
									<span>•</span>
									<time>
										{formData.date
											? new Date(formData.date).toLocaleDateString('en-US', {
													month: 'long',
													day: 'numeric',
													year: 'numeric'
												})
											: 'Date'}
									</time>
								</div>
								<h1 class="text-3xl font-bold mb-3">{formData.title || 'Post Title'}</h1>
								<p class="text-muted-foreground">{formData.excerpt || 'Post excerpt...'}</p>
							</header>

							<div class="prose prose-neutral dark:prose-invert max-w-none">
								{@html htmlContent ||
									'<p class="text-muted-foreground">Start writing to see preview...</p>'}
							</div>

							<footer class="pt-8 border-t border-border">
								<p class="text-sm text-muted-foreground">
									Written by {formData.author || 'Author'}
								</p>
							</footer>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/await}
