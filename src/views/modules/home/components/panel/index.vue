<template>
  <div :class="n.b()">
    <div :class="n.e('title')">{{ title }}</div>
    <div :class="n.e('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useNamespace } from '@/hooks'

const n = useNamespace('panel')

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: panel#{$element-separator};
@include b(panel) {
  padding: 10px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--container-background-color);
  @include e(title) {
    font-size: 18px;
    font-weight: 700;
  }
  @include e(content) {
    margin-top: 10px;
  }
}
</style>
