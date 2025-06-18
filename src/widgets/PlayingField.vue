<script setup lang="ts">
import {useSapperStore} from "@/stores/counter.ts";
import GridCells from "@/features/GridCells.vue";


const sapperStore = useSapperStore();

const handleCellClick = (row: number, col: number) => {
  sapperStore.handleCellClick(row, col);
};
const handleRightClick = (row: number, col: number ) => {
  sapperStore.handleCellRightClick(row, col);
};
</script>

<template>
  <div>
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
        @click="handleCellClick(i, j)"
        @contextmenu.prevent="handleRightClick(i, j)"
        :style="`width: ${sapperStore.cellsHeight}px;height: ${sapperStore.cellsHeight}px;`"
      />
    </div>

  </div>
</template>

<style scoped>

body {
  font-family: Arial, sans-serif;
}


.row {
  display: flex;
  flex-direction: row;
}
</style>
