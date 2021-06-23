<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 21:56:49
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 22:19:37
-->
<template>
  <el-form label-position="left" label-width="140px">
    <el-form-item label="固定导航栏">
      <el-switch v-model="fixed" active-color="#13ce66" inactive-color="#ff4949" />
    </el-form-item>
    <el-form-item label="显示标签栏">
      <el-switch v-model="tabsDisplay" active-color="#13ce66" inactive-color="#ff4949" />
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, defineComponent } from 'vue'
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

    return {
      fixed,
      tabsDisplay
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.el-form-item__label) {
  line-height: 36px!important;
}
</style>
