<script setup lang="ts">
import { useSapperStore } from '@/stores/counter';

const sapperStore = useSapperStore();
</script>

<template>
  <div class="notification lose-notification">
    <h2>Game Over!</h2>
    <p>You hit a bomb. Try again!</p>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Field size:</span>
        <span class="stat-value">{{ sapperStore.rows }}×{{ sapperStore.columns }}</span>
      </div>

      <div class="stat-item">
        <span class="stat-label">Bombs:</span>
        <span class="stat-value">{{ sapperStore.bombs }}</span>
      </div>
    </div>

    <button class="new-game-btn" @click="sapperStore.updateField()">
      Try Again
    </button>
  </div>
</template>

<style >
.lose-notification {
  background: linear-gradient(135deg, #F44336, #C62828);
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
  color: #C62828;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

</style>
