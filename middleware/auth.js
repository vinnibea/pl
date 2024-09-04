import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware((to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
   console.log(to)
    if (!isAuth.value) {
        $fetch('/api/profile').then(res => {
            localStore.setLocalUser(res);
            return navigateTo(to.fullPath)
        }).catch(() => {
            return navigateTo('/')
        })

    }
})