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
    <div class="flex justify-end flex-col items-center gap-4"  v-if="profile.localUser.name">
      <div
        class="flex justify-start items-start max-[822px]:flex-col max-[822px]:items-center gap- w-full h-fit pb-2"
      >
        <span
          class="rounded-base border-4 relative min-w-32 min-h-32 p-8 font-extrabold text-dark-grey text-2xl flex uppercase items-center shadow-sm justify-center text-center"
          :class="[{
            'border-button-primary': profile.localUser.subscription,
            'border-dark-grey': !profile.localUser.subscription,
          }]"
          >{{ computedAvatar }}
          
        </span>
        <p class="flex flex-col items-center gap-2 p-4 max-[822px]:px-0 text-xl">
          <span class="flex gap-2 text-slate-700">
            <span class="uppercase font-semibold">{{
              profile.localUser?.name
            }}</span>
            <span class="uppercase font-semibold">{{
              profile?.localUser?.surname
            }}</span>
          </span>
          <span v-if="profile.localUser.subscription" class="max-[822px]:text-[10px] bg-button-primary text-amber-300 rounded-base shadow-md px-2 text-[14px] font-medium p-0 ">
            Użytkownik premium</span
          >
          <span v-if="!profile.localUser.subscription" class="max-[822px]:text-[10px] text-white bg-dark-grey rounded-base shadow-md px-2 text-[14px] font-medium p-0 ">
            Użytkownik</span
          >
        </p>
      </div>

      <div class="flex items-center justify-end w-full pb-2 border-b border-slate-200">
        <span class="max-[822px]:text-[10px] text-[12px] text-slate-300 font-semibold"
          >Data zarejestrowania: {{ registerDate }}</span
        >
      </div>

      <div class="w-full flex flex-col gap-4 py-2">
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Email:</span
          ><span class="font-medium text-xs">{{ profile?.localUser?.email }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Tel: </span>
          <span class="font-medium text-xs uppercase">+48 {{ registerPhone }}</span>
        </p>
        <p class="w-full flex justify-between items-center">
          <span class="font-medium text-xs uppercase">Miasto: </span>
          <span class="font-medium text-xs uppercase">{{
            profile?.localUser?.city
          }}</span>
        </p>
      </div>
      
    </div>
  </div>
</template>
