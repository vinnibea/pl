export default defineNuxtRouteMiddleware(async (to, from) => {
   if(from.fullPath !== '/' && to.hash.length) {
    setTimeout(() => {
       navigateTo(to.hash)
    }, 300)
   }
})