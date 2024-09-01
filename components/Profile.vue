<script setup>
import { useLocalUserStore } from "~/stores/localStore";

const profile = useLocalUserStore();
const computedAvatar = computed(
  () =>
    "" +
    profile.localUser.value.name.slice(0, 1) +
    profile.localUser.value.surname.slice(0, 1)
);
</script>

<template>
  <div
    class="p-2 w-full flex flex-col min-h-full justify-between"
    v-motion-fade-visible-once
  >
    <div class="flex justify-end flex-col items-center gap-4">
      <h2 class="text-xl font-semibold">Профиль</h2>
      <div
        class="flex flex-row-reverse justify-start items-start max-[822px]:flex-col max-[822px]:items-center gap-2 w-full border-b border-slate-200 p-4"
      >
        <span
          class="rounded-full border-4 border-amber-300 min-w-24 min-h-24 p-8 font-bold text-slate-800 text-2xl"
          >{{ computedAvatar }}</span
        >
        <div class="flex flex-col items-center p-2">
          <span class="text-xs uppercase font-semibold">{{
            profile.localUser.value.name
          }}</span>
          <span class="text-sm uppercase font-semibold">{{
            profile.localUser.value.surname
          }}</span>
          <span class="text-[10px] uppercase font-semibold p-2 text-yellow">
            Премиальный пользователь</span
          >
        </div>
      </div>

      <div class="w-full flex flex-col gap-4 p-4">
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Email:</span
          ><span class="font-medium text-xs">{{
            profile.localUser.value.email
          }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Телефон: </span>
          <span class="font-medium text-xs uppercase">{{
            "+7" + profile.localUser.value.phone
          }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Город: </span>
          <span class="font-medium text-xs uppercase">{{
            profile.localUser.value.index
          }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span>{{ profile.localUser.value.city }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span>{{ profile.localUser.value.city }}</span>
        </p>
      </div>
    </div>

    <Button
      :color="'bg-opacity-0'"
      :hover="'hover:bg-opacity-0'"
      :text="'text-slate-200'"
      >Изменить</Button
    >
  </div>
</template>
