import { readdir } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const projectsPath = join(process.cwd(), 'static', 'projects');
		const assetsPath = join(process.cwd(), 'static', 'assets');

		const images: string[] = [];

		try {
			const projectFiles = await readdir(projectsPath);
			const projectImages = projectFiles
				.filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
				.map((file) => `/projects/${file}`);
			images.push(...projectImages);
		} catch (error) {}

		try {
			const assetFiles = await readdir(assetsPath);
			const assetImages = assetFiles
				.filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
				.map((file) => `/assets/${file}`);
			images.push(...assetImages);
		} catch (error) {}

		return json({ images });
	} catch (error) {
		console.error('Error reading images:', error);
		return json({ images: [] }, { status: 500 });
	}
}
