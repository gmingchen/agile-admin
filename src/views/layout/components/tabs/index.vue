<!--
 * @Description: 标签页
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 17:11:58
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 17:20:36
-->
<template>
  <div class="tabs" :style="{ height: tabsHeight + 'px' }">
    <el-tabs class="tabs-width" type="card" v-model="active" @tab-click="clickHandle" @tab-remove="delHandle">
      <el-tab-pane v-for="item in tabsList" :key="item.value" :label="item.label" :name="item.value" :closable="!item.closable" />
    </el-tabs>
    <div class="tabs-dropdown" :style="{ 'line-height': tabsHeight + 'px' }">
      <el-dropdown>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>刷新当前标签</el-dropdown-item>
            <el-dropdown-item>关闭当前标签</el-dropdown-item>
            <el-dropdown-item>关闭至最左侧</el-dropdown-item>
            <el-dropdown-item>关闭至最右侧</el-dropdown-item>
            <el-dropdown-item>关闭其他标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { ITab, ITabDelParam } from '@/store/modules/tabs/index.type'

const commonModule = namespace('common')
const tabsModule = namespace('tabs')

@Options({})
export default class extends Vue {
  @commonModule.State('tabsHeight')
  tabsHeight!: number
  @tabsModule.State('tabsList')
  tabsList!: Array<ITab>
  @tabsModule.State('tabsActive')
  tabsActive!: string
  @tabsModule.Action('setTabsActive')
  setTabsActive!: (arg: string) => void
  @tabsModule.Action('delTab')
  delTab!: (arg: ITabDelParam) => void
  @tabsModule.Action('clickTab')
  clickTab!: () => void

  get active(): string {
    return this.tabsActive
  }
  set active(val: string) {
    this.setTabsActive(val)
  }

  /**
   * @description: 标签点击事件 路由跳转
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  clickHandle(): void {
    this.clickTab()
  }

  /**
   * @description: 删除标签事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  delHandle(val: string): void {
    const param: ITabDelParam = {
      type: 'current',
      value: val
    }
    this.delTab(param)
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
@import '@SASS/_variable.scss';
.tabs {
  @include shadow;
  position: relative;
  padding: 0 0 0 10px;
  ::v-deep(.el-tabs--card > .el-tabs__header) {
    margin: 0;
    border: none;
  }
  ::v-deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    border-bottom: none;
  }
  .tabs-width {
    width: calc(100% - 40px);
  }
  .tabs-dropdown {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    background-color: $bgColor;
  }
}
</style>
