<template>
  <div class="sidebar-classic-container flex-box flex_d-column">
    <Logo :collapse="collapse" />
    <el-scrollbar class="flex-item_f-1">
      <el-menu
        :default-active="active"
        :background-color="theme.backgroundColor !== '#fff' ? theme.backgroundColor : ''"
        :text-color="theme.textColor"
        :active-text-color="theme.activeTextColor"
        :unique-opened="true"
        :collapse="collapse">
        <SubItem
          v-for="item in displayedMenus"
          :key="item.id"
          :data="item"
          :collapse="collapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@stores/menu'
import { useThemeStore } from '@stores/theme'

import Logo from '../components/logo.vue'
import SubItem from '../components/sub-item.vue'

const route = useRoute()

const themeStore = useThemeStore()
const menuStore = useMenuStore()

const theme = computed(() => themeStore.theme.menu)

const { displayedMenus, active, collapse } = storeToRefs(menuStore)

</script>

<style lang="scss" scoped>
.sidebar-classic-container {
  z-index: 10;
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
