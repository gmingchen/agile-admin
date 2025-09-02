<template>
  <div :class="n.b()">
    <div v-if="$slots.top" :class="n.e('top')">
      <slot name="top"></slot>
    </div>
    <el-scrollbar class="f_f-1">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useNamespace } from '@/hooks';
const n = useNamespace('sidebar')
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(sidebar) {
  background-color: var(--sidebar-background-color);
  background-color: var(--sidebar-background-color);
  box-shadow: var(--el-box-shadow-light);
  display: flex;
  flex-direction: column;

  @include e(top) {
    height: var(--headbar-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
