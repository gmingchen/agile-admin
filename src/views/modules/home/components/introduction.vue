<script setup>
import { ref } from 'vue'

const logo = ref('https://admin.gumingchen.icu/file/static/slipper.jpeg')
const document = ref('http://admin.gumingchen.icu/doc/')
const texts = ref([
  'Java + Vue 有很多优秀的后台管理系统，但是为了可以高效的开发后台权限管理系统，作者就自己开发出 Agile Admin。',
  'Agile Admin 是一个基于 Vue3 + Element-plus + Java 的租户后台权限管理系统，提供了完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。',
  '可以用于网站管理后台、SAAS、CMS、CRM、OA、ERP等，企业和个人都可以免费使用。欢迎提交PR（需求），若开发中遇到问题可以上 Github 提 Issues。'
])

const documentHandle = () => {
  window.open(document.value)
}
</script>

<template>
  <div class="padding-10">
    <div class="panel padding-15">
      <div class="panel-title margin_b-10 font-size-18">简介</div>
      <div class="panel-content text-align-center">
        <el-image :src="logo" class="height-100 width-100" />
        <h2>欢迎体验 Agile Admin</h2>
        <div class="text margin_b-10 font-size-14 text-align-left" v-for="(item, index) in texts" :key="index">{{ item }}</div>
        <el-button type="primary" @click="documentHandle()">文档</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: fit-content;
  min-width: 400px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--gl-content-panel-background-color);
  &-title {
    font-weight: 700;
  }
  &-content {
    .text {
      text-indent: 2em;
    }
  }
}
</style>
