<script setup>
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
</script>

<template>
  <div class="w-full px-8 max-[822px]:px-0">
    <div class="flex flex-row items-center justify-center max-[822px]:hidden gap-3 w-full">
      <div
        class="flex flex-col w-1/3 max-w-1/3 bg-yellow items-center flex-shrink-0 shadow-md text-whit text-4xl text-white font-semibold rounded-md px-2 py-4"
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
    <div class="min-[822px]:hidden py-16 relative z-0">
      <Swiper
        class="z-0"
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :slidesPerView="1.1"
        :spaceBetween="30"
        :effect="'creative'"
        :creative-effect="{
          prev: {
            opacity: 0.5,
            translate: ['-105%', 0, 0],
          },
          next: {
            opacity: 0.5,
            translate: ['105%', 0, 0],
          },
        }"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: true,
        }"
      >
        <SwiperSlide v-for="item in cardContent" :key="item.title">
          <div
            class="flex flex-col bg-yellow items-center shadow-md text-whit text-4xl text-white font-semibold rounded-md px-2 py-4 cursor-grab"
          >
            <h3>
              {{ item.title }}
            </h3>
            <span class="text-sm">{{ item.span1 }}</span>
            <span class="text-sm text-black">{{ item.span2 }}</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
