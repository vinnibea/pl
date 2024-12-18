<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
    default: "mdi:eye",
  },
  tel: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: false,
    default: "default",
  },
  value: {
    type: String,
    required: false,
  },
  errors: {
    type: Object,
    default: [],
  },
  maxLength: {
    type: Number,
    default: 100,
  },
  input_mode: {
    type: String,
    default: "text",
  },
  pattern: {
    type: RegExp,
    default: /^[A-Z a-z А-Я а-я]+$/,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onValue", "onFormTouched"]);
const onInputChange = (val, field) => {
  emit("onValue", val, field);
};

const onlyNumber = ($event, field) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;

  if ($event.code === "Backspace" || keyCode === 8) {
    return onInputChange($event.target.value, field);
  }
  if (keyCode < 48 || keyCode > 57) {
    $event.preventDefault();
    return;
  }
  return onInputChange($event.target.value, field);
};

const route = useRoute();
</script>
<template>
  <div class="flex flex-col justify-stretch w-full">
    <div class="relative w-full max-[822px]:w-full px-0 py-0 group">

        <UIcon
         v-if="!tel" 
          class="absolute left-2 top-1/2 -translate-y-1/2 text-md text-slate-200 bg-slate-300 min-h-6 min-w-6"
          :name="icon"
          dynamic
        ></UIcon>
   
      <span
        v-else
        class="absolute left-2 top-1/2 -translate-y-1/2 text-md font-bold text-slate-300"
        >+48</span
      >

      <input
        :id="id"
        :type="type"
        :value="value"
        :inputmode="input_mode"
        :pattern="pattern"
        :disabled="disabled"
        @input="
          ($event) => {
            if (
              (!$event.target.value.match(/^[0-9]+$/) === props.input_mode) ===
              'numeric'
            )
              return false;
            onInputChange($event.target.value, id);
          }
        "
        @keyup="
          (e) => {
            if (
              id === 'cvc' ||
              id === 'index' ||
              id === 'valid_until' ||
              id === 'card' ||
              id === 'phone'
            ) {
              return onlyNumber(e, id);
            }
          }
        "
        @keypress="
          ($event) => {
            if (
              id === 'cvc' ||
              id === 'index' ||
              id === 'valid_until' ||
              id === 'card' ||
              id === 'phone'
            ) {
              let keyCode = $event.keyCode ? $event.keyCode : $event.which;
              if (keyCode < 48 || keyCode > 57) {
                $event.preventDefault();
                return;
              }
            }
          }
        "
        @blur="emit('onFormTouched', id)"
        :maxlength="maxLength"
        class="peer px-12 py-2 w-full bg-slate-250 border rounded-base outline-0 focus:outline-0 bg-slate-50 focus:bg-slate-100 text-slate-700 placeholder:opacity-0 max-[822px]:text-[10px] max-[822px]:focus:text-[10px] max-[822px]:focus:font-bold max-[822px]:focus:uppercase max-[822px]:uppercase max-[822px]:font-bold font-medium max-[822px]:px-12 disabled:opacity-50 disabled:pointer-events-none"
        :class="[
          {
            'border-red-200': value && errors.$message,
            'border-red-200': errors.$message,
            'border-neutral-200': !value && !errors.$message,
            'border-blue-300': value && !errors.$message,
          },
        ]"
        :placeholder="placeholder"
      />

      <UIcon
        v-if="value && !errors.$message"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-md text-blue-300 min-h-6 min-w-6"
        name="mdi:checkbox-marked-circle-outline"
        dynamic
      ></UIcon>
      <label
        :for="id"
        class="absolute top-1/2 font-medium -translate-y-1/2 transition-all duration-500 peer-focus:-translate-y-[42px] max-[822px]:text-[10px] max-[822px]:font-bold max-[822px]:uppercase max-[822px]:peer-focus:-translate-y-[32px]"
        :class="[
          {
            '-translate-y-[42px]': value,
            'max-[822px]:-translate-y-[32px]': value,
            'left-0': value,
            'left-12': !value,
            'peer-focus:left-0': !value,
            'text-slate-300': !value,
            'peer-focus:text-slate-300': !value,
            'text-blue-300': value && !errors.$message,
          },
        ]"
        >{{ placeholder }}</label
      >
    </div>
    <span class="text-rose-500 text-xs min-h-4 px-2 max-[822px]:text-[10px]">
      <span v-if="errors?.$message">*{{ errors?.$message }}</span>
    </span>
  </div>
</template>
