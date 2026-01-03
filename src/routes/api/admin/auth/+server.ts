import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const session = cookies.get('admin_session');
	return json({ authenticated: session === 'authenticated' });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { password } = await request.json();

		const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

		if (password === adminPassword) {
			cookies.set('admin_session', 'authenticated', {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 24 hours
			});

			return json({ success: true });
		}

		return json({ success: false, error: 'Invalid password' }, { status: 401 });
	} catch (error) {
		return json({ success: false, error: 'Invalid request' }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('admin_session', { path: '/' });
	return json({ success: true });
};
