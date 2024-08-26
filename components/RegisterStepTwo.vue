<script setup> 
import { onMounted } from 'vue'

</script>

<template>
 <h2> Card</h2>
</template>

<style scoped>
.loader {
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: scale(1.2);
    transform: rotate3d(3, 3, 3)
  }
  25% {
    transform: scale(0.9)
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.3);
  }
}
</style>
