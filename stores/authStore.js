
import { useStorage } from '@vueuse/core'
import { defineStore } from '#imports';
export const useAuthStore = defineStore('auth_store', () => {
   const isAuth = ref(false);
   const authUser = ref(null);

   const setAuthUser = (payload) => {
    if(payload) {
        console.log(payload)
        authUser.value = useStorage('user', payload);
        isAuth.value = true;
    }
    
   }
  return { authUser, setAuthUser, isAuth};
})