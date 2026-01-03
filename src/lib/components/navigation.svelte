<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Menu, X } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: '/contact' }
	];

	$effect(() => {
		isOpen = false;
	});
</script>

{#if !$page.url.pathname.startsWith('/admin')}
	<nav
		class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
	>
		<div class="container mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<a
					href="/"
					class="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
				>
					Yandy
				</a>

				<ul class="hidden md:flex items-center gap-8">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class={cn(
									'text-sm font-medium transition-colors hover:text-foreground/80',
									$page.url.pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
								)}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>

				<button
					type="button"
					onclick={() => (isOpen = !isOpen)}
					class="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Toggle menu"
				>
					{#if isOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</button>
			</div>

			{#if isOpen}
				<div class="md:hidden pb-4 pt-2 border-t border-border">
					<ul class="space-y-2">
						{#each navItems as item}
							<li>
								<a
									href={item.href}
									onclick={() => (isOpen = false)}
									class={cn(
										'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
										$page.url.pathname === item.href
											? 'bg-muted text-foreground'
											: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
									)}
								>
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</nav>
{/if}
