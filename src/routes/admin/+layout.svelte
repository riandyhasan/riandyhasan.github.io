<script lang="ts">
	import '../../app.css';
</script>

<svelte:head>
	<title>Admin Panel - Riandy Hasan</title>
</svelte:head>

<header
	class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
				Yandy
			</a>
			<div class="flex items-center gap-4">
				<a
					href="/"
					class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
				>
					View Site
				</a>
				<span class="text-sm text-muted-foreground">|</span>
				<span class="text-sm font-medium text-muted-foreground">Admin Panel</span>
			</div>
		</div>
	</div>
</header>

<main class="min-h-screen">
	<slot />
</main>
