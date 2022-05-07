<template>
  <div class="layout-container height-full flex-box">
    <Sidebar />
    <el-scrollbar
      class="wrap flex-item_f-1 flex-box flex_d-column"
      wrap-class="flex-box flex_d-column"
      :view-class="`
        out-scrollbar-view-${navigationMode}-${contanierMode}
        flex-item_f-1
        flex-box
        out-view
        ${ navigationMode === 1 || contanierMode === 2 ? ' overflow-hidden' : '' }`
      ">
      <div class="wrap flex-item_f-1 flex-box flex_d-column">
        <Headbar />
        <Tabsbar />
        <el-scrollbar
          class="flex-item_f-1 flex-box flex_d-column"
          v-if="!refresh"
          wrap-class="flex-box flex_d-column"
          :view-class="`
            inner-scrollbar-view-${contanierMode}
            flex-item_f-1
            flex-box
            ${contanierMode === 2 ? ' overflow-hidden' : ''}`">
          <View class="content-view margin-20 flex-item_f-1" transition="left-in-right-out" />
        </el-scrollbar>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'
import Tabsbar from './components/tabsbar'
import View from '@/components/view'

export default defineComponent({
  components: { Sidebar, Headbar, Tabsbar, View },
  setup() {
    const store = useStore()

    const navigationMode = computed(() => store.state.settings.navigationMode)

    const contanierMode = computed(() => store.state.settings.contanierMode)

    const refresh = computed(() => store.state.settings.refresh)

    return {
      navigationMode,
      contanierMode,
      refresh
    }
  }
})
</script>

<style lang="scss">
/* 当高度低于该高度时 进行外部容器滚动 */
@media screen and (max-height: 400px) {
  .out-scrollbar-view-2-2, .inner-scrollbar-view-2 {
    overflow: unset;
  }
}
.layout-container {
  .wrap {
    z-index: 0;
    background-color: var(--gl-content-background-color);
  }
}
</style>
