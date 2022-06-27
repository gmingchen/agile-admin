<template>
  <div class="layout-container height-full flex-box overflow-auto">
    <Sidebar />
    <component :is="component" class="navigation-container">
      <template #headbar>
        <Headbar />
      </template>
      <template #tabsbar>
        <Tabsbar />
      </template>
      <template #default v-if="!refresh">
        <View class="margin-20 flex-item_f-1" transition="left-in-right-out" />
      </template>
    </component>
    <Websocket />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'
import Tabsbar from './components/tabsbar'
import View from '@/components/view'
import NavigationActive from './components/navigation/active'
import NavigationFixed from './components/navigation/fixed'
import Websocket from './components/websocket'

export default defineComponent({
  components: { Sidebar, Headbar, Tabsbar, View, NavigationActive, NavigationFixed, Websocket },
  setup() {
    const store = useStore()

    const navigationMode = computed(() => store.state.settings.navigationMode)

    const refresh = computed(() => store.state.settings.refresh)

    const component = computed(() => {
      let result = ''
      switch (store.state.settings.navigationMode) {
        case 1:
          result = NavigationFixed
          break
        case 2:
          result = NavigationActive
          break
      }
      return result
    })

    return {
      navigationMode,
      refresh,
      component
    }
  }
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
