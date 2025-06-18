<script setup>
import { useTimerStore } from '@/stores/timer';

const timer = useTimerStore();
</script>

<template>
  <div class="timer-controls">
    <button @click="timer.startTimer()" :disabled="timer.isRunning">Старт</button>
    <button @click="timer.stopTimer()" :disabled="!timer.isRunning">Стоп</button>
    <button @click="timer.resetTimer()">Сброс</button>
    {{ timer.formattedTime }}
  </div>
</template>
