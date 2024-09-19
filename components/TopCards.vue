<script setup>
const cardContent = [
  {
    title: "250 00000+",
    span1: "złotych",
    span2: "otrzymanych przez naszych klientów",
  },
  {
    title: "150 000+",
    span1: "kredytów",
    span2: "dopasowanych dla naszych klientów",
  },
  {
    title: "2000+",
    span1: "wniosków",
    span2: "rozpatrywanych przez nas codziennie",
  },
];
</script>
<template>
  <div class="w-full px-8 max-[822px]:px-0">
    <div
      class="flex flex-row items-center justify-center max-[950px]:flex-col gap-3 w-full max-[822px]:py-8 max-[822px]:gap-4"
    >
      <div
        v-motion-fade-visible-once
        class="flex flex-col w-1/3 max-w-1/3 max-[950px]:w-full bg-white bg-opacity-90 items-center flex-shrink-0 shadow-md text-4xl text-white font-semibold rounded-base px-2 py-4 cursor-pointer"
        v-for="item in cardContent"
        :key="item.title"
      >
        <h3 class="text-4xl font-bold text-button-primary">
          {{ item.title }}
        </h3>
        <span class="text-sm text-black">{{ item.span1 }}</span>
        <span class="text-sm text-button-primary">{{ item.span2 }}</span>
      </div>
    </div>
  </div>
</template>
