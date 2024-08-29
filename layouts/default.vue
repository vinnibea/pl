<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useResizeObserver } from "@vueuse/core";

const store = useMobileStore();
const route = useRoute();

const windowWidthRef = ref(null);
useResizeObserver(windowWidthRef, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  if (store.state && width > 822) {
    store.onMenuClose();
    document.body.style.overflow = "auto";
    return;
  }
});
</script>
<template>
  <div
    class="container bg-slate-900 w-full mx-auto min-w-full relative"
    ref="windowWidthRef"
  >
    <mobile-menu></mobile-menu>
    <Header></Header>
    <slot></slot>

    <Footer
      :class="[
        {
          'max-[822px]:hidden': store.politicsOpen !== false,
        },
      ]"
    ></Footer>
    <div
      class="absolute bg-slate-800 opacity-90 top-0 left-0 bottom-0 right-0 z-30 px-4 py-4 max-[822px]:bg-slate-700 max-[822px]:px-2 max-[822px]:py-0 max-[822px]:opacity-90"
      @click="store.onPolitics(false)"
      v-if="store.politicsOpen !== false || store.state"
    >
      <div
        class="flex justify-end relative text-xl font-bold text-white w-full cursor-pointer z-50 max-[822px]:text-slate-700"
      >
        <Icon name="mdi:close" class="w-6 h-6 max-[822px]:hidden"> </Icon>
      </div>
    </div>
    
    
    <div
      class="sticky w-full min-h-14 bottom-0 flex items-center gap-24 justify-center shadow-lg min-[822px]:hidden bg-opacity-90 bg-slate-700 backdrop-blur-xl"
    >
    <NuxtLink to="/" class="flex items-center justify-center"
    ><Icon
      class="transition-all duration-30 hover:bg-amber-300 cursor-pointer"
      name="ic:outline-other-houses"
      size="32"
      :class="[
        {
          'bg-amber-300': route.fullPath == '/',
          ' bg-slate-500': route.fullPath != '/',
        },
      ]"
    >
    </Icon>
  </NuxtLink>

  
    <NuxtLink to='/' class="flex items-center justify-center">
      <Icon
      class="transition-all duration-300 hover:bg-amber-300 cursor-pointer  bg-slate-200"
      name="material-symbols:circle-notifications-outline-rounded"
      size="32"
      
    >
      ></Icon
    >
    </NuxtLink>

     
      
      <NuxtLink to="/register" class="flex items-center justify-center">
        <Icon
          class="transition-all duration-300 hover:bg-amber-300 bg-slate-500 cursor-pointer"
          name="ic:baseline-person"
          size="32"
          :class="[
            {
              'bg-amber-300': route.fullPath == '/register',
              ' bg-slate-200': route.fullPath != '/registe',
            },
          ]"
        ></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
