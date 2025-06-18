<script setup lang="ts">
import {ref} from 'vue';
import {useSapperStore} from "@/stores/counter.ts";
import MinCounter from "@/features/MinCounter.vue";
import Timer from "@/features/Timer.vue";
const sapperStore = useSapperStore();
const newRows = ref(8);
const newColumns = ref(8);
const newBombs = ref(10);

const resizeField = () => {
  sapperStore.changeRows(newRows.value);
  sapperStore.changeColumns(newColumns.value);
  sapperStore.changeBombs(newBombs.value)
  sapperStore.updateField()
  console.log({
    rows: sapperStore.rows,
    columns: sapperStore.columns,
    fieldOfCells: sapperStore.fieldOfCells
  });
};
</script>

<template>
  <div>
    <input type="number" v-model.number="newRows" min="4" max="20"  />
    <input type="number" v-model.number="newColumns" min="4" max="20" />
    <input type="number" v-model.number="newBombs" min="1" max="20" />
    <button @click="resizeField">aaaa</button>
    <MinCounter/>
    <Timer/>
    {{sapperStore.cellsLeft}}
  </div>

</template>
