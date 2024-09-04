
import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (!isAuth.value) {

        const { data, status, error, refresh, clear } = await useFetch('/api/profile')
        console.log(data)
        if(data.value !== null) {
           return localStore.setLocalUser(data.value);
        }
        return navigateTo('/');
    }
})