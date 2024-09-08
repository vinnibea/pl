
import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    if (!isAuth.value && to.path === '/account') {
        return navigateTo('/register'); 
    }

    
})