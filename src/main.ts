import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Importamos Pinia
import App from './App.vue';
import router from './router'; // Importamos las rutas

const app = createApp(App);

// Pinia
const pinia = createPinia();
app.use(pinia); // Usa Pinia en la app

// Vue Router
app.use(router); // Usa Vue Router en la app

// Monta la aplicación
app.mount('#app');
