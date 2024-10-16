<template>
  <div class="home-wrapper">
    <div v-if="user">
      <h1>Bienvenido, {{ user.username }}</h1>
      <p>Rol: {{ user.role }}</p>
      <p>Contraseña: **almacenada de forma segura**</p>
      <p>Recordarme: {{ user.remember ? 'Sí' : 'No' }}</p>

      <div v-if="session">
        <p>Token: {{ session.payload ? 'Token almacenado' : 'No disponible' }}</p>
        <p>Creado en: {{ session.createdAt }}</p>
        <p>Refrescado en: {{ session.refreshAt }}</p>
        <p>Expira en: {{ session.expiresAt }}</p>
      </div>

      <div v-if="user.role === 'admin'">
        <h2>Usuarios:</h2>
        <ul>
          <li v-for="userItem in users" :key="userItem.id">
            {{ userItem.username }} - {{ userItem.role }}
          </li>
        </ul>
        <button @click="createUser">Crear nuevo usuario</button>
      </div>

      <button @click="handleLogout">Cerrar sesión</button>
    </div>
    <div v-else>
      <p>No estás autenticado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { useSesionStore } from '../stores/sesionStore';
import { useRouter } from 'vue-router';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

const router = useRouter();
const userStore = useUserStore();
const sesionStore = useSesionStore();

const { user } = storeToRefs(userStore);
const { session } = storeToRefs(sesionStore);

const users = ref([]);

console.log("Usuario autenticado en HomeView: ", user.value);
if (!user.value) {
  console.log('No estás autenticado');
}

onMounted(async () => {
  if (user.value?.role === 'admin') {
    users.value = await fetchWrapper.get('/users');
  }
});

const handleLogout = () => {
  userStore.clearUser();
  router.push({ name: 'login' });
};

const createUser = () => {
  console.log('Crear nuevo usuario');
};
</script>

<style scoped>
.home-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

p {
  margin: 10px 0;
}

.admin-section h2 {
  color: #007bff;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
