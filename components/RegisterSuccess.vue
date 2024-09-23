<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
const { data, status, error, refresh, clear } = await useFetch(
  "/api/creditors"
);

const store = useMobileStore();
const localModalOpener = () => {
  store.onModal();
  document.body.style.overflow = "hidden";
};
</script>
<template>
  <div class="flex flex-col justify-between min-h-svh w-full">
    <div
      v-if="data"
      class="w-full flex flex-col items-center text-center max-[822px]:items-stretch"
    >
      <div class="pb-4">
        <h2 class="text-green-500 text-[14px] font-semibold uppercase">
          Rejestracja zakończona
        </h2>
        <p class="font-medium text-sm text-slate-500">
          Możesz teraz skorzystać z usług jednego z następujących pożyczkodawców
        </p>
      </div>
      <Creditors :shortData="data"></Creditors>
    </div>

    <div
      class="flex flex-col text-[12px] max-[822px]:text-[10px] items-center gap-4 text-center py-4"
    >
      <p>
        Instrukcje dotyczące uzyskania pożyczki, listę dostępnych
        pożyczkodawców, a także status wysłanych możesz sprawdzić na stronie
        swojego konta.
      </p>
      <NuxtLink
        @click="localModalOpener"
        to="/"
        class="w-full flex justify-center text-center text-xs uppercase underline font-medium text-button-primary"
      >
        <span>Zaloguj się</span>
      </NuxtLink>
    </div>
    <div
      v-if="status !== 'success'"
      class="w-full flex flex-col min-h-svh text-center max-[822px]:items-stretch"
    >
      <span class="flex items-center justify-center w-full gap-2 mx-auto">
        <span
          name="loader"
          class="loader bg-opacity-0 border-4 w-32 h-32 bt-2 border-t-white border-slate-300 rounded-full"
        >
        </span>
      </span>
    </div>
  </div>
</template>
<style scoped></style>
