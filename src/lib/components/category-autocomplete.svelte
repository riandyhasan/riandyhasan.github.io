<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown, Plus, X } from 'lucide-svelte';
	import Input from './ui/input.svelte';
	import Label from './ui/label.svelte';
	import Button from './ui/button.svelte';

	interface Props {
		id?: string;
		value?: string;
		label?: string;
		required?: boolean;
		placeholder?: string;
		type?: 'blog' | 'project';
	}

	let {
		id,
		value = $bindable(),
		label = 'Category',
		required = false,
		placeholder = 'Type or select a category...',
		type = 'blog',
		...restProps
	}: Props = $props();

	let categories = $state<{ id: string; name: string; slug: string }[]>([]);
	let filteredCategories = $state<{ id: string; name: string; slug: string }[]>([]);
	let showSuggestions = $state(false);
	let inputValue = $state(value || '');
	let selectedIndex = $state(-1);
	let loading = $state(false);
	let lastExternalValue = $state(value || '');

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
			filteredCategories = categories;
		} else {
			const search = inputValue.toLowerCase();
			filteredCategories = categories.filter(
				(cat) => cat.name.toLowerCase().includes(search) || cat.slug.toLowerCase().includes(search)
			);
		}
		selectedIndex = -1;
	}

	function handleInput() {
		value = inputValue;
		lastExternalValue = inputValue; // Track that we updated it
		filterCategories();
		showSuggestions = true;
	}

	function selectCategory(category: { name: string }) {
		inputValue = category.name;
		value = category.name;
		lastExternalValue = category.name;
		showSuggestions = false;
		selectedIndex = -1;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!showSuggestions || filteredCategories.length === 0) {
			if (e.key === 'Enter' && inputValue.trim()) {
				e.preventDefault();
				showSuggestions = false;
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

			inputValue = result.category.name;
			value = result.category.name;
			showSuggestions = false;
		} catch (error) {
			console.error('Error adding category:', error);
			alert('Failed to add category. Please try again.');
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (value !== undefined && value !== lastExternalValue) {
			inputValue = value || '';
			lastExternalValue = value || '';
		}
	});
</script>

<div class="space-y-2 relative">
	{#if label}
		<Label for={id}
			>{label}
			{#if required}*{/if}</Label
		>
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
			{required}
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
