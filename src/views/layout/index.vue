<template>
  <div :class="n.b()">
    <Frame :mode="mode">
      <template #headbar>
        <Headbar :class="n.e('headbar')">
          <template #left>
            <MenuCollapse></MenuCollapse>
          </template>
          <Crumb class="ml-10"></Crumb>
        </Headbar>
      </template>
      <template #sidebar>
        <Sidebar :class="n.e('sidebar')">
          <template #top>
            <Brand :collapse="collapse"></Brand>
          </template>
          <Menu :data="menus" :active="active" :collapse="collapse"></Menu>
        </Sidebar>
      </template>
      <Tabbar :class="n.e('tabbar')"></Tabbar>
      <View v-if="!refresh" transition="left-in-right-out"></View>
    </Frame>
  </div>
</template>

<script setup>
import { View } from '@/components'
import { Frame, Headbar, Sidebar, Tabbar, Brand, Crumb, Menu, MenuCollapse } from './components'
import { useMenuStore, useSystemStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('layout')

const route = useRoute()

const menuStore = useMenuStore()
const { menus, active, collapse, } = storeToRefs(menuStore)
const systemStore = useSystemStore()
const { refresh } = storeToRefs(systemStore)

watchEffect(() => {
  active.value = route.name + ''
})

const mode = ref('horizontal')
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(layout) {
  height: 100%;
  overflow: hidden;
  @include e(headbar) {
    z-index: 3;
  }
  @include e(sidebar) {
    z-index: 4;
  }
  @include e(tabbar) {
    z-index: 2;
    flex-shrink: 0;
  }

  .el-menu:not(.el-menu--collapse) {
    width: var(--sidebar-menu-width);
  }
}
</style>
