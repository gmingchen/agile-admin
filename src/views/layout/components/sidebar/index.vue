<!--
 * @Description: 侧边栏菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 16:45:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 17:32:27
-->
<template>
  <div class="sidebar">
    <el-scrollbar :style="{ height: 100 + '%' }">
      <el-menu default-active="1-4-1" :style="{ width: sidebarWidth + 'px' }" @open="openHandle" @close="closeHandle" :collapse="!isCollapse">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { IMenu } from '@/store/modules/auth/index.type'

const authModule = namespace('auth')
const commonModule = namespace('common')

@Options({})
export default class extends Vue {
  @commonModule.State('sidebarOpend')
  sidebarOpend!: boolean
  @commonModule.State('setSidebarOpend')
  setSidebarOpend!: (arg: boolean) => void

  @commonModule.State('sidebarWidth')
  sidebarWidth!: number

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

  openHandle(index: number): void {
    console.log(index)
  }
  closeHandle(index: number): void {
    console.log(index)
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.sidebar {
  @include shadow;
  background-color: white;
  ::v-deep(.el-menu) {
    border: none;
  }
}
</style>
