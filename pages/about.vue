<script setup>

const serviceInfo = [
  {
    title: null,
    content: "Сервис «MONEYDEAL» — это онлайн-платформа, которая помогает пользователям выбрать оптимальный микрокредит. Вы можете отправить заявку сразу в несколько кредитных организаций, отобранных на основе ваших данных."
  },
  {
    title: "Что мы делаем?",
    content: "Наша платформа принимает и обрабатывает заявки на микрокредиты. Вы заполняете заявку на сайте, указываете нужную сумму и срок займа, а также другие важные данные. Мы отправляем вашу заявку нескольким компаниям, которые могут предоставить микрокредит, и с высокой вероятностью одобрят её, после чего деньги поступят на вашу карту."
  },
  {
    title: "Как мы это делаем?",
    content: null,
    list: [
      "Мы сотрудничаем с десятками финансовых организаций по всей Казахстану и направляем вашу заявку только в те компании, которые соответствуют вашим требованиям. Это повышает шансы на одобрение.",
      "Сервис доступен круглосуточно. Даже если вам срочно понадобятся деньги ночью, вы можете оставить заявку, и в течение 15 минут получите ответ.",
      "Для подачи заявки необходимо указать ваше полное имя, ИИН, дату рождения, контактные данные, а также сумму и срок микрокредита."
    ]
  },

   {
    title: "Преимущества работы с нами",
    content: null,
    list: [
      {
        title: "География",
        content: "Получить деньги может любой гражданин Казахстана, независимо от его места проживания.",
        icon: null
      },
      {
        title: "Экономия ваших денег",
        content: "Мы помогаем вам выбрать микрокредит с наиболее выгодными условиями и низкими процентными ставками.",
        icon: null
      },
      {
        title: "Скорость одобрения",
        content: "Заявки, отправленные через нашу платформу, обрабатываются партнёрскими организациями в день их получения.",
        icon: null
      }
    ]
  }
];

const selectedCard = ref(null);
const onCardSelected = (index) => {
  if (index === selectedCard.value) return (selectedCard.value = null);
  selectedCard.value = index;
};
</script>

<template>
  <NuxtLayout>
   <div class="with-bg">
    <h1
    class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-white  bg-slate-700 bg-opacity-60 max-[820px]:pt-[42px]"
  >
   О сервисе
  </h1>
  <div
    class="flex items-start gap-16 w-full pt-8 pb-16 max-[822px]:pt-4 max-[822px]:pb-8 px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4 cursor-pointer"
  >
    <div class="flex flex-col gap-4 justify-center">
      <div
        v-for="(item, index) in serviceInfo"
        :key="item.title"
        class="flex group flex-col w-full max-[1224px]:min-w-full bg-opacity-60 items-start text-4xl font-semibold rounded-md text-white transition-all cursor-pointer max-[1024px]:px-2 max-[820px]:px-0 bg-slate-900"
      >
        <div
          class="flex items-center w-full gap-2 px-1 rounded-t-md justify-between max-[822px]:gap-0 bg-opacity-60  bg-slate-800 max-[822px]:py-0 max-[822px]:px-1"
          v-if="item.title"
        
        >
          <span
            class="rounded-full transition-transform duration-500 min-h-6 min-w-6 max-[822px]:border-2  max-[822px]:max-h-4 max-[822px]:max-w-4 bg-slate-900 border-2 border-yellow flex items-center justify-center"
          >
            <span
              class="rounded-full group-hover:bg-white transition-all duration-500 group-hover:text-slate-900 h-4 w-4  max-[822px]:max-w-[16px] max-[822px]:max-h-[16px] text-xs max-[822px]:text-[12px] flex items-center justify-center"
             
              >{{ index }}</span
            >
          </span>

          <h3
            class="font-semibold text-center py-2 text-base max-[1024px]:text-[12px] max-[476px]:text-[10px] group-hover:text-amber-300"
            
          >
            {{ item.title }}
          </h3>

          <svg
         
             class="opacity-0"
            fill="#ffffff"
            width="20px"
            height="20px"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 27.9296 39.1328 C 29.1952 39.1328 29.9452 38.2656 29.9452 36.9063 L 29.9452 29.9688 L 37.2812 29.9688 C 38.5936 29.9688 39.5077 29.2890 39.5077 28.0469 C 39.5077 26.7812 38.6405 26.0547 37.2812 26.0547 L 29.9452 26.0547 L 29.9452 18.6953 C 29.9452 17.3125 29.1952 16.4688 27.9296 16.4688 C 26.6874 16.4688 26.0077 17.3594 26.0077 18.6953 L 26.0077 26.0547 L 18.6952 26.0547 C 17.3124 26.0547 16.4452 26.7812 16.4452 28.0469 C 16.4452 29.2890 17.3827 29.9688 18.6952 29.9688 L 26.0077 29.9688 L 26.0077 36.9063 C 26.0077 38.2188 26.6874 39.1328 27.9296 39.1328 Z"
            />
          </svg>
         
        </div>

        <p
          class="text-sm w-full px-4 py-4 rounded-b-md text-justify bg-opacity-60 backdrop-blur-lg bg-slate-700 transition-all duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
          :class="[
            {
              'rounded-t-md': index === 0,
              'text-base': index === 0,
              'p-4': index === 0,
            }
          ]"
        >
          {{ item.content }}
          <ul class="text-[12px] max-[822px]:text-[10px]">
            <li v-for="listItem in item.list" :key="listItem.content || listItem" >- {{listItem.content || listItem}}</li>
         </ul>
        </p>
        
      </div>
    </div>
    <Calculator class="max-[1024px]:hidden"></Calculator>
  </div>
  <div
    class="w-2/3 max-[822px]:w-full mx-auto max-[822px]:mx-0 max-[822px]:px-2 pt-32 pb-16 max-[822px]:pt-8"
  >

  <div class="p-2 min-[822px]:hidden">
    <NuxtLink ><Button></Button></NuxtLink>
  </div>
 </div>
  </div>
    
  </NuxtLayout>
</template>

<style scoped>
.with-bg{
  background: url('../assets/about.webp') 25% 25% / cover fixed;
}



</style>