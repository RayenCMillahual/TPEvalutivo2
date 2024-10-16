<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const authStore = useAuthStore();
authStore.loadUserFromLocalStorage();

userStore.initializeUser();</script>

<template>
  <header>
    <div class="wrapper">
<nav>
        <RouterLink to="/">Home</RouterLink>
</nav>
    </div>
  </header>

  <RouterView />
</template>