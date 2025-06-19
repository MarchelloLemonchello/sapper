<script setup lang="ts">
import { useSapperStore } from '@/stores/counter';
import { useTimerStore } from '@/stores/timer';

const sapperStore = useSapperStore();
const timerStore = useTimerStore();
</script>

<template>
  <div class="notification win-notification">
    <h2>You Win!</h2>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Field size:</span>
        <span class="stat-value">{{ sapperStore.rows }}×{{ sapperStore.columns }}</span>
      </div>

      <div class="stat-item">
        <span class="stat-label">Bombs:</span>
        <span class="stat-value">{{ sapperStore.bombs }}</span>
      </div>

      <div class="stat-item">
        <span class="stat-label">Time:</span>
        <span class="stat-value">{{ timerStore.formattedTime }}</span>
      </div>
    </div>

    <button class="new-game-btn" @click="sapperStore.updateField()">
      New Game
    </button>
  </div>
</template>

<style >
.win-notification {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
}

.new-game-btn {
  background: white;
  color: #2E7D32;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}
</style>
