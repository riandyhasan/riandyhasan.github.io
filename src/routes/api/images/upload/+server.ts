import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import { existsSync } from 'fs';

export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		const validTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		];
		if (!validTypes.includes(file.type)) {
			return json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
		}

		const assetsDir = join(process.cwd(), 'static', 'assets');
		if (!existsSync(assetsDir)) {
			await mkdir(assetsDir, { recursive: true });
		}

		const timestamp = Date.now();
		const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
		const filename = `${timestamp}-${originalName}`;
		const filepath = join(assetsDir, filename);

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await writeFile(filepath, buffer);

		const publicUrl = `/assets/${filename}`;
		return json({ url: publicUrl, filename });
	} catch (error) {
		console.error('Error uploading file:', error);
		return json({ error: 'Failed to upload file' }, { status: 500 });
	}
}
