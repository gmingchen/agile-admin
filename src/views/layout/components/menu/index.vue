<template>
  <el-menu
    :class="n.b()"
    :default-active="active"
    :unique-opened="true"
    :collapse="collapse">
    <MenuSub
      v-for="item in data"
      :key="item.id"
      :data="item"
      :collapse="collapse" />
  </el-menu>
</template>

<script setup>
import MenuSub from './menu-sub.vue'
import { useNamespace } from '@/hooks'
const n = useNamespace('menu')

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  active: {
    type: [String, Number],
    default: () => '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(menu) {
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
</style>
