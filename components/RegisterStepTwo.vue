<script setup>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  maxLength,
} from "@vuelidate/validators";
import { watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useRegisterStore } from "~/stores/RegisterStore.js";
import { useLocalUserStore } from "~/stores/localStore.js";
import Registerinput from "~/components/Registerinput.vue";
import { useActiveElement } from "@vueuse/core";
const focusOnCard = ref(null);
const activeElement = useActiveElement();
const key = computed(() => activeElement.value?.dataset?.id || "null");
watch(activeElement, (el) => {
  console.log("focus changed to",el.id, key.value);
  focusOnCard.value = el.id;
});

const store = useMobileStore();
const localStore = useLocalUserStore();
const registerStore = useRegisterStore();
console.log("step2");

const icons = {
  profile: "mdi:account-circle",
  card: "mdi:credit-card",
  cvc: "mdi:credit-card-lock",
  valid_until: "mdi:calendar-month",
};

const formData = reactive({
  card: "",
  card_holder: "",
  cvc: "",
  valid_until: "",

  accept: false,
});

const card_pattern = ref("**** **** **** ****");
const name_pattern = ref("CARDHOLDER NAME");
const valid_pattern = ref("MM/YY");
watch(
  () => formData.valid_until,
  (newVal, oldVal) => {
    if (oldVal.length === 2 && !newVal.includes("/") && newVal.length === 3) {
      formData.valid_until =
        formData.valid_until.slice(0, 2) + "/" + formData.valid_until.slice(2);
    }
  }
);

watch(
  () => formData.card,
  (newVal, oldVal) => {
    if (oldVal.length > newVal.length) {
      formData.card = formData.card.trim();
    }
  }
);

const rules = computed(() => {
  return {
    valid_until: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      number: helpers.withMessage("Допустимы только числовые значения", (val) =>
        val.match(/^[0-9/]+$/)
      ),
      validMonth: helpers.withMessage(
        "Значение месяца не может быть больше двенадцати (12)",
        (val) => +val.split("/")[0] <= 12
      ),

      minLength: helpers.withMessage(
        "Укажите месяц и год истечения срока действия карты",
        minLength(5)
      ),
    },
    cvc: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      number: helpers.withMessage("Допустимы только числовые значения", (val) =>
        val.match(/^[0-9]+$/)
      ),

      minLength: helpers.withMessage(
        `Это поле не может быть короче трех символов`,
        minLength(3)
      ),
    },
    card: {
      number: helpers.withMessage("Допустимы только числовые значения", (val) =>
        val.match(/^[0-9 ]+$/)
      ),
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        `Это поле не может быть короче 16 символов`,
        minLength(16)
      ),
    },
    accept: {
      required: helpers.withMessage(
        "Чтобы продолжить, согласитесь с условиями сервиса",
        required
      ),
      isAccceted: helpers.withMessage(
        "Чтобы продолжить, согласитесь с условиями сервиса",
        (val) => val
      ),
    },

    age: {
      required: helpers.withMessage(
        "Чтобы продолжить, согласитесь с условиями сервиса",
        required
      ),
      isAge: helpers.withMessage(
        "Чтобы продолжить, согласитесь с условиями сервиса",
        (val) => val
      ),
    },
    password_confirm: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      sameAs: helpers.withMessage(
        "Пароли должны  совпадать",
        sameAs(formData.password)
      ),
    },
  };
});

const setCardEmmiter = computed(() => {
  if(card_pattern.value.startsWith('5')) {
    return 'mastercard'
  } if(card_pattern.value.startsWith('4')) {
    return 'visa'
  } else {
    return 'default'
  }
})
const $v = useVuelidate(rules, formData);
let some = ref(null);
const onInputFieldChange = (val, field) => {
  if (formData[`${field}`].length === 2 && field === "valid_until") {
    formData[`${field}`] = val + "/";
  }


  if (val.length === 0) {
    formData[`${field}`] = "";
  }
  const local = [[], [], [], []];
  let r = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      local[i][j] = val[r + j];
    }

    r += 4;
  }

  const joinedArray = local.map((el) => {
    return el.map((el) => (!el ? "" : el)).join("");
  });
  const patternArray = local.map((el, i) => {
    return el.map((el) => (!el ? "*" : el)).join("");
  });
  const forData = local.map((el) => {
    return el.filter((el) => (!el ? "_" : el)).join("");
  });

  card_pattern.value = patternArray.join(" ");
  formData.card = joinedArray.filter((el) => el !== "").join("");
};
const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};

