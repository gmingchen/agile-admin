<template>
  <el-select :class="n.b()" v-bind="$attrs">
    <el-option v-for="item in list" :key="item.code" :label="item.name" :value="item.code" />
  </el-select>
</template>

<script setup>
import { useNamespace } from '@/hooks';
const n = useNamespace('dict-select')

defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(dict-select) {}
</style>
