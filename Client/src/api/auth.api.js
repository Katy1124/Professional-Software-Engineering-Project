const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    }
};