import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Importamos Pinia
import App from './App.vue';
import router from '@/router/index'; // Importamos las rutas
import { fakeBackend } from './fakeBackend';
const app = createApp(App);
fakeBackend();
// Pinia
const pinia = createPinia();
app.use(pinia); // Usa Pinia en la app

// Vue Router
app.use(router); // Usa Vue Router en la app

// Monta la aplicación
app.mount('#app');
