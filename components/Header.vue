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
    class="w-full flex z-20 justify-between sticky top-0 items-center py-2 px-4 max-[822px]:fixed max-[822px]:z-50 bg-white max-[822px]:px-2"
    :class="[
      {
        'min-[822px]:shadow-lg': !fixedHeader,
        'rounded-b-xl': store.state,
        'max-[822px]:shadow-none': store.state,
        fixed: fixedHeader,
        'max-[822px]:shadow-md': !fixedHeader && !store.openModal,
        'border-slate-100': fixedHeader,
        'border-b': fixedHeader,
      },
    ]"
  >
    <h2 class="text-xl max-[1224px]:text-lg font-extrabold uppercase text-logo">
      <NuxtLink
        to="/"
        @click="
          () => {
            if (!store.state) return;
            localMenuCloser();
          }
        "
      >
        <span class="text-xs text-dark-grey">Gotówka</span>Max.<span
          class="text-xs text-dark-grey"
          >pl</span
        ></NuxtLink
      >
    </h2>
    <Nav class="max-[820px]:hidden"></Nav>
    <div class="flex items-center gap-1">
      <button
        class="menu min-[822px]:hidden"
        @click.stop="localMenuOpener"
        v-if="!store.state && !store.openModal"
      >
        <svg
          height="32px"
          width="32px"
          version="1.1"
          id="_x32_"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
          fill="#ffffff"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                class="st0"
                d="M0,0v512h512V0H0z M400,390.992H112v-45h288V390.992z M400,278.492H112v-45h288V278.492z M400,165.984H112V121 h288V165.984z"
              />
            </g>
          </g>
        </svg>
      </button>

      <button
        class="menu min-[822px]:hidden"
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
        v-else
      >
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--emojione"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              fill="#F85A5A"
              d="M62 10.6L53.4 2L32 23.4L10.6 2L2 10.6L23.4 32L2 53.4l8.6 8.6L32 40.6L53.4 62l8.6-8.6L40.6 32z"
            />
          </g>
        </svg>
      </button>

      <USkeleton
        v-if="globalStore.loading && route.fullPath !== '/account'"
        class="h-[38px] w-[320px] bg-slate-300 rounded-base max-[822px]:hidden bg-opacity-50"
        :config="{
          base: 'animate-pulse',
          w: 'max-[822px]:hidden',
        }"
        :class="[
          { 'opacity-0 pointer-events-none': route.fullPath === '/account' },
        ]"
      />

      <div
        class="flex items-center justify-center w-[320px] max-[822px]:hidden h-[38px]"
        v-if="!auth.isAuth && !globalStore.loading"
      >
        <button
          @click="localModalOpener()"
          class="uppercase bg-button-grey max-[820px]:hidden text-white font-semibold px-6 max-[1224px]:text-xs text-sm py-2 rounded-l-base hover:bg-dark-grey transition-all"
        >
          Zaloguj się
        </button>
        <NuxtLink noprefetch to="/register">
          <button
            class="uppercase px-6 text-sm py-2 max-[820px]:hidden font-semibold text-button-text-primary max-[1224px]:text-xs bg-button-primary rounded-r-base hover:bg-button-primary-hover transition-all"
          >
            Zarejestruj się
          </button>
        </NuxtLink>
      </div>
      <div
        v-if="auth.isAuth && !globalStore.loading"
        class="flex items-center justify-center w-[250px] max-[822px]:hidden h-[38px]"
        :class="[
          { 'opacity-0 pointer-events-none': route.path === '/account' },
        ]"
      >
        <NuxtLink no-prefetch to="/account">
          <button
            class="uppercase h-full px-6 text-sm py-2 max-[822px]:hidden font-semibold text-button-text-primary max-[1224px]:text-xs bg-button-primary rounded-base hover:bg-button-primary-hover transition-all"
          >
            Личный кабинет
          </button>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style>
.st0 {
  fill: #f85a5a;
}
</style>
