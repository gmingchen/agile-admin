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

<script >
import { computed, defineComponent, nextTick, onBeforeMount } from 'vue'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const active = computed({
      get: () => {
        return store.state.tabs.active
      },
      set: (val) => {
        store.dispatch('tabs/setActive', val)
      }
    })

    const tabs = computed(() => store.state.tabs.tabs)

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
      store.dispatch('tabs/removeHandle', [name])
    }

    onBeforeRouteUpdate((to) => {
      store.dispatch('tabs/changeHandle', to)
      const meta = to.meta
      if (meta.multiple) {
        store.dispatch('settings/setRefresh', true)
        nextTick(() => {
          store.dispatch('settings/setRefresh', false)
        })
      }
    })

    onBeforeMount(() => {
      store.dispatch('tabs/changeHandle', route)
    })

    return {
      active,
      tabs,
      clickHandle,
      removeHandle
    }
  }
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
    width: 100%;
    .el-tabs__header {
      margin: 0;
      border: none;
    }
  }

}
</style>
