import { defineStore } from 'pinia';
export const useSessionStore = defineStore('session', {
state: () => ({
    isLoggedIn: false,
    user: null,
}),
actions: {
    login(user) {
    this.isLoggedIn = true;
      this.user = user; // Guarda el usuario en el estado
    },
    logout() {
    this.isLoggedIn = false;
      this.user = null; // Limpia el usuario
    },
},
});
