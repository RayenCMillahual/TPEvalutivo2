const users = [
    { id: 1, username: 'rayen', password: '1234', role: 'user' },
    { id: 2, username: 'admin', password: 'admin', role: 'admin' },
];

// Simulación
export const fakeBackend = () => {
    // Interceptar las solicitudes
    const originalFetch = window.fetch;
    window.fetch = async (url, options) => {
        // Manejar el inicio de sesión
        if (url.endsWith('/login') && options.method === 'POST') {
            const body = JSON.parse(options.body);
            const user = users.find(u => u.username === body.username && u.password === body.password);
            if (!user) {
                return Promise.reject({ message: 'Usuario o contraseña incorrectos' });
            }
            // Simular un token JWT
            const token = `fake-jwt-token.${user.id}`;
            return Promise.resolve({
                ok: true,
                json: async () => ({ token, user }),
            });
        }

        // obtención de información de usuarios
        if (url.endsWith('/users') && options.method === 'GET') {
            return Promise.resolve({
                ok: true,
                json: async () => users,
            });
        }

        // btención de información del usuario autenticado
        if (url.endsWith('/users/me') && options.method === 'GET') {
            const token = options.headers.Authorization?.split(' ')[1]; // Obtener el token del encabezado
            const userId = token ? parseInt(token.split('.')[1]) : null; // Extraer el ID del token
            const user = users.find(u => u.id === userId);
            if (!user) {
                return Promise.reject({ message: 'Usuario no encontrado' });
            }
            return Promise.resolve({
                ok: true,
                json: async () => user,
            });
        }

        // registro de nuevos usuarios
        if (url.endsWith('/register') && options.method === 'POST') {
            const body = JSON.parse(options.body);
            const existingUser = users.find(u => u.username === body.username);
            if (existingUser) {
                return Promise.reject({ message: 'El nombre de usuario ya está en uso' });
            }
            const newUser = {
                id: users.length + 1, // Asignar un nuevo ID
                username: body.username,
                password: body.password,
                role: 'user', // Asignar un rol por defecto
            };
            users.push(newUser);
            return Promise.resolve({ ok: true });
        }

        // eliminación de usuarios (solo para admin)
        if (url.endsWith('/users') && options.method === 'DELETE') {
            const body = JSON.parse(options.body);
            const userIndex = users.findIndex(u => u.id === body.id);
            if (userIndex === -1) {
                return Promise.reject({ message: 'Usuario no encontrado' });
            }
            users.splice(userIndex, 1);
            return Promise.resolve({ ok: true });
        }

        // Si no es un endpoint reconocido, pasar la solicitud al fetch original
        return originalFetch(url, options);
    };
};
