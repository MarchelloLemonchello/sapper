<script setup lang="ts">
import { useSapperStore } from "@/stores/counter";
import { ref, watch } from "vue";

const sapperStore = useSapperStore();
const counterValue = ref(sapperStore.differenceBombsAndFlags);
const isAnimating = ref(false);

watch(
  () => sapperStore.differenceBombsAndFlags,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isAnimating.value = true;
      setTimeout(() => {
        counterValue.value = newVal;
        isAnimating.value = false;
      }, 300);
    }
  }
);
</script>

<template>
  <div class="min-counter-container">
    <div class="min-counter-label">Mines left:</div>
    <div
      class="min-counter-value"
      :class="{ 'animate': isAnimating }"
    >
      {{ counterValue }}
    </div>
    <div class="cells-left">There are soldiers left: {{sapperStore.cellsLeft}}</div>
  </div>
</template>

<style scoped>
.min-counter-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #4C545C;
}

.min-counter-label {
  color: #a0a0a0;
}

.min-counter-value {
  font-size: 18px;
  font-weight: bold;
  color: #ff5252;
  min-width: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.min-counter-value.animate {
  animation: pulse 0.3s ease;
  transform: scale(1.2);
  color: #ff0000;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.cells-left {
  margin-left: auto;
  color: #a0a0a0;
}
</style>
