<script setup lang="ts">
import PlayingField from "@/widgets/PlayingField.vue";
import GameSettings from "@/widgets/GameSettings.vue";
import NotificationContainer from "@/widgets/NotificationContainer.vue"
import {ref, onMounted, onBeforeUnmount, computed} from "vue";

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

const containerClass = computed(() => {
  return screenWidth.value > 720 ? 'horizontal-layout' : 'vertical-layout';
});
</script>

<template>
  <NotificationContainer />
  <div :class="containerClass">
    <GameSettings class="settings-panel"/>
    <PlayingField class="playing-field"/>
  </div>
</template>

<style scoped>

.horizontal-layout {
  display: flex;
  height: 100vh;
}

.vertical-layout {
  display: flex;
  flex-direction: column;
}

.settings-panel {
  flex: 1;
  max-width: 50%;
}

.playing-field {
  flex: 1;
  max-width: 50%;
}

@media (max-width: 720px) {
  .settings-panel,
  .playing-field {
    max-width: 100%;
    width: 100%;
  }
}
</style>
