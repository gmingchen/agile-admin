<script setup>
import Logo from '../../../logo/index.vue'
import SubMenu from '../../../sub-menu/index.vue'

const menuStore = useMenuStore()
const themeStore = useThemeStore()

const menuTheme = computed(() => themeStore.color.menu)

const { displayedMenus, active, collapse } = storeToRefs(menuStore)
</script>

<template>
  <div class="sidebar-classic-container flex flex_d-column">
    <Logo :collapse="collapse" />
    <el-scrollbar class="flex-item_f-1">
      <el-menu
        :default-active="active"
        :background-color="menuTheme.backgroundColor"
        :text-color="menuTheme.textColor"
        :active-text-color="menuTheme.activeTextColor"
        :unique-opened="true"
        :collapse="collapse">
        <SubMenu
          v-for="item in displayedMenus"
          :key="item.id"
          :data="item"
          :collapse="collapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-classic-container {
  // z-index: 10; // todo: 忘记当初为什么会加这个属性
  background-color: var(--gl-sidebar-background-color);
  // box-shadow: var(--el-box-shadow-light);
  .el-menu:not(.el-menu--collapse) {
    width: var(--gl-sidebar-classic-width); // todo: 侧边栏的宽度
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
