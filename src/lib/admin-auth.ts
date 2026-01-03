// Admin authentication using server-side session cookies
// Password is validated on the server using ADMIN_PASSWORD environment variable

export async function isAuthenticated(): Promise<boolean> {
	try {
		const response = await fetch('/api/admin/auth', {
			method: 'GET',
			credentials: 'include'
		});
		return response.ok;
	} catch (error) {
		return false;
	}
}

export async function authenticate(password: string): Promise<boolean> {
	try {
		const response = await fetch('/api/admin/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ password })
		});

		const result = await response.json();
		return result.success === true;
	} catch (error) {
		return false;
	}
}

export async function logout(): Promise<void> {
	try {
		await fetch('/api/admin/auth', {
			method: 'DELETE',
			credentials: 'include'
		});
	} catch (error) {
		console.error('Error logging out:', error);
	}
}
