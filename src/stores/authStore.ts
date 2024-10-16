import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  token: string | null;
  username: string | null;
  expirationDate: Date | null;
  refreshTokenTimeout: ReturnType<typeof setTimeout> | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    username: null,
    expirationDate: null,
    refreshTokenTimeout: null,
  }),

  actions: {
    startRefreshTokenTimer() {
      const timeout = this.expirationDate
        ? this.expirationDate.getTime() - Date.now() - 60 * 1000
        : 0;

      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(async () => {
          await this.refreshToken();
        }, timeout);
      }
    },
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
        this.refreshTokenTimeout = null;
      }
    },
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/login', { username, password });
        this.token = response.data.token;
        this.username = username;
        this.expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);

        localStorage.setItem('appName_token', this.token);
        localStorage.setItem('appName_username', username);
        localStorage.setItem('appName_expirationDate', this.expirationDate.toISOString());

        this.startRefreshTokenTimer();
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error de inicio de sesión';
        throw new Error(errorMessage);
      }
    },
    async refreshToken() {
      try {
        const response = await axios.post('/api/refresh-token', { token: this.token });
        this.token = response.data.token;
        this.expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);
        localStorage.setItem('appName_token', this.token);
        localStorage.setItem('appName_expirationDate', this.expirationDate.toISOString());
        this.startRefreshTokenTimer();
      } catch (error) {
        this.logout();
      }
    },

    logout() {
      this.token = null;
      this.username = null;
      this.expirationDate = null;
      localStorage.removeItem('appName_token');
      localStorage.removeItem('appName_username');
      localStorage.removeItem('appName_expirationDate');

      this.stopRefreshTokenTimer();
    },

    loadUserFromLocalStorage() {
      const storedUsername = localStorage.getItem('appName_username');
      const storedToken = localStorage.getItem('appName_token');
      const storedExpirationDate = localStorage.getItem('appName_expirationDate');

      if (storedUsername && storedToken && storedExpirationDate) {
        this.username = storedUsername;
        this.token = storedToken;
        this.expirationDate = new Date(storedExpirationDate);

        if (this.expirationDate > new Date()) {
          this.startRefreshTokenTimer();
        } else {
          this.logout();
        }
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token && new Date() < (state.expirationDate ?? new Date()),
  },
});
