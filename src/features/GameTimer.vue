<script setup lang="ts">
import { useTimerStore } from '@/stores/timer';
import {onUnmounted, ref, watch} from 'vue';

const timerStore = useTimerStore();
const isRunning = ref(false);

watch(
  () => timerStore.isRunning,
  (newVal) => {
    isRunning.value = newVal;
  },
  { immediate: true }
);

onUnmounted(() => {
  timerStore.cleanup();
});
</script>

<template>
  <div class="timer-container" :class="{ 'timer-running': isRunning }">
    ⏱️
    <div class="timer-value">{{ timerStore.formattedTime }}</div>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #4CAF50;
  border-radius: 6px;
  border: 1px solid #4C545C;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timer-running {
  border-color: #4CAF50;
}
</style>
