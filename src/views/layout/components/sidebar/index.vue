<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-07 13:58:47
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:48:29
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
      <el-menu-item index="home" @click="$router.push({ name: 'home' })">
        <svg-icon name="home" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>{{ $t('menu.home') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="demo" @click="$router.push({ name: 'demo' })">
        <svg-icon name="demo" class="sidebar-menu-icon" size="14px" />
        <template #title>
          <span>{{ $t('menu.demo') }}</span>
        </template>
      </el-menu-item>
      <sub-menu v-for="menu in menus" :key="menu.id" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Inject, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import SubMenu from './sub-menu.vue'
import { IDocument } from '@/store/modules/common/index.type'
import { ISideMenu } from '@/store/modules/menu/index.type'
import { RouteLocationNormalizedLoaded } from 'vue-router'

const menuModule = namespace('menu')

@Options({
  components: { SubMenu }
})
export default class extends Vue {
  @Inject('document') readonly document!: IDocument

  @menuModule.State('active')
  readonly active!: string
  @menuModule.State('isCollapse')
  readonly isCollapse!: boolean

  @menuModule.Getter('processedMenu')
  readonly menus!: ISideMenu[]

  @menuModule.Action('setActive')
  setActive!: (arg: string) => void

  @Watch('$route')
  onRoute(route: RouteLocationNormalizedLoaded): void {
    this.routeHandle(route)
  }

  created(): void {
    this.routeHandle(this.$route)
  }

  /**
   * @description: 路由变化事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  routeHandle(route: RouteLocationNormalizedLoaded): void {
    const active: string = route.name as string
    this.setActive(active)
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_mixin.scss';
.sidebar-menu:not(.el-menu--collapse) {
  width: 200px; // todo: 此处的width 需要和 store/common 中 sidebar.width、sidebar.openWidth 保持一致
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
