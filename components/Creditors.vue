<script setup>
import { useCreditorsStore } from "../stores/creditorsStore";

const props = defineProps({
  shortData: {
    type: Array,
    default: [],
  },
});

const store = useCreditorsStore();
const profile = useLocalUserStore();

await store.fetchCreditors();
const sortedData = computed(() =>
  props.shortData.length
    ? props.shortData.slice(0, 10).sort((a, b) => b.link.length - a.link.length)
    : store.creditors.sort((a, b) => b.link.length - a.link.length)
);
</script>

<template>
  <div
    class="flex flex-wrap max-[822px]:flex-col gap-8 max-[822px]:gap-2 justify-center"
  >
    <h2
      class="text-md font-semibold w-full text-center uppercase"
      v-if="!shortData"
    >
      Мои кредиторы
    </h2>
    <div
      v-for="item in sortedData"
      :key="item.title"
      class="w-[45%] max-[1024px]:w-full flex flex-col justify-between gap-4 shadow-md p-2 rounded-base"
      v-motion-fade-visible-once
    >
  
      <div class="flex items-start w-full py-2 px-2">
        <img
          :src="item.src"
          :alt="item.title"
          class="max-w-24 max-h-24 p-2 shadow-md rounded-base bg-white"
        />
        <div class="flex flex-col justify-center w-full items-end">
          <h3
            class="text-left px-2 font-bold text-2xl text-slate-900 drop-shadow-sm max-[820px]:text-base"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-left px-2 text-slate-500 text-[10px] max-[822px]:text-[8px] max-[570px]:text-[6px]"
          >
            {{ item.subtitle }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col text-sm max-[822px]:text-[12px]"
        v-for="(block, i) in item.blocks"
        :key="block._id"
      >
        <div
          class="flex justify-between px-2 py-2 max-[822px]:py-0"
          :class="[
            {
              'border-b': i !== 3,
            },
          ]"
        >
          <span class="font-medium">{{ block.title }}</span>
          <span class="">{{ block.value }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full items-stretch bg-">
        <Button
          v-if="
            item.isRecommended &&
            !shortData.length &&
            profile.localUser.subscription
          "
          :color="'bg-lime-500'"
          :text="'text-white'"
          :disabled="true"
          >Wniosek przyjęty</Button
        >

        
        <Button
          v-if="
            !item.isRecommended &&
            !shortData.length &&
            profile.localUser.subscription
          "
          :color="'bg-slate-900'"
          :text="'text-white'"
          :disabled="true"
          >Wniosek jest poddawany przeglądowi</Button
        >
        <span
          v-if="
            !item.isRecommended &&
            !shortData.length &&
            profile.localUser.subscription
          "
          class="text-[12px] text-green-600 text-center"
          >Kliknij przycisk „Wziąć pożyczkę”, aby przyspieszyć ten proces</span
        >
        <NuxtLink :to="item.link" class="min-w-full">
          <Button class="min-w-full uppercase">wziąć pożyczkę</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
