<script setup lang="ts">
import {useSapperStore} from "@/stores/counter.ts";
import GridCells from "@/features/GridCells.vue";
import {ref, onMounted, onBeforeUnmount, computed, watch} from "vue";
import {useTimerStore} from "@/stores/timer.ts";

const sapperStore = useSapperStore();
const timerStore = useTimerStore();
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

watch(() => sapperStore.gameStatus, (newStatus) => {
  if (newStatus === 'win') {
    timerStore.stopTimer();
  }
});

const cellSize = computed(() => {
  if (screenWidth.value > 720) {
    const halfScreenWidth = window.innerWidth / 2;
    return `${halfScreenWidth / sapperStore.columns}px`;
  } else {
    return `${window.innerWidth / sapperStore.columns}px`;
  }
});
</script>

<template>
  <div class="field-container">
    <div
      v-for="(row, i) in sapperStore.fieldOfCells"
      :key="i"
      class="row"
    >
      <GridCells
        v-for="(cell, j) in row"
        :key="j"
        :cell="cell"
        :gameStatus="sapperStore.gameStatus"
        :size="cellSize"
        @click="sapperStore.handleCellClick(i, j)"
        @contextmenu.prevent="sapperStore.handleCellRightClick(i, j)"
      />
    </div>
  </div>
</template>

<style scoped>
.field-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.row {
  display: flex;
}
</style>
