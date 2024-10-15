<template>
  <div class="wrapper">
    <div class="wrapper">
    <LoginForm />
  </div>
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>
      <div class="input-bx">
        <input v-model="user" type="text" placeholder="Usuario" required />
        <ion-icon class="icon" name="person-circle"></ion-icon>
      </div>
      <div class="input-bx">
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <ion-icon class="icon" name="lock-closed"></ion-icon>
      </div>
      <div class="remember-forgot">
        <label><input v-model="remember" type="checkbox" /> Recordarme</label>
        <a href="#">Olvidaste tu contraseña</a>
      </div>
      <button type="submit" class="btn">Ingresar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
const user = ref('');
const password = ref('');
const remember = ref(false);
const router = useRouter();

const handleSubmit = () => {
  console.log({ user: user.value, password: password.value, remember: remember.value });
  router.push('/home');
};
</script>

<style scoped>
/* Aquí puedes pegar los estilos del archivo CSS */
</style>
