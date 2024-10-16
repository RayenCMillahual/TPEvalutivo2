import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router/index';
import { fakeBackend } from './fakeBackend';
const app = createApp(App);
fakeBackend();

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
