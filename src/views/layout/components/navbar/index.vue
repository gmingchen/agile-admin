<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 15:41:07
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-24 09:39:43
-->
<template>
  <div class="navbar" :style="navbarStyle">
    <span class="collapse" :style="{ 'line-height': navbarStyle['height'] }" @click="foldHandle">
      <i :class="sidebarOpend ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
    </span>
    <crumbs v-if="false" class="crumbs" :style="{ 'line-height': navbarStyle['height'] }" />
    <tools class="tools" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Crumbs from '../crumbs/index.vue'
import Tools from '../tools/index.vue'

const commonModule = namespace('common')

@Options({
  components: { Crumbs, Tools }
})
export default class extends Vue {
  @commonModule.State('navbarHeight')
  navbarHeight!: number
  @commonModule.State('sidebarOpend')
  sidebarOpend!: boolean
  @commonModule.Action('setSidebarOpend')
  setSidebarOpend!: (arg: boolean) => void
  @commonModule.Action('setSidebarWidth')
  setSidebarWidth!: (arg: number) => void

  protected navbarStyle = {
    height: ''
  }

  created() {
    this.navbarStyle = {
      height: `${this.navbarHeight}px`
    }
  }

  /**
   * @description: 菜单折叠张开事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  foldHandle(): void {
    this.setSidebarOpend(!this.sidebarOpend)
    // this.$nextTick(() => {
    //   this.setSidebarWidth(64)
    // })
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.navbar {
  @include shadow;
  padding: 0 10px;
  .collapse {
    float: left;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  .crumbs {
    float: left;
  }
  .tools {
    float: right;
  }
}
</style>
