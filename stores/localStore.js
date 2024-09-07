import { defineStore } from '#imports';

export const useLocalUserStore = defineStore('local_user', () => {
  const localUser = ref(null);
  const subscriber_email = ref(false);
  const isSubscriber = ref(false);
  const isAuth = ref(false);


  const setSubsciber = (payload) => {
    subscriber_email.value = payload;
    isSubscriber.value = true;
  }
  const setLocalUser = (payload) => {
    if (!payload?.email) {
      isAuth.value = false;
      return;
    };
    
    const DTO = {
      name: payload.name,
      surname: payload.surname,
      city: payload.city,
      phone: String(payload.phone),
      index: payload.index,
      email: payload.email,
      timeStamp: Date.now(),
      id: payload.id,
      _sid: payload._sid,
    };
  
     
    localUser.value = DTO;
    isAuth.value = true;
  }
  return { localUser, setLocalUser, isSubscriber, setSubsciber, subscriber_email, isAuth };
})
