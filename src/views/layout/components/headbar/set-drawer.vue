<template>
  <drawer
    v-model="visible"
    title="配置"
    size="300px"
    :modal="false">
    <el-form label-position="left" label-width="140px">
      <el-form-item label="固定导航栏">
        <el-switch v-model="fixed" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="显示标签栏">
        <el-switch v-model="tabsDisplay" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
    </el-form>
  </drawer>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const fixed = computed({
      get: () => {
        return store.state.setting.navbar.fixed
      },
      set: (val) => {
        store.dispatch('setting/setFixed', val)
      }
    })

    const tabsDisplay = computed({
      get: () => {
        return store.state.setting.navbar.tabsDisplay
      },
      set: (val) => {
        store.dispatch('setting/setTabsDisplay', val)
      }
    })

    const visible = ref(false)

    /**
     * @description: 初始化
     * @param {*} id 字典ID
     * @return {*}
     * @Author: gumingchen
     */
    const init = () => {
      visible.value = true
    }

    return {
      visible,
      fixed,
      tabsDisplay,
      init
    }
  }
})
</script>

<style>

</style>
