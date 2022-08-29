<template>
  <div class="layout-container height-full flex-box overflow-auto">
    <Sidebar />
    <component :is="component" class="navigation-container">
      <template #headbar>
        <Headbar />
      </template>
      <template #tabsbar v-if="showTabs">
        <Tabsbar />
      </template>
      <template #default v-if="!refresh">
        <View class="margin-20 flex-item_f-1" transition="left-in-right-out" />
      </template>
    </component>
    <Websocket />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useSettingsStore } from '@stores/settings'

import Sidebar from './components/sidebar/index.vue'
import Headbar from './components/headbar/index.vue'
import Tabsbar from './components/tabsbar/index.vue'
import View from '@/components/view/index.vue'
import NavigationActive from './components/navigation/active/index.vue'
import NavigationFixed from './components/navigation/fixed/index.vue'
import Websocket from './components/websocket/index.vue'

const settingsStore = useSettingsStore()

const { navigationMode, showTabs, refresh } = storeToRefs(settingsStore)

const component = computed(() => {
  let result = ''
  switch (navigationMode.value) {
    case 1:
      result = NavigationFixed
      break
    case 2:
      result = NavigationActive
      break
  }
  return result
})
</script>

<style lang="scss">
.layout-container {
  z-index: 0;
  background-color: var(--gl-content-background-color);
  .navigation-container {
    z-index: 0;
  }
}
</style>
