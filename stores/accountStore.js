import { useStorage } from '@vueuse/core'
import { defineStore } from '#imports';
export const useAccountStore = defineStore('account_store', () => {
    const selectedSection = ref(0);
    const isMobile = ref(false);

    const setSelectedSection = (payload) => {
      if(payload === selectedSection.value && isMobile.value) {
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