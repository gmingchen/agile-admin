<template>
  <div class="layout-container height-full flex-box">
    <Sidebar />
    <div class="flex-item_f-1 flex-box flex_d-column">
      <Headbar />
      <View class="flex-item_f-1" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'
import View from '@/components/view/index.vue'

export default defineComponent({
  components: { Sidebar, Headbar, View },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.layout-container {
}
</style>
