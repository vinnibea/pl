<script setup>
const contacts = {
  company: "Sp. z o.o. GEPPETTO CONSULTING LTD",
  NIP: "5261040827",
  address: {
    country: "England",
    city: "Sheffield",
    street: "Cooper Buildings, Arundel Street",
    index: "S1 2NS",
  },
  phone: "+44 7412 581496",
  email: "experts@gotówkamax.pro",
};
</script>

<template>
  <NuxtLayout>
    <div class="min-h-svh py-16">
      <h1
        class="w-full text-center text-3xl max-[822px]:text-2xl font-bold uppercase text-dark-grey bg-opacity-60 max-[820px]:pt-[42px]"
      >
      Kontakty
      </h1>
      <div
        class="flex justify-between items-start pt-4 max-h-full  gap-16 w-full max-[822px]:pt-4  px-4 max-[820px]:py-4 max-[820px]:px-2 max-[820px]:gap-4 cursor-pointer relative"
      >
        <div
          class="flex flex-col justify-stretch w-1/2 bg-opacity-60 max-[822px]:w-full"
        >
          <div
            class="bg-bg-primary flex group flex-col min-w-full items-start shadow-2xl text-4xl font-semibold rounded-base text-dark-grey transition-all cursor-pointer max-[1024px]:px-2 max-[820px]:px-0"
          >
            <div
              class="flex items-center min-w-full gap-2 px-1 rounded-t-md bg-opacity-60 max-[822px]:gap-0 max-[822px]:py-1 max-[822px]:px-1"
            >
              <span
                class="rounded-base transition-transform duration-500 min-h-24 min-w-24 max-[822px]:border-2 max-[822px]:max-h-4 max-[822px]:max-w-4 border-4 border-dark-grey group-hover:border-button-primary flex items-center justify-center"
              >
                <span
                  class="rounded-base text-xl font-bold group-hover:bg-white group-hover:text-3xl transition-all duration-500 group-hover:text-button-primary h-20 w-20 flex items-center justify-center"
                  >GM</span
                >
              </span>

              <h3
                class="font-bold uppercase pl-4 py-2 text-2xl max-[476px]:text-[18px] drop-shadow-md text-button-primary text-center"
              >
              <span class="text-base font-bold text-dark-grey">Gotówka</span>Max.<span class="uppercase text-base font-bold text-dark-grey">eu</span>
              </h3>
            </div>

            <p
              class="text-sm w-full px-4 py-4 xt-justify bg-bg-main transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-button-primary max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-button-primary pr-2">NIP:</span>
              {{ contacts.NIP }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 text-justify bg-bg-main transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-button-primary max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-button-primary pr-2">Adres:</span>
              {{ contacts.address.country }}, {{ contacts.address.city }}, 
              {{ contacts.address.street }}, {{ contacts.address.index }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 text-justify bg-bg-main transition-all bg-opacity-60 backdrop-blur-lg duration-300 max-[822px]:group-hover:text-button-primary max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <span class="uppercase text-button-primary pr-2">Tel.:</span>
              {{ contacts.phone }}
            </p>
            <p
              class="text-sm w-full px-4 py-4 rounded-base text-justify bg-bg-main backdrop-blur-lg transition-all duration-300 max-[822px]:group-hover:text-button-primary max-[822px]:text-[10px] max-[822px]:px-2"
            >
              <NuxtLink :to="`mailto:${contacts.email}`">
                <span class="uppercase text-button-primary pr-2">Email:</span>
                {{ contacts.email }}</NuxtLink
              >
            </p>
          </div>
   
        <div class="flex justify-center w-full py-16 max-[822px]:hidden">
          <NuxtLink>
            <Button class="min-w-full">Napisz do nas</Button>
        </NuxtLink>
      </div>
        </div>
        <Calculator class="max-[1024px]:hidden"></Calculator>
      </div>
      <div
        class="w-2/3 max-[822px]:w-full mx-auto max-[822px]:mx-0 max-[822px]:px-2 pt-32 pb-16 max-[822px]:pt-8"
      >
        <div class="p-2 min-[822px]:hidden">
          <NuxtLink><Button :hover-text="'text-white'">Napisz do nas</Button></NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
