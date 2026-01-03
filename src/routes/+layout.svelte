<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/navigation.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { page } from '$app/stores';

	const siteUrl = 'https://riandyhasan.me';
	const siteName = 'Riandy Hasan - Portfolio';
	const defaultDescription =
		'Software Engineer at GoTo. I love to craft scalable solutions across Web, Mobile, and Desktop platforms.';
	const defaultTitle = 'Riandy Hasan';

	// Get current URL for canonical and Open Graph
	const currentUrl = $derived(siteUrl + $page.url.pathname);
	const pageTitle = $derived($page.data?.title || defaultTitle);
	const pageDescription = $derived($page.data?.description || defaultDescription);
	const pageImage = $derived($page.data?.image || `${siteUrl}/myself.jpg`);

	let { children }: { children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="author" content="Riandy Hasan" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={pageImage} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
	<meta name="twitter:creator" content="@riandyhasan" />

	<!-- Canonical URL -->
	<link rel="canonical" href={currentUrl} />

	<!-- Favicons -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
	<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

	<link rel="manifest" href="/site.webmanifest" />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Riandy Hasan',
		alternateName: 'Yandy',
		jobTitle: 'Software Engineer',
		worksFor: {
			'@type': 'Organization',
			name: 'GoTo Group'
		},
		url: siteUrl,
		sameAs: [
			'https://www.linkedin.com/in/riandy-hasan-3836791b5/',
			'https://github.com/riandyhasan',
			'https://twitter.com/riandyhasan'
		]
	})}</script>`}
</svelte:head>

<Navigation />
<main class="min-h-screen">
	{@render children()}
</main>
<Footer />
