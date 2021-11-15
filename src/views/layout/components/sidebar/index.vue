<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-07 13:58:47
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 16:15:49
-->
<template>
  <el-scrollbar class="sidebar">
    <el-menu
      background-color="#263238"
      text-color="#ffffff"
      active-text-color="#409EFF"
      class="sidebar-menu"
      :default-active="active || 'home'"
      :collapse-transition="true"
      :collapse="isCollapse">
      <el-menu-item index="home" @click="router.push({ name: 'home' })">
        <g-svg name="home" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="demo" @click="router.push({ name: 'demo' })">
        <g-svg name="demo" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>Demo</span>
        </template>
      </el-menu-item>
      <sub-menu v-for="menu in menus" :key="menu.id" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import SubMenu from './sub-menu.vue'

export default defineComponent({
  components: { SubMenu },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

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
    const routeHandle = argRoute => {
      const name = argRoute.name
      store.dispatch('menu/setActive', name)
    }

    watchEffect(() => {
      routeHandle(route)
    })

    return {
      document,
      active,
      isCollapse,
      menus,
      router
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.sidebar-menu:not(.el-menu--collapse) {
  width: 200px; // todo: 侧边栏的宽度
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
  display: block;
  padding-right: 20px;
  @include single-ellipse;
}
::v-deep(.el-sub-menu) {
  display: block;
}
::v-deep(.el-sub-menu__title) {
  display: block;
  @include single-ellipse;
  & > i {
    position: absolute;
    right: 8px;
  }
}
</style>
