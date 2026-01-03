<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';

	const isDevelopment = import.meta.env.MODE === 'development';
</script>

<footer class="border-t border-border mt-24">
	<div class="container mx-auto px-4 py-12">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
			<div>
				<a href="/" class="text-lg font-semibold mb-2 inline-block"> Yandy </a>
				<p class="text-sm text-muted-foreground">
					Software Engineer • Data Engineer • DevOps Engineer
					<br />© {new Date().getFullYear()} Riandy Hasan. All rights reserved.
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-6">
					<a
						href="mailto:riandyhsn@gmail.com"
						class="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Email"
					>
						<Mail class="h-5 w-5" />
					</a>
					<a
						href="https://www.linkedin.com/in/riandy-hasan-3836791b5/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="LinkedIn"
					>
						<Linkedin class="h-5 w-5" />
					</a>
					<a
						href="https://github.com/riandyhasan"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="GitHub"
					>
						<Github class="h-5 w-5" />
					</a>
				</div>

				{#if isDevelopment}
					<div class="flex gap-4 text-sm text-muted-foreground">
						<a href="/admin/login" class="hover:text-foreground transition-colors"> Admin </a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</footer>
