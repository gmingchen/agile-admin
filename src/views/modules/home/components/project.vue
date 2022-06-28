<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">项目</div>
    <div class="panel-content">
      <div class="text font-size-12">{{ text }}</div>
      <el-image :src="stars" class="margin_t-10 cursor-pointer" @click="githubHandle()" />
    </div>
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      github: 'https://github.com/gmingchen/vue3-element-plus-admin',
      stars: 'https://img.shields.io/github/stars/gmingchen/vue3-element-plus-admin.svg?logo=github',
      text: '前端基于 Vue3、Element-plus、Vue-router、Vux、Sass、Axios 等技术栈。后端基于 Java 的 Springboot、Mysql、Shiro、Mybatis-plus 等技术栈。如果喜欢就点个星星支持一下。'
    })

    const githubHandle = () => {
      window.open(data.github)
    }
    return {
      ...toRefs(data),
      githubHandle
    }
  }
})
</script>

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
      line-height: 20px;
    }
  }
}
</style>
