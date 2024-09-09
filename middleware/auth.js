
import { useLocalUserStore } from "~/stores/localStore";
import { storeToRefs } from "#imports";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (!isAuth.value && to.path === '/account') {
        const { data } = await useFetch('/api/profile');
        if (!data.value) {
            return navigateTo('/register');
        } else {
            localStore.setLocalUser(data.value);
        }
    }
})