<script setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useLocalUserStore } from "~/stores/localStore";
import { useMobileStore } from "~/stores/MobileMenu";
const formData = reactive({
  email: "",
  password: "",
});
const icons = {
  email: "mdi:email-open-multiple-outline",
  password: "mdi:form-textbox-password",
};

const store = useLocalUserStore();
const serverErrors = ref("");
const loader = ref(false);
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
  };
});

const loggin_function = async () => {
  loader.value = true;
  $fetch("/api/login", {
    method: "POST",
    body: {
      email: formData.email,
      password: formData.password,
    },
  })
    .then((res) => {
      if (res.statusCode === 301) {
        store.setLocalUser(res.data);
        document.body.style.overflow = "auto";
        useMobileStore().onModal();
        navigateTo("/account");
      }
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        serverErrors.value =
          "Пользователь с такой почтой не существует и/или неверный пароль";
        setTimeout(() => (serverErrors.value = ""), 2000);
      }
    })
    .finally(() => {
      loader.value = false;
    });
};

const $v = useVuelidate(rules, formData);

const onInputFieldChange = (val, field) => {
  formData[`${field}`] = val;
};

const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};

const toRegister = () => {
  document.body.style.overflow = "auto";
  useMobileStore().onModal();
};

const inputType = ref(false);
</script>

<template>
  <div
    class="w-1/2 max-[822px]:w-full max-[822px]:top-8 max-[822px]:bottom-0 max-[822px]:left-0 max-[822px]:translate-x-0 max-[822px]:translate-y-0 z-30 fixed top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 py-12 max-[822px]:pt-12 min-[822px]:rounded-3xl bg-white"
  >
    <h2 class="w-full flex items-center justify-center text-2xl font-semibold">
      Вход в аккаунт
    </h2>
    <form
      class="flex flex-col gap-2 max-[822px]:gap-2 py-16 max-[822px]:py-12 px-16 max-[822px]:px-6"
    >
      <register-input-wrapper>
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
          :placeholder="'Пароль'"
          :type="inputType ? 'text' : 'password'"
          :value="formData.password"
          @onValue="onInputFieldChange"
          :id="'password'"
          :icon="icons.password"
          @onFormTouched="formTouched"
          :errors="$v?.password?.$errors[0]"
        ></Registerinput>
      </register-input-wrapper>
      <div class="flex justify-between items-center -mt-4 px-2 py-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" id="enter" />
          <label
            for="enter"
            class="text-center uppercase text-[8px] cursor-pointer font-semibold text-slate-700"
            >Запомнить меня</label
          >
        </div>
        <span
          class="text-center uppercase text-[8px] cursor-pointer transition-all font-semibold text-blue-500"
          @click="() => (inputType = !inputType)"
          :class="[
            {
              'opacity-0 pointer-events-none': formData.password.length < 6,
            },
          ]"
          >{{ inputType ? "Скрыть пароль" : "Показать пароль" }}</span
        >
      </div>

      <span v-if="!serverErrors.length" class="text-xs w-full min-h-6"> </span>
      <span
        v-if="serverErrors.length"
        class="text-xs text-red-500 w-full min-h-6 flex justify-center items-center"
        >{{ serverErrors }}
      </span>
      <div class="flex flex-col gap-2">
        <Button
          class="mx-auto w-full relative"
          :color="'bg-slate-900'"
          :hover="'bg-slate-700'"
          :text="'text-white'"
          :hoverText="'hover:text-white'"
          @click="loggin_function"
          :disabled="serverErrors.length || $v.$errors[0] || loader"
          :class="[{
            'pointer-events-none': serverErrors.length || $v.$errors[0] || loader,
          }]"
        >
          <span class="flex items-center justify-center w-full gap-2 mx-auto"
            >{{ "Войти" }}
            <span
              v-if="loader"
              name="loader"
              class="loader bg-yellow border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
            >
            </span>
          </span>
        </Button>
        <div class="flex items-center py-4">
          <div class="h-[1px] w-1/2 bg-slate-300"></div>
          <span
            class="w-1/3 text-center uppercase text-[10px] font-semibold text-blue-500"
            >Нет аккаунта?</span
          >
          <div class="h-[1px] w-1/2 bg-slate-300"></div>
        </div>
        <NuxtLink to="/register" @click="toRegister">
          <Button class="mx-auto w-full relative">
            <span class="flex items-center justify-center w-full gap-2 mx-auto"
              >{{ "Регистрация" }}
            </span>
          </Button>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
