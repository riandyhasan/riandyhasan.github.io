<script lang="ts">
	import {
		Bold,
		Italic,
		List,
		Heading1,
		Code,
		Link,
		Image as ImageIcon,
		Upload,
		X,
		FileCode
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Button from './ui/button.svelte';
	import Textarea from './ui/textarea.svelte';
	import Select from './ui/select.svelte';
	import Input from './ui/input.svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		rows?: number;
	}

	let {
		value = $bindable(),
		placeholder = 'Start writing your content in Markdown...',
		rows = 15,
		...restProps
	}: Props = $props();

	let showImageDialog = $state(false);
	let showLinkDialog = $state(false);
	let showCodeDialog = $state(false);
	let availableImages = $state<{ value: string; label: string }[]>([]);
	let selectedImage = $state('');
	let customImageUrl = $state('');
	let imageAlt = $state('');
	let uploading = $state(false);
	let uploadFile: File | null = $state(null);
	let linkUrl = $state('');
	let linkText = $state('');
	let codeLanguage = $state('');
	let codeContent = $state('');

	onMount(() => {
		loadAvailableImages();
	});

	async function loadAvailableImages() {
		try {
			const response = await fetch('/api/images');
			if (!response.ok) {
				throw new Error('Failed to load images');
			}
			const result = await response.json();
			availableImages = result.images.map((img: string) => ({
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

			selectedImage = result.url;
			customImageUrl = result.url;

			uploadFile = null;

			alert('Image uploaded successfully!');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Failed to upload image. Please try again.');
		} finally {
			uploading = false;
		}
	}

	function insertText(before: string, after: string = '') {
		if (typeof document === 'undefined') return;
		const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end);
		const beforeText = value.substring(0, start);
		const afterText = value.substring(end);

		value = beforeText + before + selectedText + after + afterText;

		setTimeout(() => {
			textarea.focus();
			const newPos = start + before.length + selectedText.length + after.length;
			textarea.setSelectionRange(newPos, newPos);
		}, 0);
	}

	function insertHeading(level: number) {
		insertText('#'.repeat(level) + ' ', '');
	}

	function insertBold() {
		insertText('**', '**');
	}

	function insertItalic() {
		insertText('*', '*');
	}

	function insertList() {
		insertText('- ', '');
	}

	function insertCode() {
		insertText('`', '`');
	}

	function openLinkDialog() {
		showLinkDialog = true;
		linkUrl = '';
		linkText = '';

		if (typeof document !== 'undefined') {
			const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
			if (textarea) {
				const start = textarea.selectionStart;
				const end = textarea.selectionEnd;
				const selectedText = value.substring(start, end);
				if (selectedText) {
					linkText = selectedText;
				}
			}
		}
	}

	function insertLinkFromDialog() {
		if (!linkUrl) {
			alert('Please enter a URL');
			return;
		}

		const text = linkText || linkUrl;
		insertText(`[${text}](`, `${linkUrl})`);

		showLinkDialog = false;
		linkUrl = '';
		linkText = '';
	}

	function openCodeDialog() {
		showCodeDialog = true;
		codeLanguage = '';
		codeContent = '';
	}

	function insertCodeBlockFromDialog() {
		if (!codeContent) {
			alert('Please enter code content');
			return;
		}

		const language = codeLanguage ? codeLanguage : '';
		const codeBlock = `\`\`\`${language}\n${codeContent}\n\`\`\``;

		if (typeof document !== 'undefined') {
			const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
			if (textarea) {
				const start = textarea.selectionStart;
				const beforeText = value.substring(0, start);
				const afterText = value.substring(start);

				const needsNewlineBefore = beforeText.length > 0 && !beforeText.endsWith('\n');
				const needsNewlineAfter = afterText.length > 0 && !afterText.startsWith('\n');

				const before = needsNewlineBefore ? '\n' : '';
				const after = needsNewlineAfter ? '\n' : '';

				value = beforeText + before + codeBlock + after + afterText;

				setTimeout(() => {
					textarea.focus();
					const newPos = start + before.length + codeBlock.length + after.length;
					textarea.setSelectionRange(newPos, newPos);
				}, 0);
			}
		}

		showCodeDialog = false;
		codeLanguage = '';
		codeContent = '';
	}

	function openImageDialog() {
		showImageDialog = true;
		selectedImage = '';
		customImageUrl = '';
		imageAlt = '';
		uploadFile = null;
	}

	function insertImageFromDialog() {
		const imageUrl = selectedImage || customImageUrl;
		if (!imageUrl) {
			alert('Please select or enter an image URL');
			return;
		}

		const alt =
			imageAlt ||
			imageUrl
				.split('/')
				.pop()
				?.replace(/\.[^/.]+$/, '') ||
			'';
		insertText(`![${alt}](`, `${imageUrl})`);

		showImageDialog = false;
		selectedImage = '';
		customImageUrl = '';
		imageAlt = '';
		uploadFile = null;
	}
</script>

<div class="space-y-2">
	<div class="flex items-center gap-1 p-2 border rounded-t-lg bg-muted/50">
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onclick={insertHeading.bind(null, 1)}
			title="Heading 1"
		>
			<Heading1 class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={insertBold} title="Bold">
			<Bold class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={insertItalic} title="Italic">
			<Italic class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={insertList} title="List">
			<List class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={insertCode} title="Inline Code">
			<Code class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={openCodeDialog} title="Code Block">
			<FileCode class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={openLinkDialog} title="Link">
			<Link class="h-4 w-4" />
		</Button>
		<Button type="button" variant="ghost" size="sm" onclick={openImageDialog} title="Image">
			<ImageIcon class="h-4 w-4" />
		</Button>
	</div>

	<Textarea
		id="markdown-editor"
		bind:value
		{placeholder}
		{rows}
		class="rounded-t-none font-mono text-sm"
		{...restProps}
	/>

	{#if showImageDialog}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) showImageDialog = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') showImageDialog = false;
			}}
		>
			<div class="bg-background border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Insert Image</h3>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onclick={() => (showImageDialog = false)}
					>
						<X class="h-4 w-4" />
					</Button>
				</div>

				<div class="space-y-4">
					<div class="space-y-2">
						<label for="image-select" class="text-sm font-medium">Select from existing images</label
						>
						<Select
							id="image-select"
							bind:value={selectedImage}
							options={availableImages}
							placeholder="Choose an image..."
						/>
						{#if selectedImage}
							<div class="mt-2 rounded-lg overflow-hidden border bg-muted">
								<img
									src={selectedImage}
									alt="Preview"
									class="w-full h-32 object-cover"
									onerror={(e) => {
										e.currentTarget.src = '/placeholder.svg';
									}}
								/>
							</div>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="image-url" class="text-sm font-medium">Or enter custom URL/path</label>
						<Input
							id="image-url"
							type="text"
							bind:value={customImageUrl}
							placeholder="/assets/my-image.png or https://example.com/image.jpg"
						/>
						{#if customImageUrl && !selectedImage}
							<div class="mt-2 rounded-lg overflow-hidden border bg-muted">
								<img
									src={customImageUrl}
									alt="Preview"
									class="w-full h-32 object-cover"
									onerror={(e) => {
										e.currentTarget.src = '/placeholder.svg';
									}}
								/>
							</div>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="image-alt" class="text-sm font-medium">Alt text (optional)</label>
						<Input
							id="image-alt"
							type="text"
							bind:value={imageAlt}
							placeholder="Image description"
						/>
					</div>

					<div class="space-y-2 pt-4 border-t">
						<label for="image-upload" class="text-sm font-medium">Upload new image</label>
						<div class="flex items-center gap-2">
							<Input
								id="image-upload"
								type="file"
								accept="image/*"
								onchange={(e) => {
									const target = e.target as HTMLInputElement;
									if (target.files && target.files[0]) {
										uploadFile = target.files[0];
									} else {
										uploadFile = null;
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
					</div>

					<div class="flex gap-2 pt-4">
						<Button type="button" onclick={insertImageFromDialog} class="flex-1">
							Insert Image
						</Button>
						<Button type="button" variant="outline" onclick={() => (showImageDialog = false)}>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if showLinkDialog}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) showLinkDialog = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') showLinkDialog = false;
			}}
		>
			<div class="bg-background border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Insert Link</h3>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onclick={() => (showLinkDialog = false)}
					>
						<X class="h-4 w-4" />
					</Button>
				</div>

				<div class="space-y-4">
					<div class="space-y-2">
						<label for="link-text" class="text-sm font-medium">Link Text *</label>
						<Input
							id="link-text"
							type="text"
							bind:value={linkText}
							placeholder="Click here"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="link-url" class="text-sm font-medium">URL *</label>
						<Input
							id="link-url"
							type="text"
							bind:value={linkUrl}
							placeholder="https://example.com or /page"
							required
						/>
					</div>

					<div class="flex gap-2 pt-4">
						<Button type="button" onclick={insertLinkFromDialog} class="flex-1">Insert Link</Button>
						<Button type="button" variant="outline" onclick={() => (showLinkDialog = false)}>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if showCodeDialog}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) showCodeDialog = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') showCodeDialog = false;
			}}
		>
			<div class="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 shadow-lg">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Insert Code Block</h3>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onclick={() => (showCodeDialog = false)}
					>
						<X class="h-4 w-4" />
					</Button>
				</div>

				<div class="space-y-4">
					<div class="space-y-2">
						<label for="code-language" class="text-sm font-medium">Language (optional)</label>
						<Input
							id="code-language"
							type="text"
							bind:value={codeLanguage}
							placeholder="javascript, python, html, css, etc."
						/>
						<p class="text-xs text-muted-foreground">Leave empty for plain text code block</p>
					</div>

					<div class="space-y-2">
						<label for="code-content" class="text-sm font-medium">Code Content *</label>
						<textarea
							id="code-content"
							bind:value={codeContent}
							rows={10}
							class="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="Enter your code here..."
							required
						></textarea>
					</div>

					<div class="flex gap-2 pt-4">
						<Button type="button" onclick={insertCodeBlockFromDialog} class="flex-1">
							Insert Code Block
						</Button>
						<Button type="button" variant="outline" onclick={() => (showCodeDialog = false)}>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
