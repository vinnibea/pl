<script setup>
const faqItems = [
  {
    title: "Co robimy?",
    content:
      "Serwis przetwarza wnioski klientów o przyznanie mikrokredytu. Nie gwarantujemy 100% skuteczności, ale zazwyczaj 8 na 10 naszych klientów otrzymuje mikrokredyt. Dzięki naszym algorytmom Twój wniosek trafi tylko do odpowiednich organizacji.",
    list: [],
  },
  {
    title: "Jak uzyskać pieniądze przy złej historii kredytowej?",
    content:
      "Wielu kredytodawców rozumie sytuację finansową pożyczkobiorcy i pomimo złej historii kredytowej są gotowi zawrzeć z nim umowę o udzielenie mikrokredytu. Warto pamiętać, że w każdym konkretnym przypadku kredytodawca rozpatruje nie tylko historię kredytową, ale także inne informacje o pożyczkobiorcy, które mogą wpłynąć na decyzję o zawarciu umowy.",
    list: [],
  },
  {
    title: "Pracuję nieoficjalnie. Czy dostanę pieniądze?",
    content:
      "Możesz również otrzymać środki pieniężne. Organizacje, z którymi współpracujemy, rozumieją, że masz źródło dochodu i będziesz w stanie spłacić pożyczkę.",
    list: [],
  },
  {
    title: "Czy mogę dostać pieniądze bez zameldowania w Polsce?",
    content:
      "Aby otrzymać pieniądze, musisz być obywatelem Rzeczypospolitej Polskiej, mieć ukończone 18 lat i nie więcej niż 60 lat, być w pełni zdolnym do czynności prawnych, posiadać telefon komórkowy oraz kartę bankową.",
    list: [],
  },
  {
    title: "Gdzie zostaną przelane pieniądze?",
    content:
      "Możesz otrzymać pieniądze bezpośrednio na konto lub na kartę bankową dowolnego banku w Polsce.",
    list: [],
  },
  {
    title: "Za co pobierana jest opłata?",
    content:
      "Pobieramy opłatę za pełny dostęp do serwisu wyboru mikrokredytów i za przesyłanie Twojego wniosku do instytucji finansowych w celu podjęcia decyzji o przyznaniu mikrokredytu. Zawsze staramy się ulepszać nasz serwis, aby był jak najbardziej przydatny dla użytkowników.",
    list: [
      "na stronie głównej",
      "w umowie użytkownika",
      "przy wypełnianiu formularza w pierwszym polu wyboru",
      "na dole wszystkich stron w sekcji „Aktualne taryfy”",
      "dodatkowo przy dodawaniu karty",
    ],
  },
  {
    title: "Jak mogę anulować subskrypcję?",
    content:
      'Możesz anulować subskrypcję na stronie, w sekcji menu „Anulowanie subskrypcji”. Jeśli masz problemy, napisz do nas przez sekcję „NAPISZ DO NAS”, podając ostatnie 4 cyfry karty, e-mail oraz numer telefonu, który podałeś przy składaniu wniosku.',
    list: [],
  },
  {
    title: "Jak mogę zmienić numer karty?",
    content:
      "Niestety, zmiana numeru karty nie jest możliwa. Musisz utworzyć nowe konto użytkownika z nowym adresem e-mail i numerem telefonu. Następnie będziesz mógł dodać nową kartę. Zalecamy anulowanie subskrypcji dla poprzedniego konta, ponieważ proces ten nie nastąpi automatycznie i środki będą pobierane za dostęp do pełnej funkcjonalności serwisu dla każdego z kont.",
    list: [],
  },
  {
    title: "Dlaczego serwis potrzebuje kod CVV?",
    content:
      "Kod CVV jest potrzebny, aby z Twojej karty mogła zostać pobrana opłata za pełny dostęp do serwisu wyboru mikrokredytów. Dane karty są przechowywane przez instytucję finansową świadczącą usługi płatnicze, która odpowiada za bezpieczeństwo danych karty.",
    list: [],
  },
  {
    title: "Co zrobić, jeśli zapomnę loginu i hasła?",
    content:
      'Aby uzyskać dostęp do swojego konta, kliknij przycisk „Zaloguj się” w prawym górnym rogu strony, a następnie wybierz opcję „Odzyskaj dostęp przez e-mail” i wypełnij e-mail, który podałeś przy składaniu wniosku. Na podany adres e-mail zostanie wysłane nowe hasło, a loginem będzie Twój numer telefonu.',
    list: [],
  },
  {
    title: "Jak sprawdzić, czy mój wniosek o mikrokredyt został zatwierdzony?",
    content:
      "W przypadku zatwierdzenia Twojego wniosku, organizacja, która jest gotowa udzielić mikrokredytu, powiadomi Cię o tym za pomocą wiadomości SMS, telefonu z centrum obsługi klienta lub e-maila.",
    list: [],
  },
  {
    title: "Dlaczego nie mogę dodać karty?",
    content:
      "Zwykle istnieje kilka powodów, o których informuje bramka płatnicza podczas dodawania karty: brak wystarczających środków na karcie, błędnie wprowadzony kod z SMS-a, niepoprawnie wprowadzone dane karty itp. Jeśli z Twojej strony wszystko zostało wprowadzone prawidłowo, spróbuj dodać inną kartę bankową lub usuń limit na płatności internetowe, kontaktując się z bankiem, który wydał kartę.",
    list: [],
  },
  {
    title: "Czy mogę podać numer konta, jeśli nie mam karty?",
    content:
      "Niestety, nie. Aby złożyć wniosek, musisz użyć numeru karty bankowej i potwierdzić, że jesteś jej właścicielem, za pomocą kodu SMS.",
    list: [],
  },
  {
    title: "Jak mogę usunąć moje dane osobowe?",
    content:
      'Musisz skontaktować się z naszymi specjalistami przez sekcję „NAPISZ DO NAS”. Podaj ostatnie 4 cyfry karty, e-mail i numer telefonu, który podałeś przy składaniu wniosku. W wiadomości wpisz: „Proszę o usunięcie moich danych osobowych.” Przypominamy, że usunięcie danych osobowych jest nieodwracalnym działaniem, które prowadzi do zamknięcia konta.',
    list: [],
  },
  {
    title: "Bardzo pilnie potrzebuję pieniędzy. Co robić?",
    content:
      "Aby otrzymać mikrokredyt, musisz złożyć wniosek na naszej stronie. Następnie otrzymasz odpowiednie oferty w swoim panelu użytkownika, a także powiadomienia e-mail, push i SMS. Musisz wybrać interesującą Cię ofertę i przesłać wniosek. W przypadku pozytywnej decyzji mikrofinansowej organizacji, jej pracownicy skontaktują się z Tobą i zaproponują odpowiednie warunki mikrokredytu.",
    list: [],
  },
  {
    title: "Jak złożyć wniosek?",
    content:
      "Tylko online na tej stronie. Tworzysz wniosek podczas rejestracji, a serwis wysyła ten wniosek do kredytodawców.",
    list: [],
  },
  {
    title: "Zatwierdzono mi mikrokredyt. Jak mogę go otrzymać?",
    content:
      "Organizacja kredytowa, która zatwierdziła mikrokredyt, sama się z Tobą skontaktuje. Serwis zajmuje się tylko wyborem ofert. Dziękujemy za korzystanie z naszego serwisu. Środki są wypłacane na warunkach uzgodnionych przez Ciebie i instytucję mikrofinansową w umowie.",
    list: [],
  },
  {
    title: "Podczas anulowania subskrypcji pojawia się błąd.",
    content: "Możliwe, że niepoprawnie wprowadzasz:",
    list: ["numer telefonu", "e-mail", "ostatnie 4 cyfry karty"],
  },
];

