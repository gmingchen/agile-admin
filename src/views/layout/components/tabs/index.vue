<!--
 * @Description: 标签页
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 17:11:58
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 11:03:43
-->
<template>
  <div class="tabs" :style="{ height: tabsHeight + 'px' }">标签页</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'

const commonModule = namespace('common')

@Options({})
export default class extends Vue {
  @commonModule.State('tabsHeight')
  tabsHeight!: number
}
</script>

<style lang="scss" scope>
@import '@SASS/mixin.scss';
.tabs {
  @include shadow;
  padding: 0 10px;
}
</style>
