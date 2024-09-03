<script setup>
import { useLocalUserStore } from "~/stores/localStore.js";
import { useGlobalStore } from "~/stores/globalStore.js";
const localStore = useLocalUserStore();
const globalStore = useGlobalStore();
onBeforeMount(() => {
  $fetch("/api/")
    .then((res) => {
      if(res.statusCode === 401) {
        localStore.setLocalUser()
        return res
      }
      if (res.id) {
        localStore.setLocalUser(res, true);
      }
      return res;
    }).catch((e) => (
      localStore.setLocalUser()
    )).finally(() => {
      globalStore.setLoading(false)
    });
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
