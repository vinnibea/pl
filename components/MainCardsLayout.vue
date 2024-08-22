<template>
  <div class="max-[822px]:pt-8 py-8 px-0 flex flex-col items-center max-[822px]:items-stretch max-[822px]:px-2 border-b-2 border-slate-700 border-dotted last:border-b-0">
    <h2 class="mx-auto font-bold text-white text-3xl max-[822px]:text-2xl">
        <slot name="title">Требования к заказчику</slot>
    </h2>
      <slot name="content"></slot>
    <Button class="w-1/4 max-[820px]:min-w-full" :text="'text-slate-90'" :hover="'bg-hover-yellow'" :hoverText="'hover:text-slate-900'">
      <slot name="button-title">Оформить заявку</slot>
    </Button>
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
