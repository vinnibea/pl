import { defineStore } from '#imports';

export const useCreditorsStore = defineStore('creditors_store', () => {
    const creditors = ref([]);
    const status = ref(true);

    const fetchCreditors = async () => {
        if(creditors.value.length) return;
    
        try {
            const data = await $fetch('/api/creditors');


            creditors.value = data;
            status.value = true;
        }
        catch {
            creditors.value = [];

        } finally {
            status.value = false;
        }
    }

    return { creditors, status, fetchCreditors }
})