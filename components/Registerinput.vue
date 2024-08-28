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
  }
});
const emit = defineEmits(["onValue", "onFormTouched"]);
const onInputChange = (val, field) => {
    if(field === 'valid_until' && val.length === 2) {
        emit("onValue", val + '/', field);
        return;
    }
    if(field === 'valid_until' && val.length === 3) {
        console.log(field, val)
        emit("onValue", val.replace('/', ''), field);
        return;
    }
 
    if(field === 'card') {
        emit("onValue", val, field);
        return;
    }

    
  emit("onValue", val, field);
};
</script>
<template>
  <div class="flex flex-col justify-stretch w-full">
    <div class="relative w-full max-[822px]:w-full px-0 py-0 group">
      <Icon
        v-if="!tel"
        class="absolute left-2 top-1/2 -translate-y-1/2 text-md text-slate-200 bg-slate-300 min-h-6 min-w-6"
       
        :name="icon"
      ></Icon>
      <span
        v-else
        class="absolute left-2 top-1/2 -translate-y-1/2 text-md font-bold text-slate-300"
        >+7</span
      >

      <input
        :id="id"
        :type="type"
        :value="value"
        @input="(e) => {
            
            onInputChange(e.target.value, id)
        }"
        @blur="emit('onFormTouched', id)"
        :maxlength="maxLength"
        class="peer px-12 py-2 w-full bg-slate-250 border rounded-md focus:outline-0 bg-slate-50 focus:bg-slate-100 text-slate-700 font-medium placeholder:opacity-0 max-[822px]:text-sm  max-[822px]:px-12" :class="[{
            'border-red-200': value && errors.$message,
            'border-red-200': errors.$message,
            'border-neutral-200': !value && !errors.$message,
            'border-green-500': value && !errors.$message
        }]"
        :placeholder="placeholder"
      />
     
      <Icon
      v-if="value && !errors.$message"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-md text-green-500 min-h-6 min-w-6"
      name="mdi:checkbox-marked-circle-outline"
    ></Icon>
      <label
        :for="id"
        class="absolute top-1/2 font-medium -translate-y-1/2 transition-all duration-500 peer-focus:-translate-y-[42px] max-[822px]:text-[10px] max-[822px]:font-bold max-[822px]:uppercase max-[822px]:peer-focus:-translate-y-[32px] "
        :class="[
          {
            '-translate-y-[42px]': value,
             'max-[822px]:-translate-y-[32px]': value,
            'left-0': value,
            'left-12': !value,
            'peer-focus:left-0': !value,
            'text-slate-300': !value,
            'peer-focus:text-slate-600': !value,
            'text-slate-600': value && !errors.$message,
            'max-[822px]:-text-[12px]': true, 
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
