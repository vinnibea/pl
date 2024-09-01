<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useLocalUserStore } from "~/stores/localStore.js";
const store = useMobileStore();
const menu = ref(null);
const auth = useLocalUserStore();

const containerHeight = computed(() => menu?.value?.offsetHeight);

const { direction, isSwiping, lengthX, lengthY } = useSwipe(menu, {
  passive: false,
  onSwipe(e) {
    if (containerHeight.value) {
      if (lengthY.value < containerHeight.value / 3) {
      }
    }
  },
  onSwipeEnd(e, direction) {
    console.log(containerHeight.value / lengthY.value);
    if (containerHeight.value && Math.abs(containerHeight.value / lengthY.value) <= 5) {
      store.onMenuClose();
    }
  },
});
</script>
<template>
  <div
    class="fixed bg-opacity-20 backdrop-blur-md left-0 right-0 z-50 bottom-0 top-0 bg-slate-800 transform transition-all duration-500 min-[822px]:hidden flex flex-col items-center"
    :class="[
      {
        '-translate-y-full': !store.state,
        'translate-y-0': store.state,
        '-translate-y-[220px]': isSwiping,
      },
    ]"
  >
    <Header></Header>

    <div class="min-h-dvh transition-all duration-600">
      <Nav :isMobile="true"></Nav>
      <div
        class="flex flex-col items-stretch w-full gap-4 px-4 py-4 z-50 absolute bottom-6 left-0 right-0"
      >
        <Button :color="'bg-yellow'" @click.stop="store.onMenuClose()"
          >Регистрация</Button
        >

        <Button
          @click.stop="store.onMenuClose()"
          :color="'bg-button-grey'"
          text="text-white"
          :hover="'bg-dark-grey'"
          >Войти</Button
        >
      </div>

      <!-- <div
        class="flex flex-col items-stretch w-full gap-4 px-4 py-4 absolute bottom-6 left-0 right-0"
      >
        <NuxtLink to="/account" @click="store.onMenuClose()">
          <Button :color="'bg-yellow'">Перейти в профиль</Button>
        </NuxtLink>
      </div> -->
    </div>
  </div>
</template>

<style></style>
