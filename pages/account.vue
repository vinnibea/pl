<script setup>
import { useAuthStore } from '~/stores/authStore';
const userStore = useAuthStore();

</script>

<template>
    <div class="min-h-dvh w-full flex">
        <aside class="max-w-1/5 pt-16 flex flex-col justify-between py-16 items-center px-4">
            <ul class="flex flex-col items-start gap-8 text-white max-w-1/5 text-base border-b border-slate-700 pb-24">
                <li class="border-r-2 min-w-full px-4 text-amber-300 cursor-pointer hover:text-amber-200 transition-all duration-500 flex items-center gap-2">
                    <Icon name="mdi:account-circle"/> 
                    Информация об аккаунтe
                </li>
                <li class="min-w-full px-4 cursor-pointer hover:text-amber-200 transition-all duration-500 flex items-center gap-2">
                    <Icon name="mdi:account-circle"/> Мои подписки</li>
                <li class="min-w-full px-4 cursor-pointer hover:text-amber-200 transition-all duration-500 flex items-center gap-2">
                    <Icon name="mdi:account-circle"/> Мои карты</li>
                <li class="min-w-full px-4 cursor-pointer hover:text-amber-200 transition-all duration-500 flex items-center gap-2">
                    <Icon name="mdi:account-circle"/>Настройки</li>
                
            </ul>
            <Button :color="'bg-slate-900'" :text="'text-neutral-600'" class="text-sm normal-nums">Выход</Button>
        </aside>
    </div>
</template>