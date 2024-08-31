import { useStorage } from '@vueuse/core'
import { defineStore } from '#imports';
export const useAccountStore = defineStore('account_store', () => {
    const selectedSection = ref(null);
    const isMobile = ref(true);

    const setSelectedSection = (payload) => {
      if(payload === selectedSection.value) {
        selectedSection.value = null;
        return;
      }
       selectedSection.value = payload;
    }

    const setMobile = (payload) => {
        isMobile.value = payload;
    }
    return { selectedSection, setSelectedSection, isMobile, setMobile};
})