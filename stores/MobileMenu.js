import {ref } from 'vue';
import { defineStore } from '#imports';
export const useMobileStore = defineStore('mobile_menu', () => {
   const politicsOpen = ref(false);
   const state = ref(false);
   const openModal = ref(false);

   const onMenuOpen = () => {
    state.value = true;
   }

   const onModal = () => {
    openModal.value = !openModal.value;
   }
   const onPolitics = (i) => {

    window.scrollTo(0, 0);
    politicsOpen.value = i;
   }
   const onMenuClose= () => {
    state.value = false;
   }
  return { state, onMenuOpen, onMenuClose, politicsOpen, onPolitics, onModal, openModal}
})
