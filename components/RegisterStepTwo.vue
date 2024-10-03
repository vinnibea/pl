<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useRegisterStore } from "~/stores/RegisterStore.js";
import { useLocalUserStore } from "~/stores/localStore.js";
import { loadStripe } from "@stripe/stripe-js";
const showReverse = ref(false);

const store = useMobileStore();
const localStore = useLocalUserStore();
const registerStore = useRegisterStore();

const card_pattern = ref("**** **** **** ****");
const name_pattern = ref("CARDHOLDER NAME");
const valid_pattern = ref("MM/YY");

const setCardEmmiter = computed(() => {
  if (card_pattern.value.startsWith("5")) {
    return "mastercard";
  }
  if (card_pattern.value.startsWith("4")) {
    return "visa";
  } else {
    return "default";
  }
});

const changePolitics = (i) => {
  store.onPolitics(i);
};

let stripe,
  elements,
  paymentElement,
  clientSecret,
  client,
  _clientID,
  _sid,
  _cus,
  type;

let errors = ref("");
let terms_accepted = ref(false);
const proceeding = ref(false);
const loading = ref(true);
const completed = ref(false);

onMounted(async () => {
  client = await JSON.parse(localStorage.getItem("temp"));
  stripe = await loadStripe(useRuntimeConfig().public.stripeKey, {
    locale: "pl",
  });

  try {
    const { secret: customerSecret, customerID } = await $fetch(
      "/api/customer",
      {
        method: "POST",
        body: {
          email: client.email,
        },
      }
    );

    if (customerSecret) {
      clientSecret = customerSecret;
      _clientID = customerID;
      _cus = customerID;
      elements = await stripe.elements({
        clientSecret,
      });
      paymentElement = await elements.create("payment", {
        paymentMethodOrder: ["card"],
        terms: { card: "never" },
      });
      await paymentElement.mount("#payment-element");
      paymentElement.on("change", (event) => {
        completed.value = event.complete;
      });
      loading.value = false;
    } else {
      errors.value = "Niedopuszczalne działanie";
      registerStore.setActiveTab(0);
    }
  } catch (e) {
    console.log(e);
  }
});

const onSubmit = async () => {
  proceeding.value = true;
  await elements.submit();

  const { subscription_id, secret } = await $fetch("/api/create", {
    method: "POST",
    body: {
      customerID: _clientID,

      price: "price_1Q2aQ0EanzUqIyswK01VHs8v",
    },
  });
  _sid = subscription_id;

  try {
    const { setupIntent } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      secret,
      confirmParams: {
        return_url: "https://gotowkamax.eu/register/",
      },
      redirect: "if_required",
    });

    const update = await $fetch("/api/update", {
      method: "PUT",
      body: {
        pm: setupIntent?.payment_method,
        sid: _sid,
        cus: _cus,
      },
    });

    const data = await $fetch("/api/register", {
      method: "POST",
      body: {
        ...client,
        _sid,
      },
    });
    if (setupIntent && setupIntent.status === "succeeded") {
      localStorage.removeItem("temp");
      registerStore.setActiveTab(2);
    }
  } catch (error) {
    errors.value = "Spróbuj ponownie lub połącz inną kartę";
    setTimeout(() => {
      errors.value = "";
    }, 7000);
  } finally {
    proceeding.value = false;
  }
};
</script>

