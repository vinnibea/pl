<script setup>
import { useAccountStore } from "~/stores/accountStore";
import { useLocalUserStore } from "~/stores/localStore";
const asideStore = useAccountStore();
const localUser = useLocalUserStore();
const menuItems = [
  {
    title: "Informacje o koncie",
    icon: "material-symbols-light:account-circle",
  },

  {
    title: "Moi kredytodawcy",
    icon: "material-symbols:credit-card",
  },
];

const logout = () => {
    $fetch('/api/logout').then(res => {
        if(res.statusCode === 301) {
           localUser.setLocalUser();
           return navigateTo('/')
        }
    }).catch(error => {
        console.warn(error)
    })
}
</script>

<template>
  <aside
    class="w-[420px] flex flex-col min-h-[calc(100svh)] fixed py-16 max-[1224px]:py-16 justify-between bg-white items-center max-[822px]:px-0 gap-4"
    :class="[
      {
        'bg-slate-900': asideStore.selectedSection !== null,
        'max-[822px]:w-full ': asideStore.selectedSection === null,
        'max-[822px]:items-center ': asideStore.selectedSection === null,
        'max-[822px]:items-center ': asideStore.selectedSection !== null,
        'max-[822px]:w-fit ': asideStore.selectedSection !== null,
      },
    ]"
  >
    <ul
      class="flex flex-col w-full z-0 max-[822px]:items-center gap-14 text-white px-1 max-[822px]:px-1 max-[822px]:gap-8 text-base"
      :class="[
        {
          'bg-white': asideStore.selectedSection !== null,

          'max-[822px]:items-center ': asideStore.selectedSection === null,
          'max-[822px]:items-start ': asideStore.selectedSection !== null,
          'max-[822px]:w-fit ': asideStore.selectedSection !== null,
        },
      ]"
    >
      <li
        class="w-full flex items-center gap-8 max-[822px]:justify-between font-medium p-4 text-dark-grey max-[822px]:border-none max-[822px]:text-sm cursor-pointer transition-all duration-300"
        v-for="(item, i) in menuItems"
        :key="item.icon"
        :class="[
          {
            'text-button-primary': i === asideStore.selectedSection,
            'w-fit': i === asideStore.selectedSection && asideStore.isMobile,
            'bg-bg-main': i === asideStore.selectedSection,
            'rounded-base': i === asideStore.selectedSection,
            'max-[822px]:font-semibold': true,
          },
        ]"
        @click="asideStore.setSelectedSection(i)"
      >
        <UIcon
          :name="item.icon"
          class="min-h-8 min-w-8 max-[822px]:min-w-6"
          :class="[
            {
              'bg-button-primary': asideStore.selectedSection === i,
            },
          ]"
          dynamic
        >
        </UIcon>
        <span class="w-2/3 flex justify-start pl-1 max-[822px]:hidden">{{
          item.title
        }}</span>
        <span
          class="w-2/3 flex justify-start pl-1 min-[822px]:hidden"
          v-if="asideStore.isMobile && asideStore.selectedSection == null"
          >{{ item.title }}
        </span>
        <UIcon
          name="mdi:arrow-right-thick"
          class="min-[882px]:hidden"
          v-if="asideStore.selectedSection == null && asideStore.isMobile"
          dynamic
        ></UIcon>
      </li>
    </ul>
    <div class="flex justify-center min-w-full px-4 max-[822px]:px-1">
      <Button
        v-if="
          !asideStore.isMobile ||
          (asideStore.isMobile && asideStore.selectedSection === null)
        "
        @click="logout"
        :text="'text-white'"
        class="text-sm normal-nums min-w-full uppercase"
        >wyjście</Button
      >
      
      <UIcon
        v-else
        name="material-symbols:exit-to-app"
        size="32"
        class="mx-auto bg-button-primary min-[822px]:hidden"
        @click="logout"
        dynamic
      ></UIcon>
    </div>
  </aside>
</template>
