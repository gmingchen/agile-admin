<!--
 * @Description: 路由展示入口
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-05 10:07:59
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 16:14:05
-->
<template>
  <div class="contant" :style="style">
    <router-view v-slot="{ Component }">
      <transition name="leftIn-rightOut" mode="out-in">
        <keep-alive v-if="$route.meta.keepAlive">
          <component :is="Component" class="component"></component>
        </keep-alive>
        <component :is="Component" class="component" v-else></component>
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
  @commonModule.State('tabsDisplay')
  tabsDisplay!: boolean

  get style(): IObject {
    let result: IObject = {}
    if (this.headerFixed) {
      result = {
        'min-height': this.documentClientHeight + 'px',
        'padding-top': this.navbarHeight + (this.tabsDisplay ? this.tabsHeight : 0) + 'px'
      }
    } else {
      result = {
        'min-height': `${this.documentClientHeight - this.navbarHeight - (this.tabsDisplay ? this.tabsHeight : 0)}px`
      }
    }
    return result
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_variable.scss';
.contant {
  position: relative;
  background-color: $bgColor;
  .component {
    text-align: left;
  }
}
</style>
