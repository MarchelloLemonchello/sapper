<script setup lang="ts">

import PlayingField from "@/widgets/PlayingField.vue";

import {onBeforeUnmount, onMounted} from "vue";
import {useSapperStore} from "@/stores/counter.ts";
import GameSettings from "@/widgets/GameSettings.vue";
const sapperStore = useSapperStore();

onMounted(() => {
  window.addEventListener('resize', sapperStore.updateWindowHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', sapperStore.updateWindowHeight)
})
</script>

<template>
  <div v-if="sapperStore.gameStatus === 'lose'" class="notification">
    lose
  </div>
  <div v-if="sapperStore.gameStatus === 'win'" class="notification">
    win
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <GameSettings/>
    <PlayingField/>
  </div>
</template>

<style scoped>
.notification {
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  font-size: 30px;
  background-color: #2b393a;
  padding: 20px;
  border: #4C545C 1px solid;
}
</style>
