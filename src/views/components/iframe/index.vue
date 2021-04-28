<!--
 * @Description: iframe
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-01 15:53:12
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-15 14:42:02
-->
<template>
  <div :style="style">
    <iframe
      :src="url"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="yes" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { IObject } from '@/types'
import { Document, Navbar } from '@/store/modules/common'

const commonModule = namespace('common')

@Options({})
export default class extends Vue {
  @commonModule.State('document')
  readonly document!: Document
  @commonModule.State('navbar')
  readonly navbar!: Navbar

  protected url: string = ''

  get style(): IObject {
    const result = {
      height: `${ this.document.clientHeight - this.navbar.headHeight - (this.navbar.tabsDisplay ? this.navbar.tabsHeight : 0) }px`
    }
    return result
  }

  activated(): void {
    this.url = this.$route.query.url as string
  }
}
</script>

<style lang="scss" scoped></style>
