<script setup>
import { useAuthStore } from '~/stores/authStore';
import { useAccountStore } from '~/stores/accountStore';
import { useWindowSize } from '@vueuse/core';
import Profile from '../components/Profile.vue';
import Creditors from '../components/Creditors.vue';
import Subscription from '../components/Subscription.vue';

const { width, height } = useWindowSize()
const userStore = useAuthStore();
const asideStore = useAccountStore();
const components = [Profile,Creditors, Subscription]

watch(width, (newVal) => {
   if(newVal <= 822 && !asideStore.isMobile) {
    
    asideStore.setMobile(true);
   } else if(newVal > 822 && asideStore.isMobile){
    asideStore.setMobile(false);
   }
})
</script>
<template>
   <NuxtLayout name="account">
    <div class="w-full flex">
      <account-aside></account-aside>
        <div class="w-full py-16 pl-[388px] max-[822px]:pl-[72px] pr-2 bg-slate-800 min-h-[calc(100svh)]" v-if="asideStore.selectedSection !== null || !asideStore.isMobile">
            <component v-if="asideStore.selectedSection !== null" :is="components[asideStore.selectedSection]"></component>
        </div>
    </div>
   </NuxtLayout>
</template>