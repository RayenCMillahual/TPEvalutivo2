<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="username" placeholder="Usuario" required />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Contraseña" required />
    </div>
    <div>
      <label>
        <input v-model="remember" type="checkbox" /> Recordarme
      </label>
    </div>
    <button type="submit" :disabled="loading">{{ loading ? 'Cargando...' : 'Ingresar' }}</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

// Definición de las variables que enlazarás con los inputs
const username = ref('');
const password = ref('');
const remember = ref(false);
const error = ref('');
const loading = ref(false);

// Importar el store y el router
const authStore = useAuthStore();
const router = useRouter();

// Al montar el componente, intenta recuperar el nombre de usuario guardado
onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
    remember.value = true; // Marca el checkbox si el usuario fue recordado
  }
});
const handleSubmit = async () => {
  error.value = ''; // Limpiar el mensaje de error
  loading.value = true; // Inicia la carga

  // Validar que los campos no estén vacíos
  if (!username.value || !password.value) {
    error.value = 'Por favor, completa todos los campos';
    loading.value = false; // Detener la carga
    return;
  }

  try {
    // Intenta iniciar sesión
    await authStore.login(username.value, password.value);
    // Manejar "Recordarme"
    if (remember.value) {
      localStorage.setItem('username', username.value); // Guarda el usuario en localStorage
    } else {
      localStorage.removeItem('username'); // Limpia el nombre de usuario si no se recuerda
    }

    router.push({ name: 'home' }); // Redirige al home
  } catch (err) {
    // Manejo de errores
    error.value = err || 'Error desconocido. Intenta de nuevo.'; // Captura el error directamente
  } finally {
    loading.value = false; // Detener la carga al finalizar
  }
};

</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  color: red;
}
</style>
