<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useResizeObserver } from "@vueuse/core";
import { useAccountStore } from "~/stores/accountStore";
import { useGlobalStore } from "~/stores/globalStore.js";
const store = useMobileStore();


const windowWidthRef = ref(null);
const globalStore = useGlobalStore();
useResizeObserver(windowWidthRef, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;
  if (store.state && width > 822) {
    store.onMenuClose();
    document.body.style.overflow = "auto";
    return;
  }
});

const localModalCloser = () => {
  document.body.style.overflow = "auto";
  store.onModal();
};

const onCookiesAccepted = async () => {
  await $fetch("/api/cookies", {
    method: "POST",
    body: {
      accepted: true,
    },
  }).then(() => {
    globalStore.setCookies(true);
  })
  .catch((e) => {
    console.warn(e);
  });
};
</script>
<template>
  <div
    class="container bg-bg-main w-full mx-auto min-w-full max-[822px]:pb-[52px] relative"
    ref="windowWidthRef"
  >
    <mobile-menu></mobile-menu>
    <Header></Header>
    <slot></slot>

    <span
     v-if="!globalStore.cookies"
      class="fixed bottom-0 left-0 right-0 z-20 bg-bg-primary bg-opacity-70 text-black flex items-center justify-center max-[822px]:flex-col max-[822px]:bg-opacity-90 max-[822px]:px-2 px-12 py-2 shadow-lg"
    >
      <span
      
        class="w-2/3 max-[822px]:w-full max-[822px]:text-center uppercase text-[12px]"
      >
        Używamy cookies w celu ulepszenia doświadczenia na naszej stronie
        internetowej. Kontynuując korzystanie z niniejszej strony internetowej,
        użytkownik wyraża zgodę na wykorzystanie przez nas plików cookies.
        Dowiedz się więcej z naszej Polityki prywatności.
      </span>
      <Button @click="onCookiesAccepted">Zgadzam się</Button>
    </span>
    <Footer
      :class="[
        {
          'max-[822px]:hidden': store.politicsOpen !== false,
        },
      ]"
    ></Footer>

    <div
      class="absolute bg-slate-800 opacity-90 top-0 left-0 bottom-0 right-0 z-20 backdrop::blur-md px-4 py-4 max-[822px]:bg-slate-700 max-[822px]:hidden max-[822px]:px-2 max-[822px]:py-0 max-[822px]:opacity-90"
      @click="
        () => {
          store.onPolitics(false);
          if (store.openModal) {
            localModalCloser();
          }
        }
      "
      v-if="store.politicsOpen !== false || store.state || store.openModal"
    >
      <div
        class="flex justify-end relative text-xl font-bold text-white w-full cursor-pointer z-20 max-[822px]:text-slate-700"
      >
        <Icon name="mdi:close" class="w-6 h-6 max-[822px]:hidden"> </Icon>
      </div>
    </div>

    <mobile-footer-menu v-if="!store.politicsOpen"></mobile-footer-menu>
    <login v-if="store.openModal"></login>
  </div>
</template>
