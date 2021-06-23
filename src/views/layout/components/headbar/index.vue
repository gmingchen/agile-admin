<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-07 13:59:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 15:45:07
-->
<template>
  <div class="headbar-wrap padding-n-10">
    <el-tooltip
      :style="style"
      placement="right"
      effect="dark"
      :show-after="1000"
      :enterable="false"
      content="菜单栏展开/收起">
      <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="foldHandle()" />
    </el-tooltip>
    <actionbar class="actionbar" />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Actionbar from './actionbar.vue'

export default defineComponent({
  components: { Actionbar },
  setup() {
    const store = useStore()

    const navbar = computed(() => store.state.setting.navbar)
    const isCollapse = computed(() => store.state.menu.isCollapse)

    const style = computed(() => {
      return {
        'line-height': `${ navbar.value.headHeight }px`
      }
    })

    const foldHandle = () => {
      store.dispatch('setting/setSidebarWidth', !isCollapse.value)
      store.dispatch('menu/setIsCollapse', !isCollapse.value)
    }

    return {
      isCollapse,
      style,
      foldHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.headbar-wrap {
  & > i {
    cursor: pointer;
  }
  .actionbar {
    float: right;
  }
}
</style>
