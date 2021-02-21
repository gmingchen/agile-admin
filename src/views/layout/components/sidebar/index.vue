<!--
 * @Description: 侧边栏菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 16:45:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-21 14:09:17
-->
<template>
  <aside class="sidebar" :style="{ width: sidebarWidth + 'px' }">
    <el-scrollbar :style="{ height: 100 + '%' }">
      <el-menu :default-active="menuActive || 'home'" :collapse="!isCollapse">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <svg-icon name="menu-home" class="sidebar-menu-icon" size="14px"></svg-icon>
          <template #title>
            <span>首页</span>
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

const authModule = namespace('auth')
const commonModule = namespace('common')

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

  @commonModule.State('menuActive')
  menuActive!: string
  @authModule.Getter('getMenus')
  getMenus!: Array<IMenu>

  get isCollapse(): boolean {
    return this.sidebarOpend
  }
  set isCollapse(val: boolean) {
    this.setSidebarOpend(val)
  }

  mounted() {
    console.log(this.getMenus)
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.sidebar {
  @include shadow;
  text-align: left;
  background-color: white;
  ::v-deep(.el-menu) {
    border: none;
  }
}
</style>

<style lang="scss">
.sidebar-menu-icon {
  margin: 0 5px;
  font-size: 12px;
}
</style>
