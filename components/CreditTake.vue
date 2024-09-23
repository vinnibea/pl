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
    class="flex bg-bg-main justify-between w-full gap-4 py-8 px-4  max-[820px]:flex-col max-[820px]:items-center max-[820px]:py-8 max-[820px]:px-0 max-[820px]:gap-4 cursor-pointer" :class="[
        flex
    ]"
  >
    <div
      v-for="(item, index) in content"
      :key="item.title"
      class="flex group min-[822px]:hover:scale-110 flex-col bg-white hover:bg-white  w-full py-4 px-4 items-start text-4xl shadow-lg  font-semibold rounded-base text-dark-grey transition-all duration-700 cursor-pointer max-[1024px]:px-2 max-[820px]:w-full max-[820px]:py-0 max-[820px]:px-0 max-[822px]:bg-bg-white max-[822px]:hover:bg-bg-main min-[822px]:border-r-4 min-[822px]:border-r-button-primary"
      @click="onCardSelected(index + 1)"
    >
      <div class="flex items-center w-full gap-4  max-[822px]:justify-between max-[822px]:gap-0  max-[822px]:bg-dark-grey  max-[822px]:py-1 max-[822px]:px-1" :class="[{
       
        'rounded-base': selectedCard !== index + 1,
      }]">
        <span
          class="rounded-base group-hover:scale-110 max-[822px]:group-hover:scale-100 transition-transform duration-500 min-w-14 h-14 max-[1024px]:max-h-14  max-[1024px]:min-w-14 max-[822px]:h-6 max-[822px]:border-2 max-[822px]:min-w-6 bg-button-primary border-4 group-hover:border-button-primary   flex items-center justify-center" 
        >
          <span
            class="rounded-base group-hover:bg-white transition-all duration-500 max-[1024px]:text-sm group-hover:text-slate-900 h-12 w-12  max-[1024px]:h-10 max-[1024px]:w-10 max-[822px]:h-4  max-[822px]:w-4 max-[822px]:text-xs text-white flex items-center justify-center" :class="[{
              'max-[822px]:bg-white': selectedCard === index + 1,
              'max-[822px]:text-slate-900': selectedCard === index + 1,
            }]"
            >{{ index + 1 }}</span
          >
        </span>

        <h3 class="font-semibold w-full text-base max-[1024px]:text-sm max-[476px]:text-xs text-center  text-black" :class="[{
            'max-[822px]:text-button-primary': selectedCard === index + 1,
            'max-[822px]:text-white': selectedCard !== index + 1,
        }]">
          {{ item.title }}
        </h3>

        <svg class="min-[822px]:hidden"  width="24px" height="24px" v-if="selectedCard !== index + 1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">

          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          
          <g id="SVGRepo_iconCarrier">
          
          <path d="M3 4.281v16.437A1.282 1.282 0 0 0 4.281 22h16.437A1.282 1.282 0 0 0 22 20.718V4.281A1.281 1.281 0 0 0 20.719 3H4.28A1.281 1.281 0 0 0 3 4.281zM20.719 4a.281.281 0 0 1 .281.281V20.72a.281.281 0 0 1-.281.281H4.28a.281.281 0 0 1-.28-.282V4.28A.281.281 0 0 1 4.281 4zM12 13H7v-1h5V7h1v5h5v1h-5v5h-1z"/>
          
          <path fill="none" d="M0 0h24v24H0z"/>
          
          </g>
          
          </svg>


          <svg class="min-[822px]:hidden" v-else  width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#F85A5A">

            <g stroke-width="0"/>
            
            <g stroke-linecap="round" stroke-linejoin="round"/>
            
            <g> <title>minus-square</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -1035.000000)" fill="#ffffff"> <path d="M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z" id="minus-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g>
            
            </svg>
      </div>

      
      <p
        class="text-sm px-2 text-justify transition-all duration-300 group-hover:text-button-primary max-[822px]:group-hover:text-button-primary  py-4 max-[822px]:text-xs max-[822px]:px-2 "
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
