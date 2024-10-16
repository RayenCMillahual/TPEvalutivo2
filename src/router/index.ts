// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // Importa el userStore de Pinia
import LoginPage from '@/views/LoginPage.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, // Protección para rutas autenticadas
  },
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' }); // Redirige al login si no está autenticado
  } else {
    next(); // Continúa a la ruta solicitada
  }
});

export default router;
