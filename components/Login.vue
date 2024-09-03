<script setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useLocalUserStore} from '~/stores/localStore';
import {useMobileStore} from '~/stores/MobileMenu';
const formData = reactive({
  email: "",
  password: "",
});
const icons = {
  email: "mdi:email-open-multiple-outline",
  password: "mdi:form-textbox-password",
};

const store = useLocalUserStore();
const serverErrors = ref('');
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
 $fetch('/api/login', {
        method: "POST",
        body: {
            email: formData.email,
            password: formData.password,
        }
    }).then(res => {
        if(res.statusCode === 301) {
            store.setLocalUser(res.data);
            document.body.style.overflow = "auto";
            useMobileStore().onModal();
            navigateTo('/account');
        }
    }).catch(error => {
        if(error.statusCode === 404) {
            serverErrors.value = 'Пользователь с такой почтой не существует и/или неверный пароль'
            setTimeout(() =>  serverErrors.value = "", 2000)
        }
    }).finally(() => {
        loader.value = false;
    })
}

const $v = useVuelidate(rules, formData);

const onInputFieldChange = (val, field) => {
  formData[`${field}`] = val;
};

const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};
</script>

<template>
  <div
    class="w-1/2 max-[822px]:w-full max-[822px]:top-8 max-[822px]:bottom-0 max-[822px]:left-0 max-[822px]:translate-x-0 max-[822px]:translate-y-0 z-30 fixed top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 py-12 max-[822px]:pt-12 bg-white rounded-md"
  >
    <form class="flex flex-col gap-10 max-[822px]:gap-4 pt-4 max-[822px]:pt-2 p-4">
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
          :type="'password'"
          :value="formData.password"
          @onValue="onInputFieldChange"
          :id="'password'"
          :icon="icons.password"
          @onFormTouched="formTouched"
          :errors="$v?.password?.$errors[0]"
        ></Registerinput>
      </register-input-wrapper>
      <span v-if="!serverErrors.length" class="text-xs w-full min-h-6"> </span>
     <span v-if="serverErrors.length" class="text-xs text-red-500 w-full min-h-6 flex justify-center items-center">{{serverErrors}} </span>
      <Button class="mx-auto w-full relative" @click="loggin_function" :disabled="serverErrors.length || $v.$errors[0] || loader">
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


    </form>
  </div>
</template>
