
<script setup>
   const route = useRoute();
 </script>

<template>
    <div
    class="fixed w-full flex items-center bottom-0 gap-24 justify-center shadow-lg min-[822px]:hidden border-t bg-white border-slate-200"
  >
  <NuxtLink to="/" class="flex items-center justify-center px-2 py-2"
  ><Icon
    class="transition-all duration-30 hover:bg-amber-300 cursor-pointer"
    name="ic:outline-other-houses"
    size="36"
    :class="[
      {
        'bg-amber-300': route.fullPath == '/',
        ' bg-slate-300': route.fullPath != '/',
      },
    ]"
  >
  </Icon>
</NuxtLink>


  <NuxtLink to='/' class="flex items-center justify-center">
    <Icon
    class="transition-all duration-300 hover:bg-amber-300 cursor-pointer px-2 py-2 bg-slate-300"
    name="material-symbols:circle-notifications-outline-rounded"
    size="36"
    
  >
    ></Icon
  >
  </NuxtLink>

   
    
    <NuxtLink to="/register" class="flex items-center justify-center px-2 py-2">
      <Icon
        class="transition-all duration-300 hover:bg-amber-300  cursor-pointer"
        name="ic:baseline-person"
        size="36"
        :class="[
          {
            'bg-amber-300': route.fullPath == '/register',
            ' bg-slate-300': route.fullPath !== '/register',
          },
        ]"
      ></Icon>
    </NuxtLink>
  </div>
</template>