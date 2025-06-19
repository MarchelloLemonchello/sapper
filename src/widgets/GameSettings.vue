<script setup lang="ts">
import {ref} from 'vue';
import {useSapperStore} from "@/stores/counter.ts";
import MinCounter from "@/features/MinCounter.vue";
import Timer from "@/features/GameTimer.vue";
import GameStatusIndicator from "@/features/GameStatusIndicator.vue";
const sapperStore = useSapperStore();
const newRows = ref(8);
const newColumns = ref(8);
const newBombs = ref(10);

const resizeField = () => {
  sapperStore.changeRows(newRows.value);
  sapperStore.changeColumns(newColumns.value);
  sapperStore.changeBombs(newBombs.value)
  sapperStore.updateField()
};
</script>

<template>
  <div class="settings-container">
    <h3>Game Settings</h3>
    <div class="settings-row">
      <label>Rows:</label>
      <input type="number" v-model.number="newRows" min="4" max="20" />
    </div>
    <div class="settings-row">
      <label>Columns:</label>
      <input type="number" v-model.number="newColumns" min="4" max="20" />
    </div>
    <div class="settings-row">
      <label>Bombs:</label>
      <input type="number" v-model.number="newBombs" min="1" :max="newRows * newColumns - 1" />
    </div>
    <button @click="resizeField">Apply Settings</button>
    <div class="game-info">
      <GameStatusIndicator />
      <MinCounter/>
      <Timer/>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #0b0618;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.settings-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  width: 60px;
  padding: 8px;
  background: #4C545C;
  border: 1px solid #333;
  color: white;
}

button {
  padding: 10px;
  background: #4C545C;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

button:hover {
  background: #5d666e;
}

.game-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h3 {
  margin: 0 0 15px 0;
  color: white;
  text-align: center;
}

.cells-left, .flags {
  color: white;
  font-size: 14px;
}
</style>
