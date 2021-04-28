<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-07 13:59:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:29:17
-->
<template>
  <div class="headbar-wrap">
    <el-tooltip
      :style="style"
      placement="right"
      effect="dark"
      :show-after="1000"
      :enterable="false"
      :content="$t('tip.menuCollapse')">
      <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="foldHandle()" />
    </el-tooltip>
    <actionbar class="actionbar" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Actionbar from './actionbar.vue'
import { Navbar } from '@/store/modules/common'
import { IObject } from '@/types'

const commonModule = namespace('common')
const menuModule = namespace('menu')

@Options({
  components: { Actionbar }
})
export default class extends Vue {
  @commonModule.State('navbar')
  @Provide('navbar') readonly navbar!: Navbar
  @menuModule.State('isCollapse')
  readonly isCollapse!: Navbar
  @menuModule.Action('setIsCollapse')
  setIsCollapse!: (arg: boolean) => void
  @commonModule.Action('setSidebarWidth')
  setSidebarWidth!: (arg?: boolean) => void

  @Provide('style') get style(): IObject {
    return {
      'line-height': `${ this.navbar.headHeight }px`
    }
  }

  foldHandle(): void {
    this.setSidebarWidth(!this.isCollapse)
    this.setIsCollapse(!this.isCollapse)
  }
}
</script>

<style lang="scss" scoped>
.headbar-wrap {
  padding: 0 10px;
  & > i {
    cursor: pointer;
  }
  .actionbar {
    float: right;
  }
}
</style>
