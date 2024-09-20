<script setup>
const public_offer = [
  {
    title: "Zgoda na przetwarzanie danych osobowych",
    content:
      "Ja, osoba fizyczna, której dane zostały podane podczas rejestracji na stronie https://gotowkamax.pl/, jako podmiot danych osobowych (dalej — Podmiot), wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z warunkami Polityki przetwarzania danych osobowych Sp. z o.o. GotówkaMax.pl (NIP: 5261040827) (dalej — Operator) poprzez stronę https://gotowkamax.pl (dalej – Serwis).",
  },
  {
    title: "Zgoda na przetwarzanie danych",
    content:
      "Podmiot wyraża pełną i bezwarunkową zgodę na wszystkie warunki przetwarzania jego danych osobowych poprzez zaznaczenie pola wyboru obok tekstu „Wyrażam zgodę na przetwarzanie danych osobowych i zgadzam się z polityką przetwarzania danych osobowych” w Serwisie. Podmiot gwarantuje, że przed wyrażeniem zgody na przetwarzanie danych osobowych zapoznał się ze wszystkimi warunkami Polityki przetwarzania danych Operatora (dalej – Polityka).",
  },
  {
    title: "Zdolność do czynności prawnych i zgoda",
    content:
      "Podmiot, wyrażając zgodę na przetwarzanie danych osobowych, gwarantuje, że działa dobrowolnie, z własnej woli i w swoim interesie oraz posiada pełną zdolność do czynności prawnych.",
  },
  {
    title: "Przetwarzanie danych osobowych",
    content:
      "Na podstawie niniejszej zgody Podmiot wyraża zgodę Operatorowi na przetwarzanie swoich danych osobowych, a mianowicie:",
    sublist: [
      {
        content: "nazwisko, imię, drugie imię (jeśli dotyczy);",
      },
      {
        content: "data urodzenia;",
      },
      {
        content: "PESEL;",
      },
      {
        content: "adres e-mail;",
      },
      {
        content: "numer telefonu;",
      },
      {
        content: "pliki cookie.",
      },
    ],
  },
  {
    title: "Dane wrażliwe",
    content:
      "Operator nie przetwarza wrażliwych danych Podmiotu (biometrycznych danych osobowych, specjalnych kategorii danych osobowych).",
  },
  {
    title: "Cele przetwarzania danych",
    content:
      "Celem przetwarzania danych osobowych Podmiotu jest zawarcie i wykonanie umowy użytkownika, zgodnie z którą Sp. z o.o. GotówkaMax.pl zapewnia Podmiotowi dostęp do osobistego konta w Serwisie oraz informuje Podmiot o ofertach Sp. z o.o. GotówkaMax.pl i kredytodawców.",
  },
  {
    title: "Działania związane z danymi osobowymi",
    content:
      "Operator podczas przetwarzania danych osobowych Podmiotu wykonuje następujące czynności: gromadzenie, przechowywanie, zmiana, uzupełnianie, wykorzystywanie, anonimizowanie, blokowanie i usuwanie danych osobowych oraz inne czynności zgodnie z przepisami prawa Rzeczypospolitej Polskiej.",
  },
  {
    title: "Weryfikacja wiarygodności",
    content:
      "Podmiot zgadza się, że Operator ma prawo weryfikować prawdziwość informacji podanych przez Podmiot podczas rejestracji, za pośrednictwem otwartych źródeł danych, w tym publicznych systemów informacyjnych.",
  },
  {
    title: "Przekazywanie danych osobom trzecim",
    content:
      "Podmiot zgadza się, że Operator ma prawo przekazywać dane osobowe Podmiotu osobom trzecim (kredytodawcom, partnerom i innym podmiotom, którym przekazanie danych osobowych jest niezbędne do realizacji zobowiązań Operatora wobec Podmiotu lub do spełnienia wymogów prawa Rzeczypospolitej Polskiej), zgodnie z warunkami rozdziału 10 Polityki.",
  },
  {
    title: "Automatyzacja przetwarzania danych",
    content:
      "Operator przetwarza dane osobowe Podmiotu z użyciem narzędzi automatyzacji oraz bez ich użycia. Operator nie podejmuje żadnych decyzji mających skutki prawne wobec Podmiotu danych osobowych ani w żaden inny sposób nie narusza praw i interesów Podmiotu w trakcie przetwarzania danych z użyciem narzędzi automatyzacji.",
  },
  {
    title: "Transgraniczne przekazywanie danych",
    content:
      "Operator może przekazywać dane za granicę – na terytorium Federacji Rosyjskiej oraz Republiki Cypryjskiej. Podmiot wyraża bezwarunkową zgodę na takie transgraniczne przekazywanie.",
  },
  {
    title: "Rozpowszechnianie danych",
    content:
      "Operator nie rozpowszechnia danych osobowych Podmiotu w publicznie dostępnych źródłach.",
  },
  {
    title: "Okres obowiązywania zgody",
    content:
      "Zgoda Podmiotu na przetwarzanie jego danych osobowych obowiązuje przez okres 10 (dziesięciu) lat od dnia jej wyrażenia. Operator przed upływem tego okresu zakończy przetwarzanie danych osobowych w przypadku osiągnięcia celu określonego w zgodzie lub wcześniejszego wycofania zgody, chyba że Polityka lub prawo Rzeczypospolitej Polskiej stanowi inaczej.",
  },
  {
    title: "Wycofanie zgody",
    content:
      "Zgoda może zostać wycofana wcześniej poprzez wysłanie przez Podmiot z adresu e-mail podanego podczas rejestracji w Serwisie, na adres e-mail experts@gotowkamax.pro, wiadomości elektronicznej zawierającej żądanie usunięcia danych osobowych Podmiotu. Oświadczenie, o którym mowa w niniejszym punkcie, powinno spełniać wymagania określone w Polityce. Jeżeli Podmiot wycofa swoją zgodę, Operator natychmiast zaprzestaje przetwarzania danych osobowych Podmiotu, z wyjątkiem przypadków przewidzianych przepisami prawa Rzeczypospolitej Polskiej.",
  },
];

const contacts = {
  company: "Sp. z o.o. GotówkaMax.pl",
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
    <div
      class="bg-white py-4 px-4 max-[822px]:p-2 max-[822px]:py-16 w-full border-t border-slate-300"
    >
      <div v-for="item in public_offer" :key="item.title">
        <h2 class="font-bold text-center py-0">{{ item.title }}</h2>
        <p v-if="item.content" class="max-[822px]:text-sm text-justify p-2">
          {{ item.content }}
        </p>
        <div v-for="(data, k) in item.list" :key="k">
          <p class="text-sm text-justify text-slate-900 p-1">{{ data.title || "" }}</p>
          <div v-for="(sub_data, i) in data.sublist" :key="i">
            <p class="text-xs text-justify  pl-4 text-slate-600">{{ sub_data.content }}</p>
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
          {{ contacts.address.index}}, {{ contacts.address.street }},
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
