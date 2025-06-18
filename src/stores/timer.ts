import { defineStore } from 'pinia';
import { ref, computed, onUnmounted } from 'vue';

type TimerId = ReturnType<typeof setInterval> | null;

export const useTimerStore = defineStore('timer', () => {
  const time = ref<number>(0); // время в миллисекундах
  const isRunning = ref<boolean>(false);
  const timerId = ref<TimerId>(null);

  // Форматированное время MM:SS
  const formattedTime = computed<string>(() => {
    const totalSeconds = Math.floor(time.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  // Запуск таймера
  const startTimer = (): void => {
    if (isRunning.value) return;

    isRunning.value = true;
    const startTime = Date.now() - time.value;

    timerId.value = setInterval(() => {
      time.value = Date.now() - startTime;
    }, 100);
  };

  // Остановка таймера
  const stopTimer = (): void => {
    if (!isRunning.value) return;

    isRunning.value = false;
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  // Сброс таймера
  const resetTimer = (): void => {
    stopTimer();
    time.value = 0;
  };

  // Очистка при уничтожении хранилища
  const cleanup = (): void => {
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  // Автоматическая очистка при уничтожении
  onUnmounted(cleanup);

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

// Экспортируем тип хранилища для использования в компонентах
export type TimerStore = ReturnType<typeof useTimerStore>;
