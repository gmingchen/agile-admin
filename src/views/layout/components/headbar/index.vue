<template>
  <div class="headbar-container padding-n-10 flex-box flex_w-wrap flex_a_i-center">
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
    <Action />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@stores/menu'

import Crumb from './components/crumb.vue'
import Action from './components/action.vue'

const menuStore = useMenuStore()
const { collapse } = storeToRefs(menuStore)

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