const selectedCard = ref(null);
const onCardSelected = (index) => {
  if (index === selectedCard.value) return (selectedCard.value = null);
  selectedCard.value = index;
};
</script>

<template>
  <NuxtLayout>
    <div class="min-h-[1020px]  max-h-[1020px] max-[822px]:min-h-svh overflow-y-scroll hidden-scroll py-16">
      <h1
      class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-dark-grey backdrop-blur-lg max-[820px]:pt-[42px]"
    >
    Pytania i odpowiedzi
    </h1>
   
    <div
      class="flex items-start pt-4 max-h-full  gap-16 w-full max-[822px]:pt-4  px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4 cursor-pointer"
    > 
    
      <div class=" flex flex-col gap-1 justify-center">
       
        <div
          v-for="(item, index) in faqItems"
          :key="item.title"
          class="flex group flex-col  bg-bg-main  hover:bg-white  w-full py-4 px-4 items-start text-4xl shadow-lg  font-semibold rounded-base text-dark-grey transition-all duration-700 cursor-pointer max-[1024px]:px-2 max-[820px]:w-full max-[820px]:py-0 max-[820px]:px-0 max-[822px]:bg-bg-white max-[822px]:hover:bg-bg-main"
          @click="onCardSelected(index + 1)"
        >
          <div
            class="flex items-center w-full gap-4 justify-between max-[822px]:gap-0  max-[822px]:bg-dark-grey  max-[822px]:py-1 max-[822px]:px-1"
          >
            <span
              class="rounded-base group-hover:scale-110 max-[822px]:group-hover:scale-100 transition-transform duration-500 min-w-14 h-14 max-[1024px]:max-h-14  max-[1024px]:min-w-14 max-[822px]:h-6 max-[822px]:border-2 max-[822px]:min-w-6 bg-button-primary border-4 group-hover:border-button-primary   flex items-center justify-center"
            >
              <span
                class="rounded-base group-hover:bg-white transition-all duration-500 max-[1024px]:text-sm group-hover:text-slate-900 h-12 w-12  max-[1024px]:h-10 max-[1024px]:w-10 max-[822px]:h-4  max-[822px]:w-4 max-[822px]:text-xs flex items-center justify-center"
                :class="[
                  {
                    'bg-white': selectedCard === index + 1,
                    'text-slate-900': selectedCard === index + 1,
                  },
                ]"
                >{{ index + 1 }}</span
              >
            </span>

            <h3
            class="font-semibold w-full text-base max-[1024px]:text-sm max-[476px]:text-xs text-center  text-black" :class="[{
              'max-[822px]:text-button-primary': selectedCard === index + 1,
              'max-[822px]:text-white': selectedCard !== index + 1,
          }]"
              
            >
              {{ item.title }}
            </h3>

            <svg width="60px" height="60px" class="max-[822px]:hidden"  v-if="selectedCard !== index + 1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              
              <g id="SVGRepo_iconCarrier">
              
              <path d="M3 4.281v16.437A1.282 1.282 0 0 0 4.281 22h16.437A1.282 1.282 0 0 0 22 20.718V4.281A1.281 1.281 0 0 0 20.719 3H4.28A1.281 1.281 0 0 0 3 4.281zM20.719 4a.281.281 0 0 1 .281.281V20.72a.281.281 0 0 1-.281.281H4.28a.281.281 0 0 1-.28-.282V4.28A.281.281 0 0 1 4.281 4zM12 13H7v-1h5V7h1v5h5v1h-5v5h-1z"/>
              
              <path fill="none" d="M0 0h24v24H0z"/>
              
              </g>
              
              </svg>
              <svg width="60px" height="60px"  class="max-[822px]:hidden" v-if="selectedCard === index + 1" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">

                <g stroke-width="0"/>
                
                <g stroke-linecap="round" stroke-linejoin="round"/>
                
                <g> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -1035.000000)" fill="#000000"> <path d="M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z" id="minus-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g>
                
                </svg>
                <svg class="min-[822px]:hidden" width="24px" height="24px" v-if="selectedCard !== index + 1"  viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff">

                  <g stroke-width="0"/>
                  
                  <g  stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <g > <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-100.000000, -1035.000000)" fill="#ffffff"> <path d="M130,1063 C130,1064.1 129.104,1065 128,1065 L104,1065 C102.896,1065 102,1064.1 102,1063 L102,1039 C102,1037.9 102.896,1037 104,1037 L128,1037 C129.104,1037 130,1037.9 130,1039 L130,1063 L130,1063 Z M128,1035 L104,1035 C101.791,1035 100,1036.79 100,1039 L100,1063 C100,1065.21 101.791,1067 104,1067 L128,1067 C130.209,1067 132,1065.21 132,1063 L132,1039 C132,1036.79 130.209,1035 128,1035 L128,1035 Z M122,1050 L117,1050 L117,1045 C117,1044.45 116.552,1044 116,1044 C115.448,1044 115,1044.45 115,1045 L115,1050 L110,1050 C109.448,1050 109,1050.45 109,1051 C109,1051.55 109.448,1052 110,1052 L115,1052 L115,1057 C115,1057.55 115.448,1058 116,1058 C116.552,1058 117,1057.55 117,1057 L117,1052 L122,1052 C122.552,1052 123,1051.55 123,1051 C123,1050.45 122.552,1050 122,1050 L122,1050 Z" id="plus-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g>
                  
                  </svg>
              <svg width="24px" height="24px" class="min-[822px]:hidden" v-if="selectedCard === index + 1" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff">
    
                <g stroke-width="0"/>
                
                <g stroke-linecap="round" stroke-linejoin="round"/>
                
                <g> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -1035.000000)" fill="#ffffff"> <path d="M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z" id="minus-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g>
                
                </svg>

                
          </div>

          <p
            class="text-sm px-2 text-justify transition-all duration-300 group-hover:text-button-primary max-[822px]:group-hover:text-button-primary max-[822px]:text-xs max-[822px]:px-2 "
            :class="[
              {
                'py-4': index + 1 === selectedCard,
                'py-0': index + 1 !== selectedCard,
                'pt-2': index + 1 === selectedCard,
                'pt-0': index + 1 !== selectedCard,
                'max-h-0': index + 1 !== selectedCard,
                'opacity-0': index + 1 !== selectedCard,
                'max-h-fit': index + 1 === selectedCard,
                block: index + 1 === selectedCard,
              },
            ]"
          >
            {{ item.content }}
            <ul class="text-[12px] text-button-primary max-[822px]:text-[9px]">
              <li v-for="listItem in item.list" :key="listItem" >- {{listItem}}</li>
           </ul>
          </p>
          
        </div>
      </div>
      <Calculator class="max-[1024px]:hidden sticky top-16"></Calculator>
      
    </div>
    
    </div>
  </NuxtLayout>
</template>
<style>
  .with-bg-2{
    background: url('../assets/faq.webp') center / cover;
  }
  
.hidden-scroll::-webkit-scrollbar {
  display: none;
}
</style>