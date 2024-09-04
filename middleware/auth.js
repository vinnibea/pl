import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware((to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
    if (!isAuth) {
         return navigateTo('/')
    }
        
})