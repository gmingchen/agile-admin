<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 15:41:07
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 11:03:12
-->
<template>
  <div class="navbar" :style="navbarStyle">
    <crumbs class="crumbs" :style="{ 'line-height': navbarStyle['height'] }" />
    <tools class="tools" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Crumbs from '../crumbs/index.vue'
import Tools from '../tools/index.vue'

const commonModule = namespace('common')

@Options({
  components: { Crumbs, Tools }
})
export default class extends Vue {
  @commonModule.State('navbarHeight')
  navbarHeight!: number

  private navbarStyle = {
    height: ''
  }

  created() {
    this.navbarStyle = {
      height: `${this.navbarHeight}px`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.navbar {
  @include shadow;
  padding: 0 10px;
  .crumbs {
    float: left;
  }
  .tools {
    float: right;
  }
}
</style>
