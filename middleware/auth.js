import { useLocalUserStore } from "~/stores/localStore";
export default defineNuxtRouteMiddleware((to, from) => {

    const { isAuth } = storeToRefs(useLocalUserStore());
    const localStore = useLocalUserStore();
  
    if (!isAuth.value) {
        $fetch('/api/profile').then(res => {
            localStore.setLocalUser(res);
            return navigateTo(to)
        }).catch(() => {
            return navigateTo('/')
        })

    }
        
})