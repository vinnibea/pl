<script setup>
let public_offer = [
  {
    title: "Umowa Użytkownika",
    content:
      "Niniejszy dokument reguluje relacje między Licencjodawcą a Użytkownikiem podczas korzystania z funkcjonalności Serwisu. Umowa stanowi umowę adhezyjną. Prosimy o dokładne zapoznanie się z treścią dokumentu. Jeśli nie zgadzasz się z jego warunkami, Sp. z o.o. GotówkaMax zaleca zaprzestanie korzystania z Serwisu.",
  },
  {
    title: "Definicje",
    list: [
      {
        title:
          "1.1. Licencjodawca – Sp. z o.o. GotówkaMax, NIP: 5261040827, posiadająca wyłączne prawa do Serwisu i udzielająca Użytkownikowi prawa do korzystania z funkcji Serwisu na podstawie licencji niewyłącznej.",
      },
      {
        title:
          "1.2. Użytkownik – osoba fizyczna posiadająca pełne prawa obywatelskie, która akceptuje warunki niniejszej Umowy i korzysta z funkcjonalności Serwisu.",
      },
      {
        title:
          "1.3. Serwis – zbiór zasobów informacyjnych, tekstów, grafiki, oprogramowania oraz innych elementów własności intelektualnej, dostępnych przez internet pod adresem https://gotowkamax.eu.",
      },
      {
        title:
          "1.4. Konto osobiste – specjalna funkcjonalna część Serwisu, dostępna dla Użytkownika po rejestracji, która umożliwia dostęp do płatnych usług po ich opłaceniu.",
      },
      {
        title:
          "1.5. Kredytodawca – organizacja wymieniona w Załączniku nr 1 do Umowy, z którą Licencjodawca podpisał umowę, umożliwiającą Kredytodawcy wysyłanie Użytkownikowi powiadomień i ofert dotyczących zawarcia Umowy pożyczki.",
      },
      {
        title:
          "1.5.1. Partner – organizacja wymieniona w Załączniku nr 1 do Umowy, z którą Licencjodawca podpisał umowę umożliwiającą wysyłanie Użytkownikowi powiadomień i ofert.",
      },
      {
        title:
          "1.6. Ocena kredytowa – wskaźnik zdolności kredytowej Użytkownika, obliczany na podstawie informacji dostarczonych przez funkcjonalność Serwisu.",
      },
      {
        title:
          "1.7. Umowa o udzielenie mikropożyczki – umowa zawierana między Użytkownikiem a Kredytodawcą, przewidująca udzielenie środków na warunkach odpłatności, zwrotności i terminowości.",
      },
      {
        title:
          "1.8. Terminy, które nie zostały określone w niniejszej Umowie, będą interpretowane zgodnie z prawem Rzeczypospolitej Polskiej.",
      },
    ],
  },
  {
    title: "Postanowienia ogólne",
    list: [
      {
        title:
          "2.1. Niniejsze Zasady dotyczą wszystkich transakcji związanych z przekazywaniem środków pieniężnych z rachunku bankowego Płatnika na rachunek bankowy Licencjodawcy w celu opłacenia usług.",
      },
      {
        title:
          "2.2. Jeśli Użytkownik dokonuje regularnych płatności, zasady dotyczące zwrotu mogą być stosowane jedynie do płatności wykonanych w ciągu ostatnich 14 dni kalendarzowych przed złożeniem wniosku o zwrot.",
      },
    ],
  },
  {
    title: "Procedura anulowania płatności",
    list: [
      {
        title: "3.1. Anulowanie płatności możliwe jest w następujących przypadkach:",
        sublist: [
          {
            content:
              "Jeśli karta, której dane zostały użyte do opłacenia usług Licencjodawcy, została zgubiona przez Płatnika przed dokonaniem płatności.",
          },
          {
            content:
              "Płatność została dokonana bez wiedzy Płatnika lub wskutek działań osób trzecich.",
          },
        ],
      },
      {
        title:
          "3.2. Aby anulować płatność, Płatnik powinien skontaktować się z Bankiem wydawcą karty lub operatorem systemu płatności.",
      },
      {
        title:
          "3.3. Licencjodawca zobowiązuje się dostarczać Bankowi wydawcy karty lub operatorowi systemu płatności niezbędne informacje, aby ułatwić anulowanie płatności.",
      },
    ],
  },
  {
    title: "Procedura zwrotu płatności",
    list: [
      {
        title: "4.1. Zwrot płatności może nastąpić w następujących przypadkach:",
        sublist: [
          {
            content:
              "Pobrano kwotę wyższą niż określona w Umowie Użytkownika.",
          },
          {
            content:
              "Użytkownik nie uzyskał dostępu do płatnych usług Serwisu.",
          },
        ],
      },
      {
        title:
          "4.2. Zwrot środków jest prawem, a nie obowiązkiem Licencjodawcy.",
      },
      {
        title:
          "4.3. Użytkownik jest zobowiązany do złożenia wniosku o zwrot nie później niż 14 dni kalendarzowych od daty dokonania spornego płatności.",
      },
      {
        title:
          "4.4. Wniosek o zwrot środków należy przesłać pocztą elektroniczną na adres experts@gotowkamax.pro lub za pośrednictwem formularza w Serwisie.",
      },
    ],
  },
  {
    title: "Postanowienia końcowe",
    list: [
      {
        title:
          "5.1. Licencjodawca zastrzega sobie prawo do zmiany niniejszych Zasad dotyczących anulowania i zwrotu płatności. Zmiany wchodzą w życie z chwilą ich opublikowania w Serwisie.",
      },
      {
        title:
          "5.2. Sprawy, które nie są uregulowane w niniejszych Zasadach, będą rozstrzygane zgodnie z obowiązującym prawem Rzeczypospolitej Polskiej.",
      },
      {
        title:
          "5.3. Jeżeli którekolwiek z postanowień niniejszych Zasad zostanie uznane za nieważne, pozostałe postanowienia pozostają w mocy.",
      },
    ],
  },
];


