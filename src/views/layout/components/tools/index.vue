<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 17:24:00
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 11:17:00
-->
<template>
  <div class="tools">
    <div class="tool-item" :style="{ 'line-height': navbarHeight + 'px' }">
      <label>标签页：</label>
      <el-tooltip :content="display ? '显示' : '隐藏'" placement="top">
        <el-switch v-model="display" active-color="#13ce66" inactive-color="#ff4949" />
      </el-tooltip>
    </div>
    <div class="tool-item" :style="{ 'line-height': navbarHeight + 'px' }">
      <label>导航栏：</label>
      <el-tooltip :content="fixed ? '固定' : '不固定'" placement="top">
        <el-switch v-model="fixed" active-color="#13ce66" inactive-color="#ff4949" />
      </el-tooltip>
    </div>
    <div class="tool-item" :style="{ 'line-height': navbarHeight + 'px' }">
      <svg-icon name="full-screen" size="20px" @click="fullScreen" />
    </div>
    <el-dropdown class="tool-item" trigger="click" @command="commandHandle" :style="{ 'margin-top': (navbarHeight - 40) / 2 + 'px' }">
      <el-image class="portrait" :src="portrait" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="edit">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <edit-info v-model="visible" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import screenfull from 'screenfull'
import EditInfo from '../edit-info/index.vue'
import { logout } from '@API/common/index'
import { $clearLoginInfo } from '@U/index'
import portrait from '@AST/images/portrait.gif'

const commonModule = namespace('common')

@Options({
  components: { EditInfo }
})
export default class extends Vue {
  protected portrait: string = portrait + '?' + +new Date()

  @commonModule.State('navbarHeight')
  navbarHeight!: number

  @commonModule.State('tabsDisplay')
  tabsDisplay!: boolean
  @commonModule.Action('setTabsDisplay')
  setTabsDisplay!: (arg: boolean) => void

  @commonModule.State('headerFixed')
  headerFixed!: boolean
  @commonModule.Action('setHeaderFixed')
  setHeaderFixed!: (arg: boolean) => void

  @commonModule.State('screenFull')
  screenFull!: boolean
  @commonModule.Action('setScreenFull')
  setScreenFull!: (arg: boolean) => void

  get display() {
    return this.tabsDisplay
  }
  set display(val: boolean) {
    this.setTabsDisplay(val)
  }

  get fixed() {
    return this.headerFixed
  }
  set fixed(val: boolean) {
    this.setHeaderFixed(val)
  }

  protected visible: boolean = false

  /**
   * @description: 头像下拉菜单操作
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  commandHandle(command: string): void {
    switch (command) {
      case 'edit':
        this.visible = true
        break
      case 'exit':
        this.logout()
        break
    }
  }

  /**
   * @description: 退出登录
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  logout(): void {
    this['$confirm'](`确定进行[退出]操作?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const r = await logout()
      if (r) {
        $clearLoginInfo()
        this.$router.replace({ name: 'login' })
      }
    })
  }

  /**
   * @description: 设置全屏
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  fullScreen(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle()
      this.setScreenFull(screenfull.isFullscreen)
    } else {
      this['$message']({
        message: `Your browser doesn't support full screen`,
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tools {
  height: 100%;
  & > .tool-item {
    float: left;
  }
  ::v-deep(.tool-item + .tool-item) {
    margin-left: 10px;
    cursor: pointer;
  }
  .portrait {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
