<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useGlobalStore } from "~/stores/globalStore.js";
import { useLocalUserStore } from "~/stores/localStore";
import { useRegisterStore } from "~/stores/RegisterStore.js";
import { useCookies } from '@vueuse/integrations/useCookies'
const { width, height } = useWindowSize();
const asideStore = useAccountStore();
const cookies_accepted = useCookies(['cookies'])
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


if(cookies_accepted.get('cookies')) {
  useGlobalStore().setCookies(true);
}
const registerStore = useRegisterStore();

const localStore = useLocalUserStore();
onMounted(async () => {
  if(!!localStorage.getItem('temp') ? 1 : 0) {
    registerStore.setActiveTab(1);
    useGlobalStore().setLoading(false);
    return;
  }
  
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
