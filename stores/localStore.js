import { defineStore } from '#imports';
import { useStorage } from '@vueuse/core'
export const useLocalUserStore = defineStore('local_user', () => {
   const localUser = ref(null);

   const setLocalUser = (payload) => {
    localStorage.removeItem('user');
    if(!payload) return; 
    const DTO = {
      name: payload.name,
      surname: payload.surname,
      city: payload.city,
      phone: payload.phone,
      index: payload.index,
      email: payload.email,
      timeStamp: Date.now(),
    };
    localUser.value = useStorage('user', DTO)
   }
  return { localUser, setLocalUser};
})
