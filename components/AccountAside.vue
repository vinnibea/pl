<script setup>

import { useAccountStore } from '~/stores/accountStore';
const asideStore = useAccountStore();
const menuItems = [{
    title: 'Информация об аккаунтe',
    icon: 'material-symbols:account-balance',
},

{
    title: 'Мои кредиторы',
    icon: 'material-symbols:credit-card',
},
{
    title: 'Управление подписками',
    icon: 'material-symbols:subtitles',
},
{
    title: 'Настройки',
    icon: 'material-symbols:settings',
},
]


</script>

<template>
    <aside class="w-1/3  flex flex-col min-h-[calc(100svh)] fixed py-16 justify-between bg-slate-900 items-center max-[822px]:px-0 gap-4 " :class="[
        {'bg-slate-900': asideStore.selectedSection !== null,
         'max-[822px]:w-full ': asideStore.selectedSection === null,
         'max-[822px]:items-center ': asideStore.selectedSection === null,
         'max-[822px]:items-center ': asideStore.selectedSection !== null,
         'max-[822px]:w-fit ': asideStore.selectedSection !== null,
    }
    ]" >
        <ul class="flex flex-col w-full z-0 bg-slate-900 max-[822px]:items-center gap-8 text-white px-4 max-[822px]:px-1  max-[822px]:gap-8 text-base" :class="[
            {'bg-slate-900': asideStore.selectedSection !== null,
         
             'max-[822px]:items-center ': asideStore.selectedSection === null,
             'max-[822px]:items-start ': asideStore.selectedSection !== null,
             'max-[822px]:w-fit ': asideStore.selectedSection !== null,
        }
        ]">
            <li class="w-full flex items-center gap-2 max-[822px]:justify-between p-4  max-[822px]:border-none max-[822px]:text-sm cursor-pointer transition-all duration-300" v-for="(item, i) in menuItems" :key="item.icon" :class="[
                {
                 'text-amber-300': i === asideStore.selectedSection,
                 'w-fit': i === asideStore.selectedSection && asideStore.isMobile,
                 'bg-slate-600': i === asideStore.selectedSection,
                 'rounded-md': i === asideStore.selectedSection,
             }
            ]"
             @click="asideStore.setSelectedSection(i)">
        
       
                <Icon :name="item.icon" class="min-h-8 min-w-8 max-[822px]:min-w-6"> </Icon> 
                <span class="w-2/3 flex justify-start pl-1 max-[822px]:hidden">{{ item.title }}</span>
                <span class="w-2/3 flex justify-start pl-1 min-[822px]:hidden" v-if="asideStore.isMobile && asideStore.selectedSection == null">{{ item.title }} </span>
                <Icon name="mdi:arrow-right-thick" class="min-[882px]:hidden" v-if="asideStore.selectedSection == null && asideStore.isMobile "></Icon>
            </li>    
            <div class="flex justify-center w-full px-4 pt-4 max-[822px]:px-1 " >
                <Button v-if="!asideStore.isMobile || (asideStore.isMobile && asideStore.selectedSection === null)" :color="'bg-yellow'" :text="'text-neutral-600'" class="text-sm normal-nums">Выход</Button>
                <Icon v-else name="material-symbols:exit-to-app-rounded" size="24" class="mx-auto bg-red-900"></Icon>
            </div>
        </ul>
        
       
    </aside>
</template>