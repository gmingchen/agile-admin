<template>
  <div class="headbar-container padding-n-10 flex flex_w-wrap flex_j_c-space-between flex_a_i-center">
    <template v-if="menuLayoutMode === 3">
      <Logo :collapse="false"  />
      <Menu />
    </template>
    <div class="flex flex_a_i-center" v-else>
      <el-tooltip
        content="折叠/展开菜单"
        placement="bottom"
        :show-after="500"
        :hide-after="0"
        transition="">
        <Iconfont
          class="cursor-pointer margin_r-20"
          :name="`collapse-${collapse ? 'right' : 'left'}`"
          @click="collapseHandle" />
      </el-tooltip>
      <Crumb />
    </div>

    <Action />
  </div>
</template>

<script setup>
import Logo from '../logo/index.vue'
import Crumb from './components/crumb/index.vue'
import Action from './components/action/index.vue'
import Menu from './components/menu/index.vue'

const menuStore = useMenuStore()
const { collapse } = storeToRefs(menuStore)

const themeStore = useThemeStore()

const menuLayoutMode = computed(() => themeStore.layout.menuLayoutMode)

/**
 * @description: 菜单栏折叠事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const collapseHandle = () => {
  collapse.value = !collapse.value
}
</script>

<style lang="scss" scoped>
.headbar-container {
  z-index: 10;
  min-height: var(--gl-headbar-height);
  background-color: var(--gl-headbar-background-color);
  box-shadow: var(--el-box-shadow-light);
}
</style>
