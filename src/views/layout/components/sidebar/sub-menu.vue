<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-21 08:47:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-15 14:52:24
-->
<template>
  <el-submenu :index="menu.routeName || menu.id + ''" v-if="menu.children.length">
    <template #title>
      <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px" />
      <span>{{ menu[`name_${ language }`] }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item :index="menu.routeName || menu.id + ''" @click="routeHandle()" v-else>
    <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px" />
    <template #title>
      <span>{{ menu[`name_${ language }`] }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import SubMenu from './sub-menu.vue'
import { isURL } from '@/utils/regular'
import { ISideMenu } from '@/store/modules/menu/index.type'

const commonModule = namespace('common')

@Options({
  components: { SubMenu }
})
export default class extends Vue {
  name = 'sub-menu'

  @commonModule.Getter('language')
  readonly language!: string

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
    if (isURL(this.menu.routePath)) {
      this.$router.push({ name: 'iframe', query: { url: this.menu.routePath } })
    } else {
      this.$router.push({ name: this.menu.routeName })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.sidebar-menu-icon) {
  margin: 0 5px;
  font-size: 12px;
}
</style>
