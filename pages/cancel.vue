<template>
  <NuxtLayout>
    <div class="with-bg-12 min-h-svh">
      <h1
        class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-white backdrop-blur-lg bg-slate-700 bg-opacity-60 max-[820px]:pt-[42px]"
      >
        Отказ от подписки
      </h1>

      <div class="flex justify-center items-center min h-full  ">
        <div
          class="flex flex-col items-center w-1/2 max-[822px]:min-w-full  bg-slate-700 bg-opacity-60 p-4 rounded-b-md justify-center pt-4 gap-16 max-[822px]:pt-4 px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4"
        >
          <p
          class="text-base text-center w-full text-slate-200 px-4 py-2 bg-slate-700 transition-all bg-opacity-0 duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[12px] max-[822px]:px-2"
        >
          Отписавшись от услуг сервиса вы потеряете возможность внеочерёдного обслуживания у ряда кредиторов, возможности узнавать о новых услугах наших партнеров, а также не сможете автоматически отправлять ваши анкетные данные МФО.
        </p>
          <register-input-wrapper class="min-w-full">
            <registerinput></registerinput>
            <registerinput></registerinput>
          </register-input-wrapper>

          <div class="w-full flex flex-col items-center bg-opacity-60 shadow-xl rounded-b-md">
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
    background: url('../assets/cancel.jpeg') center center / cover fixed;
}
</style>