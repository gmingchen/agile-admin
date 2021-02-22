<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 15:45:53
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 15:29:47
-->
<template>
  <div class="main">
    <el-scrollbar :style="{ height: documentClientHeight + 'px' }">
      <div class="header" :style="style">
        <navbar />
        <tabs v-if="tabsDisplay" />
      </div>
      <content />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Navbar from '../navbar/index.vue'
import Tabs from '../tabs/index.vue'
import Content from '../content/index.vue'
import { IObject } from '@/utils/index.type'

const commonModule = namespace('common')

@Options({
  components: { Navbar, Tabs, Content }
})
export default class extends Vue {
  @commonModule.State('documentClientHeight')
  documentClientHeight!: number
  @commonModule.State('navbarHeight')
  navbarHeight!: number
  @commonModule.State('tabsHeight')
  tabsHeight!: number
  @commonModule.State('sidebarWidth')
  sidebarWidth!: number
  @commonModule.State('headerFixed')
  headerFixed!: boolean
  @commonModule.State('tabsDisplay')
  tabsDisplay!: boolean

  get style(): IObject {
    let result: IObject = {}
    if (this.headerFixed) {
      result = {
        position: 'fixed',
        top: 0,
        right: 0,
        'z-index': 10,
        width: `calc(100% - ${this.sidebarWidth}px)`
      }
    }
    return result
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .header {
    background-color: white;
  }
}
</style>
