<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">项目</div>
    <div class="panel-content">
      <div class="text font-size-12">{{ text }}</div>
      <div class="margin_t-10">
        <el-image :src="githubStars" class="margin_r-5 cursor-pointer" @click="githubHandle()"  />
        <el-image :src="githubForks" class="margin_r-5 cursor-pointer" @click="githubHandle()" />
        <el-image :src="giteeStars" class="margin_r-5 cursor-pointer" @click="giteeHandle()" />
        <el-image :src="giteeForks" class="cursor-pointer" @click="giteeHandle()" />
        <el-image :src="oscsImage" class="cursor-pointer" @click="oscsHandle()" />
      </div>
      <div class="margin_t-10">
        <el-button
          size="small"
          type="success"
          @click="releaseHandle()"
          round>更新日志</el-button>
        <el-button
          size="small"
          type="danger"
          @click="releaseHandle()"
          round>GitHub</el-button>
        <el-button
          size="small"
          type="danger"
          @click="giteeHandle()"
          round>Gitee</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      github: 'https://github.com/gmingchen/vue3-element-plus-admin',
      githubStars: 'https://img.shields.io/github/stars/gmingchen/vue3-element-plus-admin.svg?logo=github&color=brightgreen',
      githubForks: 'https://img.shields.io/github/forks/gmingchen/vue3-element-plus-admin.svg?logo=github&color=brightgreen',
      gitee: 'https://gitee.com/shychen/vue3-element-plus-admin',
      giteeStars: 'http://gitee.com/shychen/vue3-element-plus-admin/badge/star.svg?theme=dark',
      giteeForks: 'http://gitee.com/shychen/vue3-element-plus-admin/badge/fork.svg?theme=dark',
      release: 'https://github.com/gmingchen/vue3-element-plus-admin/releases',
      oscs: 'https://www.oscs1024.com/project/gmingchen/vue3-element-plus-admin?ref=badge_small',
      oscsImage: 'https://www.oscs1024.com/platform/badge/gmingchen/vue3-element-plus-admin.svg?size=small',
      text: '前端基于 Vue3、Element-plus、Vue-router、Vux、Sass、Axios 等技术栈。后端基于 Java 的 Springboot、Mysql、Shiro、Mybatis-plus 等技术栈。如果喜欢就点个星星支持一下。'
    })

    const githubHandle = () => {
      window.open(data.github)
    }

    const giteeHandle = () => {
      window.open(data.gitee)
    }

    const releaseHandle = () => {
      window.open(data.release)
    }

    const oscsHandle = () => {
      window.open(data.oscs)
    }

    return {
      ...toRefs(data),
      githubHandle,
      giteeHandle,
      releaseHandle,
      oscsHandle
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
