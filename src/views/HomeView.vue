<template>
  <div>
    <div v-if="user">
      <h1>Bienvenido, {{ user.user }}</h1>
      <p>Contraseña: **almacenada de forma segura**</p> <!-- Mensaje en lugar de la contraseña -->
      <p>Recordarme: {{ user.remember ? 'Sí' : 'No' }}</p>
      <button @click="handleLogout">Cerrar sesión</button> <!-- Botón para cerrar sesión -->
    </div>
    <div v-else>
      <p>No estás autenticado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

// Usa el store
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
console.log("Usuario autenticado en HomeView: ", user);
if (!user.value) {
  console.log('No estás autenticado'); // Esto debería ayudarte a saber si estás autenticado
}
// cierre de sesión
const handleLogout = () => {
  userStore.clearUser(); // Limpia los datos del usuario
  //  redirigir al usuario a la página de login si es necesario
  router.push({ name: 'home' });
};
</script>
