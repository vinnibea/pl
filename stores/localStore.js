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
    console.log(payload)
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
      hasEmail: payload.hasEmail,
      hasNotification: payload.hasNotification,
      deactivated: payload.deactivated,
      timeStamp: Date.now(),
      id: payload.id,
      sid: payload.sid,
    };
  
     console.log(DTO)
    localUser.value = DTO;
    isAuth.value = true;
  }
  return { localUser, setLocalUser, isSubscriber, setSubsciber, subscriber_email, isAuth };
})
