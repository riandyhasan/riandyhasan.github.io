<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		id?: string;
		value?: string;
		options?: { value: string; label: string }[];
		readonly?: boolean;
		required?: boolean;
	}

	let {
		class: className = '',
		id,
		value = $bindable(),
		options = [],
		readonly = false,
		required = false,
		...restProps
	}: Props = $props();
</script>

<select
	{id}
	bind:value
	{readonly}
	{required}
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	<option value="">Select an image...</option>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
