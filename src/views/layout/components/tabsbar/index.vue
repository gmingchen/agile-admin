<template>
  <div class="tabsbar-container flex-box flex_a_i-flex-end">
    <el-tabs
      class="margin_b-1"
      type="card"
      v-model="active"
      @tab-click="clickHandle"
      @tab-remove="removeHandle">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.title_cn"
        :name="tab.value"
        :closable="tabs.length > 1" />
    </el-tabs>
  </div>
</template>

<script setup>
import { nextTick, onBeforeMount } from 'vue'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useTabsStore } from '@stores/tabs'
import { useSettingsStore } from '@stores/settings'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const settingsStore = useSettingsStore()

const { active, tabs } = storeToRefs(tabsStore)
const { refresh } = storeToRefs(settingsStore)

/**
 * 点击跳转
 */
const clickHandle = ({ index }) => {
  const tab = tabs.value[+index]
  router.push({
    name: tab.name,
    query: tab.query,
    params: tab.params
  })
}

/**
 * 移除标签
 */
const removeHandle = (name) => {
  tabsStore.removeHandle([name])
}

onBeforeRouteUpdate((to) => {
  tabsStore.changeHandle(to)
  const meta = to.meta
  if (meta.multiple) {
    refresh.value = true
    nextTick(() => {
      refresh.value = false
    })
  }
})

onBeforeMount(() => {
  tabsStore.changeHandle(route)
})

</script>

<style lang="scss" scoped>
.tabsbar-container {
  z-index: 5;
  padding: 10px 10px 0 10px;
  height: var(--gl-tabsbar-height);
  background-color: var(--gl-tabsbar-background-color);
  box-shadow: var(--el-box-shadow-light);
  ::v-deep(.el-tabs) {
    .el-tabs__header {
      margin: 0;
      border: none;
    }
  }

}
</style>
