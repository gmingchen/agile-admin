<!--
 * @Description: iframe
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-01 15:53:12
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 16:19:23
-->
<template>
  <div class="base-container" :style="style">
    <iframe :src="url" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
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

  protected url: string = ''

  get style(): IObject {
    const result: IObject = {
      height: this.documentClientHeight - this.navbarHeight - this.tabsHeight + 'px'
    }
    return result
  }

  activated() {
    this.url = this.$route.query.url as string
  }
}
</script>

<style lang="scss" scoped></style>
