// Data structure and types for the portfolio

export interface Project {
	id: string;
	title: string;
	description: string;
	fullDescription: string;
	categories: string[];
	image: string;
	images?: string[];
	date?: string;
	outcomes?: string[];
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
}

export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	category: string;
	date: string;
	readTime: string;
	author: string;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	type: 'blog' | 'project';
}

export interface ProfileData {
	name: string;
	tagline: string;
	bio: string;
	photo: string;
	email: string;
	linkedin: string;
	resumeUrl?: string;
	skills: string[];
	workHistory: {
		role: string;
		company: string;
		period: string;
		workType?: string;
		location?: string;
		description: string;
	}[];
}
