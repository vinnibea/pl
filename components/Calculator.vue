<script setup>
import { format } from "date-fns";
const sum = ref(5000);
const maxSum = 500000;
const month = ref(3);
const maxMonth = 24;

const inputSumPercentage = computed(() => (sum.value / maxSum) * 100);
const inputMonthPercentage = computed(
  () => ((month.value - 3) * 100) / (maxMonth - 3)
);
const payment = computed(() => Math.ceil(sum.value / month.value));
const calculatedDate = computed(() =>
  format(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth() + Number(month.value),
      new Date(Date.now()).getDate()
    ),
    `dd.MM.yyyy`
  )
);
</script>
<template>
  <form
    class="form min-h-10 px-6 py-10 min-w-[620px] max-[520px]:px-4 max-[520px]:py-4 bg-white rounded-xl shadow-xl flex flex-col gap-8 max-[520px]:gap-2 max-[1024px]:min-w-1/2 max-[822px]:min-w-full"
  >
    <div class="flex flex-col gap-2">
      <div class="form-row flex justify-between items-center py-2">
        <h2 class="font-bold text-lg max-[1024px]:text-md text-black max-[520px]:text-sm">
          Cумма кредита:
        </h2>
        <span
          class="rounded-xl text-xs font-bold text-navbar-passive border border-yellow px-4 py-0"
          >{{ sum }} тенге</span
        >
      </div>

      <input
        type="range"
        class="min-w-full accent-yellow"
        :style="{ backgroundSize: `${inputSumPercentage}% 100%` }"
        v-model="sum"
        step="1000"
        min="5000"
        max="500000"
        @change="(e) => (sum = e.target.value)"
      />
      <div class="form-row flex justify-between items-center px-4 max-[520px]:px-2">
        <h2 class="text-xs font-semibold text-lightgrey">5 000 тенге</h2>
        <span class="text-xs font-semibold text-lightgrey">500 000 тенге</span>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="form-row flex justify-between items-center">
        <h2 class="font-bold text-lg max-[1024px]:text-md text-black max-[520px]:text-sm">
          Срок кредита:
        </h2>
        <span
          class="rounded-xl text-xs font-bold text-navbar-passive border border-yellow px-4 py-0"
          >{{ month < 3 ? 3 : month }} мес.</span
        >
      </div>

      <input
        type="range"
        class="min-w-full accent-yellow"
        :step="1"
        min="3"
        max="24"
        v-model="month"
        @input="(e) => (month = e.target.value)"
        :style="{ backgroundSize: `${inputMonthPercentage}% 100%` }"
      />

      <div class="form-row flex justify-between items-center px-4 py-0 max-[520px]:px-2">
        <h2 class="text-xs font-semibold text-lightgrey">3 месяца</h2>
        <span class="text-xs font-semibold text-lightgrey">24 месяца</span>
      </div>
    </div>

    <NuxtLink
      to="/register"
      class="uppercase px-6 text-sm py-4 font-semibold text-slate-900 text-center text-md max-[1024px]:text-xs max-[1024px]:py-4 bg-yellow rounded-md w-2/3 max-[822px]:w-full shadow-md mx-auto hover:bg-hover-yellow transition-all"
      type="button"
    >
      Получить деньги
    </NuxtLink>

    <div class="form-row flex justify-between items-center px-4 max-[822px]:px-0">
      <div class="flex flex-col items-center">
        <h3 class="text-xs font-semibold text-black">Ежемесячный платеж:</h3>
        <span class="text-xs text-yellow font-bold">{{ payment }} тенге</span>
      </div>
      <div class="flex flex-col items-center">
        <h3 class="text-xs font-semibold text-black">Дата возвращения:</h3>
        <span class="text-xs text-yellow font-bold">{{ calculatedDate }}</span>
      </div>
    </div>
  </form>
</template>

<style>
input[type="range"] {
  appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 7px;
  background: rgba(236, 236, 236, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(to right, #fae311, #fae311);
  background-repeat: no-repeat;
  cursor: grabbing;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  border: 4px solid yellow;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #ffffff;
  transition: background 0.3s ease-in-out;
  cursor: grabbing;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
