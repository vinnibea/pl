<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useGlobalStore } from "~/stores/globalStore.js";
import { useLocalUserStore } from "~/stores/localStore";


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

const localStore = useLocalUserStore();
onMounted(async () => {
  $fetch("/api/profile")
    .then((data) => {
      localStore.setLocalUser(data);
    })
    .catch((e) => {
      
      window.console.error = () => {};
      return Promise.resolve()
    })
    .finally(() => {
      useGlobalStore().setLoading(false);
    });
});

</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
