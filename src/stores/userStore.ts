import { defineStore } from 'pinia';
import type { User } from '@/models/User';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null, // El estado inicial del usuario es null
  }),
  actions: {
    // Establece los datos del usuario
    setUser(user: User) {
      this.user = user;
    },
    // Limpia los datos del usuario
    clearUser() {
      this.user = null;
    }
  },
  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: (state) => !!state.user,
  }
});
