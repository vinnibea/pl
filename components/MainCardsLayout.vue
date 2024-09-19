<script setup> 
const route = useRoute();
const props = defineProps({
  ids: {
    type: Array,
  }
});
</script>

<template>
  <div
    class="max-[822px]:py-12 py-8 px-0 flex flex-col items-center max-[822px]:items-stretch max-[822px]:px-2 border-b-2 bg-bg-main border-dotted border-button-primary last:border-b-0" v-motion-fade-visible-once
  >
    <h2 class="mx-auto font-bold text-slate-950 uppercase text-3xl max-[822px]:text-2xl" >
      <slot name="title"></slot>
    </h2>
    <slot name="content"></slot>
    <NuxtLink to="/register" class="w-1/4 mx-auto flex justify-center max-[820px]:min-w-full">
    <Button
      v-if="route.path === '/'"
      class="w-full max-[820px]:min-w-full"
      :text="'text-button-text-primary'"
      :hover="'hover:bg-button-primary-hover'"
      :hoverText="'hover:text-button-text-primary'"
    >
     
        <slot name="button-title">Оформить заявку</slot>
    </Button>
    </NuxtLink
      >
  </div>
</template>

<style>
.cls-1 {
  fill: none;
  stroke: #020202;
  stroke-miterlimit: 10;
  stroke-width: 1.91px;
}
</style>
