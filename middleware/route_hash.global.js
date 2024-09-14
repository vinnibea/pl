export default defineNuxtRouteMiddleware(async (to, from) => {
   if(from.fullPath !== '/' && to.hash.length) {
    console.log(from.fullPath)
    setTimeout(() => {
       navigateTo(to.hash)
    }, 300)
   }
})