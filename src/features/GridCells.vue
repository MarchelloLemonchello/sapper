<script setup lang="ts">
import type { ICell } from "@/shared/utils/createField.ts";

const props = defineProps<{
  cell: ICell;
  gameStatus: 'win'| 'lose'| 'ready' | 'play'
}>();

const colors = ["#0200FF", "#028200", "#FE0000", "#010084", "#840000", "#018284", "#81037E", "#777777"];
</script>

<template>
  <div class="cell-container">
    <div
      class="cell-item"
      :class="{ 'flip-animation': props.cell.visible }"
      :style="{ background: props.cell.visible ? '#384048' : '#4C545C' }"
    >
      <div class="cell-content">
        <span
          v-if="props.cell?.environment"
          :style="`color: ${colors[props.cell.environment]}`"
          class="cell-radar"
        >
          {{ props.cell?.environment }}
        </span>
        <span
          v-if="props.cell.type == 'bomb' &&
            (props.gameStatus === 'win' || props.gameStatus === 'lose')"
        >💣</span>
        <span v-if="props.cell.flag" class="cell-flag">🚩</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell-container {
  perspective: 1000px;
  width: 100%;
  height: 100%;
  outline: #333333 2px solid;
}

.cell-item {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: #333333 1px solid;
  font-size: 42px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

.cell-content {
  position: relative;
  transition: opacity 0.1s ease 0.35s;
}

.flip-animation {
  animation: flip-and-change-color 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) forwards;
}

@keyframes flip-and-change-color {
  0% {
    transform: rotateX(0);
    background-color: #4C545C;
  }
  49% {
    background-color: #4C545C;
    transform: rotateX(90deg);
  }
  50% {
    background-color: #384048;
  }
  100% {
    transform: rotateX(0);
    background-color: #384048;
  }
}


</style>
