<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";



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


</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
