
import { useLocalUserStore } from "~/stores/localStore";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (!isAuth.value && to.path === '/account') {
        $fetch("/api/profile")
            .then((data) => {
                localStore.setLocalUser(data);
            })
            .catch((e) => {
                console.log(e)
                navigateTo('/register')
            });
    }
})