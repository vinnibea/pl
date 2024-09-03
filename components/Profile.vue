<script setup>
import { useLocalUserStore } from "~/stores/localStore";
import { format } from "date-fns";

const profile = useLocalUserStore();
const computedAvatar = computed(
  () =>
    "" +
    profile?.localUser?.name.slice(0, 1) +
    profile?.localUser?.surname.slice(0, 1)
);

const registerDate = computed(() => {
  if (!profile?.localUser?.timeStamp) {
    return;
  }
  return format(profile?.localUser?.timeStamp, "dd.MM.yyyy");
});

const registerPhone = computed(() => {
  if (!profile?.localUser?.phone) {
    return;
  }
  return (
    " (" +
    profile?.localUser?.phone.slice(0, 3) +
    ") " +
    profile?.localUser?.phone.slice(3)
  );
});
</script>

<template>
  <div
    class="p-2 w-full flex flex-col min-h-full justify-between"
    v-motion-fade-visible-once
  >
    <div class="flex justify-end flex-col items-center gap-4">
      <h2 class="text-md font-semibold text-right uppercase w-full">Профиль</h2>
      <div
        class="flex justify-start items-start max-[822px]:flex-col max-[822px]:items-start gap- w-full h-fit pb-2"
      >
        <span
          class="rounded-full border-4 relative border-amber-300 min-w-32 min-h-32 p-8 font-extrabold text-slate-800 text-2xl flex items-center justify-center text-center"
          >{{ computedAvatar }}
          <span
            class="absolute top-2 -right-0 bg-white rounded-full w-6 h-6 flex border-2 border-amber-300 items-center justify-center"
          >
            <Icon name="material-symbols-light:award-star" class="bg-amber-300"></Icon>
          </span>
        </span>
        <p class="flex flex-col items-start gap-2 p-2 text-xl">
          <span class="flex gap-2">
            <span class="uppercase font-semibold">{{
              profile.localUser?.name
            }}</span>
            <span class="uppercase font-semibold">{{
              profile?.localUser?.surname
            }}</span>
          </span>
          <span class="max-[822px]:text-[10px] text-[12px] font-semibold p-0 text-yellow">
            Премиальный пользователь</span
          >
        </p>
      </div>

      <div class="flex items-center justify-end w-full pb-2 border-b border-slate-200">
        <span class="max-[822px]:text-[10px] text-[12px] text-slate-300 font-semibold"
          >Дата регистрации: {{ registerDate }}</span
        >
      </div>

      <div class="w-full flex flex-col gap-4 py-2">
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Email:</span
          ><span class="font-medium text-xs">{{ profile?.localUser?.email }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Телефон: </span>
          <span class="font-medium text-xs uppercase">{{ "+7 " + registerPhone }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Город: </span>
          <span class="font-medium text-xs uppercase">{{
            profile?.localUser?.city
          }}</span>
        </p>
      </div>
    </div>

    <!-- <Button
      :color="'bg-opacity-0'"
      :hover="'hover:bg-opacity-0'"
      :text="'text-slate-200'"
      >Изменить</Button
    > -->
  </div>
</template>
