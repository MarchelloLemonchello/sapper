<script setup lang="ts">
import { useSapperStore } from '@/stores/counter';
import {computed} from "vue";

const sapperStore = useSapperStore();

const statusEmoji = computed(() => {
  switch(sapperStore.gameStatus) {
    case 'play':
      return '😊';
    case 'lose':
      return '💥';
    case 'win':
      return '🎉';
    default:
      return '😊';
  }
});
</script>

<template>
  <div class="status-indicator">
    {{ statusEmoji }}
    <div class="status-text">
      <template v-if="sapperStore.gameStatus === 'play'">Game in progress</template>
      <template v-else-if="sapperStore.gameStatus === 'lose'">Game over!</template>
      <template v-else-if="sapperStore.gameStatus === 'win'">You won!</template>
      <template v-else>Ready to play</template>
    </div>
  </div>
</template>

<style scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #4C545C;
}

.status-text {
  color: white;
  font-weight: 500;
}
</style>
