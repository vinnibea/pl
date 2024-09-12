<script setup>
const contacts = {
  company: "ТОО MONEYDEAL КЗ",
  BIN: "221140056789",
  address: {
    country: "Казахстан",
    city: "Нур-Султан",
    district: "район Байконур",
    street: "улица Абая",
    house: "дом 12",
    apartment: "кв. 34",
  },
  phone: "+77273145678",
  email: "experts@moneydeal.pro",
};
</script>

<template>
  <NuxtLayout>
    <div class="with-bg-3 min-h-svh">
      <h1
        class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-white backdrop-blur-lg bg-slate-700 bg-opacity-60 max-[820px]:pt-[42px]"
      >
        Контакты
      </h1>
      <div
        class="flex justify-between items-start pt-4 max-h-full  gap-16 w-full max-[822px]:pt-4  px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4 cursor-pointer relative"
      >
        <div
          class="flex flex-col justify-stretch w-1/2 bg-opacity-60 max-[822px]:w-full"
        >
          <div
            class="flex group flex-col min-w-full items-start bg-opacity-60 shadow-2xl text-4xl font-semibold rounded-md text-white transition-all cursor-pointer max-[1024px]:px-2 max-[820px]:px-0 bg-slate-900"
          >
            <div
              class="flex items-center min-w-full gap-2 px-1 rounded-t-md bg-opacity-60 max-[822px]:gap-0 bg-slate-800 max-[822px]:py-1 max-[822px]:px-1"
            >
              <span
                class="rounded-full transition-transform duration-500 min-h-24 min-w-24 max-[822px]:border-2 max-[822px]:max-h-4 max-[822px]:max-w-4 bg-slate-900 border-2 border-yellow flex items-center justify-center"
              >
                <span
                  class="rounded-full text-xl font-bold group-hover:bg-white group-hover:text-3xl transition-all duration-500 group-hover:text-slate-900 h-20 w-20 flex items-center justify-center"
                  >M</span
                >
              </span>

              <h3
                class="font-semibold pl-4 py-2 text-2xl max-[476px]:text-[18px] drop-shadow-md text-amber-300 text-center"
              >
                {{ contacts.company }}
              </h3>
            </div>

            <p
              class="text-sm w-full px-4 py-4 xt-justify bg-slate-700 transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-amber-300 pr-2">BIN:</span>
              {{ contacts.BIN }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 text-justify bg-slate-700 transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-amber-300 pr-2">Адрес:</span>
              {{ contacts.address.country }}, {{ contacts.address.city }},
              {{ contacts.address.district }}, {{ contacts.address.house }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 text-justify bg-slate-700 transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-amber-300 pr-2">Телефон:</span>
              {{ contacts.phone }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 rounded-b-md text-justify bg-slate-700 bg-opacity-60 backdrop-blur-lg transition-all duration-300 max-[822px]:group-hover:text-white max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <NuxtLink :to="`mailto:${contacts.email}`">
                <span class="uppercase text-amber-300 pr-2">Почта:</span>
                {{ contacts.email }}</NuxtLink
              >
            </p>
          </div>
   
        <div class="flex justify-center w-full py-16 max-[822px]:hidden">
          <NuxtLink>
            <Button class="min-w-full">Напишите нам</Button>
        </NuxtLink>
      </div>
        </div>
        <Calculator class="max-[1024px]:hidden"></Calculator>
      </div>
      <div
        class="w-2/3 max-[822px]:w-full mx-auto max-[822px]:mx-0 max-[822px]:px-2 pt-32 pb-16 max-[822px]:pt-8"
      >
        <div class="p-2 min-[822px]:hidden">
          <NuxtLink><Button>Напишите нам</Button></NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>

.with-bg-3{
  background: url('../assets/contacts.webp')  center / cover;
}

</style>
