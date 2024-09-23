<script setup>
const cardContent = [
  {
    title: "Rejestracja na stronie",
    content:
      "Zarejestrowanie się na stronie jest bardzo proste. To zajmie tylko 10 minut. Do rejestracji potrzebne są: telefon komórkowy do odbioru SMS, adres e-mail i karta płatnicza.",
  },
  {
    title: "Opłata za usługi",
    content:
      "Usługi oferowane przez stronę są płatne. Aby dokonać opłaty po rejestracji, należy podłączyć kartę płatniczą do konta GotówkaMax.pl. Z niego zostanie pobrana opłata. Okres próbny, w którym klient nie jest obciążany opłatą, wynosi 5 dni od momentu rozpoczęcia subskrypcji. Następnie koszt korzystania z usług serwisu wynosi 9,99 euro za 5 dni.",
  },
  {
    title: "Wybór kredytu",
    content:
      "Po zakończeniu rejestracji otrzymasz swoją ocenę kredytową, a także ogólny formularz do wysłania pocztą do wielu instytucji kredytowych. Ponadto zostanie przedstawiona lista najbardziej korzystnych kredytów. Aktywacja usługi nie gwarantuje uzyskania kredytu. Pobrana opłata za usługę nie podlega zwrotowi.",
  },
  {
    title: "Warunki kredytowania",
    content:
      "Oprocentowanie kredytu wynosi co najmniej 30% i nie więcej niż 365%. Okres kredytowania wynosi od 60 dni do maksymalnie 2 lat.",
  },
];

const cardColContent = [
  {
    title: "Przydatne narzędzia",
    content:
      "Zostając użytkownikiem serwisu, możesz wysłać swój profil od razu do kilku firm, uzyskać informacje o swojej zdolności kredytowej, aktualnych kursach walut, kalkulator kredytowy.",
  },
  {
    title: "Wypełnij formularz w ciągu 5 minut",
    content:
      "Prosty i przejrzysty interfejs pozwala szybko wypełnić aplikację w zaledwie kilka minut.",
  },
  {
    title: "Duża lista opcji kredytowania",
    content:
      "Zostając użytkownikiem serwisu, możesz wysłać swój profil od razu do kilku firm, uzyskać informacje o swojej zdolności kredytowej, aktualnych kursach walut, kalkulator kredytowy.",
  },
];
</script>

<template>
  <NuxtLayout>
    <div
      class="hero bg-no-repeat bg-top max-[820px]:bg-center bg-cover py-4 px-0 min-w-full flex flex-col justify-end max-[1024px]:px-2 max-[520px]:px-1 border-b-2 border-button-primary"
    >
      <div
        class="hero-center min-w-full px-4 gap-16 py-16 flex flex-row-reverse justify-between items-center max-[1224px]:flex-col max-[822px]:py-0 max-[822px]:gap-12 max-[822px]:pt-14 max-[820px]:px-0 max-[822px]:text-white"
      >
        <div
          class="max-[820px]:text-white flex flex-col items-end text-button-primary justify-end max-[1224px]:min-w-full max-[1224px]:flex max-[1224px]:flex-col max-[1224px]:px-4 max-[1224px]:items-center max-[1224px]:mx-auto max-[520px]:px-0 max-[520px]:mx-0 max-[520px]:items-stretch"
        >
          <h1>Odbierz od 100 zł do 30000 zł</h1>
          <p class="drop-shadow-lg">
            Z dowolną historią kredytową, wiekiem do 75 lat, przez całą dobę i
            siedem dni w tygodniu
          </p>
        </div>
        <Calculator></Calculator>
      </div>
      <top-cards></top-cards>
    </div>
    <main class="px-4 max-[1024px]:px-0">
      <main-cards-layout id="requirements">
        <template #title>
          <h2>Wymagania do klienta</h2>
        </template>
        <template #content>
          <requirements></requirements>
        </template>
        <template #button-title> Zarejestruj się</template>
      </main-cards-layout>

      <main-cards-layout id="credit">
        <template #title>
          <h2>Uzyskiwanie pożyczki</h2>
        </template>
        <template #content>
          <credit-take :content="cardContent"></credit-take>
        </template>
        <template #button-title> Otrzymaj pieniądze </template>
      </main-cards-layout>

      <main-cards-layout id="about-service">
        <template #title>
          <h2>Jak działa serwis</h2>
        </template>
        <template #content>
          <credit-take
            :content="cardColContent"
            :flex="'flex-row'"
          ></credit-take>
        </template>
        <template #button-title> Zarejestruj się</template>
      </main-cards-layout>
    </main>
  </NuxtLayout>
</template>

<style>
.hero {
  min-height: calc(100dvh - 52px);
  background-image: url("../assets/main.jpeg");
}

.hero-center h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 2px rgba(35, 35, 35, 0.238);
}

.hero-center p {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 24px 8px;
  color: white;
  width: 100%;
  text-align: justify;
}
@media screen and (max-width: 1280px) {
  .hero-center h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
  }

  .hero-center p {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 18px 4px;
    color: #2f2f2f;
  }
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
    color: #ffffff;
  }
}
@media screen and (max-width: 820px) {
  .hero-center h1 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #f85a5a;
    text-align: center;
    padding: 4px;
    text-shadow: 1px 1px 1px rgb(255, 255, 255);
  }

  .hero-center p {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0 12px;
    color: #ffffff;
    text-align: center;
  }

  .hero {
    background-position: 47%;
  }
}

@media screen and (max-width: 520px) {
  .hero-center h1 {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(107, 1, 1, 0.591);
  }

  .hero-center p {
    font-size: 1rem;
    font-weight: 700;
    padding: 0 2px;
    color: #ffffff;
  }

  .hero {
    background-position: 52%;
  }
}
</style>
