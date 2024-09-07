
import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (!isAuth.value) {

        const { data, status, error, refresh, clear } = await useFetch('/api/profile')
        if (data.value !== null && to.path === '/account') {
            console.log(data.value)
           return localStore.setLocalUser(data.value);
        } 
        return navigateTo('/register');
    }

    
})