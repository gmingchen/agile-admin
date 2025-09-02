<template>
  <el-tooltip
    content="折叠/展开菜单"
    placement="bottom"
    :show-after="500"
    :hide-after="0">
    <Icon class="c-pointer" :name="`collapse-${collapse ? 'right' : 'left'}`" @click="onToggle" />
  </el-tooltip>
</template>

<script setup>
import { Icon } from '@/components'
import { useMenuStore } from '@/stores'
import { useNamespace } from '@/hooks';

const n = useNamespace('menu-collapse')

const menuStore = useMenuStore()
const { collapse } = storeToRefs(menuStore)

const onToggle =() => {
  collapse.value = !collapse.value
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(menu-collapse) {}
</style>
