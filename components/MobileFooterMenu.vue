
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
    class="fixed w-full flex items-center bottom-0 gap-24 justify-center shadow-lg min-[822px]:hidden border-t bg-white border-slate-200"
  >
  <NuxtLink to="/" class="flex items-center justify-center px-2 py-2"
  ><UIcon
    class="transition-all duration-30 hover:bg-amber-300 cursor-pointer"
    name="ic:outline-other-houses"
    size="36"
    :class="[
      {
        'bg-amber-300': route.fullPath == '/',
        ' bg-slate-300': route.fullPath != '/',
      },
    ]"
  >
  </UIcon>
</NuxtLink>


  <NuxtLink to='/' class="flex items-center justify-center text-center">
    <UIcon
    class="transition-all duration-300 hover:bg-amber-300 cursor-pointer px-2 py-2 bg-slate-300"
    name="material-symbols:circle-notifications-outline-rounded"
    size="36"
    
  />
  </NuxtLink>

   
    
    <NuxtLink v-if="auth.isAuth" :to="'/account'" class="flex items-center justify-center px-2 py-2">
      <UIcon
        class="transition-all duration-300 hover:bg-amber-300  cursor-pointer"
        name="ic:baseline-person"
        size="36"
        :class="[
          {
            'bg-amber-300': route.fullPath == '/account',
            ' bg-slate-300': route.fullPath !== '/account',
          },
        ]"
      />
    </NuxtLink>

    <NuxtLink v-if="!auth.isAuth" :to="'/'" class="flex items-center drop-shadow-xl justify-center px-2 py-2" @click="onModalOpen">
      <UIcon
        class="transition-all duration-300  hover:bg-amber-300  cursor-pointer"
        name="ic:baseline-person"
        size="36"
        :class="[
          {
            'bg-amber-300': route.fullPath == '/account',
            ' bg-slate-300': route.fullPath !== '/account',
          },
        ]"
      />
    </NuxtLink>
  </div>
</template>