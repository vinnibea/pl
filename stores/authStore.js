
import { useStorage } from '@vueuse/core'
import { defineStore } from '#imports';
import { useLocalUserStore } from '#imports';
export const useAuthStore = defineStore('auth_store', () => {
   const isAuth = ref(false);
   const authUser = ref(null);

   const setAuthUser = (payload) => {
    if(payload) {
        useLocalUserStore().setLocalUser(payload)
        isAuth.value = true;
    }
    
   }
  return { authUser, setAuthUser, isAuth};
})