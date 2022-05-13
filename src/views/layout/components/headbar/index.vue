<template>
  <div class="headbar-container padding-n-10 flex-box flex_w-wrap flex_a_i-center">
    <Iconfont
      class="cursor-pointer margin_r-20"
      :name="`collapse-${collapse ? 'right' : 'left'}`"
      @click="collapseHandle" />
    <Crumb />
    <Action />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Crumb from './components/crumb'
import Action from './components/action'

export default defineComponent({
  components: { Crumb, Action },
  setup() {
    const store = useStore()

    const collapse = computed({
      get: () => store.state.menu.collapse,
      set: (val) => store.dispatch('menu/setCollapse', val)
    })

    /**
     * @description: 菜单栏折叠事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const collapseHandle = () => {
      collapse.value = !collapse.value
    }

    return {
      collapse,
      collapseHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.headbar-container {
  z-index: 10;
  min-height: var(--gl-headbar-height);
  background-color: var(--gl-headbar-background-color);
  box-shadow: var(--el-box-shadow-light);
}
</style>