const changePolitics = (i) => {
  store.onPolitics(i);
};
</script>

<template>
  <form
    class="flex bg-white flex-col w-full gap-10 max-[822px]:gap-4 pt-0 max-[822px]:pt-2 relative"
  >
    <div class="w-full flex justify-center pb-2">
      
        <div
          class="w-[300px] transition-all p-1 max-[822px]:p-1  max-[822px]:w-[280px] min-h-[180px] max-[822px]:min-h-[140px] flex items-center justify-center flex-col rounded-xl bg-blue-200"
          :class="[{
            '-scale-x-100': focusOnCard === 'cvc',
            'bg-gradient-to-br': setCardEmmiter !== 'default',
            'from-slate-500': setCardEmmiter === 'mastercard',
            'to-slate-900': setCardEmmiter === 'mastercard',
            'from-blue-100': setCardEmmiter === 'visa',
            'to-blue-900': setCardEmmiter === 'visa',
          }]"
        >
          <div class="flex items-center justify-end w-full min-h-9">
            <svg
             v-if="setCardEmmiter === 'mastercard'"
              width="36px"
              height="36px"
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
            <svg v-if="setCardEmmiter === 'visa'" width="36xp" height="36px" viewBox="-2120 -140 24 780" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3" fill="#0E4595"/><path d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#F2AE14"/></svg>
          </div>
          <div class="flex flex-col justify-end w-full" :class="[{
            'opacity-0': focusOnCard === 'cvc',
          }]">
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
                  class="rounded-md min-h-8 min-w-10 max-w-10 max-[822px]:max-w-6 bg-gradient-to-br from-amber-100 to-amber-300 max-[822px]:rounded-[4px] max-[822px]:min-w-8 max-[822px]:min-h-6 border border-slate-950 bg-amber-200"
                ></div>
              </div>
              <Icon
                name="mdi:contactless-payment"
                class="bg-white"
                size="24"
              ></Icon>
            </div>
            <span
              class="text-white text-md min-h-8 font-medium drop-shadow-2xl 
              [word-spacing:16px] max-[822px]:[word-spacing:18px] 
              max-[822px]:text-sm text-pretty w-full text-center flex items-center justify-center border rounded-md duration-500 
                  border-transparent"

              :class="[
                {
                  'border-neutral-200': focusOnCard === 'card',
                  'bg-slate-500': focusOnCard === 'card',
                },
              ]"
              >{{ card_pattern }}</span
            >
            <div class="flex items-end">
              <div class="flex flex-col items-start">
                <span
                  class="text-white min-h-6 border text-[10px] ml-36 p-2 max-[822px]:ml-32 max-[822px]:text-[8px] [letter-spacing:2px] transition-all text-center flex items-center justify-center  rounded-md duration-500 
                  border-transparent"
                  :class="[
                {
                  'border-neutral-200': focusOnCard === 'valid_until',
                  'bg-slate-500': focusOnCard === 'valid_until',
                },
              ]"
                  >{{ valid_pattern }}</span
                >
                <span
                  class="text-white border py-2 flex items-center justify-center 
                  transition-all rounded-md duration-500 
                  border-transparent min-h-6 text-[10px] text-center text-xs px-4 max-[822px]:px-2  max-[822px]:py-0 max-[822px]:text-[10px] [letter-spacing:4px] uppercase"
                  :class="[
                    {
                      'border-neutral-200': focusOnCard === 'card_holder',
                      'bg-slate-600': focusOnCard === 'card_holder',
                    },
                  ]"
                  ><span>{{ name_pattern }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
 
    {{ some }}
    <register-input-wrapper>
      <Registerinput
        :placeholder="'Держатель карты'"
        :value="formData.card_holder"
        @onValue="onInputFieldChange"
        :id="'card_holder'"
        @onFormTouched="formTouched"
        :errors="$v?.card_holder?.$errors[0]"
        :icon="icons.profile"
        :data-id="'card_holder'"
      ></Registerinput>
      <Registerinput
        :placeholder="'Номер карты (16 цифр)'"
        :value="formData.card"
        @onValue="onInputFieldChange"
        :id="'card'"
        @onFormTouched="formTouched"
        :errors="$v?.card?.$errors[0]"
        :icon="icons.card"
        :maxLength="16"
        :data-id="'card'"
      ></Registerinput>
    </register-input-wrapper>

    <register-input-wrapper>
      <Registerinput
        :placeholder="'Срок действия'"
        :icon="icons.valid_until"
        :value="formData.valid_until"
        @onValue="onInputFieldChange"
        :id="'valid_until'"
        :data-id="'valid_until'"
        @onFormTouched="formTouched"
        :errors="$v?.valid_until?.$errors[0]"
        :maxLength="5"
      ></Registerinput>
      <Registerinput
        :placeholder="'CVV/CVC'"
        type="password"
        :id="'cvc'"
         :data-id="'cvc'"
        :value="formData.cvc"
        @onValue="onInputFieldChange"
        :icon="icons.cvc"
        @onFormTouched="formTouched"
        :errors="$v?.cvc?.$errors[0]"
        :maxLength="3"
      ></Registerinput>
    </register-input-wrapper>
    <div class="flex flex-col items-start max-[822px]:items-start gap-2 w-full">
      <div
        class="flex justify-start items-start gap-4 w-2/3 max-[822px]:w-full"
      >
        <div class="flex justify-start gap-4 items-start max-[822px]:w-full">
          <input
            type="checkbox"
            class="px-2 py-2 rounded-full"
            v-model="formData.age"
          />
          <p class="text-xs">
            Я согласен с условиями подписки и регулярного списания средств, я
            ознакомился с
            <span
              @click="changePolitics(1)"
              class="text-blue-700 cursor-pointer"
              >правилами регулярных платежей</span
            >.
          </p>
        </div>
      </div>
    </div>
    <Button
      class="mx-auto min-w-[240px] relative"
      :disabled="false"
      @click.prevent="
        () => {
          registerStore.setActiveTab(1);
          localStore.setLocalUser(formData);
        }
      "
    >
      <span class="flex items-center justify-center w-full gap-2 mx-auto"
        >{{ registerStore.loading ? "Идёт обработка платежа" : "Оплатить" }}
        <span
          name="loader"
          v-if="registerStore.loading"
          class="loader bg-yellow border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
        >
        </span>
      </span>
    </Button>
    <div
      class="text-xs text-slate-500 flex flex-col gap-2 max-[822px]:text-[10px] max-[822px]:pt-8"
    >
      <p>
        Введите данные действующей кредитной карты, чтобы подписаться на услугу.
        Плата в размере 0,99 евро (включая НДС) взимается за пробный период
        продолжительностью 7 календарных дней. По истечении пробного периода вам
        будет выставляться счет на сумму 19,99 евро каждые 15 календарных дней
        (стандартный период). Тарификация длится в течение 4 стандартных
        периодов. Вы можете отменить подписку в любое время, нажав кнопку
        «Отписаться» в разделе «Оплата» в личном кабинете.
      </p>
      <p>SIA LeadProm Media, ул. Матиса, 61 - 31, Рига, Латвия, LV-1009</p>
      <p>Платеж появится в выписке по вашей карте как MONEYDEAL.</p>
    </div>
  </form>
</template>

<style scoped></style>
