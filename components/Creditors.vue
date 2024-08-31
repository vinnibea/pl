<template>
   <div class="flex flex-wrap max-[822px]:flex-col gap-8 mx-auto">
      <div v-for="i in 44" :key="i" class="w-1/5 max-[1024px]:w-full flex flex-col justify-between  gap-4 bg-slate-300 p-2 rounded-md">
          <div class="flex items-start w-full">
            <div class="min-w-24 h-24 bg-gray-500 rounded-md"></div>
             <div class="flex flex-col justify-center w-full">
                <h3 class="text-left px-2 font-semibold">Title</h3>
                <p class="text-left px-2 text-xs">Subtitle</p>
             </div>
          </div>
          <div class="flex flex-col gap-2">
            <Button>Выслать анкету</Button>
            <Button>Перейти на сайт</Button>
          </div>
      </div>
   </div>

</template>