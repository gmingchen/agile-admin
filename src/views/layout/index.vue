<template>
  <div class="layout-container height-full flex overflow-auto">
    <Sidebar v-if="menuLayoutMode !== 3" />
    <component :is="component" class="navigation-container">
      <template #headbar>
        <Headbar />
      </template>
      <template #tabsbar v-if="showTabs">
        <Tabsbar />
      </template>
      <template #default v-if="!refresh">
        <View class="margin-20 flex-item_f-1" transition="left-in-right-out" rename />
      </template>
    </component>
    <Websocket />
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar/index.vue'
import Headbar from './components/headbar/index.vue'
import Tabsbar from './components/tabsbar/index.vue'
import NavigationActive from './components/navigation/active/index.vue'
import NavigationFixed from './components/navigation/fixed/index.vue'
import Websocket from './components/websocket/index.vue'

const route = useRoute()

const themeStore = useThemeStore()

const navigationMode = computed(() => themeStore.layout.navigationMode)
const showTabs = computed(() => {
  return themeStore.layout.showTabs
})
const refresh = computed(() => {
  return themeStore.refresh
})
const menuLayoutMode = computed(() => themeStore.layout.menuLayoutMode)

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
