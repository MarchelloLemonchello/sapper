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
    <div class="timer-icon">⏱️</div>
    <div class="timer-value">{{ timerStore.formattedTime }}</div>
    <div class="timer-pulse" v-if="isRunning"></div>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2b393a;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #4C545C;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.timer-running {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.timer-icon {
  font-size: 16px;
}

.timer-value {
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
  letter-spacing: 1px;
}

.timer-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(76, 175, 80, 0) 0%,
    rgba(76, 175, 80, 0.1) 50%,
    rgba(76, 175, 80, 0) 100%
  );
  animation: pulse 2s infinite;
  opacity: 0;
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Анимация изменения цифр */
.timer-value {
  transition: all 0.3s ease;
}

.timer-value::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #4CAF50;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.timer-container:hover .timer-value::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
