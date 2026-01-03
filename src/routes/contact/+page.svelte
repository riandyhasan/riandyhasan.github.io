<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
</script>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-2xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
			<p class="text-xl text-muted-foreground">
				Interested in working together? I'd love to hear from you.
			</p>
		</div>

		<div class="space-y-8">
			<div class="p-8 border rounded-lg hover:border-foreground transition-colors">
				<div class="flex items-start gap-4">
					<div class="p-3 bg-muted rounded-lg">
						<Mail class="h-6 w-6" />
					</div>
					<div class="flex-1">
						<h2 class="text-xl font-semibold mb-2">Email</h2>
						<p class="text-muted-foreground mb-4">
							Send me an email and I'll get back to you within 24 hours.
						</p>
						<Button href="mailto:riandyhsn@gmail.com">Send Email</Button>
					</div>
				</div>
			</div>

			<div class="p-8 border rounded-lg hover:border-foreground transition-colors">
				<div class="flex items-start gap-4">
					<div class="p-3 bg-muted rounded-lg">
						<Linkedin class="h-6 w-6" />
					</div>
					<div class="flex-1">
						<h2 class="text-xl font-semibold mb-2">LinkedIn</h2>
						<p class="text-muted-foreground mb-4">
							Connect with me on LinkedIn for professional networking.
						</p>
						<Button
							href="https://www.linkedin.com/in/riandy-hasan-3836791b5/"
							variant="outline"
							target="_blank"
							rel="noopener noreferrer"
						>
							View Profile
						</Button>
					</div>
				</div>
			</div>

			<div class="p-8 border rounded-lg hover:border-foreground transition-colors">
				<div class="flex items-start gap-4">
					<div class="p-3 bg-muted rounded-lg">
						<Github class="h-6 w-6" />
					</div>
					<div class="flex-1">
						<h2 class="text-xl font-semibold mb-2">GitHub</h2>
						<p class="text-muted-foreground mb-4">
							Check out my open source work and coding projects.
						</p>
						<Button
							href="https://github.com/riandyhasan"
							variant="outline"
							target="_blank"
							rel="noopener noreferrer"
						>
							View GitHub
						</Button>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-12 p-6 bg-muted rounded-lg text-center">
			<p class="text-muted-foreground">
				Currently <span class="text-foreground font-medium">open to opportunities</span> and always happy
				to discuss interesting projects.
			</p>
		</div>
	</div>
</div>
