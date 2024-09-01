<script setup>
import { useLocalUserStore } from "~/stores/localStore";
import { format } from "date-fns";

const profile = useLocalUserStore();
const computedAvatar = computed(
  () =>
    "" +
    profile.localUser.value.name.slice(0, 1) +
    profile.localUser.value.surname.slice(0, 1)
);

const registerDate = computed(() =>
  format(profile.localUser.value.timeStamp, "dd.MM.yyyy")
);
</script>

<template>
  <div
    class="p-2 w-full flex flex-col min-h-full justify-between"
    v-motion-fade-visible-once
  >
    <div class="flex justify-end flex-col items-center gap-4">
      <h2 class="text-xl font-semibold text-left w-full">Профиль</h2>
      <div
        class="flex justify-start items-start max-[822px]:flex-col max-[822px]:items-start gap-2 w-full h-fit pb-2 "
      >
        <span
          class="rounded-full border-4 relative border-amber-300 min-w-32 min-h-32 p-8 font-extrabold text-slate-800 text-2xl flex items-center justify-center text-center"
          >{{ computedAvatar }}
          <span class="absolute top-2 -right-0 bg-white rounded-full w-6 h-6 flex border-2  border-amber-300 items-center justify-center">
            <Icon name="material-symbols-light:award-star" class=" bg-amber-300"></Icon>
          </span>
        </span>
        <p class="flex items-center gap-2 p-2 text-xl">
 
            <span class="uppercase font-semibold">{{
                profile.localUser.value.name
              }}</span>
              <span class="uppercase font-semibold">{{
                profile.localUser.value.surname
              }}</span>
       
         
        </p>
       
        
      </div>

      <div class="flex items-center justify-between w-full pb-2 border-b border-slate-200">
        <span class="max-[822px]:text-[10px] text-[12px] font-semibold p-2 text-yellow">
            Премиальный пользователь</span
          >
      <span class="max-[822px]:text-[10px] text-[12px] text-slate-300 font-semibold"
        >Дата регистрации: {{ registerDate }}</span
      >
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
            "+7 " + profile.localUser.value.phone
          }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Город: </span>
          <span class="font-medium text-xs uppercase">{{
            profile.localUser.value.city
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
