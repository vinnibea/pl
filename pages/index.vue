
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
  console.log(width)
  if(store.state && width > 822) {
    store.onMenuClose();
    document.body.style.overflow = 'auto';
    return;
  }
})

</script>


<template>
  <div class="container bg-slate-900 w-full mx-auto min-w-full relative" ref="windowWidthRef">
    <mobile-menu v-if="store.state" @onMenuClose="closeMobileMenu"></mobile-menu>
    <Header @onMenuOpen="openMobileMenu"></Header>
    <div class="hero bg-no-repeat bg-top bg-fixed max-[820px]:bg-center bg-cover py-4 px-0 min-w-full flex flex-col justify-end  max-[1024px]:px-2 border-b-2 border-slate-700">
      <div class="hero-center w-full px-4 py-16 flex justify-between items-center max-[820px]:flex-col max-[820px]:py-0 max-[820px]:pt-12 max-[820px]:px-0 gap-12 max-[820px]:text-white">
        <div class="w-full max-[820px]:text-white  max-[820px]:flex  max-[820px]:flex-col  max-[820px]:px-4  max-[820px]:items-center max-[820px]:mx-auto">
          <h1> Получите  <br class="min-[470px]:hidden"> от 5 000  до 500 000 тенге</h1>
          <p>
            С любой кредитной историей,
            <br class="min-[820px]:hidden">
            возраст до 75 лет,
            <br class="min-[820px]:hidden">круглосуточно
            и без выходных.
          </p>
        </div>
       <Calculator></Calculator>
      </div>
      <top-cards></top-cards>
    </div>
    <main class="px-4 max-[1024px]:px-0">
      <main-cards-layout>
        <template #title>
          Требования к заказчику
        </template>
        <template #content>
           <requirements></requirements>
        </template>
        <template #button-title>
           Оформить заявку
        </template>
      </main-cards-layout>
      
      <main-cards-layout>
        <template #title>
          Получение кредита
        </template>
        <template #content>
         <credit-take :content="cardContent"></credit-take>
        </template>
        <template #button-title>
           Получить деньги
        </template>
      </main-cards-layout>
  
      <main-cards-layout>
        <template #title>
          Как работает сервис
        </template>
        <template #content>
         <credit-take :content="cardColContent" :flex="'flex-row'"></credit-take>
        </template>
        <template #button-title>
           Регистрация
        </template>
      </main-cards-layout>
    </main>

    <Footer></Footer>
  </div>
</template>

<style>

.hero {
  min-height: calc(100dvh - 52px);
  background-image: url('../assets/main.jpeg');
  
}

.hero-center h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}

.hero-center p {
  font-size: 2rem;
  font-weight: 700;
  padding: 24px 8px;
  color: #2f2f2f;
}

@media screen and (max-width: 1024px) {
  .hero-center h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
  }

  .hero-center p {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 18px 4px;
    color: #2f2f2f;
  }
}
@media screen and (max-width: 820px) {
  .hero-center h1 {
    font-weight: 700;
    color:#ffe11d;
    text-align: center;
    padding: 12px;
  }

  .hero-center p {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0 12px;
    color: #000000;
    text-align: center;
  }

 

  .hero {
    background-position: 47%;
  }
}

</style>
