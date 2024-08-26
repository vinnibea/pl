
<script setup>
import { useLocalUserStore } from '~/stores/localStore.js';
const localStore = useLocalUserStore();

  onMounted(() => {
    localStore.setLocalUser(JSON.parse(localStorage.getItem('user')))
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
