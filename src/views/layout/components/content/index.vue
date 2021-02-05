<!--
 * @Description: 路由展示入口
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-05 10:07:59
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 11:13:03
-->
<template>
  <div class="contant" :style="style">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { IObject } from '@/utils/index.type'

const commonModule = namespace('common')

@Options({})
export default class extends Vue {
  @commonModule.State('documentClientHeight')
  documentClientHeight!: number
  @commonModule.State('navbarHeight')
  navbarHeight!: number
  @commonModule.State('tabsHeight')
  tabsHeight!: number
  @commonModule.State('headerFixed')
  headerFixed!: boolean

  get style(): IObject {
    let result: IObject = {}
    if (this.headerFixed) {
      result = {
        'min-height': this.documentClientHeight + 'px',
        'padding-top': this.navbarHeight + this.tabsHeight + 'px'
      }
    } else {
      result = {
        height: this.documentClientHeight - this.navbarHeight - this.tabsHeight + 'px'
      }
    }
    return result
  }
}
</script>

<style lang="scss" scope>
.contant {
  position: relative;
  background-color: #f0f2f5;
}
</style>
