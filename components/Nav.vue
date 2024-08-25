<script setup>
defineProps({
    isMobile: {
        type: Boolean,
        default: false,
    }
})

</script>

<template>
    <nav class="flex items-center flex-col" :class="[{
        'max-[820px]:hidden': !isMobile,
        'py-12': isMobile,
        
    }]">
        <ul class="flex gap-14 max-[1024px]:gap-12 font-medium  text-base" :class="[{
            'flex-col': isMobile,
            'py-12': isMobile,
            'text-2xl': isMobile,
            'uppercase':isMobile,
            'max-[1024px]:text-xs': !isMobile,
            'items-start': isMobile,
            'items-center': !isMobile,
            'text-black': isMobile,
            'text-navbar-passive': !isMobile,
           
        }]">
          <li class="hover:text-black">
          <NuxtLink to="#req" class="py-4 px-4 hover:border-b-2  max-[1024px]:px-2  border-black"> 
            Требования к заказчику
          </NuxtLink>
        </li>
  
          <li class="hover:text-black transition-all">
            <NuxtLink to="/" class="py-4 px-4 hover:border-b-2 max-[1024px]:px-2 border-black"> 
              Получение кредита
            </NuxtLink>
          </li>
          <li class="hover:text-black transition-all">
            <NuxtLink to="/" class="py-4 px-4 hover:border-b-2 max-[1024px]:px-2 border-black"> 
              Как работает сервис
            </NuxtLink>
           </li>
        </ul>
      </nav>
</template>