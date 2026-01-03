<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown, Plus, X } from 'lucide-svelte';
	import Input from './ui/input.svelte';
	import Label from './ui/label.svelte';
	import Button from './ui/button.svelte';

	interface Props {
		id?: string;
		value?: string[];
		label?: string;
		required?: boolean;
		placeholder?: string;
		type?: 'blog' | 'project';
	}

	let {
		id,
		value = $bindable([]),
		label = 'Categories',
		required = false,
		placeholder = 'Type or select categories...',
		type = 'project',
		...restProps
	}: Props = $props();

	let categories = $state<{ id: string; name: string; slug: string }[]>([]);
	let filteredCategories = $state<{ id: string; name: string; slug: string }[]>([]);
	let showSuggestions = $state(false);
	let inputValue = $state('');
	let selectedIndex = $state(-1);
	let loading = $state(false);

	onMount(() => {
		loadCategories();
	});

	async function loadCategories() {
		try {
			const response = await fetch(`/api/categories?type=${type}`);
			if (response.ok) {
				const data = await response.json();
				categories = data.categories || [];
				filterCategories();
			}
		} catch (error) {
			console.error('Error loading categories:', error);
		}
	}

	function filterCategories() {
		if (!inputValue.trim()) {
			filteredCategories = categories.filter((cat) => !value.includes(cat.name));
		} else {
			const search = inputValue.toLowerCase();
			filteredCategories = categories.filter(
				(cat) =>
					!value.includes(cat.name) &&
					(cat.name.toLowerCase().includes(search) || cat.slug.toLowerCase().includes(search))
			);
		}
		selectedIndex = -1;
	}

	function handleInput() {
		filterCategories();
		showSuggestions = true;
	}

	function selectCategory(category: { name: string }) {
		if (!value.includes(category.name)) {
			value = [...value, category.name];
		}
		inputValue = '';
		showSuggestions = false;
		selectedIndex = -1;
		filterCategories();
	}

	function removeCategory(categoryName: string) {
		value = value.filter((cat) => cat !== categoryName);
		filterCategories();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!showSuggestions || filteredCategories.length === 0) {
			if (e.key === 'Enter' && inputValue.trim()) {
				e.preventDefault();
				if (!value.includes(inputValue.trim())) {
					addNewCategory();
				}
			}
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filteredCategories.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (e.key === 'Enter' && selectedIndex >= 0) {
			e.preventDefault();
			selectCategory(filteredCategories[selectedIndex]);
		} else if (e.key === 'Escape') {
			showSuggestions = false;
			selectedIndex = -1;
		}
	}

	function handleFocus() {
		filterCategories();
		showSuggestions = true;
	}

	function handleBlur() {
		setTimeout(() => {
			showSuggestions = false;
		}, 200);
	}

	async function addNewCategory() {
		if (!inputValue.trim()) return;
		if (value.includes(inputValue.trim())) {
			inputValue = '';
			return;
		}

		loading = true;
		try {
			const response = await fetch('/api/categories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: inputValue.trim(), type })
			});

			if (!response.ok) {
				throw new Error('Failed to add category');
			}

			const result = await response.json();

			await loadCategories();

			value = [...value, result.category.name];
			inputValue = '';
			showSuggestions = false;
		} catch (error) {
			console.error('Error adding category:', error);
			alert('Failed to add category. Please try again.');
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		filterCategories();
	});
</script>

<div class="space-y-2 relative">
	{#if label}
		<Label for={id}
			>{label}
			{#if required}*{/if}</Label
		>
	{/if}

	{#if value.length > 0}
		<div class="flex flex-wrap gap-2 mb-2">
			{#each value as categoryName}
				<div class="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
					<span>{categoryName}</span>
					<button
						type="button"
						onclick={() => removeCategory(categoryName)}
						class="ml-1 hover:text-destructive"
					>
						<X class="h-3 w-3" />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<div class="relative">
		<input
			{id}
			type="text"
			bind:value={inputValue}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			onfocus={handleFocus}
			onblur={handleBlur}
			{placeholder}
			class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-10"
		/>
		<ChevronDown
			class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
		/>
	</div>

	{#if showSuggestions && (filteredCategories.length > 0 || inputValue.trim())}
		<div
			class="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto"
			role="listbox"
			tabindex="-1"
			onmousedown={(e) => e.preventDefault()}
		>
			{#if filteredCategories.length > 0}
				{#each filteredCategories as category, index}
					<button
						type="button"
						class="w-full text-left px-4 py-2 hover:bg-muted focus:bg-muted focus:outline-none {selectedIndex ===
						index
							? 'bg-muted'
							: ''}"
						onclick={() => selectCategory(category)}
					>
						<div class="font-medium">{category.name}</div>
						<div class="text-xs text-muted-foreground">{category.slug}</div>
					</button>
				{/each}
			{/if}

			{#if inputValue.trim() && !categories.some((c) => c.name.toLowerCase() === inputValue.toLowerCase())}
				<div class="border-t">
					<button
						type="button"
						class="w-full text-left px-4 py-2 hover:bg-muted focus:bg-muted focus:outline-none flex items-center gap-2"
						onclick={addNewCategory}
						disabled={loading}
					>
						<Plus class="h-4 w-4" />
						<span>Add "{inputValue.trim()}" as new category</span>
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
