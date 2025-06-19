<script setup lang="ts">
import { useSapperStore } from '@/stores/counter';
import { useTimerStore } from '@/stores/timer';
import { getBestTime, saveRecord } from '@/shared/lib/records';
import { computed, onMounted } from 'vue';

const sapperStore = useSapperStore();
const timerStore = useTimerStore();


const bestTime = computed(() => {
  return getBestTime(
    sapperStore.rows,
    sapperStore.columns,
    sapperStore.bombs
  );
});

const isNewRecord = computed(() => {
  return !bestTime.value || timerStore.time < bestTime.value;
});

onMounted(() => {
  if (isNewRecord.value) {
    saveRecord({
      rows: sapperStore.rows,
      columns: sapperStore.columns,
      bombs: sapperStore.bombs,
      time: timerStore.time
    });
  }
});

const formatTime = (ms: number | null) => {
  if (!ms) return '--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};
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
        <span class="stat-label">Your time:</span>
        <span class="stat-value">{{ timerStore.formattedTime }}</span>
        <span v-if="isNewRecord" class="record-badge">NEW RECORD!</span>
      </div>

      <div class="stat-item" v-if="bestTime">
        <span class="stat-label">Best time:</span>
        <span class="stat-value">{{ formatTime(bestTime) }}</span>
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
  border-radius: 4px;
  transition: all 0.3s ease;
}

.record-badge {
  background: gold;
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  font-weight: bold;
}
</style>
