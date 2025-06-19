import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

type TimerId = ReturnType<typeof setInterval> | null;

export const useTimerStore = defineStore('timer', () => {
  const time = ref<number>(0);
  const isRunning = ref<boolean>(false);
  const timerId = ref<TimerId>(null);

  const formattedTime = computed<string>(() => {
    const totalSeconds = Math.floor(time.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  const startTimer = (): void => {
    if (isRunning.value) return;

    isRunning.value = true;
    const startTime = Date.now() - time.value;

    timerId.value = setInterval(() => {
      time.value = Date.now() - startTime;
    }, 100);
  };

  const stopTimer = (): void => {
    if (!isRunning.value) return;

    isRunning.value = false;
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const resetTimer = (): void => {
    stopTimer();
    time.value = 0;
  };

  // Удаляем onUnmounted и заменяем на метод для ручной очистки
  const cleanup = (): void => {
    stopTimer();
  };

  return {
    time,
    isRunning,
    formattedTime,
    startTimer,
    stopTimer,
    resetTimer,
    cleanup
  };
});
