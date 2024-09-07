<script setup>
const { data, status, error, refresh, clear } = await useFetch('/api/creditors')
</script>
<template>
  <div class="bg-slate-50 flex flex-col justify-between min-h-svh w-full">
    <div class="w-full flex flex-col items-center text-center max-[822px]:items-stretch">
      <div class="pb-4">
        <h2 class="text-green-500 text-[14px] font-semibold uppercase">
            Регистрация завершена
          </h2>
          <p class="font-semibold">Теперь Вы можете воспользоваться услугами одного из следующих кредиторов</p>
      </div>
      <Creditors :shortData="data"></Creditors>
    </div>

    <div class="flex flex-col text-[12px] items-center gap-4 text-center py-4">
      <p >
        Инструкции по получению кредита, а также полный список доступых Вам кредиторов, будет доставлено
        на вашу почту в ближайшее время
      </p>
      <NuxtLink
        to="/"
        class="w-full flex justify-center text-center text-xs uppercase underline font-medium text-slate-300"
      >
        <span> Вернуться на главную </span>
      </NuxtLink>
    </div>
  </div>
</template>
