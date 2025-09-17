<template>
  <el-radio-group :class="n.b()" v-bind="$attrs">
    <el-radio v-for="item in list" :key="item.code" :label="item.name" :value="item.code" />
  </el-radio-group>
</template>

<script setup>
import { useNamespace } from '@/hooks'
const n = useNamespace('dict-radio-button')

defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(dict-radio-button) {}
</style>
