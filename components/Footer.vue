<script setup>
import { required, email, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const formData = reactive({
  email: "",
});

const paragraphs = [
  {
    content:
      "Sp. z o.o. GEPPETTO CONSULTING LTD NIP: 5261040827 nie uczestniczy w relacjach umownych między użytkownikami a organizacjami kredytowymi. Użytkownicy samodzielnie analizują ryzyka związane z ofertami kredytowymi, podejmują decyzje o zawarciu umów z partnerami za pośrednictwem serwisu i ponoszą ewentualne konsekwencje. Opłata za usługi serwisu nie gwarantuje zatwierdzenia mikrokredytu.",
  },
  {
    content:
      "Podstawowe parametry: okres kredytowania od 61 dni do 5 lat, oprocentowanie od 5,9% do 180,9% rocznie, wiek kredytobiorcy od 18 lat.",
  },
  {
    content:
      "Przykład obliczenia: Pożyczka w wysokości 300 000 zł na 36 miesięcy z oprocentowaniem 12,9% rocznie. Nadpłata wyniesie 63 375 zł, ostateczna kwota do zwrotu — 363 375 zł. Kredytodawca ma obowiązek przedstawić pełną informację o warunkach kredytu, sposobie wykorzystania i zwrotu pożyczki.",
  },
  {
    content:
      "Jeśli masz pytania dotyczące działania serwisu, zapoznaj się z sekcją Odpowiedzi na pytania lub skorzystaj z formularza kontaktowego na stronie",
    linkContent: "NAPISZ DO NAS.",
    link: "mailto:experts@gotowkamax.pro",
  },
  {
    content:
      "Użytkownik otrzymuje dostęp do płatnych funkcji serwisu w celu uzyskania ofert od kredytodawców. Serwis nie jest bankiem ani organizacją kredytową i nie ponosi odpowiedzialności za warunki oraz konsekwencje umów kredytowych. Użytkownik akceptuje bieżące taryfy.",
  },
  {
    content:
      "Okres próbny, w którym nie jest pobierana opłata od klienta, wynosi 7 dni od momentu rozpoczęcia subskrypcji. Następnie z twojej karty zostanie pobrana kwota 9,99 euro za 7 dni korzystania z serwisu (płatna subskrypcja). Subskrypcja jest automatycznie odnawiana, jeśli nie zostanie anulowana.",
  },
  {
    content:
      "Jeśli usługa nie jest już potrzebna (otrzymałeś mikrokredyt lub nie potrzebujesz go), możesz w każdej chwili -",
    linkContent: "anulować subskrypcję.",
    link: "/cancel",
  },
  {
    content:
      "Ta strona używa plików cookie do świadczenia usług. Możesz zmienić ustawienia dostępu do plików cookie w swojej przeglądarce. Aby usunąć dane osobowe, wyślij e-mail z zarejestrowanego adresu na adres ",
    linkContent: "experts@gotowkamax.pro",
    link: "mailto:experts@gotowkamax.pro",
  },
];
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("", required),
      email: helpers.withMessage("Nieprawidłowy format wiadomości e-mail", email),
    },
  };
});

const $v = useVuelidate(rules, formData);

const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};

const footerLinks = [
  { title: "O serwisie", link: "/about" },
  { title: "Kontakt", link: "/contacts" },
  { title: "Zamknięcie konta", link: "/cancel" },
  { title: "Pytania i odpowiedzi", link: "/faq" },
  { title: "Umowa użytkownika", link: "/public-offer" },
  { title: "Prywatność", link: "/privacy" },
  { title: "Cennik i polityka zwrotu środków", link: "/pricing" },
  { title: "Przechowywanie danych osobowych", link: "/data-storage-policy" },
];

const serverError = ref("");
const serverSuccess = ref("");
const loading = ref(false);
const localUser = useLocalUserStore();

