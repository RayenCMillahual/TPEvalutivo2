import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // Importa el userStore de Pinia
import LoginPage from '@/views/LoginPage.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, // Protección para rutas autenticadas
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas: verifica si la ruta requiere autenticación
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Accede al store del usuario
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' }); // Redirige al login si no está autenticado
  } else {
    next(); // Permite el acceso a la ruta
  }
});

export default router;
