<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useLocalUserStore } from "~/stores/localStore.js";
const store = useMobileStore();
const menu = ref(null);
const auth = useLocalUserStore();
const route = useRoute()

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
    if (
      containerHeight.value &&
      Math.abs(containerHeight.value / lengthY.value) <= 5
    ) {
      store.onMenuClose();
    }
  },
});

const onModalOpen = () => {
  document.body.style.overflow = "hidden";
  store.onMenuClose();
  setTimeout(() => {
    store.onModal();
  }, 300);
};

const onModalClose = () => {
  document.body.style.overflow = "auto";
  store.onMenuClose();
}
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
        v-if="!auth.isAuth"
      >
        <NuxtLink to="/register">
          <Button :color="'bg-yellow'" @click.stop="store.onMenuClose()"
            >Регистрация</Button
          >
        </NuxtLink>
        <Button
          @click.stop="onModalOpen"
          :color="'bg-button-grey'"
          text="text-white"
          :hover="'bg-dark-grey'"
          >Войти</Button
        >
      </div>

      <div
        v-else
        class="flex flex-col items-stretch w-full gap-4 px-4 py-4 absolute bottom-6 left-0 right-0"
      >
        <NuxtLink :to="route.fullPath !== '/account' ? '/account' : '/'" @click="onModalClose">
          <Button :color="'bg-yellow'">{{route.fullPath !== '/account' ? 'Перейти в профиль' : 'На главную'}}</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style></style>
