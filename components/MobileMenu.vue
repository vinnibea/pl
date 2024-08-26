<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
 const store = useMobileStore();
 console.log(store.state)
</script>
<template>
    <div class="fixed left-0 right-0 z-50 bottom-0 top-0 bg-slate-800 transform transition-all duration-500 min-[822px]:hidden flex flex-col items-center" :class="[
            { '-translate-y-full': !store.state, 'translate-y-0': store.state}
           ]">
    
        <Header></Header>
       
           <div class="min-h-dvh transition-all duration-600" >
            <Nav :isMobile="true"></Nav>
            <div class="flex flex-col items-stretch w-full gap-4 px-4 py-4 absolute bottom-6 left-0 right-0"> 
             <Button :color="'bg-yellow'">Регистрация</Button>
             <Button :color="'bg-button-grey'" text="text-white" :hover="'bg-dark-grey'">Войти</Button>
            </div>
           </div>
    </div>
</template>

<style>

</style>