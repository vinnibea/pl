<script setup>
import { useLocalUserStore } from "../stores/localStore";
import { required, minLength, helpers } from "@vuelidate/validators";
const localUser = useLocalUserStore();

import { useVuelidate } from "@vuelidate/core";
const formData = reactive({
  phone: "",
});

const rules = computed(() => {
  return {
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
  }
});
const $v = useVuelidate(rules, formData);

const onInputFieldChange = (val, field) => {
  formData[`${field}`] = val;
};

const formTouched = (field) => {
  $v.value[`${field}`].$touch();
};
const loading = ref(false)
const onCancel = async () => {
  loading.value = true;
  try {
    const response = await $fetch('/api/cancel', {
      method: 'POST',
      body: {
         phone: formData.phone,
         sid: localUser.localUser.sid,
      }
    })
    localUser.setLocalUser(response);
  } catch(e) {
     console.log(e)
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NuxtLayout>
    <div class="with-bg-12 min-h-svh">
      <h1
        class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-white backdrop-blur-lg bg-slate-700 bg-opacity-60 max-[820px]:pt-[42px]"
      >
        Отказ от подписки
      </h1>

      <div class="flex justify-center items-center min h-full">
        <div
          class="flex flex-col items-center w-1/2 max-[822px]:min-w-full bg-slate-700 bg-opacity-60 backdrop-blur-lg p-4 rounded-b-md justify-center pt-4 gap-6 max-[822px]:pt-4 px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4"
        >
          <p
            class="text-base text-center w-full text-slate-200 px-4 py-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[12px] max-[822px]:px-2"
          >
            Отписавшись от услуг сервиса, вы потеряете возможность внеочерeдного
            обслуживания у ряда кредиторов, возможности узнавать о новых услугах
            наших партнеров, а также не сможете автоматически отправлять ваши
            анкетные данные в МФО.
          </p>

          <register-input-wrapper class="min-w-full">
            <registerinput
              :placeholder="'Мобильный номер'"
              :id="'phone'"
              :tel="true"
              :pattern="/^[0-9]+$/"
              :maxLength="10"
              :value="formData.phone"
              :disabled="!localUser.isAuth || (localUser.isAuth && !localUser.localUser.subscription) || loading"
              @onValue="onInputFieldChange"
              @onFormTouched="formTouched"
              :errors="$v?.phone?.$errors[0]"
            ></registerinput>
          </register-input-wrapper>

          <p v-if="!localUser.isAuth || (localUser.isAuth && localUser.localUser.subscription)"
            class="text-[12px] text-center w-full text-red-500 px-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[12px] max-[822px]:px-1"
          >
            Чтобы воспользоваться формой нужно иметь активную подписку, зайти в
            личный кабинет и вернуться на эту страницу. После чего кнопка станет
            активной и можно будет ввести телефонный номер, на который был
            зарегистрирован аккаунт
          </p>
          <div
            class="w-full flex flex-col items-center bg-opacity-60 shadow-xl rounded-b-md"
          >
            <Button
              class="min-w-full"
              v-if="localUser.isAuth && localUser.localUser.subscription"
              :disabled="!localUser.isAuth || loading || $v?.phone?.$errors[0]"
              :color="'bg-blue-400'"
              :hover="'hover:bg-blue-600'"
              :hoverText="'hover:text-white'"
              :text="'text-white'"
              @click="onCancel"
              >
              <span class="flex items-center justify-center w-full gap-2 mx-auto"
              >{{
                loading ? "Идёт обработка данных" : "Отписаться"
              }}
              <span
                name="loader"
                v-if="loading"
                class="loader border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
              >
              </span>
            </span>
              </Button
            >
            <Button
            class="min-w-full"
            v-if="localUser.isAuth && !localUser.localUser.subscription"
            :disabled="true"
            :color="'bg-green-600'"
            :text="'text-white'"
            >
            Услуга отключена
            </Button
          >
            <p
              class="text-xs text-center w-full text-slate-200 px-4 py-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              В случае возникновения неполадок с формой или других трудностей
            </p>

            <NuxtLink class="w-full">
              <Button class="min-w-full">Напишите нам</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.with-bg-12 {
  background: url("../assets/cancel.webp") center center / cover fixed;
}
</style>
