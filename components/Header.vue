<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useLocalUserStore } from "~/stores/localStore.js";
import { useGlobalStore } from "~/stores/globalStore.js";

const globalStore = useGlobalStore();
const store = useMobileStore();
const auth = useLocalUserStore();
const route = useRoute();
const localMenuOpener = () => {
  store.onMenuOpen();
  document.body.style.overflow = "hidden";
};
const localMenuCloser = () => {
  store.onMenuClose();
  document.body.style.overflow = "auto";
};

const localModalOpener = () => {
  store.onModal();
  document.body.style.overflow = "hidden";
};

const localModalCloser = () => {
  store.onModal();
  document.body.style.overflow = "auto";
};
const fixedHeader = computed(() => route.fullPath.includes("account"));
</script>
<template>
  <header
    class="w-full flex z-20 justify-between  items-center py-2 px-4 max-[822px]:fixed max-[822px]:z-50 bg-white max-[822px]:px-2"
    :class="[
      {  'min-[822px]:shadow-lg': !fixedHeader,
        'rounded-b-xl': store.state,
        'max-[822px]:shadow-none': store.state,
         fixed: fixedHeader,
        'max-[822px]:shadow-md': !fixedHeader && !store.openModal,
        'border-slate-100': fixedHeader,
        'border-b': fixedHeader,
      },
    ]"
  >
    <h2
      class="text-2xl max-[1224px]:text-lg font-extrabold uppercase text-logo-yellow"
    >
      <NuxtLink to="/"> Moneydeal.<span class="text-xs">kz</span></NuxtLink>
    </h2>
    <Nav class="max-[820px]:hidden"></Nav>
    <div class="flex items-center gap-1">
      <button
        class="menu min-[822px]:hidden"
        @click.stop="localMenuOpener"
        v-if="!store.state && !store.openModal"
      >
        <svg
          alt="open_menu"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="24px"
          height="24px"
        >
          <path
            d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"
          />
        </svg>
      </button>

      <button class="menu min-[822px]:hidden" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          alt="close_menu"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 50 50"
          @click.stop="
            () => {
              if (store.state) {
                localMenuCloser();
                return;
              }
              if (store.openModal) {
                localModalCloser();
              }
            }
          "
        >
          <path
            d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
          ></path>
        </svg>
      </button>

      <USkeleton
        v-if="globalStore.loading && route.fullPath === '/'"
        class="h-[38px] w-[250px] bg-slate-300 max-[822px]:hidden bg-opacity-50"
        :config="{
          base: 'animate-pulse',
          background: 'bg-gray-100 dark:bg-gray-800',
          rounded: 'rounded-md',
          w: 'max-[822px]:hidden',
        }"
        :class="[
          { 'opacity-0 pointer-events-none': route.fullPath === '/account' },
        ]"
      />

      <div
        class="flex items-center justify-center w-[250px] max-[822px]:hidden h-[38px]"
        v-if="!auth.isAuth && !globalStore.loading"
      >
        <button
          @click="localModalOpener()"
          class="uppercase bg-button-grey max-[820px]:hidden text-white font-semibold px-6 max-[1224px]:text-xs text-sm py-2 rounded-l-md hover:bg-dark-grey transition-all"
        >
          Войти
        </button>
        <NuxtLink to="/register">
          <button
            class="uppercase px-6 text-sm py-2 max-[820px]:hidden font-semibold text-dark-grey max-[1224px]:text-xs bg-yellow rounded-r-md hover:bg-hover-yellow transition-all"
          >
            Регистрация
          </button>
        </NuxtLink>
      </div>
      <div
        v-if="auth.isAuth && !globalStore.loading"
        class="flex items-center justify-center w-[250px] max-[822px]:hidden h-[38px]"
        :class="[
          { 'opacity-0 pointer-events-none': route.fullPath === '/account' },
        ]"
      >
        <NuxtLink to="/account">
          <button
            class="uppercase h-full px-6 text-sm py-2 max-[822px]:hidden font-semibold text-dark-grey max-[1224px]:text-xs bg-yellow rounded-md hover:bg-hover-yellow transition-all"
          >
            Личный кабинет
          </button>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style></style>
