<!--
 * @Description: 侧边栏菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 16:45:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 16:03:30
-->
<template>
  <div class="sidebar">
    <el-scrollbar :style="{ height: 100 + '%' }"> </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
.sidebar {
  @include shadow;
  background-color: white;
}
</style>
