<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="user" placeholder="Usuario" required />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Contraseña" required />
    </div>
    <div>
      <label>
        <input v-model="remember" type="checkbox" /> Recordarme
      </label>
    </div>
    <button type="submit">Ingresar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

// Definición de las variables que enlazarás con los inputs
const user = ref('');
const password = ref('');
const remember = ref(false);

// Importar el store y el router
const store = useUserStore();
const router = useRouter();
const handleSubmit = () => {
  store.setUser({ user: user.value, password: password.value, remember: remember.value });
  router.push({ name: 'home' }); // Redirige al home
};


</script>
