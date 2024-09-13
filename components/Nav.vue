<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const store = useMobileStore();
const localMenuCloser = (href) => {
  console.log(href)
  if (!store.state) return;
  if (route.path !== "/") {
    navigateTo(`/#${href}`);
    if (props.isMobile) {
      console.log("fires");
      store.onMenuClose();
    }
    document.body.style.overflow = "auto";
    return;
  }

  if (props.isMobile) {
    store.onMenuClose();
    document.body.style.overflow = "auto";
  }
};

const route = useRoute();
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
          'text-white': isMobile,
          'text-slate-700': !isMobile,
        },
      ]"
    >
      <li
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="#requirements"
          @click="localMenuCloser('requirements')"
          class="py-4 px-4 transition-all max-[822px]:font-bold max-[1224px]:px-2 border-transparent min-[822px]:border-b-2 hover:text-slate-300 min-[822px]:hover:border-amber-300"
        >
          Требования к заказчику
        </NuxtLink>
      </li>

      <li
        @click="localMenuCloser"
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="#credit"
          @click="localMenuCloser('credit')"
          class="py-4 px-4 transition-all max-[1224px]:px-2 max-[822px]:font-bold min-[822px]:border-b-2 border-transparent hover:text-slate-300 min-[822px]:hover:border-amber-300"
        >
          Получение кредита
        </NuxtLink>
      </li>
      <li
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="#about-service"
          @click="localMenuCloser('about-service')"
          class="py-4 px-4 transition-all max-[822px]:font-bold max-[1224px]:px-2 border-transparent min-[822px]:border-b-2 hover:text-slate-300 min-[822px]:hover:border-amber-300"
        >
          Как работает сервис
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
