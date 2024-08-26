<script setup>
import RegisterStepOne from "~/components/RegisterStepOne.vue";
import RegisterStepTwo from "~/components/RegisterStepTwo.vue";
import { useMobileStore } from "~/stores/MobileMenu.js";
import { useRegisterStore } from "~/stores/RegisterStore.js";
import { useLocalUserStore } from "~/stores/localStore.js";

const store = useMobileStore();
const registerStore = useRegisterStore();
const localStore = useLocalUserStore();
const steps = [
  "Информация o клиенте",
  "Прикрепление платежной карты",
  "Завершение регистрации",
];

const components = [RegisterStepOne, RegisterStepTwo];

onMounted(async () => {
  await localStore.setLocalUser(JSON.parse(localStorage.getItem("user")));
});
</script>

<template>
  <div
    class="min-h-dvh bg-slate-800 flex flex-col gap-4 py-4 px-48 mx-8 max-[822px]:px-0 max-[822px]:pt-4 shadow-lg rounded-md my-8 max-[822px]:my-0 max-[822px]:mx-1 max-[822px]:bg-slate-900"
  >
    <div
      class="min-w-full py-0 flex justify-between max-[822px]:justify-center px-2 gap-8 uppercase text-sm font-medium max-[822px]:pt-12 max-[822px]:gap-0"
    >
      <div
        v-for="(step, i) in steps"
        :key="step"
        class="flex items-center gap-6"
        :class="{
          'text-slate-500': i !== 0,
          'text-slate-yellow': i === registerStore.activeTab,
          'max-[822px]:hidden': i !== registerStore.activeTab,
        }"
      >
        <div class="flex items-center gap-4 max-[822px]:gap-0">
          <span
            class="pointer-events-none rounded-full max-[822px]:group-hover:scale-100 border-4 transition-transform duration-500 min-w-8 min-h-8 max-[1024px]:max-h-14 max-[1024px]:min-w-8 max-[822px]:border-2 max-[822px]:min-h-2 max-[822px]:min-w-6 max-[822px]:hidden bg-slate-900 flex items-center justify-center"
            :class="{
              'border-yellow': i === registerStore.activeTab,
              'border-green-500': i < registerStore.activeTab,
              'border-slate-400': i !== registerStore.activeTab,
              'opacity-50': i > registerStore.activeTab,
              'bg-slate-900': i > 0,
              'bg-white': i === registerStore.activeTab,
            }"
          >
            <span
              class="rounded-full transition-all font-bold duration-500 h-4 w-4 max-[1024px]:text-sm max-[1024px]:h-6 max-[1024px]:w-6 max-[822px]:max-h-4 max-[822px]:max-w-4 max-[822px]:text-xs flex items-center justify-center"
              :class="{
                'text-slate': i === 0,
              }"
            >
              <span v-if="registerStore.activeTab <= i"
                >{{ i + 1 }} {{ localStore.user }}</span
              >
              <Icon v-else class="bg-green-500" name="mdi:check-bold"></Icon>
            </span>
          </span>
          <h5
            class="text-xs max-[822px]:text-xs max-[822px]:hidden"
            :class="{
              'text-yellow': i === registerStore.activeTab,
              'text-green-500': i < registerStore.activeTab,
              'text-slate-400': i > registerStore.activeTab,
              'opacity-50': i > registerStore.activeTab,
            }"
          >
            {{ steps[i] }}
          </h5>
          <h5
            class="min-[822px]:hidden text-xs"
            :class="{
              'text-yellow': i === registerStore.activeTab,
              'text-green-500': i < registerStore.activeTab,
              'text-slate-400': i > registerStore.activeTab,
              'opacity-50': i > registerStore.activeTab,
            }"
          >
            {{ steps[registerStore.activeTab] }}
          </h5>
        </div>
      </div>
    </div>

    <div
      class="flex-col items-center justify-center min-w-full py-8 px-2 bg-white mx-auto rounded-lg gap-2 max-[822px]:flex-col max-[822px]:gap-0 max-[822px]:py-8 max-[822px]:px-2 max-[568px]:px-0 max-[568px]:py-4 max-[822px]:rounded-xs max-[822px]:w-full shadow-sm"
      :class="[
        {
          'max-[822px]:hidden': store.politicsOpen !== false,
          'bg-white': false,
        },
      ]"
    >
      <component
        class="py-4 px-2 rounded-lg"
        :is="components[registerStore.activeTab]"
      ></component>
    </div>
    <Politics
      v-if="store.politicsOpen !== false"
      :index="store.politicsOpen"
      class="absolute top-0 right-0 left-0"
    ></Politics>
  </div>
</template>
