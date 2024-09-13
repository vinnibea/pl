<script setup>
const props = defineProps({
  shortData: {
    type: Array,
    default: "",
  },
});
const data = props.shortData.slice(0, 6) || inject("creditors");
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
      v-for="item in data"
      :key="item.title"
      class="w-[45%] max-[1024px]:w-full flex flex-col justify-between gap-4 shadow-md p-2 rounded-xl "
      :class="[{
        'bg-amber-200': item.isRecommended,
        'bg-white': !item.isRecommended,
      }]"
      v-motion-fade-visible-once
    >
      <span
        class="text-[10px] uppercase flex items-center text-white min-h-8 bg-gradient-to-r rounded-t-md from-amber-300 to-amber-100 px-2 font-semibold max-[520px]:text-[8px] max-[520px]:min-h-4"
        >{{ item.advantages[2] }}</span
      >
      <div class="flex items-start w-full py-2 px-2">
        <img
          :src="item.src"
          :alt="item.title"
          class="max-w-24 max-h-24 p-2 shadow-md rounded-md bg-white"
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
      <div class="flex flex-col gap-2 w-full items-stretch">
        <Button
          :color="'bg-slate-600'"
          :text="'text-white'"
          :hover="'hover:bg-blue-900'"
          v-if="!shortData"
          :hoverText="'text-white'"
          >Отправить анкету</Button
        >
        <NuxtLink :to="item.link" class="min-w-full"> 
          <Button class="min-w-full">Перейти на сайт</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
