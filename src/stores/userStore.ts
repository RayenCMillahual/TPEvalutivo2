import { defineStore } from 'pinia';
import { onMounted } from 'vue';
import axios from 'axios';

interface UserState {
  id: string | null;
  username: string | null;
  roles: string[];
  permissions: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    username: null,
    roles: [],
    permissions: [],
  }),
  actions: {
    async initializeUser() {
      try {
        const response = await axios.get('/api/user');
        this.id = response.data.id;
        this.username = response.data.username;
        this.roles = response.data.roles; // Asumiendo que la respuesta incluye los roles
        this.permissions = this.getPermissionsFromRoles(this.roles); // Obtener permisos basados en roles
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    },

    getPermissionsFromRoles(roles: string[]) {
      const permissionsMap: { [key: string]: string[] } = {
        admin: ['read', 'write', 'delete'],
        user: ['read'],
        // Añadir más roles y permisos según sea necesario
      };

      return roles.flatMap(role => permissionsMap[role] || []);
    },
    
    updateUserRoles(newRoles: string[]) {
      this.roles = newRoles;
      this.permissions = this.getPermissionsFromRoles(newRoles);
      // Lógica adicional para actualizar roles en el servidor puede ir aquí
    },
  },
  getters: {
    isUserAdmin: (state) => state.roles.includes('admin'),
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission),
    isAuthenticated: (state) => state.id !== null, // Indica si el usuario está autenticado
  },
});

// Uso del hook en tu componente
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.initializeUser();
    });

    return {
      userStore,
    };
  },
};
