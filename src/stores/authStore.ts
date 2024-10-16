import { defineStore } from 'pinia';
import { fetchWrapper } from '@/fetchWrapper';
import { User } from '@/models/User';

interface AuthState {
    user: User | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await fetchWrapper.post('/login', { username, password });
                this.user = response.user; // Almacena el usuario en el estado
                localStorage.setItem('token', response.token); // Almacena el token en el almacenamiento local

                // Guardar el nombre de usuario si el usuario eligió recordar
                if (response.remember) {
                    localStorage.setItem('username', username);
                } else {
                    localStorage.removeItem('username');
                }
            } catch (error) {
                // Manejo de errores: puedes lanzar el error o establecer un estado de error
                console.error('Error de inicio de sesión:', error);
                throw new Error('Error de inicio de sesión, intenta nuevamente.');
            }
        },
        logout() {
            this.user = null; // Limpiar el estado del usuario
            localStorage.removeItem('token'); // Limpiar el token del almacenamiento local
            localStorage.removeItem('username'); // Limpiar el nombre de usuario guardado
        },
        // Puedes agregar más métodos como refreshToken aquí
        async fetchUserData() {
            try {
                const response = await fetchWrapper.get('/user-data'); // Asegúrate de que esta API esté disponible
                this.user = response.user; // Actualiza el usuario en el estado
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    }
});
