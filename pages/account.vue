<script setup>
import { useAuthStore } from '~/stores/authStore';
import { useAccountStore } from '~/stores/accountStore';
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const userStore = useAuthStore();
const asideStore = useAccountStore();

watch(width, (newVal) => {
   if(newVal <= 822 && !asideStore.isMobile) {
    asideStore.setSelectedSection(null); 
    asideStore.setMobile(true);
   } else if(newVal > 822 && asideStore.isMobile){
    asideStore.setSelectedSection(0); 
    asideStore.setMobile(false);
   }
})
</script>

<template>
   <NuxtLayout name="account">
    <div class=" h-[calc(100svh-54px)] w-full flex">
      <account-aside></account-aside>
        <div class="w-full py-16 px-4 bg-white" v-if="asideStore.selectedSection !== null || !asideStore.isMobile">Content{{asideStore.selectedSection}}</div>
    </div>
   </NuxtLayout>
</template>