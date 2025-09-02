<template>
  <div :class="n.b()">
    <slot name="left"></slot>
    <div class="f_f-1">
      <slot></slot>
    </div>
    <div class="f_ai-center g-10">
      <FullScreen></FullScreen>
      <Refresh></Refresh>
      <Clear></Clear>
      <ThemeMode></ThemeMode>
      <User></User>
    </div>
  </div>
</template>

<script setup>
import { FullScreen, Refresh, Clear, ThemeMode, User, } from './components'
import { useNamespace } from '@/hooks'
const n = useNamespace('headbar')
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(headbar) {
  padding: 0 10px;
  height: var(--headbar-height);
  background-color: var(--headbar-background-color);
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
}
</style>