const onSubscribe = async (email) => {
  loading.value = true;
  $fetch("/api/email", {
    method: "POST",
    body: {
      email: email,
    },
    headers: { "cache-control": "no-cache" },
  })
    .then((res) => {
      serverError.value = "";
      if (res.status) {
        localUser.setSubsciber(res.email);
        formData.email = "";
      }
    })
    .catch((e) => {
      if (e.statusCode === 409) {
        serverError.value = "Jesteś już subskrybentem";
      }
    })
    .finally(() => {
      loading.value = false;
      setTimeout(() => {
        serverError.value = "";
        serverSuccess.value = "";
      }, 2000);
    });
};
</script>

<template>
  <footer
    class="pt-8 px-0 mt-0 bg-white max-[822px]:px-0 max-[822px]:pt-2 shadow-md max-[822px]:mt-0 relative z-10"
  >
    <div
      class="flex flex-row-reverse justify-between max-[822px]:flex-col-reverse px-8 max-[822px]:px-2"
    >
      <div class="max-[822px]:text-xs">
        <div
          class="flex gap-48 max-[822px]:gap-2 max-[822px]:justify-between w-full max-[822px]:py-4"
        >
          <ul
            class="flex flex-col gap-8 max-[468px]:gap-4 text-dark-grey uppercase font-semibold"
          >
            <li v-for="item in footerLinks.slice(0, 4)" :key="item.title">
              <NuxtLink
                :to="item.link"
                class="text-xs max-[822px]:text-[12px] max-[468px]:text-[10px] hover:text-button-primary"
                >{{ item.title }}</NuxtLink
              >
            </li>
          </ul>
          <ul
            class="flex text-dark-grey flex-col gap-8   max-[468px]:gap-4  max-[468px]:text-[10px] uppercase font-semibold"
          >
            <li v-for="item in footerLinks.slice(4)" :key="item.title">
              <NuxtLink
                :to="item.link"
                class="text-xs  max-[822px]:text-[12px] hover:text-button-primary"
                >{{ item.title }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <form class="flex flex-col py-12 gap-0">
          <div class="flex">
            <input
              type="email"
              v-model="formData.email"
              :disabled="loading || localUser.isSubscriber"
              @blur="() => formTouched('email')"
              class="px-2 py-2 w-full  bg-button-primary border-b border-b-white focus:border-b-button-primary disabled:opacity-50 placeholder:text-white transition-all duration-300 placeholder:text-sm focus:outline-none focus:bg-red-500 text-white focus:placeholder:text-slate-600 max-[822px]:placeholder:text-xs"
              :placeholder="localUser.subscriber_email || 'Podaj swój adres e-mail'"
            />

            <Button
              :radius="'rounded-base'"
              :disabled="
                !formData.email.length ||
                loading ||
                localUser.isSubscriber ||
                $v?.email?.$errors[0]
              "
              @click="onSubscribe(formData.email)"
              :color="
                localUser.isSubscriber ? 'bg-green-500' : 'bg-button-primary'
              "
              :hover="
                localUser.isSubscriber
                  ? 'hover:bg-green-500'
                  : 'hover:bg-yellow'
              "
              :text="localUser.isSubscriber ? 'text-white' : 'text-white'"
              :hoverText="
                localUser.isSubscriber
                  ? 'hover:text-white'
                  : 'hover:text-slate-800'
              "
              :class="[
                {
                  'pointer-events-none': localUser.isSubscriber,
                },
              ]"
            >
              {{
                localUser.isSubscriber ? "Subskrypcja subskrybowana" : "Subskrybuj"
              }}
              <span
                name="loader"
                v-if="loading"
                class="loader bg-yellow border absolute w-4 h-4 border-t-white border-slate-300 rounded-full"
              >
              </span>
            </Button>
          </div>
          <span
            v-if="serverError.length || $v?.email?.$errors[0]?.$message"
            class="text-red-500"
            >{{ serverError || $v?.email?.$errors[0]?.$message }}</span
          >
          <span v-if="serverSuccess.length" class="text-green-600">{{
            serverSuccess
          }}</span>
        </form>
      </div>

      <div
        class="flex flex-col gap-12 items-start max-[822px]:flex max-[822px]:flex-col max-[822px]:items-start max-[822px]:gap-2 max-[822px]:justify-between"
      >
        <div class="flex items-center gap-4 max-[822px]:justify-between max-[822px]:w-full">
          <h2
            class="text-2xl max-[1024px]:text-xl font-extrabold uppercase max-[822px]:text-base text-button-primary"
          >
            <span class="text-xs text-dark-grey">Gotówka</span>Max.<span
              class="text-xs text-dark-grey"
              >eu</span
            >
          </h2>

          <div class="flex gap-2 items-center max-[822px]:justify-between ">
            <svg
              width="48px"
              height="48px"
              viewBox="0 -140 780 780"
              enable-background="new 0 0 780 500"
              version="1.1"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3"
                fill="#0E4595"
              />
              <path
                d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528"
                fill="#F2AE14"
              />
            </svg>

            <svg
              width="48px"
              height="48px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <circle cx="7" cy="12" r="7" fill="#EA001B" />
                <circle
                  cx="17"
                  cy="12"
                  r="7"
                  fill="#FFA200"
                  fill-opacity=".8"
                />
              </g>
            </svg>
          </div>
        </div>

        <div class="flex flex-col items-start gap-4 max-[822px]:flex-row max-[822px]:justify-between max-[822px]:w-full">
          <span class="flex items-center gap-2">
             <UIcon name="mdi:phone-classic"></UIcon><span class="text-xs text-button-primary font-bold">+48 (221) 234 567</span></span>
          <span class="flex items-center gap-2">
             <UIcon name="mdi:envelope"></UIcon> 
             <span class="text-xs text-button-primary font-bold">
              experts@gotówkamax.pro</span>
            </span>
        </div>
      </div>
    </div>
    <div class="border-t-2 border-button-primary pt-8">
      <p
        v-for="(paragraph, i) in paragraphs"
        :key="i"
        class="text-xs text-slate-700 px-2 py-1"
      >
        {{ paragraph.content }}
        <NuxtLink
          class="text-slate-500"
          v-if="paragraph.link"
          :to="paragraph.link"
          >{{ paragraph.linkContent }}</NuxtLink
        >
      </p>
    </div>

    <div
      class="w-full bg-button-primary flex items-center px-4 py-0 max-[822px]:flex-col-reverse max-[822px]:px-2 max-[822px]:py-0"
    >
      <div
        class="flex items-center gap-2 w-full justify-end max-[822px]:flex-col-reverse max-[822px]:justify-center"
      >
        <p
          class="font-semibold text-white text-[12px] w-1/6 max-[822px]:w-full max-[822px]:text-[10px]"
        >
        Tel.: +48 (221) 234 567
        </p>
        <p
          class="font-semibold text-white text-[12px] w-1/3 max-[822px]:w-full max-[822px]:text-[10px]"
        >
        Sp. z o.o. GotówkaMax, zarejestrowana pod adresem ulica Marszałkowska 12, 00-626 Warszawa, Polska
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.action {
  background-color: yellow;
}
.st0 {
  fill: #b4e6dd;
}
.st1 {
  fill: #80d4c4;
}
.st2 {
  fill: #d2f0ea;
}
.st3 {
  fill: #ffffff;
}
.st4 {
  fill: #fbd872;
}
.st5 {
  fill: #db7767;
}
.st6 {
  fill: #f38e7a;
}
.st7 {
  fill: #f6af62;
}
.st8 {
  fill: #32a48e;
}
.st9 {
  fill: #a38fd8;
}
.st10 {
  fill: #7c64bd;
}
.st11 {
  fill: #eaa157;
}
.st12 {
  fill: #9681cf;
}
.st13 {
  fill: #f9c46a;
}
.st14 {
  fill: #ce6b61;
}

@media screen and (max-width: 822px) {
  svg:not(.exception) {
    width: 48px;
    height: 48px;
  }
}
</style>
