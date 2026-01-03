import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import type { Project } from '$lib/data';

const PROJECTS_FILE = join(process.cwd(), 'static', 'data', 'projects.json');

export async function POST({ request }) {
	try {
		const projectData: Project = await request.json();

		let projects: Project[] = [];
		try {
			const fileContents = await readFile(PROJECTS_FILE, 'utf-8');
			projects = JSON.parse(fileContents);
		} catch (error) {
			projects = [];
		}

		const existingIndex = projects.findIndex((p) => p.id === projectData.id);

		if (existingIndex >= 0) {
			projects[existingIndex] = projectData;
		} else {
			projects.push(projectData);
		}

		await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');

		return json({ success: true, project: projectData });
	} catch (error) {
		console.error('Error saving project:', error);
		return json({ error: 'Failed to save project' }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { id } = await request.json();

		let projects: Project[] = [];
		try {
			const fileContents = await readFile(PROJECTS_FILE, 'utf-8');
			projects = JSON.parse(fileContents);
		} catch (error) {
			return json({ error: 'Projects file not found' }, { status: 404 });
		}

		projects = projects.filter((p) => p.id !== id);

		await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting project:', error);
		return json({ error: 'Failed to delete project' }, { status: 500 });
	}
}
