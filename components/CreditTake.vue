<script setup>
const selectedCard = ref(null);
const props = defineProps({
    content: {
        type: Object,
        required: true,
    },
    flex: {
        type: String,
        default: 'flex-row'
    }
})
const onCardSelected = (index) => {
    if(index === selectedCard.value) return selectedCard.value = null;
    selectedCard.value = index;
}
</script>

<template>
  <div
    class="flex bg-slate-900 justify-between w-full gap-0 py-8 px-4  max-[820px]:flex-col max-[820px]:items-center max-[820px]:py-12 max-[820px]:px-0 max-[820px]:gap-4 cursor-pointer" :class="[
        flex
    ]"
  >
    <div
      v-for="(item, index) in content"
      :key="item.title"
      class="flex group flex-col hover:bg-slate-800 w-full  py-4 px-4  items-start text-4xl font-semibold rounded-md text-white transition-all cursor-pointer max-[1024px]:px-2 max-[820px]:w-full max-[820px]:py-1 max-[820px]:px-1"
      @click="onCardSelected(index + 1)"
    >
      <div class="flex items-center w-full gap-4 max-[822px]:justify-between max-[822px]:gap-0">
        <span
          class="rounded-full group-hover:scale-110 max-[822px]:group-hover:scale-100 transition-transform duration-500 min-w-20 h-20 max-[1024px]:max-h-14  max-[1024px]:min-w-14 max-[822px]:h-6 max-[822px]:border-2 max-[822px]:min-w-6 bg-slate-900 border-4 border-yellow flex items-center justify-center"
        >
          <span
            class="rounded-full group-hover:bg-white transition-all duration-500 max-[1024px]:text-sm group-hover:text-slate-900 h-16 w-16  max-[1024px]:h-10 max-[1024px]:w-10 max-[822px]:h-4 max-[822px]:w-4 max-[822px]:text-xs text-white flex items-center justify-center"
            >{{ index + 1 }}</span
          >
        </span>

        <h3 class="font-semibold text-base max-[1024px]:text-sm max-[476px]:text-xs text-yellow" :class="[{
            'max-[822px]:text-yellow': selectedCard === index + 1,
            'max-[822px]:text-white': selectedCard !== index + 1,
        }]">
          {{ item.title }}
        </h3>

        <svg class="min-[822px]:hidden" v-if="selectedCard !== index + 1" fill="#ffffff" width="24px" height="24px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 27.9296 39.1328 C 29.1952 39.1328 29.9452 38.2656 29.9452 36.9063 L 29.9452 29.9688 L 37.2812 29.9688 C 38.5936 29.9688 39.5077 29.2890 39.5077 28.0469 C 39.5077 26.7812 38.6405 26.0547 37.2812 26.0547 L 29.9452 26.0547 L 29.9452 18.6953 C 29.9452 17.3125 29.1952 16.4688 27.9296 16.4688 C 26.6874 16.4688 26.0077 17.3594 26.0077 18.6953 L 26.0077 26.0547 L 18.6952 26.0547 C 17.3124 26.0547 16.4452 26.7812 16.4452 28.0469 C 16.4452 29.2890 17.3827 29.9688 18.6952 29.9688 L 26.0077 29.9688 L 26.0077 36.9063 C 26.0077 38.2188 26.6874 39.1328 27.9296 39.1328 Z"/></svg>
        <svg class="min-[822px]:hidden" v-else width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ffe11d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
      </div>

      
      <p
        class="text-sm px-2 text-justify transition-all duration-300 group-hover:text-orange-300 py-4 max-[822px]:text-xs max-[822px]:px-6"
        :class="[
            
          { 
            'max-[822px]:py-4':  index + 1 === selectedCard,
            'max-[822px]:py-0': index + 1 !== selectedCard,
            'max-[822px]:pt-2':  index + 1 === selectedCard,
            'max-[822px]:pt-0': index + 1 !== selectedCard,
            'max-[822px]:max-h-0': index + 1 !== selectedCard,
            'max-[822px]:opacity-0': index + 1 !== selectedCard,
            'max-[822px]:max-h-fit': index + 1 === selectedCard,
            'max-[822px]:block': index + 1 === selectedCard,
          },
        ]"
      >
        {{ item.content }}
      </p>
    </div>
  </div>
</template>
