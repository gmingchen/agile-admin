<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:56:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-21 10:51:49
-->
<template>
  <div>
    <sidebar class="sidebar" />
    <Main class="main" :style="{ height: documentClientHeight + 'px', 'margin-left': sidebarWidth + 'px' }" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Sidebar from './components/sidebar/index.vue'
import Main from './components/main/index.vue'
import { getUserInfo } from '@API/common'

const commonModule = namespace('common')
const userModule = namespace('user')

@Options({
  components: { Sidebar, Main }
})
export default class extends Vue {
  @commonModule.State('documentClientHeight')
  documentClientHeight!: number

  @commonModule.State('sidebarWidth')
  sidebarWidth!: number

  @commonModule.Action('setDocunentClientHeight')
  setDocunentClientHeight!: (arg: number) => void

  @userModule.Action('setId')
  setId!: (arg: string) => void

  @userModule.Action('setUsername')
  setUsername!: (arg: string) => void

  created() {
    this.getUserInfo()
  }

  mounted() {
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
   * @description: 获取当前用户信息
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  async getUserInfo(): Promise<void> {
    const r = await getUserInfo()
    if (r && r.code === 0) {
      this.setId(r.data.id)
      this.setUsername(r.data.username)
    }
  }
}
</script>

<style lang="scss" scope>
.sidebar {
  position: fixed;
  left: 0;
  height: 100%;
  z-index: 2;
}
.main {
  position: relative;
}
.sidebar,
.main,
.main .header {
  transition-duration: 0.4s;
  transition-property: width, margin-left;
}
</style>
