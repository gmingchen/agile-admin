
<script setup>
const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const themeStore = useThemeStore()

const { active, tabs } = storeToRefs(tabsStore)
const { refresh } = storeToRefs(themeStore)

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
  // const meta = to.meta
  // if (meta.multiple) {
  //   refresh.value = true
  //   nextTick(() => {
  //     refresh.value = false
  //   })
  // }
})

onBeforeMount(() => {
  tabsStore.changeHandle(route)
})

</script>

<template>
  <div class="tabsbar-container flex flex_a_i-flex-end">
    <el-tabs
      class="margin_b-1"
      type="card"
      v-model="active"
      @tab-click="clickHandle"
      @tab-remove="removeHandle">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
        :closable="tabs.length > 1" />
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.tabsbar-container {
  z-index: 5;
  padding: 10px 10px 0 10px;
  height: var(--gl-tabsbar-height);
  background-color: var(--gl-tabsbar-background-color);
  box-shadow: var(--el-box-shadow-light);
  ::v-deep(.el-tabs) {
    width: 100%;
    .el-tabs__header {
      margin: 0;
      border: none;
    }
  }

}
</style>
