import { defineStore } from '#imports';

export const useGlobalStore = defineStore('global_store', () => {
  const loading = ref(true);

  const setLoading = () => {
    loading.value = false;
  }
  return {loading, setLoading };
})
