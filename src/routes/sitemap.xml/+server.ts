import { getBlogPosts, getProjects } from '$lib/data-utils';
import type { RequestHandler } from './$types';

export const prerender = true;

const siteUrl = 'https://riandyhasan.me';

export const GET: RequestHandler = async () => {
	const blogPosts = await getBlogPosts();
	const projects = await getProjects();

	const staticPages = [
		{ url: '', changefreq: 'weekly', priority: '1.0' },
		{ url: '/about', changefreq: 'monthly', priority: '0.8' },
		{ url: '/projects', changefreq: 'weekly', priority: '0.9' },
		{ url: '/blog', changefreq: 'weekly', priority: '0.9' },
		{ url: '/contact', changefreq: 'monthly', priority: '0.7' }
	];

	const blogPages = blogPosts.map((post) => ({
		url: `/blog/${post.id}`,
		changefreq: 'monthly',
		priority: '0.8',
		lastmod: post.date
	}));

	const projectPages = projects.map((project) => ({
		url: `/projects/${project.id}`,
		changefreq: 'monthly',
		priority: '0.8',
		lastmod: project.date
	}));

	const allPages = [...staticPages, ...blogPages, ...projectPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map((page) => {
		const lastmod = page.lastmod
			? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>`
			: '';
		return `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${lastmod ? `\n    ${lastmod}` : ''}
  </url>`;
	})
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
