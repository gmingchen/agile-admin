<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 15:41:07
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-02 17:14:48
-->
<template>
  <div class="navbar" :style="navbarStyle">
    <crumbs class="crumbs" :style="{ 'line-height': navbarStyle['line-height'] }" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Crumbs from '../crumbs/index.vue'

const commonModule = namespace('common')

@Options({
  components: { Crumbs }
})
export default class extends Vue {
  @commonModule.State('navbarHeight')
  navbarHeight!: number

  private navbarStyle = {
    height: '',
    'line-height': ''
  }

  created() {
    this.navbarStyle = {
      height: `${this.navbarHeight}px`,
      'line-height': `${this.navbarHeight}px`
    }
  }
}
</script>

<style lang="scss" scope>
.navbar {
  .crumbs {
    float: left;
  }
}
</style>