const contacts = {
  company: "Sp. z o.o. GotówkaMax",
  NIP: "5261040827",
  address: {
    country: "Polska",
    city: "Warszawa",
    street: "ulica Marszałkowska 12",
    index: "00-626",
  },
  phone: "+48 (221) 234 567",
  email: "experts@gotówkamax.pro",
};

</script>

<template>
 <NuxtLayout>
  <div class="bg-white py-4 px-24  max-[822px]:p-2 max-[822px]:py-16 w-full border-t border-slate-300">
    <div v-for="item in public_offer" :key="item.title">
        <h2 class="font-bold text-center py-2">{{ item.title }}</h2>
        <p v-if="item.content" class="max-[822px]:text-sm p-2">
          {{ item.content }}
        </p>
        <div v-for="(data, k) in item.list" :key="k">
          <p class="text-sm text-slate-900 p-1">{{ data.title || "" }}</p>
          <div v-for="(sub_data, i) in data.sublist" :key="i">
            <p class="text-xs pl-4 text-slate-600">{{ sub_data.content }}</p>
          </div>
        </div>
      </div>

      <h2 class="font-bold text-center py-2">Kontakty licencjodawcy</h2>
      <h2 class="font-bold text-left py-2">
       {{ contacts.company }}
      </h2>
      <h2 class="font-light text-xs text-left py-2">NIP: {{ contacts.NIP }}</h2>
      <h2 class="font-semibold text-left py-2">
        Adres:
        <span class="font-light"
          >{{ contacts.address.country }}, {{ contacts.address.city }},
          {{ contacts.address.index }}, {{ contacts.address.street }},
        </span>
      </h2>
      <h2 class="font-semibold text-left py-2">
        Tel.:
        <span class="font-light">{{ contacts.phone }} </span>
      </h2>
      <h2 class="font-semibold text-left py-2">
        Email:
        <span class="font-light">{{ contacts.email }} </span>
      </h2>
      <NuxtLink
        to="/"
        class="w-full text-center flex justify-center font-bold text-button-primary py-4"
        >Powrót do strony głównej</NuxtLink
      >
    
  </div>
 </NuxtLayout>
    
</template>