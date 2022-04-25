<template>
  <div class="sidebar-container flex-box flex_d-column">
    <Logo />
    <el-scrollbar class="flex-item_f-1">
      <el-menu
        :background-color="theme.backgroundColor !== 'white' ? theme.backgroundColor : ''"
        :text-color="theme.textColor"
        :active-text-color="theme.activeTextColor"
        :collapse="collapse">
        <SubItem v-for="item in menus" :key="item.value" :data="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Logo from './components/logo.vue'
import SubItem from './components/sub-item.vue'

export default defineComponent({
  components: { Logo, SubItem },
  setup() {
    const store = useStore()

    const theme = computed(() => store.state.theme.theme.menu)

    const menus = computed(() => store.getters['menu/menus'])

    const collapse = computed(() => store.state.menu.collapse)

    return {
      theme,
      menus,
      collapse
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
    ::v-deep(.el-menu-item) {
      padding-right: 20px;
    }
    ::v-deep(.el-menu-item), ::v-deep(.el-sub-menu), ::v-deep(.el-sub-menu__title) {
      display: block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      & > .el-sub-menu__icon-arrow {
        position: absolute;
        right: 8px;
      }
    }
  }
}

</style>
