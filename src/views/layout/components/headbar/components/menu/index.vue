<script setup>
import SubMenu from '../../../sub-menu/index.vue'

const menuStore = useMenuStore()
const themeStore = useThemeStore()

const menuTheme = computed(() => themeStore.color.menu)

const { displayedMenus, active } = storeToRefs(menuStore)

</script>

<template>
  <div class="menu-container margin-n-20 flex-item_f-1">
    <el-menu
      :default-active="active"
      :text-color="menuTheme.textColor"
      :active-text-color="menuTheme.activeTextColor"
      :unique-opened="true"
      mode="horizontal">
      <SubMenu
        v-for="item in displayedMenus"
        :key="item.id"
        :data="item" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  max-width: 100%;
  .el-menu {
    // flex: 1;
    // max-width: 100%;
    // min-width: 300px;
    border: none;
    // display: flex;
  }
}
</style>
