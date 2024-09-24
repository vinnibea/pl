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
      number: helpers.withMessage("Dozwolone są tylko wartości numeryczne", (val) =>
        val.match(/^[0-9]+$/)
      ),
      required: helpers.withMessage("To pole nie może być puste", required),
      minLength: helpers.withMessage(
        `To pole nie może być krótsze niż 9 znaków`,
        minLength(9)
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
const loading = ref(false);

const input_info = ref("");
const onCancel = async () => {
  loading.value = true;

  try {
    console.log(localUser.localUser.sid, formData.phone);
    const response = await $fetch("/api/cancel/", {
      method: "POST",
      body: {
        phone: formData.phone,
        sid: localUser.localUser.sid,
      },
    });

    localUser.setLocalUser(response);
  } catch (e) {
    input_info.value = `Sprawdź wprowadzone dane. Jeśli wprowadzony numer jest prawidłowy, ale nie możesz zrezygnować z subskrypcji, użyj przycisku`;
    setTimeout(() => {
      input_info.value = "";
    }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <NuxtLayout>
    <div class="min-h-svh bg-bg-main py-16">
      <h1
        class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-dark-grey backdrop-blur-lg bg-opacity-60 max-[820px]:pt-[42px]"
      >
        Anulowanie subskrypcji
      </h1>

      <div class="flex justify-center items-center min h-full py-8">
        <div
          class="flex flex-col items-center w-1/2 max-[822px]:min-w-full bg-bg-primary backdrop-blur-lg p-4 rounded-base justify-center pt-4 gap-6 max-[822px]:pt-4 px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4"
        >
          <p
            class="text-base text-center w-full text-dark-grey px-4 py-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[12px] max-[822px]:px-2"
          >
            Rezygnacja z subskrypcji usługi oznacza utratę możliwości
            otrzymywania nadzwyczajnych usług. Nie będziesz mógł otrzymywać
            niezaplanowanych usług od wielu pożyczkodawców, nie będziesz mógł
            dowiedzieć się o nowych usługach naszych partnerów i nie będziesz
            mógł automatycznie wysyłać swoich danych do MIF.
          </p>
          <span
            class="text-[14px] min-h-16 flex items-center justify-center font-bold text-center rounded-md text-red-500"
            >{{ input_info }}</span
          >
          <register-input-wrapper class="min-w-full">
            <registerinput
              :placeholder="'Numer komórkowy'"
              :id="'phone'"
              :tel="true"
              :pattern="/^[0-9]+$/"
              :maxLength="9"
              :input_mode="'numeric'"
              :value="formData.phone"
              :disabled="
                !localUser.isAuth ||
                (localUser.isAuth && !localUser.localUser.subscription) ||
                loading
              "
              @onValue="onInputFieldChange"
              @onFormTouched="formTouched"
              :errors="$v?.phone?.$errors[0]"
            ></registerinput>
          </register-input-wrapper>

          <p
            v-if="!localUser.isAuth"
            class="text-[12px] text-center w-full text-red-500 px-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[12px] max-[822px]:px-1"
          >
            Aby skorzystać z formularza, musisz mieć aktywną subskrypcję,
            zalogować się do swojej i powrócić do tej strony. Następnie przycisk
            stanie się aktywny i będzie można wprowadzić numer telefonu, na
            który konto zostało zarejestrowane. zarejestrowane konto
          </p>

          <div
            class="w-full flex flex-col items-center bg-opacity-60 shadow-xl rounded-b-md"
          >
            <Button
              class="min-w-full"
              v-if="localUser.isAuth && localUser.localUser.subscription"
              :disabled="
                !localUser.isAuth ||
                loading ||
                $v?.phone?.$errors[0] ||
                formData.phone.length < 10
              "
              :color="'bg-blue-400'"
              :hover="'hover:bg-blue-600'"
              :hoverText="'hover:text-white'"
              :text="'text-white'"
              @click="onCancel"
            >
              <span
                class="flex items-center justify-center w-full gap-2 mx-auto"
                >{{ loading ? "Trwa przetwarzanie danych" : "Anuluj subskrypcję" }}
                <span
                  name="loader"
                  v-if="loading"
                  class="loader border-2 w-4 h-4 bt-2 border-t-white border-slate-300 rounded-full"
                >
                </span>
              </span>
            </Button>

            <Button
              class="min-w-full"
              v-if="localUser.isAuth && !localUser.localUser.subscription"
              :disabled="true"
              :color="'bg-red-500'"
              :text="'text-white'"
            >
              Usługa jest wyłączona
            </Button>

            <p
              class="text-xs text-center w-full text-dark-grey px-4 py-2 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              W przypadku nieprawidłowego działania formularza lub innych
              trudności
            </p>

            <NuxtLink class="w-full">
              <Button class="min-w-full" :hover-text="'text-white'">Napisz do nas</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.with-bg-12 {
  background: url("../assets/cancel.webp");
}
</style>
