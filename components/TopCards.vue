<script setup>
import { useSwipe } from "@vueuse/core";
const cardContent = [
  {
    title: "250 00000+",
    span1: "тенге",
    span2: "получено нашими клиентам",
  },
  {
    title: "150 000+",
    span1: "кредитов",
    span2: "подобрано для наших клиентов",
  },
  {
    title: "2000+",
    span1: "заявок",
    span2: "рассматривается нами ежедневно",
  },
];
const target = ref(null);
const container = ref(null);
const containerWidth = computed(() => container.value?.offsetWidth);
const currentCard = ref(0);
const setCurrentCard= (i) => {
  currentCard.value = i;
}

const isDir = ref(null);
const translateX = computed(() => {
  if(isDir.value) {
     if(isDir.value === 'left') {
              return `translateX(-${(currentCard.value  * containerWidth.value) + 120}px)`
     }
     if(isDir.value === 'right') {
              return `translateX(${((currentCard.value)  * containerWidth.value) - 120}px)`
     } 

  } else {
    if(currentCard.value === 1) {
      return `translateX(-${(currentCard.value  * containerWidth.value + 16)}px)`
    } if(currentCard.value === 2) {
      return `translateX(-${(currentCard.value  * containerWidth.value + 32)}px)`
    }
      
     }
});

const { direction, isSwiping, lengthX, lengthY } = useSwipe(target, {
  passive: false,
  onSwipe(e, direction) {
    if (containerWidth.value) {
      if (lengthX.value > 0) {
         isDir.value = 'left';
      }
      if (lengthX.value < 0) {
        isDir.value = 'right';
      }
    }
  },
  onSwipeEnd(e, direction) {
   
    if (Math.abs(lengthX.value) > containerWidth.value / 2.5) {
      if (lengthX.value > 0 && currentCard.value < 2) {
        currentCard.value +=1;
      }
      if (lengthX.value < 0 && currentCard.value > 0) {
        currentCard.value -=1;
      }
      
    }
    isDir.value = null;
  },
});
</script>

<template>
  <div
    class="flex justify-center flex-col gap-2 max-[822px]:pt-4"
    ref="container" 
  >

    <div
        ref="target"
      class="flex flex-row gap-12 px-4 max-[820px]:flex-row max-[820px]:items-center max-[822px]:max-w-full max-[820px]:overflow-hidden max-[820px]:gap-4 max-[820px]:py-4 max-[820px]:px-0"
    >
      <div 
      
        class="flex  flex-col w-1/3 max-[822px]:min-w-full py-4 bg-yellow items-center text-4xl font-semibold rounded-md shadow-md text-white transition-all duration-300"
       
        :style="{ transform: translateX}"
        v-for="item in cardContent"
        :key="item.title"
      >
        <h3>
          {{ item.title }}
        </h3>
        <span class="text-sm">{{ item.span1 }}</span>
        <span class="text-sm text-black">{{ item.span2 }}</span>
      </div>
    </div>
    <div class="flex justify-center items-center gap-4 min-[822px]:hidden">
      <span
        v-for="(item, i) in cardContent"
        :key="item.span1"
        @click="setCurrentCard(i)"
        class="min-[822px]:hidden rounded-full border border-opacity-50 min-w-4 min-h-4" :class="[{
          'bg-white': currentCard === i,
          'bg-slate-500': currentCard !== i,
        }]"
      ></span>
    </div>
  </div>
</template>
