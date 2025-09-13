<template>
  <div :class="n.b()">
    <Panel title="简介">
      <div :class="n.e('content')">
        <el-image :src="logo" class="s-100" />
        <h2>欢迎体验 Agile Admin</h2>
        <div :class="n.e('text')" v-for="(item, index) in texts" :key="index">{{ item }}</div>
        <el-button type="primary" @click="onDocument()">文档</el-button>
      </div>

    </Panel>
  </div>
</template>

<script setup>
import Panel from '../panel/index.vue'
import { useNamespace } from '@/hooks'

const n = useNamespace('introduction')

const logo = ref('https://admin.gumingchen.icu/file/static/slipper.jpeg')
const document = ref('http://admin.gumingchen.icu/doc/')
const texts = ref([
  'Java + Vue 有很多优秀的后台管理系统，但是为了可以高效的开发后台权限管理系统，作者就自己开发出 Agile Admin。',
  'Agile Admin 是一个基于 Vue3 + Element-plus + Java 的租户后台权限管理系统，提供了完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。',
  '可以用于网站管理后台、SAAS、CMS、CRM、OA、ERP等，企业和个人都可以免费使用。欢迎提交PR（需求），若开发中遇到问题可以上 Github 提 Issues。'
])

const onDocument = () => {
  window.open(document.value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: introduction#{$element-separator};
@include b(introduction) {
  @include e(content) {
    text-align: center;
  }
  @include e(text) {
    margin-bottom: 10px;
    text-align: left;
    text-indent: 2em;
    font-size: 14px;
  }
}
</style>
