import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  token: string | null;
  username: string | null;
  expirationDate: Date | null;
  refreshTokenTimeout: ReturnType<typeof setTimeout> | null; // Guarda el temporizador
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    username: null,
    expirationDate: null,
    refreshTokenTimeout: null,
  }),

  actions: {
    // Inicia el temporizador para refrescar el token antes de que expire
    startRefreshTokenTimer() {
      const timeout = this.expirationDate
        ? this.expirationDate.getTime() - Date.now() - 60 * 1000 // Refrescar 1 minuto antes de que expire
        : 0;

      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(async () => {
          await this.refreshToken();
        }, timeout);
      }
    },

    // Detiene el temporizador del refresco de token
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
        this.refreshTokenTimeout = null;
      }
    },

    // Inicia sesión y almacena token, nombre de usuario y fecha de expiración
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/login', { username, password });
        this.token = response.data.token;
        this.username = username;
        this.expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);

        // Guardar en localStorage
        localStorage.setItem('appName_token', this.token);
        localStorage.setItem('appName_username', username);
        localStorage.setItem('appName_expirationDate', this.expirationDate.toISOString());

        // Iniciar temporizador de refresco de token
        this.startRefreshTokenTimer();
      } catch (error) {
        throw error;
      }
    },

    // Refresca el token y reinicia el temporizador
    async refreshToken() {
      try {
        const response = await axios.post('/api/refresh-token', { token: this.token });
        this.token = response.data.token;
        this.expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);

        // Actualizar en localStorage
        localStorage.setItem('appName_token', this.token);
        localStorage.setItem('appName_expirationDate', this.expirationDate.toISOString());

        // Reiniciar temporizador de refresco
        this.startRefreshTokenTimer();
      } catch (error) {
        this.logout(); // Si falla el refresco, cerrar sesión
      }
    },

    // Cierra sesión y limpia todos los datos del usuario
    logout() {
      this.token = null;
      this.username = null;
      this.expirationDate = null;
      localStorage.removeItem('appName_token');
      localStorage.removeItem('appName_username');
      localStorage.removeItem('appName_expirationDate');

      // Detener temporizador de refresco de token
      this.stopRefreshTokenTimer();
    },

    // Cargar datos desde localStorage cuando la app se inicializa
    loadUserFromLocalStorage() {
      const storedUsername = localStorage.getItem('appName_username');
      const storedToken = localStorage.getItem('appName_token');
      const storedExpirationDate = localStorage.getItem('appName_expirationDate');

      if (storedUsername && storedToken && storedExpirationDate) {
        this.username = storedUsername;
        this.token = storedToken;
        this.expirationDate = new Date(storedExpirationDate);

        // Comprobar si el token sigue siendo válido
        if (this.expirationDate > new Date()) {
          this.startRefreshTokenTimer();
        } else {
          this.logout();
        }
      }
    },
  },

  getters: {
    // Devuelve si el usuario está autenticado
    isAuthenticated: (state) => !!state.token && new Date() < (state.expirationDate ?? new Date()),
  },
});
