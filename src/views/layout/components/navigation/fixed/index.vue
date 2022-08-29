<template>
  <div class="flex-item_f-1 flex-box flex_d-column overflow-auto">
    <slot name="headbar" />
    <slot name="tabsbar" />
    <slot v-if="contanierMode === 2" />
    <el-scrollbar class="flex-item_f-1 " :view-class="`flex-box flex_d-column`" v-else>
      <slot />
    </el-scrollbar>
  </div>

</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useSettingsStore } from '@stores/settings'

const settingsStore = useSettingsStore()

const { contanierMode } = storeToRefs(settingsStore)

</script>

<style lang="scss" scoped>

</style>
