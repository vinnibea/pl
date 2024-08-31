
<script setup>
import { useLocalUserStore } from '~/stores/localStore.js';
import { useAuthStore } from '~/stores/authStore.js';
const localStore = useLocalUserStore();
const authStore = useAuthStore();

  onMounted(async () => {
    localStore.setLocalUser(JSON.parse(localStorage.getItem('user')))
   await authStore.setAuthUser(JSON.parse(localStorage.getItem('user')));
})

</script>

<template>
  <div>
   
      <NuxtPage/>

  </div>
</template>
