<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-18 11:07:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 11:52:54
-->
<template>
  <div class="base-container">
    <h3>项目介绍</h3>
    <ul>
      <li>基于vue3.0、element-plus、typescript，以class的模式构建开发，实现后台管理前端功能</li>
      <li>前后端分离，通过token进行数据交互，可独立部署</li>
      <li>动态菜单，通过菜单管理统一管理访问路由</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.base-container {
  line-height: 1.5;
}
</style>
