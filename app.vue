<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useLocalUserStore } from "~/stores/localStore";
import { useGlobalStore } from "~/stores/globalStore.js";

const localStore = useLocalUserStore();

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
onMounted(async () => {
  $fetch("/api/profile")
    .then((data) => {
      localStore.setLocalUser(data);
    })
    .catch((e) => {
      localStore.setLocalUser();
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
