<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";

const store = useMobileStore();
const localMenuOpener = () => {
  store.onMenuOpen();
  document.body.style.overflow = "hidden";
};
const localMenuCloser = () => {
  store.onMenuClose();
  document.body.style.overflow = "auto";
};
</script>
<template>
  <header
    class="w-full flex justify-between items-center py-2 px-4 shadow-lg max-[860px]:fixed max-[860px]:z-30 bg-white max-[860px]:px-2"
  >
    <h2
      class="text-2xl max-[1024px]:text-xl font-extrabold uppercase text-logo-yellow"
    >
      <NuxtLink to="/"> Moneydeal.<span class="text-xs">kz</span></NuxtLink>
    </h2>
    <Nav class="max-[820px]:hidden"></Nav>
    <div class="flex items-center gap-1">
      <button
        class="menu min-[822px]:hidden"
        @click.stop="localMenuOpener"
        v-if="!store.state"
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
          @click.stop="localMenuCloser"
        >
          <path
            d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
          ></path>
        </svg>
      </button>

      <button
        class="uppercase bg-button-grey max-[820px]:hidden text-white font-semibold px-6 max-[1024px]:text-xs text-sm py-2 rounded-l-md hover:bg-dark-grey transition-all"
      >
        Войти
      </button>
      <button
        class="uppercase px-6 text-sm py-2 max-[820px]:hidden font-semibold text-dark-grey max-[1024px]:text-xs bg-yellow rounded-r-md hover:bg-hover-yellow transition-all"
      >
        Регистрация
      </button>
    </div>
  </header>
</template>

<style></style>
