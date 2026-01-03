<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		id?: string;
		placeholder?: string;
		rows?: number;
		value?: string;
	}

	let {
		class: className = '',
		id,
		placeholder,
		rows = 3,
		value = $bindable(),
		...restProps
	}: Props = $props();
</script>

<textarea
	{id}
	{placeholder}
	{rows}
	bind:value
	class={cn(
		'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
></textarea>
