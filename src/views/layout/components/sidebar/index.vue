<!--
 * @Description: 侧边栏菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 16:45:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 16:36:51
-->
<template>
  <aside class="sidebar" :style="{ width: sidebarWidth + 'px' }">
    <el-scrollbar :style="{ height: 100 + '%' }">
      <el-menu
        background-color="#263238"
        text-color="#8a979e"
        active-text-color="#ffffff"
        class="sidebar-menu"
        :default-active="menuActive || 'home'"
        :collapse="!isCollapse"
      >
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <svg-icon name="menu-home" class="sidebar-menu-icon" size="14px"></svg-icon>
          <template #title>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="example" @click="$router.push({ name: 'example' })">
          <svg-icon name="menu-star" class="sidebar-menu-icon" size="14px"></svg-icon>
          <template #title>
            <span>demo</span>
          </template>
        </el-menu-item>
        <sub-menu v-for="menu in getMenus" :key="menu.id" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { IMenu } from '@/store/modules/auth/index.type'
import SubMenu from './sub-menu.vue'
import { Watch } from 'vue-property-decorator'
import { IObject } from '@/utils/index.type'
import { ITab } from '@/store/modules/tabs/index.type'

const commonModule = namespace('common')
const authModule = namespace('auth')
const tabsModule = namespace('tabs')

@Options({
  components: { SubMenu }
})
export default class extends Vue {
  @commonModule.State('sidebarOpend')
  sidebarOpend!: boolean
  @commonModule.Action('setSidebarOpend')
  setSidebarOpend!: (arg: boolean) => void

  @commonModule.State('sidebarWidth')
  sidebarWidth!: number

  @authModule.State('menuActive')
  menuActive!: string
  @authModule.Action('setMenuActive')
  setMenuActive!: (arg: string) => void

  @authModule.Getter('getMenus')
  getMenus!: Array<IMenu>

  @tabsModule.State('tabsList')
  tabsList!: Array<ITab>
  @tabsModule.Action('addTab')
  addTab!: (arg: ITab) => void

  @Watch('$route')
  onRoute(val: IObject) {
    this.routeHandle(val)
  }

  get isCollapse(): boolean {
    return this.sidebarOpend
  }
  set isCollapse(val: boolean) {
    this.setSidebarOpend(val)
  }

  created() {
    this.routeHandle(this.$route)
  }

  /**
   * @description: 路由变化事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  routeHandle(route: IObject): void {
    if (route.meta.isTab) {
      const tabsExist = this.tabsList.filter(item => {
        return item.value === route.meta.id + ''
      })
      if (tabsExist.length === 0) {
        const tab: ITab = {
          label: route.meta.title,
          value: route.name,
          name: route.name,
          path: route.path,
          query: route.query,
          params: route.params
        }
        this.addTab(tab)
      }
      this.setMenuActive(route.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.sidebar {
  @include shadow;
  text-align: left;
  ::v-deep(.el-menu) {
    border: none;
  }
}
</style>

<style lang="scss" scoped>
.sidebar,
::v-deep(.el-menu) {
  background-color: #263238;
}
::v-deep(.el-menu-item:hover, .el-menu-item:focus, .el-menu-item:active),
::v-deep(.el-submenu__title:hover) {
  background-color: #263238;
}
.sidebar-menu {
  min-height: 100%;
  background-color: transparent;
}
::v-deep(.sidebar-menu-icon) {
  margin: 0 5px;
  font-size: 12px;
}
</style>
