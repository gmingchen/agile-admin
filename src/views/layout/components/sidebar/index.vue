<template>
  <div class="sidebar-container flex-box flex_d-column">
    <Logo />
    <el-scrollbar class="flex-item_f-1">
      <el-menu
        :background-color="theme.backgroundColor"
        :text-color="theme.textColor"
        :active-text-color="theme.activeTextColor">
        <el-menu-item index="home" v-for="item in 10" :key="item">
          <g-iconfont name="home" class="sidebar-menu-icon" size="14px" />
          <template #title>
            <span>首页</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Logo from './components/logo.vue'

export default defineComponent({
  components: { Logo },
  setup() {
    const store = useStore()
    const menus = computed(() => store.getters['menu/menus'])
    const theme = computed(() => store.state.theme.theme.menu)

    return {
      theme
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  background-color: var(--gl-sidebar-background-color);
  .el-menu:not(.el-menu--collapse) {
    width: var(--gl-sidebar-width); // todo: 侧边栏的宽度
  }
  .el-menu {
    border: none;
  }
}
</style>
