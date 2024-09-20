import { defineStore } from '#imports';

export const useGlobalStore = defineStore('global_store', () => {
  const loading = ref(true);
  const cookies = ref(false);

  const setLoading = () => {
    loading.value = false;
  }

  const setCookies = (payload) => {
    cookies.value = payload;
  }
  return {loading, cookies, setLoading, setCookies};
})
