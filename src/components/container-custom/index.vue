<template>
  <div :class="`
    container-custom-container
    flex-box
    flex_d-column
    overflow-auto
    ${panelMode !== 1 ? 'container-panel' : ''}`">
    <el-scrollbar
      ref="refScrollbar"
      :class="`
      content-container
      ${contanierMode === 2 ? 'flex-item_f-1' : 'height-unset'}`">
      <div class="content-wrap">
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSettingsStore } from '@stores/settings'

const settingsStore = useSettingsStore()

const { contanierMode, panelMode } = storeToRefs(settingsStore)

const refScrollbar = ref()

const setScrollTop = (top = 0) => {
  refScrollbar.value.setScrollTop(top)
}
</script>

<style lang="scss" scoped>
.container-custom-container {
  margin: unset;
}
</style>
