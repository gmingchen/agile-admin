<script setup>
import SubMenu from '../../../sub-menu/index.vue'

const route = useRoute()

const menuStore = useMenuStore()
const themeStore = useThemeStore()

const menuTheme = computed(() => themeStore.color.menu)

const { displayedMenus, active } = storeToRefs(menuStore)

/**
 * @description: 路由变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const routeHandle = argRoute => {
  const name = argRoute.name
  active.value = name
}

watchEffect(() => {
  routeHandle(route)
})
</script>

<template>
  <div class="menu-container margin-n-20 flex-item_f-1">
    <el-menu
      :default-active="active"
      :text-color="menuTheme.textColor"
      :active-text-color="menuTheme.activeTextColor"
      :unique-opened="true"
      mode="horizontal">
      <el-menu-item class="menu-slot">
        <slot />
      </el-menu-item>
      <div class="flex_g-1" />
      <SubMenu
        v-for="item in displayedMenus"
        :key="item.id"
        :data="item" />
      <div class="flex_g-1" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  max-width: 100%;
  min-width: 600px;
  .el-menu {
    // flex: 1;
    // max-width: 100%;
    // min-width: 300px;
    border: none;
    // display: flex;
    .menu-slot {
      &:hover {
        color: unset;
        background-color: unset;
        cursor: unset;
      }
    }
  }
}
</style>
