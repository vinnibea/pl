<script setup>
import { format } from "date-fns";
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Registerinput from "~/components/Registerinput.vue";
const steps = [
  "Информация о клиенте",
  "Обработка данных",
  "Прикрепление платежной карты",
  "Завершение регистрации",
];


const icons = {
    profile: 'mdi:account-circle',
    profile_empty: 'mdi:account-circle-outline',
    email: 'mdi:email-open-multiple-outline',
    city: 'mdi:home-silo-outline',
    index: 'mdi:format-list-numbered',
    password: 'mdi:form-textbox-password',
    password_confirm: 'mdi:repeat'
}

const formData = reactive({
    name: '',
    surname: '',
    city: '',
    index: '',
    email: '',
    password: '',
    password_confirm: '',
    phone: '',
    accept: false,
    
})
 const confirm = ref(false);

 const onFormConfirm = () => {
    confirm.value = true;
 }
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      email: helpers.withMessage('Неверный формат электронной почты', email),
    },
    password: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage('Пароль не может быть короче 6 символов',minLength(6)),
    },
    city: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage(`Это поле не может быть короче трех символов`, minLength(3)
      ),
    },
    index: {
      number: helpers.withMessage('Допустимы только числовые значения', (val) => val.match(/^[0-9]+$/)),
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage(`Это поле не может быть короче шести символов`, minLength(6)),
     
    },
    phone: {
      number: helpers.withMessage('Допустимы только числовые значения', (val) => val.match(/^[0-9]+$/)),
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage(`Это поле не может быть короче 10 символов`, minLength(10)),
      
    },
    name: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage(`Это поле не может быть короче двух символов`, minLength(2)
)
    },
   surname: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      minLength: helpers.withMessage(`Это поле не может быть короче двух символов`, minLength(2))
    },
    accept: {
        required: helpers.withMessage('Чтобы продолжить, согласитесь с условиями сервиса', required),
        isAccceted: helpers.withMessage('Чтобы продолжить, согласитесь с условиями сервиса', (val) => val)
    },
    password_confirm: {
      required: helpers.withMessage('Это поле не может быть пустым', required),
      sameAs: helpers.withMessage('Пароли должны  совпадать', sameAs(formData.password)),
    },
  };
});


const $v = useVuelidate(rules, formData);

const onInputFieldChange = (val, field) => {
    formData[`${field}`] = val;
    
}

const formTouched = (field) => {
    $v.value[`${field}`].$touch()
    console.log($v.value.name.$errors.value)
}
</script>

