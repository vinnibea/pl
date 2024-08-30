<script setup>
import { useAuthStore } from '~/stores/authStore';
const userStore = useAuthStore();
const menuItems = [{
    title: 'Информация об аккаунтe',
    icon: 'material-symbols:account-balance',
},
{
    title: 'Мои подписки',
    icon: 'material-symbols:subtitles',
},
{
    title: 'Мои карты',
    icon: 'material-symbols:credit-card',
},
{
    title: 'Настройки',
    icon: 'material-symbols:settings',
},
]

const activeItem = ref(null);

const setActiveItem = (i) => {
    if(i === activeItem.value) {
        activeItem.value = null;
        return;
    }
    activeItem.value = i;
}
</script>

<template>
    <div class="min-h-dvh w-full flex ">
        <aside class="w-1/3  flex flex-col justify-between py-16 items-center max-[822px]:px-0 max-[822px]:w-full" :class="[
            {'bg-slate-800': activeItem !== null,
             'max-[822px]:w-full ': activeItem === null,
             'max-[822px]:items-center ': activeItem === null,
             'max-[822px]:items-center ': activeItem !== null,
             'max-[822px]:w-fit ': activeItem !== null,
        }
        ]" >
            <ul class="flex flex-col  max-[822px]:items-center gap-8 text-white pl-8 w-full  max-[822px]:px-2 max-[822px]:gap-12 text-base" :class="[
                {'bg-slate-800': activeItem !== null,
                 'max-[822px]:w-full ': activeItem === null,
                 'max-[822px]:items-center ': activeItem === null,
                 'max-[822px]:items-start ': activeItem !== null,
                 'max-[822px]:w-fit ': activeItem !== null,
            }
            ]">
                <li class="w-full flex items-center gap-2 max-[822px]:justify-between border-transparent max-[822px]:text-lg cursor-pointer transition-all duration-300" v-for="(item, i) in menuItems" :key="item.icon" :class="[
                    {'border-r-2': i === activeItem,
                     'border-amber-300': i === activeItem,
                     'max-[822px]:border-none': true,
                     'text-amber-300': i === activeItem,
                 }
                ]"
                 @click="setActiveItem(i)">
                    <Icon :name="item.icon" class="min-h-8 min-w-8 max-[822px]:min-w-6"> </Icon> 
                    <span class="w-2/3 flex justify-start pl-1" v-if="activeItem === null">{{ item.title }}</span>
                    <Icon name="mdi:arrow-right-thick" class="min-[882px]:hidden" v-if="activeItem === null"></Icon>
                </li>    
            </ul>
            <div class="flex justify-center ww-full"  >
                <Button  v-if="activeItem === null" :color="'bg-yellow'" :text="'text-neutral-600'" class="text-sm normal-nums">Выход</Button>
                <Icon v-else name="material-symbols:exit-to-app-rounded" size="24" class="bg-neutral-600 mx-auto"></Icon>
            </div>
        </aside>
        <div v-if="activeItem !== null" class="py-16 px-4">Content{{activeItem}}</div>
    </div>
</template>