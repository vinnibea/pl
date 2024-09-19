
<script setup>
import { useLocalUserStore } from "~/stores/localStore.js";
import { useMobileStore } from "~/stores/MobileMenu.js";
  const route = useRoute();
  const auth = useLocalUserStore();


  
const store = useMobileStore();
const onModalOpen = () => {
  document.body.style.overflow = "hidden";
    store.onModal();
};

 </script>

<template>
    <div
    class="fixed w-full flex items-center bottom-0 z-10 gap-24 justify-center shadow-lg min-[822px]:hidden border-t bg-white border-slate-200"
  >
  <NuxtLink to="/" class="flex items-center justify-center px-2 py-2"
  ><UIcon
    class="transition-all duration-30 hover:bg-button-primary-hove cursor-pointer"
    name="mdi:home-outline"
    size="36"
    :class="[
      {
        'bg-button-primary': route.fullPath == '/',
        ' bg-slate-900': route.fullPath != '/',
      },
    ]"
  >
  </UIcon>
</NuxtLink>


  <NuxtLink to='/' class="flex items-center justify-center text-center">
    <UIcon
    class="transition-all duration-300 hover:bg-button-primary-hover cursor-pointer px-2 py-2 bg-slate-900"
    name="mdi:message-reply-text"
    size="28"
    
  />
  </NuxtLink>

   
    
    <NuxtLink v-if="auth.isAuth" :to="'/account'" class="flex items-center justify-center px-2 py-2">
      <UIcon
        class="transition-all duration-300 hover:bg-button-primary-hover  cursor-pointer"
        name="ic:baseline-person"
        size="36"
        :class="[
          {
            'bg-button-primary': route.fullPath == '/account',
            ' bg-slate-900': route.fullPath !== '/account',
          },
        ]"
      />
    </NuxtLink>

    <NuxtLink v-if="!auth.isAuth" :to="'/'" class="flex items-center drop-shadow-xl justify-center px-2 py-2" @click="onModalOpen">
      <UIcon
        class="transition-all duration-300  hover:bg-button-primary-hover cursor-pointer"
        name="ic:baseline-person"
        size="36"
        :class="[
          {
            'bg-button-primary': route.fullPath == '/account',
            ' bg-slate-900': route.fullPath !== '/account',
          },
        ]"
      />
    </NuxtLink>
  </div>
</template>