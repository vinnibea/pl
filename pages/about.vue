<script setup>

const serviceInfo = [
  {
    title: null,
    content: "Serwis «GotówkaMax.eu» to platforma online, która pomaga użytkownikom wybrać optymalną ofertę mikropożyczki. Możesz złożyć wniosek jednocześnie do kilku instytucji finansowych, które zostały wybrane na podstawie Twoich danych."
  },
  {
    title: "Co robimy?",
    content: "Nasza platforma przyjmuje i przetwarza wnioski o mikropożyczki. Wypełniasz wniosek na stronie, podajesz potrzebną kwotę oraz okres spłaty, a także inne ważne dane. Wysyłamy Twój wniosek do kilku firm, które mogą udzielić mikropożyczki i z dużym prawdopodobieństwem go zaakceptują, po czym pieniądze trafią na Twoją kartę."
  },
  {
    title: "Jak to robimy?",
    content: null,
    list: [
      "Współpracujemy z dziesiątkami instytucji finansowych w całej Polsce i przekazujemy Twój wniosek tylko do tych firm, które odpowiadają Twoim wymaganiom. To zwiększa szanse na akceptację.",
      "Serwis dostępny jest przez całą dobę. Nawet jeśli potrzebujesz pieniędzy w nocy, możesz złożyć wniosek, a w ciągu 15 minut otrzymasz odpowiedź.",
      "Aby złożyć wniosek, należy podać swoje pełne imię i nazwisko, PESEL, datę urodzenia, dane kontaktowe oraz kwotę i okres mikropożyczki."
    ]
  },

  {
    title: "Zalety współpracy z nami",
    content: null,
    list: [
      {
        title: "Zasięg",
        content: "Pieniądze może otrzymać każdy obywatel Polski, niezależnie od miejsca zamieszkania.",
        icon: null
      },
      {
        title: "Oszczędność Twoich pieniędzy",
        content: "Pomagamy wybrać mikropożyczkę z najkorzystniejszymi warunkami i najniższymi stopami procentowymi.",
        icon: null
      },
      {
        title: "Szybkość akceptacji",
        content: "Wnioski złożone za pośrednictwem naszej platformy są przetwarzane przez organizacje partnerskie tego samego dnia.",
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
   <div class="py-16">
    <h1
    class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-dark-grey max-[820px]:pt-[42px]"
  >
  O serwisie
  </h1>
  <div
    class="flex items-start gap-16 w-full pt-8 pb-16 max-[822px]:pt-4 max-[822px]:pb-8 px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4 cursor-pointer"
  >
    <div class="flex flex-col gap-4 justify-center">
      <div
        v-for="(item, index) in serviceInfo"
        :key="item.title"
        class="flex group flex-col w-full max-[1224px]:min-w-full shadow-lg items-start text-4xl font-semibold rounded-base text-dark-grey transition-all cursor-pointer max-[1024px]:px-2 max-[820px]:px-0 bg-slate-900"
      >
        <div
          class="flex items-center w-full gap-2 px-1 rounded-base shadow-lg justify-between max-[822px]:gap-0 bg-bg-main bg-slate-primary max-[822px]:py-0 max-[822px]:px-1"
          v-if="item.title"
        
        >
          <span
            class="rounded-base transition-transform duration-500 min-h-6 min-w-6 max-[822px]:border-2  max-[822px]:max-h-4 max-[822px]:max-w-4 bg-bg-main border-2 border-button-primary flex items-center justify-center"
          >
            <span
              class="rounded-base group-hover:bg-white transition-all duration-500 group-hover:text-slate-900 h-4 w-4  max-[822px]:max-w-[16px] max-[822px]:max-h-[16px] text-xs max-[822px]:text-[12px] flex items-center justify-center"
             
              >{{ index }}</span
            >
          </span>

          <h3
            class="font-semibold text-center py-2 text-base max-[1024px]:text-[12px] max-[476px]:text-[10px] group-hover:text-button-primary"
            
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
          class="w-full px-4 text-[12px] max-[822px]:text-[10px] py-4 rounded-base text-justify backdrop-blur-lg bg-bg-primary transition-all duration-300 max-[822px]:group-hover:text-button-primary max- max-[822px]:px-2"
          :class="[
            {
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
    <NuxtLink no-prefetch to='/register'><Button>Zarejestruj się</Button></NuxtLink>
  </div>
 </div>
  </div>
    
  </NuxtLayout>
</template>
