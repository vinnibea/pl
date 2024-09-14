<script setup>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { useVuelidate } from "@vuelidate/core";
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useRegisterStore } from "~/stores/RegisterStore.js";
import { useLocalUserStore } from "~/stores/localStore.js";
import Registerinput from "~/components/Registerinput.vue";

const store = useMobileStore();
const localStore = useLocalUserStore();
const registerStore = useRegisterStore();

const icons = {
  profile: "mdi:account-circle",
  profile_empty: "mdi:account-circle-outline",
  email: "mdi:email-open-multiple-outline",
  city: "mdi:home-silo-outline",
  index: "mdi:format-list-numbered",
  password: "mdi:form-textbox-password",
  password_confirm: "mdi:repeat",
};

const formData = reactive({
  name: "",
  surname: "",
  city: "",
  email: "",
  password: "",
  password_confirm: "",
  phone: "",
  accept: false,
  age: false,
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      email: helpers.withMessage("Неверный формат электронной почты", email),
    },
    password: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        "Пароль не может быть короче 6 символов",
        minLength(6)
      ),
    },
    city: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        `Это поле не может быть короче трех символов`,
        minLength(3)
      ),
    },
  
    phone: {
      number: helpers.withMessage("Допустимы только числовые значения", (val) =>
        val.match(/^[0-9]+$/)
      ),
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        `Это поле не может быть короче 10 символов`,
        minLength(10)
      ),
    },
    name: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        `Это поле не может быть короче двух символов`,
        minLength(2)
      ),
    },
    surname: {
      required: helpers.withMessage("Это поле не может быть пустым", required),
      minLength: helpers.withMessage(
        `Это поле не может быть короче двух символов`,
        minLength(2)
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
  formData[`${field}`] = val;
};

const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};

const changePolitics = (i) => {
  store.onPolitics(i);
};

const onComplete = async (data) => {
  const { password } = data;
  const { email, name, surname, phone, city } = data;
  try {
    await $fetch('/api/uncompleted', {
    method: 'POST',
    body: {
       email, name, surname, phone, city,
    }
  })
  await $fetch('/api/register', {
    method: "POST", 
    body: {
      password,
    }
  })
  await localStorage.setItem(
    "temp",
    JSON.stringify({ email, name, surname, phone, city })
  );
  registerStore.setActiveTab(1);
  } catch (e) {
    console.log(e)
  }
};
</script>
<template>
  <form
    class="flex flex-col w-full gap-10 max-[822px]:gap-4 relative"
  >
    <register-input-wrapper>
      <Registerinput
        :placeholder="'Имя'"
        :id="'name'"
        :value="formData.name"
        :icon="icons.profile"
        @onValue="onInputFieldChange"
        @onFormTouched="formTouched"
        :errors="$v?.name?.$errors[0]"
      ></Registerinput>
      <Registerinput
        :placeholder="'Фамилия'"
        :value="formData.surname"
        @onValue="onInputFieldChange"
        :id="'surname'"
        @onFormTouched="formTouched"
        :errors="$v?.surname?.$errors[0]"
        :icon="icons.profile_empty"
      ></Registerinput>
      <Registerinput
        :placeholder="'Город'"
        :icon="icons.city"
        :value="formData.city"
        @onValue="onInputFieldChange"
        :id="'city'"
        @onFormTouched="formTouched"
        :errors="$v?.city?.$errors[0]"
      ></Registerinput>
    </register-input-wrapper>
    <register-input-wrapper>
      <Registerinput
        :placeholder="'Мобильный номер'"
        :value="formData.phone"
        @onValue="onInputFieldChange"
        :id="'phone'"
        :tel="true"
        @onFormTouched="formTouched"
        :errors="$v?.phone?.$errors[0]"
        :input_mode="'numeric'"
        :pattern="/^[0-9]+$/"
        :maxLength="10"
      ></Registerinput>
      <Registerinput
        :placeholder="'Email'"
        type="email"
        :id="'email'"
        :value="formData.email"
        @onValue="onInputFieldChange"
        @onFormTouched="formTouched"
        :errors="$v?.email?.$errors[0]"
        :icon="icons.email"
      ></Registerinput>

      
    </register-input-wrapper>
    <register-input-wrapper>
      <Registerinput
        class="max-w-1/2"
        :placeholder="'Пароль'"
        :type="'password'"
        :value="formData.password"
        @onValue="onInputFieldChange"
        :id="'password'"
        :icon="icons.password"
        @onFormTouched="formTouched"
        :errors="$v?.password?.$errors[0]"
      ></Registerinput>
      <Registerinput
        :placeholder="'Повторите пароль'"
        :type="'password'"
        :value="formData.password_confirm"
        @onValue="onInputFieldChange"
        :id="'password_confirm'"
        :icon="icons.password_confirm"
        @onFormTouched="formTouched"
        :errors="$v?.password_confirm?.$errors[0]"
      ></Registerinput>
    </register-input-wrapper>

    <div class="flex flex-col items-start max-[822px]:items-start gap-2 w-full">
      
      <div
        class="flex justify-start items-start gap-4 w-2/3 max-[822px]:w-full"
      >
        <div class="flex justify-start text-slate-300 gap-2 items-start max-[822px]:w-full">
          <input
            type="checkbox"
            class="px-2 py-2 rounded-full"
            v-model="formData.age"
          />
          <p class="text-xs">
            Я даю согласие на обработку моих персональных данных, получение
            рекламной информации, а также соглашаюсь на хранение своих данных,
            согласно
            <span
              @click="changePolitics(0)"
              class="text-blue-500 cursor-pointer"
              >договору на хранение персональных данных пользователя</span
            >.
            <span
              @click="changePolitics(1)"
              class="text-blue-500 cursor-pointer"
              >С пользовательским соглашением </span
            >ознакомлен и согласен.
          </p>
        </div>
      </div>
    </div>
    <Button
      class="mx-auto min-w-1/2 relative"
      :disabled="false"
      @click.prevent="onComplete(formData)"
    >
      <span class="flex items-center justify-center w-full gap-2 mx-auto"
        >{{
          registerStore.loading ? "Идёт обработка данных" : "Отправить анкету"
        }}
        <span
          name="loader"
          v-if="registerStore.loading"
          class="loader bg-yellow border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
        >
        </span>
      </span>
    </Button>
  </form>
</template>

<style>
.loader {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
