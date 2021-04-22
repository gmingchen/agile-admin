<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 19:20:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:41:53
-->
<template>
  <div class="tabs">
    <el-tabs
      type="card"
      v-model="active"
      @tab-click="clickHandle"
      @tab-remove="removeHandle">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab[`label_${ language }`]"
        :name="tab.value"
        :closable="tab.closable" />
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ITab } from '@/store/modules/tab/index.type'
import { Pane } from 'element-plus/lib/el-tabs/src/tabs.vue'
import { RouteLocation } from 'vue-router'
import { IMeta } from '@/router/index.type'

const commonModule = namespace('common')
const tabModule = namespace('tab')

export default class extends Vue {
  @commonModule.Getter('language')
  readonly language!: string
  @commonModule.Action('setRefresh')
  setRefresh!: (arg: boolean) => void

  @tabModule.State('active')
  readonly tabActive!: string
  @tabModule.State('tabs')
  readonly tabs!: ITab[]
  @tabModule.Action('setActive')
  setActive!: (arg: string) => void
  @tabModule.Action('changeHandle')
  changeHandle!: (arg: RouteLocation) => void
  @tabModule.Action('removeHandle')
  remove!: (arg: string[]) => void

  get active(): string {
    return this.tabActive
  }
  set active(val: string) {
    this.setActive(val)
  }

  @Watch('$route')
  onRoute(route: RouteLocation): void {
    this.changeHandle(route)
    const meta = route.meta as unknown as IMeta
    if (meta.multiple) {
      this.setRefresh(true)
      this.$nextTick(() => {
        this.setRefresh(false)
      })
    }
  }

  created(): void {
    this.changeHandle(this.$route)
  }

  /**
   * @description: 标签点击路由跳转事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  clickHandle({ index }: Pane): void {
    const tab = this.tabs[+index]
    this.$router.push({
      name: tab.name,
      query: tab.query,
      params: tab.params
    })
  }

  /**
   * @description: 标签删除事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  removeHandle(name: string): void {
    this.remove([name])
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 9px 10px 0 10px;
  ::v-deep(.el-tabs__header) {
    margin: 0;
    border: none;
  }
}
</style>
