<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useWindowSize } from "@vueuse/core";
import { useLocalUserStore } from "~/stores/localStore";
import Profile from "../components/Profile.vue";
import Creditors from "../components/Creditors.vue";
import Subscription from "../components/Subscription.vue";
import { useGlobalStore } from "~/stores/globalStore.js";
definePageMeta({
  middleware: "auth",
});

const globalStore = useGlobalStore();

const { width, height } = useWindowSize();
const asideStore = useAccountStore();
const components = [Profile, Creditors, Subscription];
const authStore = useLocalUserStore();


onMounted(() => {
  if (width.value > 822) {
    asideStore.setMobile(false);
    asideStore.setSelectedSection(0);
  }
});



const { data, status, error, refresh, clear } = await useFetch('/api/creditors')

provide('creditors', data)
</script>
<template>
  <NuxtLayout name="account">
    <div class="w-full flex relative" v-if="authStore.isAuth">
      <account-aside></account-aside>
      <div
        class="w-full py-16 pl-[480px] max-[822px]:pl-[72px] pr-2 bg-white min-h-[calc(100svh)]"
      >
        <component
          v-if="asideStore.selectedSection !== null"
          :is="components[asideStore.selectedSection]"
          :data="data"
        ></component>

        <div class="relative w-svh h-full flex justify-center items-center max-[822px]:hidden" v-if="asideStore.selectedSection === null">
          <span
            name="loader"
            class="loader bg-yellow bg-opacity-0 border-2 w-20 h-20 bt-2 border-t-yellow border-slate-300 rounded-full"
          >
          </span>
        </div>
      </div>
    </div>
    <div
      class="w-dvw h-svh flex items-center justify-center"
      v-if="!authStore.isAuth"
    >
      <USkeleton
        v-if="globalStore.loading"
        class="min-h-full min-w-full bg-slate-300"
        :config="{
          base: 'animate-pulse',
          background: 'bg-gray-100 dark:bg-gray-800',
          rounded: 'rounded-md',
        }"
      />
    </div>
  </NuxtLayout>
</template>
