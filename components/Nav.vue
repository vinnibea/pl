<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const store = useMobileStore();
const localMenuCloser = (href) => {
  if (props.isMobile) {
    navigateTo(`${href}`);
    store.onMenuClose();
    document.body.style.overflow = "auto";
    return;
  }
};

const menuItems = [
  {
    title: 'Wymagania do klienta',
    link: '/#requirements',
  },
  {
    title: 'Uzyskiwanie pożyczki',
    link: '/#credit',
  },
  {
    title: 'Jak działa serwis',
    link: '/#about-service',
  },
  {
    title: 'Kontakt',
    link: '/contacts',
  },
];


</script>

<template>
  <nav
    v-if="route.path === '/' || route.path !== '/account' || isMobile"
    class="flex items-center flex-col max-[822px]:relative max-[822px]:z-50"
    :class="[
      {
        'max-[822px]:hidden': !isMobile,
        'py-12': isMobile,
        'max-[822px]:min-w-full': isMobile,
      },
    ]"
  >
    <ul
      class="flex min-h-[32px] gap-14 max-[1224px]:gap-4 max-[822px]:gap-12 font-medium text-base"
      :class="[
        {
          'flex-col': isMobile,
          'py-12': isMobile,
          'text-2xl': isMobile,
          uppercase: isMobile,
          'max-[1024px]:text-xs': !isMobile,
          'items-start': isMobile,
          'items-center': !isMobile,
          'text-button-primary': isMobile,
          'text-slate-700': !isMobile,
        },
      ]"
    > 
   
      <li
      v-for="item in menuItems"
        :key="item.title"
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >

        <NuxtLink
          :to="item.link"
          @click.prevent="localMenuCloser(item.link)"
          class="py-[16px] px-4 transition-all duration-100 text-slate-500 max-[822px]:font-bold max-[1224px]:px-2 border-transparent min-[822px]:border-b-4 hover:text-slate-900 min-[822px]:hover:border-button-primary"
        >
          {{item.title}}
        </NuxtLink>
      </li>
      
    </ul>
    
  </nav>
</template>
