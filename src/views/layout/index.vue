<template>
  <div class="layout-container height-full flex-box">
    <Sidebar />
    <el-scrollbar
      class="wrap flex-item_f-1 flex-box flex_d-column"
      wrap-class="flex-box flex_d-column"
      :view-class="`flex-box flex-item_f-1${ mode === 1 ? ' overflow-hidden' : '' }`">
      <div class="wrap flex-item_f-1 flex-box flex_d-column">
        <Headbar />
        <el-scrollbar class="flex-item_f-1">
          <View class="content-view padding-20 flex-item_f-1" transition="leftIn-rightOut" />
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
import View from '@/components/view'

export default defineComponent({
  components: { Sidebar, Headbar, View },
  setup() {
    const store = useStore()

    const mode = computed(() => store.state.settings.navigationMode)

    return {
      mode
    }
  }
})
</script>

<style lang="scss">
.layout-container {
  .wrap {
    z-index: 0;
    background-color: var(--gl-content-background-color);
  }
}
</style>
