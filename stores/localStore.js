import { defineStore } from '#imports';
import { useStorage } from '@vueuse/core'
export const useLocalUserStore = defineStore('local_user', () => {
   const localUser = ref(null);

   const setLocalUser = (payload) => {
    localUser.value = useStorage('user', payload )
   }
  return { localUser, setLocalUser};
})
