<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-07 13:58:47
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 10:12:56
-->
<template>
  <el-scrollbar class="sidebar" :style="{ 'height': `${ document.clientHeight }px` }">
    <el-menu
      background-color="#263238"
      text-color="#ffffff"
      active-text-color="#409EFF"
      class="sidebar-menu"
      :default-active="active || 'home'"
      :collapse="isCollapse">
      <el-menu-item index="home" @click="router.push({ name: 'home' })">
        <svg-icon name="home" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>{{ t('menu.home') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="demo" @click="router.push({ name: 'demo' })">
        <svg-icon name="demo" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>{{ t('menu.demo') }}</span>
        </template>
      </el-menu-item>
      <sub-menu v-for="menu in menus" :key="menu.id" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch, watchEffect } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { key, useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import SubMenu from './sub-menu.vue'

export default defineComponent({
  components: { SubMenu },
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()

    const document = computed(() => store.state.setting.document)
    const active = computed(() => store.state.menu.active)
    const isCollapse = computed(() => store.state.menu.isCollapse)
    const menus = computed(() => store.getters['menu/processedMenu'])

    /**
     * @description: 路由变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const routeHandle = (argRoute: RouteLocationNormalizedLoaded): void => {
      const name: string = argRoute.name as string
      store.dispatch('menu/setActive', name)
    }

    // bug
    // watchEffect(() => {
    //   routeHandle(route)
    // })

    onBeforeMount(() => {
      routeHandle(route)
    })

    return {
      document,
      active,
      isCollapse,
      menus,
      router,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'Sass/_mixin.scss';
.sidebar-menu:not(.el-menu--collapse) {
  width: 200px; // todo: 此处的width 需要和 store/setting 中 sidebar.width、sidebar.openWidth 保持一致
}
.sidebar,
.sidebar-menu,
::v-deep(.el-menu),
::v-deep(.el-menu-item:hover, .el-menu-item:focus, .el-menu-item:active),
::v-deep(.el-submenu__title:hover) {
  background-color: #263238;
}
.sidebar-menu {
  border: none;
}
::v-deep(.sidebar-menu-icon) {
  margin: 0 5px;
  font-size: 12px;
}
::v-deep(.el-menu-item) {
  @include single-ellipse;
  padding-right: 20px;
}
::v-deep(.el-submenu__title) {
  @include single-ellipse;
  & > i {
    position: absolute;
    right: 8px;
  }
}
</style>
