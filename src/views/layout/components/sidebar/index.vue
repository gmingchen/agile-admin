<!--
 * @Description: 侧边栏菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 16:45:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-21 09:54:51
-->
<template>
  <aside class="sidebar" :style="{ width: sidebarWidth + 'px' }">
    <el-scrollbar :style="{ height: 100 + '%' }">
      <el-menu default-active="1" @open="openHandle" @close="closeHandle" :collapse="!isCollapse">
        <item />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Item from './item.vue'
import { IMenu } from '@/store/modules/auth/index.type'

const authModule = namespace('auth')
const commonModule = namespace('common')

@Options({
  components: { Item }
})
export default class extends Vue {
  @commonModule.State('sidebarOpend')
  sidebarOpend!: boolean
  @commonModule.Action('setSidebarOpend')
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
  text-align: left;
  background-color: white;
  ::v-deep(.el-menu) {
    border: none;
  }
}
</style>
