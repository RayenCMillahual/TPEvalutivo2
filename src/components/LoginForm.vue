<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Usuario</label>
      <input v-model="values.username" placeholder="Usuario" type="text" name="username" />
      <span v-if="errors.username" style="color: red;">{{ errors.username }}</span>
    </div>
    
    <div>
      <label for="password">Contraseña</label>
      <input v-model="values.password" type="password" placeholder="Contraseña" name="password" />
      <span v-if="errors.password" style="color: red;">{{ errors.password }}</span>
    </div>

    <button type="submit" :disabled="loading" :class="{ disabled: loading }">
      {{ loading ? 'Cargando...' : 'Ingresar' }}
    </button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const schema = yup.object({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
});

const error = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const submitForm = handleSubmit(async (formValues) => {
  error.value = '';
  loading.value = true;
  try {
    await authStore.login(formValues.username, formValues.password);

    // Guardar en localStorage si el usuario quiere ser recordado
    if (remember.value) {
      localStorage.setItem('appName_remember', formValues.username);
    }

    router.push({ name: 'home' });
  } catch (err) {
    error.value = 'Usuario o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
});
const storedUsername = localStorage.getItem('appName_remember');
if (storedUsername) {
  values.username = storedUsername; // Asignar el nombre de usuario almacenado
}

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
}

button.disabled {
  background-color: #ccc; /* Estilo para el botón deshabilitado */
}
</style>
