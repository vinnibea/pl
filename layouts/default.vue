<script setup> 
import { useMobileStore } from '~/stores/MobileMenu.js';
import { useResizeObserver } from '@vueuse/core';
const cardContent = [
  {
    title: "Регистрация на сайте",
    content:
      "Зарегистрироваться на сайте очень просто. Это займет всего 10 минут. Для регистрации необходимы: мобильный телефон для приема СМС, электронная почта и платежная карта.",
  },
  {
    title: "Оплата услуг",
    content:
      "Услуги, предоставляемые сайтом, являются платными. Чтобы оплатить их после регистрации, нужно подключить платежную карту к аккаунту MONEYDEAL. Из него будет вычтена комиссия. Стоимость пользования услугами составляет 19,99 евро за 15 дней.",
  },
  {
    title: "Выбор кредита",
    content:
      "После того, как вы завершите регистрацию, вы получите свой кредитный рейтинг, а также общую анкету для отправки по почте в большое количество кредитных организаций. Кроме того, будет представлен список наиболее выгодных кредитов. Активация услуги не гарантирует, что вы получите кредит. Взимаемый сервисный сбор не возвращается.",
  },
  {
    title: "Условия кредитования",
    content:
      "Процентная ставка по кредиту составляет не менее 30% и не более 365%. Срок кредитования составляет от 60 дней до максимум 2 лет.",
  },
];

const cardColContent = [
  {
    title: "Полезные инструменты",
    content:
      "Став пользователем сервиса, вы можете отправить свой профиль сразу в несколько компаний, получить информацию о своей кредитоспособности, текущих курсах валют, кредитный калькулятор.",
  },
  {
    title: "Заполните форму в течение 5 минут",
    content:
      "Простой и понятный интерфейс позволяет быстро оформить приложение всего за несколько минут.",
  },
  {
    title: "Большой список вариантов кредитования",
    content:
      "Став пользователем сервиса, вы можете отправить свой профиль сразу в несколько компаний, получить информацию о своей кредитоспособности, текущих курсах валют, кредитный калькулятор..",
  },
];
const store = useMobileStore();


const windowWidthRef = ref(null);
useResizeObserver(windowWidthRef, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  if(store.state && width > 822) {
    store.onMenuClose();
    document.body.style.overflow = 'auto';
    return;
  }
})


 </script>
<template>
  <div
    class="container bg-slate-900 w-full mx-auto min-w-full relative"
    ref="windowWidthRef"
  >
    <mobile-menu
    ></mobile-menu>
    <Header></Header>
    <slot></slot>

   
    <Footer :class="[{
        'max-[822px]:hidden': store.politicsOpen !== false,
      }]"></Footer>
    <div class="absolute bg-slate-800 opacity-90 top-0 left-0 bottom-0 right-0 z-30 px-4 py-4 max-[822px]:bg-slate-700 max-[822px]:px-2 max-[822px]:py-0 max-[822px]:opacity-90"  @click="store.onPolitics(false)" v-if="store.politicsOpen !== false || store.state">
        <div class="flex justify-end  relative text-xl font-bold text-white w-full cursor-pointer z-50 max-[822px]:text-slate-700"><Icon name="mdi:close" class="w-6 h-6 max-[822px]:hidden"> </Icon>
        </div>
    </div>
  </div>
</template>
