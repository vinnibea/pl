import {ref } from 'vue';
import { defineStore } from '#imports';
export const useMobileStore = defineStore('mobile_menu', () => {
    
   const state = ref(false);

   const onMenuOpen = () => {
 
    state.value = true;
   }

   const onMenuClose= () => {
    state.value = false;
   }
  return { state, onMenuOpen, onMenuClose}
})
