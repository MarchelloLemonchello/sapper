<script setup lang="ts">
import {useSapperStore} from "@/stores/counter.js";
const sapperStore = useSapperStore();
</script>

<template>
  <span>
  {{sapperStore.flags}}
  </span>
</template>
