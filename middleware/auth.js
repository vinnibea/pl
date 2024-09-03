import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware((to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (from.fullPath === to.fullPath || !isAuth && to.fullPath === '/account') {
        $fetch("/api/")
            .then((res) => {
                if (res.statusCode === 401) {
                    localStore.setLocalUser()
                    return navigateTo('/')
                }
                if (res.id) {
                    localStore.setLocalUser(res, true);
                }
                return res;
            }).catch((e) => {
                localStore.setLocalUser()
                return navigateTo('/')
            })
    };
})