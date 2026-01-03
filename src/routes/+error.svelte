<script lang="ts">
	import { Home } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';

	let { status, error }: { status: number; error: Error } = $props();
</script>

<div class="container mx-auto px-4 py-32">
	<div class="max-w-2xl mx-auto text-center">
		<h1 class="text-6xl font-bold mb-4">{status || 500}</h1>
		<p class="text-2xl text-muted-foreground mb-8">
			{status === 404 ? 'Page not found' : 'Something went wrong'}
		</p>
		<p class="text-muted-foreground mb-8">
			{status === 404
				? "Sorry, the page you're looking for doesn't exist or has been moved."
				: error?.message || 'An unexpected error occurred.'}
		</p>
		<Button href="/" size="lg">
			<Home class="mr-2 h-4 w-4" />
			Back to Home
		</Button>
	</div>
</div>
