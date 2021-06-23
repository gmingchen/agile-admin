<template>
  <div>
    <el-card class="card">
      <ul>
        <li>基于vue3.0、element-plus、typescript，以class的模式构建开发，实现后台管理前端功能</li>
        <li>前后端分离，通过token进行数据交互，可独立部署</li>
        <li>动态菜单，通过菜单管理统一管理访问路由</li>
      </ul>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>Web</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="wabData[0]"
            border
            :show-header="false"
            style="width: 100%">
            <el-table-column align="right" prop="key" />
            <el-table-column align="left" prop="val" />
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="wabData[1]"
            border
            :show-header="false"
            style="width: 100%">
            <el-table-column align="right" prop="key" />
            <el-table-column align="left" prop="val" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>Java</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="javaData[0]"
            border
            :show-header="false"
            style="width: 100%">
            <el-table-column align="right" prop="key" />
            <el-table-column align="left" prop="val" />
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="javaData[1]"
            border
            :show-header="false"
            style="width: 100%">
            <el-table-column align="right" prop="key" />
            <el-table-column align="left" prop="val" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const wabData = reactive([
      [
        { key: 'vue', val: '^3.1.2' },
        { key: 'vue-router', val: '^4.0.10' },
        { key: 'vuex', val: '^4.0.2' },
        { key: 'axios', val: '^0.21.1' },
        { key: 'core-js', val: '^3.6.5' },
        { key: 'element-plus', val: '^1.0.2-beta.46' },
        { key: 'js-cookie', val: '^3.0.0-rc.1' },
        { key: 'lodash', val: '^4.17.21' },
        { key: 'nprogress', val: '^0.2.0' },
        { key: 'screenfull', val: '^5.1.0' },
        { key: 'svg-sprite-loader', val: '^6.0.8' }
      ],
      [
        { key: '@babel/eslint-parser', val: '7.14.7' },
        { key: '@vue/cli-plugin-babel', val: '~4.5.0' },
        { key: '@vue/cli-plugin-eslint', val: '~4.5.0' },
        { key: '@vue/cli-plugin-router', val: '~4.5.0' },
        { key: '@vue/cli-plugin-vuex', val: '~4.5.0' },
        { key: '@vue/cli-service', val: '~4.5.0' },
        { key: '@vue/compiler-sfc', val: '^3.0.0' },
        { key: 'babel-plugin-component', val: '^1.1.1' },
        { key: 'eslint', val: '^6.7.2' },
        { key: 'eslint-plugin-vue', val: '^7.0.0' },
        { key: 'sass', val: '^1.35.1' },
        { key: 'sass-loader', val: '^8.0.2' },
        { key: 'webpack-bundle-analyzer', val: '^4.4.2' }
      ]
    ])
    const javaData = reactive([
      [
        { key: 'java', val: '1.8' },
        { key: 'spring-boot', val: '2.4.4' },
        { key: 'mysql', val: '8.0.23' },
        { key: 'druid', val: '1.2.5' },
        { key: 'mybatis-plus', val: '3.4.2' },
        { key: 'shiro', val: '1.7.1' },
        { key: 'hibernate-validator', val: '6.1.7.Final' }
      ],
      [
        { key: 'kaptcha', val: '2.3.2' },
        { key: 'commons-lang3', val: '3.12.0' },
        { key: 'commons-io', val: '2.8.0' },
        { key: 'fastjson', val: '1.2.75' },
        { key: 'gson', val: '2.8.6' },
        { key: 'lombok', val: '1.18.18' }
      ]
    ])
    return {
      wabData,
      javaData
    }
  }
})
</script>

<style>
.card + .card {
  margin-top: 20px;
}
</style>
