<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useLocalUserStore } from "~/stores/localStore";
import Profile from "../components/Profile.vue";
import Creditors from "../components/Creditors.vue";
import Subscription from "../components/Subscription.vue";

definePageMeta({
  middleware: "auth",
});

import { useGlobalStore } from "~/stores/globalStore.js";
const globalStore = useGlobalStore();

const { width, height } = useWindowSize();
const asideStore = useAccountStore();
const components = [Profile, Creditors, Subscription];
const authStore = useLocalUserStore();

watch(width, (newVal) => {
  if (newVal <= 822 && !asideStore.isMobile) {
    asideStore.setSelectedSection(null);
    asideStore.setMobile(true);
    return;
  } else if (newVal > 822) {
    asideStore.setMobile(false);
    asideStore.setSelectedSection(0);
      return;
  }
}, {immediate: true});

onBeforeMount(() => {
  $fetch("/api/")
    .then((res) => res)
    .catch((e) => {
        if(e) {
            return navigateTo('/')
        }
});
});
</script>
<template>
  <NuxtLayout name="account" >
    <div class="w-full flex relative" v-if="authStore.isAuth">
      <account-aside></account-aside>
      <div
        class="w-full py-16 pl-[480px] max-[822px]:pl-[72px] pr-2 bg-white min-h-[calc(100svh)]"
        v-if="asideStore.selectedSection !== null || !asideStore.isMobile"
      >
        <component
       
          v-if="asideStore.selectedSection !== null"
          :is="components[asideStore.selectedSection]"
        ></component>
      </div>
    </div>
    <div
      class="w-dvw h-svh flex items-center justify-center"
      v-if="!authStore.isAuth"
    >
    <USkeleton v-if="globalStore.loading" class="min-h-full min-w-full bg-slate-300" :config="{
        base: 'animate-pulse',
        background: 'bg-gray-100 dark:bg-gray-800',
        rounded: 'rounded-md',
      }"  />
    </div>
  </NuxtLayout>
</template>
