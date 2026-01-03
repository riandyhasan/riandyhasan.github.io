import { getProject, getProjects } from '$lib/data-utils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project = await getProject(params.id);

	if (!project) {
		error(404, 'Project not found');
	}

	return {
		project
	};
}

export async function entries() {
	const projects = await getProjects();
	return projects.map((project) => ({
		id: project.id
	}));
}