<template>
  <div
    class="min-h-dvh bg-white flex flex-col gap-4 py-4 px-48 max-[822px]:px-2 max-[822px]:pt-4"
  >
    <div
      class="min-w-full py-2 flex justify-center gap-8 uppercase text-sm font-medium max-[822px]:pt-12 max-[822px]:gap-0"
    >
      <div
        v-for="(step, i) in steps"
        :key="step"
        class="flex items-center gap-6"
        :class="{
          'text-slate-500': i !== 0,
          'text-slate-900': i === 0,
          'max-[822px]:hidden': i !== 0,
        }"
      >
        <div class="flex items-center gap-4 max-[822px]:gap-1">
          <span
            class="cursor-pointer rounded-full max-[822px]:group-hover:scale-100 border-4 transition-transform duration-500 min-w-8 min-h-8 max-[1024px]:max-h-14 max-[1024px]:min-w-8 max-[822px]:border-2 max-[822px]:min-h-6 max-[822px]:min-w-6 bg-slate-900 flex items-center justify-center"
            :class="{
              'border-yellow': i === 0,
              'border-slate-400': i !== 0,
              'opacity-50': i !== 0,
              'bg-slate-900': i !== 0,
              'bg-white': i === 0,
            }"
          >
            <span
              class="rounded-full transition-all font-bold duration-500 h-4 w-4 max-[1024px]:text-smmax-[1024px]:h-6 max-[1024px]:w-6 max-[822px]:max-h-4 max-[822px]:max-w-4 max-[822px]:text-xs flex items-center justify-center"
              :class="{
                'text-slate': i === 0,
              }"
              >{{ i + 1 }}</span
            >
          </span>
          <h5
            class="-yellow text-xs"
            :class="{
              'text-yellow': i === 0,
              'text-slate-400': i !== 0,
              'opacity-50': i !== 0,
            }"
          >
            {{ step }}
          </h5>
        </div>
      </div>
    </div>

    <div
      class="flex-col  items-center justify-center min-w-full bg-white  mx-auto px-2 py-2 rounded-lg gap-2 
      max-[822px]:flex-col
      max-[822px]:gap-0
      max-[822px]:py-0
      max-[822px]:rounded-xs max-[822px]:w-full shadow-sm"
      
    >   
      <form class="flex bg-white flex-col w-full gap-10 max-[822px]:gap-8 py-4 max-[822px]:py-2" v-if="!confirm">
        <register-input-wrapper>
            <!-- {{ $v.$errors }} -->
           <Registerinput :placeholder="'Имя'" :id="'name'" :value="formData.name" :icon="icons.profile" @onValue="onInputFieldChange" @onFormTouched="formTouched" :errors="$v?.name?.$errors[0]" ></Registerinput>
           <Registerinput :placeholder="'Фамилия'" :value="formData.surname" @onValue="onInputFieldChange" :id="'surname'" @onFormTouched="formTouched" :errors="$v?.surname?.$errors[0]" :icon="icons.profile_empty"></Registerinput>
        </register-input-wrapper>
        <register-input-wrapper>
            <Registerinput :placeholder="'Мобильный номер'" :value="formData.phone" @onValue="onInputFieldChange" :id="'phone'" @onFormTouched="formTouched" :errors="$v?.phone?.$errors[0]" :tel="true"></Registerinput>
            <Registerinput :placeholder="'Email'" type="email" :id="'email'" :value="formData.email" @onValue="onInputFieldChange" @onFormTouched="formTouched" :errors="$v?.email?.$errors[0]" :icon="icons.email"></Registerinput>
        </register-input-wrapper>

        <register-input-wrapper>
            <Registerinput :placeholder="'Город'" :icon="icons.city" :value="formData.city" @onValue="onInputFieldChange" :id="'city'" @onFormTouched="formTouched" :errors="$v?.city?.$errors[0]"></Registerinput>
            <Registerinput :placeholder="'Почтовый индекс'" type="text" :id="'index'" :value="formData.index" @onValue="onInputFieldChange" :icon="icons.index" @onFormTouched="formTouched" :errors="$v?.index?.$errors[0]"></Registerinput>
        </register-input-wrapper>
        <register-input-wrapper>
            <Registerinput :placeholder="'Пароль'" :type="'password'" :value="formData.password" @onValue="onInputFieldChange" :id="'password'" :icon="icons.password"  @onFormTouched="formTouched" :errors="$v?.password?.$errors[0]"></Registerinput>
            <Registerinput :placeholder="'Повторите пароль'" :type="'password'" :value="formData.password_confirm" @onValue="onInputFieldChange" :id="'password_confirm'" :icon="icons.password_confirm" @onFormTouched="formTouched" :errors="$v?.password_confirm?.$errors[0]"></Registerinput>
        </register-input-wrapper>
       
       
        <div class="flex justify-center items-start gap-4 w-full">
            <div class="flex justify-center w-1/2 gap-4 items-start max-[822px]:w-full">
                <input type="checkbox" class="px-2 py-2 rounded-full"  v-model="formData.accept"/>
                <p class="text-xs">Я даю согласие на обработку моих персональных данных и получение рекламной информации, а также соглашаюсь на хранение политики конфиденциальности моих персональных данных. </p>
            </div>
        </div>
        <Button class="mx-auto" @click.prevent="onFormConfirm" :disabled="$v.$invalid">Отправить анкету</Button>
      </form>
      <h3 v-else class="text-center text-3xl font-bold ">ПЕРЕМОГА</h3>
    </div>
    
  </div>
</template>
