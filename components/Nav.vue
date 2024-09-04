<script setup>
defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <nav
    class="flex items-center flex-col  max-[822px]:relative max-[822px]:z-50"
    :class="[
      {
        'max-[822px]:hidden': !isMobile,
        'py-12': isMobile,
        'max-[822px]:min-w-full': isMobile,
      },
    ]"
  >
    <ul
      class="flex min-h-[32px] gap-14 max-[1224px]:gap-4 max-[822px]:gap-12 font-medium text-base"
      :class="[
        {
          'flex-col': isMobile,
          'py-12': isMobile,
          'text-2xl': isMobile,
          uppercase: isMobile,
          'max-[1024px]:text-xs': !isMobile,
          'items-start': isMobile,
          'items-center': !isMobile,
          'text-white': isMobile,
          'text-navbar-passive': !isMobile,
        },
      ]"
    >
      <li
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="#req"
          class="py-4 px-4 transition-all max-[822px]:font-bold max-[1224px]:px-2 border-transparent min-[822px]:border-b-2 min-[822px]:hover:border-slate-900"
        >
          Требования к заказчику
        </NuxtLink>
      </li>

      <li
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="/"
          class="py-4 px-4 transition-all max-[1224px]:px-2 max-[822px]:font-bold min-[822px]:border-b-2 border-transparent min-[822px]:hover:border-slate-900"
        >
          Получение кредита
        </NuxtLink>
      </li>
      <li
        :class="[
          {
            'min-w-full text-center py-4': isMobile,
          },
        ]"
      >
        <NuxtLink
          to="/"
          class="py-4 px-4 transition-all max-[822px]:font-bold max-[1224px]:px-2 border-transparent min-[822px]:border-b-2 min-[822px]:hover:border-slate-900"
        >
          Как работает сервис
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
