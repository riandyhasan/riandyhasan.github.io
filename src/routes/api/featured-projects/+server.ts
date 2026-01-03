import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';

const FEATURED_PROJECTS_FILE = join(process.cwd(), 'static', 'data', 'featured-projects.json');

export async function GET() {
	try {
		const fileContents = await readFile(FEATURED_PROJECTS_FILE, 'utf-8');
		const featuredIds = JSON.parse(fileContents);
		return json({ featuredIds: featuredIds || [] });
	} catch (error) {
		return json({ featuredIds: [] });
	}
}

export async function POST({ request }) {
	try {
		const { projectIds } = await request.json();

		if (!Array.isArray(projectIds)) {
			return json({ error: 'projectIds must be an array' }, { status: 400 });
		}

		if (projectIds.length > 3) {
			return json({ error: 'Maximum 3 featured projects allowed' }, { status: 400 });
		}

		if (projectIds.length > 0 && !projectIds.every((id) => typeof id === 'string')) {
			return json({ error: 'All project IDs must be strings' }, { status: 400 });
		}

		await writeFile(FEATURED_PROJECTS_FILE, JSON.stringify(projectIds, null, 2), 'utf-8');

		return json({ success: true, featuredIds: projectIds });
	} catch (error) {
		console.error('Error saving featured projects:', error);
		return json({ error: 'Failed to save featured projects' }, { status: 500 });
	}
}
