<script lang="ts">
	import { authenticate } from '$lib/admin-auth';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		error = '';

		const success = await authenticate(password);
		if (success) {
			goto('/admin');
		} else {
			error = 'Invalid password';
		}
		loading = false;
	}
</script>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-md mx-auto">
		<div class="border rounded-lg p-8">
			<h1 class="text-3xl font-bold mb-6">Admin Login</h1>
			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						type="password"
						bind:value={password}
						placeholder="Enter admin password"
					/>
				</div>
				{#if error}
					<p class="text-sm text-destructive">{error}</p>
				{/if}
				<Button type="submit" class="w-full" disabled={loading}>
					{loading ? 'Logging in...' : 'Login'}
				</Button>
			</form>
		</div>
	</div>
</div>
