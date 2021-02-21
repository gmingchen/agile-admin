<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-21 08:47:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-21 15:34:02
-->
<template>
  <el-submenu :index="menu.routeName || menu.id + ''" v-if="menu.children.length">
    <template #title>
      <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px"></svg-icon>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item :index="menu.routeName || menu.id + ''" @click="routeHandle()" v-else>
    <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px"></svg-icon>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import SubMenu from './sub-menu.vue'
import { ISideMenu } from '@/store/modules/auth/index.type'

@Options({
  components: { SubMenu }
})
export default class extends Vue {
  name = 'sub-menu'
  @Prop({
    type: Object,
    requited: true,
    default: []
  })
  readonly menu!: ISideMenu

  /**
   * @description: 路由跳转处理
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  routeHandle(): void {
    this.$router.push({ name: this.menu.routeName })
  }
}
</script>
