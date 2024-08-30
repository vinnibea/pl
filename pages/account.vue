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
</script>

<template>
    <div class="min-h-dvh w-full flex">
        <aside class="w-1/4 pt-16 flex flex-col justify-between py-16 items-center max-[822px]:px-4 max-[822px]:w-full">
            <ul class="flex flex-col  max-[822px]:items-center gap-8 text-white px-8 w-full max-[822px]:w-full  max-[822px]:px-2 max-[822px]:gap-12 text-base border-b border-slate-700 pb-24">
                <li class="w-full flex items-center gap-2 max-[822px]:justify-between max-[822px]:text-lg cursor-pointer" v-for="(item, i) in menuItems" :key="item.icon" :class="[
                    {'border-r-2': i === 0,
                     'max-[822px]:border-none': true,
                     'text-amber-300': i === 0,
                 }
                ]">
                    <Icon :name="item.icon"> </Icon> 
                    <span class="w-2/3 flex justify-start">{{ item.title }}</span>
                    <Icon name="mdi:arrow-right-thick" class="min-[882px]:hidden"></Icon>
                </li>    
            </ul>
            <Button :color="'bg-yellow'" :text="'text-neutral-600'" class="text-sm normal-nums">Выход</Button>
        </aside>
    </div>
</template>