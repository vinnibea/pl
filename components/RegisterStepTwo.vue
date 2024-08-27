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
  surname: "",
  cvc: "",
  valid_until: "",

  accept: false,
});
watch(
  () => formData.valid_until,
  (newVal, oldVal) => {
    if (oldVal.length === 2 && !newVal.includes("/") && newVal.length === 3) {
      formData.valid_until =
        formData.valid_until.slice(0, 2) + "/" + formData.valid_until.slice(2);
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
    
      minLength: helpers.withMessage('Укажите месяц и год истечения срока действия карты', minLength(5))
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
        minLength(19)
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

const $v = useVuelidate(rules, formData);

const onInputFieldChange = (val, field) => {
  if (formData[`${field}`].length === 2 && field === "valid_until") {
    formData[`${field}`] = val + "/";
  }
  formData[`${field}`] = val;
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
    class="flex bg-white flex-col w-full gap-10 max-[822px]:gap-8 pt-4 max-[822px]:pt-2 relative"
  >
    <register-input-wrapper>
      <Registerinput
        :placeholder="'Держатель карты'"
        :value="formData.card_holder"
        @onValue="onInputFieldChange"
        :id="'card_holder'"
        @onFormTouched="formTouched"
        :errors="$v?.card_holder?.$errors[0]"
        :icon="icons.profile"
      ></Registerinput>
      <Registerinput
        :placeholder="'Номер карты (16 цифр)'"
        :value="formData.card"
        @onValue="onInputFieldChange"
        :id="'card'"
        @onFormTouched="formTouched"
        :errors="$v?.card?.$errors[0]"
        :icon="icons.card"
        :maxLength="19"
      ></Registerinput>
    </register-input-wrapper>

    <register-input-wrapper>
      <Registerinput
        :placeholder="'Срок действия'"
        :icon="icons.valid_until"
        :value="formData.valid_until"
        @onValue="onInputFieldChange"
        :id="'valid_until'"
        @onFormTouched="formTouched"
        :errors="$v?.valid_until?.$errors[0]"
        :maxLength="5"
      ></Registerinput>
      <Registerinput
        :placeholder="'CVV/CVC'"
        type="password"
        :id="'cvc'"
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
      class="mx-auto min-w-1/2 relative"
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
