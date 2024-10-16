<template>
  <div class="wrapper">
    <h1>Login</h1>
    <LoginForm />
    <div class="remember-forgot">
      <label>
        <input v-model="remember" type="checkbox" /> Recordarme
      </label>
      <a href="#">Olvidaste tu contraseña</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';

const remember = ref(false);

</script>

<style scoped>
.wrapper {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-forgot a {
  color: #007bff;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}
</style>
