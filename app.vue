<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useLocalUserStore } from "~/stores/localStore";
import { useGlobalStore } from "~/stores/globalStore.js";
const globalStore = useGlobalStore();

const localStore = useLocalUserStore();
 const { data, status, error, refresh, clear } = await useFetch('/api/profile');
 if(data.value) {
  localStore.setLocalUser(data.value);
 }
const { width, height } = useWindowSize();
const asideStore = useAccountStore();
watch(width, (newVal) => {
  if (newVal <= 822) {
    asideStore.setMobile(true);
    asideStore.setSelectedSection(null);

    return;
  } else if (newVal > 822 && asideStore.selectedSection === null) {
    asideStore.setMobile(false);
    asideStore.setSelectedSection(0);
    return;
  } else if (newVal > 822 && asideStore.selectedSection !== null) {
    asideStore.setMobile(false);
    asideStore.setSelectedSection(asideStore.selectedSection);
    return;
  }
});
onMounted(() => {
  useGlobalStore().setLoading(false)
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
