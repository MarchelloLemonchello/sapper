<script setup lang="ts">
import { useSapperStore } from '@/stores/counter';
import WinNotification from '@/entities/WinNotification.vue';
import LoseNotification from '@/entities/LoseNotification.vue';
</script>

<template>
  <WinNotification v-if="useSapperStore().gameStatus === 'win'" />
  <LoseNotification v-else-if="useSapperStore().gameStatus === 'lose'" />
</template>
