<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-03 23:39:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 17:36:39
-->
<template>
  <el-container>
    <sidebar class="sidebar" />
    <!-- // todo: 处理动画问题 -->
    <div
      class="main-wrap"
      :style="{
        'width': `calc(100% - ${ sidebar.width }px)`,
        'transition-duration': isCollapse ? '0s' : '0.9s'
      }">
      <el-scrollbar :style="{ height: document.clientHeight + 'px' }">
        <div :class="{ 'head-wrap': navbar.fixed }">
          <headbar class="headbar" :style="{ 'height': `${ navbar.headHeight }px` }" />
          <tabsbar class="tabsbar" v-if="navbar.tabsDisplay" :style="{ 'height': `${ navbar.tabsHeight }px` }" />
        </div>
        <div v-if="!set.refresh" :style="{ 'padding-top': navbar.fixed ? `${ navbar.headHeight + (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` : '0px' }">
          <!-- <el-scrollbar :style="navbar.fixed ? { 'height': `${ document.clientHeight - navbar.headHeight - (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` } : {}"> -->
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in">
              <keep-alive v-if="$route.meta.keepAlive">
                <component :is="Component" class="component" />
              </keep-alive>
              <component :is="Component" class="component" v-else />
            </transition>
          </router-view>
          <!-- </el-scrollbar> -->
        </div>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { Provide } from 'vue-property-decorator'
import Sidebar from './components/sidebar/index.vue'
import Headbar from './components/headbar/index.vue'
import Tabsbar from './components/tabsbar/index.vue'
import { getUserInfo } from '@/api/login'
import { $isAuth, $clearJson } from '@/utils/index'
import { IObject } from '@/types'
import { User } from '@/types/user'
import { Document, Navbar, Set, Sidebar as ISidebar } from '@/store/modules/common'

const userModule = namespace('user')
const commonModule = namespace('common')
const menuModule = namespace('menu')

@Options({
  components: { Sidebar, Headbar, Tabsbar }
})
export default class extends Vue {
  @commonModule.State('document')
  @Provide('document') readonly document!: Document
  @commonModule.State('sidebar')
  readonly sidebar!: ISidebar
  @commonModule.State('navbar')
  @Provide('navbar') readonly navbar!: Navbar
  @commonModule.State('set')
  @Provide('set') readonly set!: Set
  @commonModule.Action('setDocunentClientHeight')
  setDocunentClientHeight!: (arg: number) => void

  @menuModule.State('isCollapse')
  readonly isCollapse!: boolean

  @userModule.Action('setUser')
  setUser!: (arg: User.Vo) => void

  @Provide('isAuth') isAuth: (arg: string) => boolean = $isAuth
  @Provide('clearJson') clearJson: (arg: IObject) => void = $clearJson

  created(): void {
    this.getUserInfo()
  }

  mounted(): void {
    this.resizeDocumentClientHeight()
  }

  /**
   * @description: 重置页面文档可视高度
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  resizeDocumentClientHeight(): void {
    let height: number = document.documentElement['clientHeight']
    this.setDocunentClientHeight(height)
    window.onresize = (): void => {
      height = document.documentElement['clientHeight']
      this.setDocunentClientHeight(height)
    }
  }

  /**
   * @description: 获取登录用户信息存储到vuex
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getUserInfo(): void {
    getUserInfo().then(r => {
      if (r) {
        this.setUser(r.data)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_mixin.scss';
.sidebar {
  @include box-shadow;
}
.headbar, .tabsbar {
  @include box-shadow1;
}
.el-fade-in-leave-active { // 处理动画不流畅闪烁的问题
  display: none;
}
.main-wrap {
  .head-wrap {
    width: 100%;
    position: absolute;
    z-index: 20;
    background-color: white;
  }
  .component {
    padding: 20px 10px;
  }
}

</style>