<template>
  <form class="flex flex-col w-full gap-6 max-[822px]:gap-2">
    <div class="w-full flex flex-col justify-center gap-0 items-center p-4">
      <div
        @click="
          () => {
            showReverse = !showReverse;
          }
        "
        class="w-[300px] relative cursor-pointer shadow-md transition-all duration-500 p-1 max-[822px]:p-1 max-[822px]:w-[280px] min-h-[180px] max-[822px]:min-h-[140px] flex items-center justify-center flex-col rounded-xl bg-gradient-to-r from-blue-100 to-button-primary"
        :class="[
          {
            '-scale-x-100': showReverse,
            'bg-gradient-to-br': setCardEmmiter !== 'default',
            'from-slate-500': setCardEmmiter === 'mastercard',
            'to-slate-900': setCardEmmiter === 'mastercard',
            'from-blue-100': setCardEmmiter === 'visa',
            'to-blue-900': setCardEmmiter === 'visa',
          },
        ]"
      >
        <div class="flex items-center justify-end w-full min-h-9">
          <svg
            v-if="setCardEmmiter === 'mastercard' && !showReverse"
            width="36px"
            height="36px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <circle cx="7" cy="12" r="7" fill="#EA001B" />
              <circle cx="17" cy="12" r="7" fill="#FFA200" fill-opacity=".8" />
            </g>
          </svg>
          <svg
            v-if="setCardEmmiter === 'visa' && !showReverse"
            width="36xp"
            height="36px"
            viewBox="-2120 -140 24 780"
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
        </div>

        <div v-if="showReverse">
          <div
            class="bg-black w-full h-8 absolute top-5 left-0 right-0 bg-gradient-to-r from-slate-500 to-slate-900"
          ></div>
          <span
            class="text-white -scale-x-[100%] absolute top-16 flex gap-2 items-center justify-center"
          >
            <span class="text-[8px] uppercase flex items-center"
              >Security <br />
              code (CVV)
              <span>-></span>
            </span>
            <span class="skew-x-6 text-[10px]">{{ "***" }}</span>
          </span>
        </div>

        <div
          class="flex flex-col justify-end w-full"
          :class="[
            {
              'opacity-0': showReverse,
            },
          ]"
        >
          <div
            class="w-full flex min-h-12 items-center justify-between px-0 max-[822px]:px-0"
          >
            <div class="flex items-center">
              <Icon
                name="ic:twotone-arrow-left"
                class="bg-white scale-120"
                size="24"
              ></Icon>
              <div
                class="rounded-md min-h-8 min-w-10 max-w-10 max-[822px]:max-w-6 bg-gradient-to-br from-amber-100 to-amber-300 max-[822px]:rounded-[4px] max-[822px]:min-w-8 max-[822px]:min-h-6 border border-slate-400 bg-amber-200"
              ></div>
            </div>
            <Icon
              name="mdi:contactless-payment"
              class="bg-white"
              size="24"
            ></Icon>
          </div>
          <span
            class="text-white text-md min-h-8 font-medium drop-shadow-2xl [word-spacing:16px] max-[822px]:[word-spacing:18px] max-[822px]:text-sm text-pretty w-full text-center flex items-center justify-center border rounded-md duration-500 border-transparent bg-opacity-30 border-opacity-20"
            >{{ card_pattern }}</span
          >
          <div class="flex items-end">
            <div class="flex flex-col items-start">
              <span
                class="text-white min-h-6 border min-w-12 text-[10px] gap-2 ml-36 p-1 max-[822px]:ml-24 max-[822px]:text-[8px] [letter-spacing:2px] transition-all text-center flex items-center justify-center rounded-md duration-500 border-transparent bg-opacity-30 border-opacity-20"
              >
                <span class="text-[5px] min-[822px]:text-[6px]">
                  VALID <br />
                  THRU
                </span>
                <span class="text-[12px] min-[822px]:text-[14px]">{{
                  valid_pattern
                }}</span>
              </span>
              <span
                class="text-white border min-w-64 max-w-64 items-center justify-start overflow-hidden py-2 flex transition-all rounded-md duration-500 border-transparent min-h-6 text-center text-xs px-4 max-[822px]:px-2 max-[822px]:py-0 [letter-spacing:4px] uppercase bg-opacity-30 border-opacity-20"
                :class="[
                  {
                    'text-[10px]': name_pattern.length <= 16,
                    'text-[8px]': name_pattern.length > 16,
                    'text-[6px]': name_pattern.length >= 24,
                    'max-[822px]:text-[10px]': name_pattern.length <= 18,
                    'max-[822px]:text-[8px]': name_pattern.length > 18,
                    'max-[822px]:text-[6px]': name_pattern.length >= 24,
                  },
                ]"
                ><span>{{ "CARDHOLDER NAME" }}</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div id="payment-element"></div>
      <div v-if="loading" class="flex items-center justify-center">
        <span class="flex items-center justify-center w-full gap-2 mx-auto">
          <span
            name="loader"
            v-if="loading"
            class="loader bg-opacity-0 border-4 w-32 h-32 bt-2 border-t-white border-slate-300 rounded-full"
          >
          </span>
        </span>
      </div>
      <div class="min-h-6 flex items-center">
        <span
          v-if="errors?.length"
          class="text-red-600 text-[10px] uppercase"
          >{{ errors }}</span
        >
      </div>
    </div>
    <div
      v-if="!loading"
      class="flex flex-col items-start max-[822px]:items-start gap-2 w-full pt-2"
    >
      <div
        class="flex justify-start items-start gap-4 w-2/3 max-[822px]:w-full"
      >
        <div class="flex justify-start gap-2 items-start max-[822px]:w-full">
          <input
            type="checkbox"
            class="px-2 py-2 rounded-full"
            v-model="terms_accepted"
          />
          <p class="text-xs text-slate-500">
            Wyrażam zgodę na warunki subskrypcji i regularnego obciążania konta.
            zapoznałem się z zasadami regularnych płatności
            <span
              @click="changePolitics(2)"
              class="text-blue-500 cursor-pointer"
              >zasadami regularnych płatności</span
            >.
          </p>
        </div>
      </div>
    </div>

    <Button
      class="mx-auto min-w-[240px] relative"
      :disabled="
        proceeding || errors?.length != false || !terms_accepted || !completed
      "
      @click="onSubmit"
    >
      <span class="flex items-center justify-center w-full gap-2 mx-auto"
        >{{ proceeding ? "Trwa przetwarzanie danych" : "Dalej" }}
        <span
          name="loader"
          v-if="proceeding"
          class="loader bg-yellow border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
        >
        </span>
      </span>
    </Button>
    <div
      class="text-xs text-dark-grey pt-16 flex flex-col gap-2 max-[822px]:text-[10px] max-[822px]:pt-24"
    >
      <p>
        Wprowadź dane ważnej karty kredytowej, aby subskrybować usługę.
        Pierwsze 5 dni usługa jest darmowa. Klikając przycisk „Dalej”, zgadzasz się, że zostanie wystawiony rachunek na kwotę 19,99 euro co 5 dni kalendarzowych (standardowy okres). Możesz anulować subskrypcję w dowolnym momencie, klikając przycisk „Zamknięcie konta” w dolnej części strony, wcześniej logując się do swojego konta przy użyciu loginu i hasła utworzonych podczas rejestracji.
      </p>
      <p>
        Sp. z o.o. GotówkaMax, zarejestrowana pod adresem ulica Marszałkowska 12, 00-626 Warszawa, Polska</p>
      <p>Opłata pojawi się na wyciągu z Twojej karty jako GotówkaMax.</p>
    </div>
  </form>
</template>

<style scoped></style>
