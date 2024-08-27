import {ref } from 'vue';
import { defineStore } from '#imports';
export const useRegisterStore = defineStore('register_store', () => {
   const loading = ref(false);
   const activeTab = ref(0);


   const setActiveTab = (i) => {
    loading.value = true,
    setTimeout(() => {
        loading.value = false;
        window.scrollTo(0, 0);
        activeTab.value = (i);
    }, 1500)
   } 
  return { activeTab, setActiveTab, loading}
})