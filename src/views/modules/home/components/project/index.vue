<template>
  <div :class="n.b()">
    <Panel title="项目">
      <div>
        <div :class="n.e('title')">{{ text }}</div>
        <div class="mt-10">
          <template v-for="(item, index) in list" :key="index">
            <img class="mr-5 c-pointer" :src="item.stars" @click="onClick(item.url)"  />
            <img class="mr-5 c-pointer" :src="item.forks" @click="onClick(item.url)"  />
          </template>
        </div>
        <div class="mt-10">
          <el-button size="small" type="success" @click="onClick(release)" round>更新日志</el-button>
          <el-button size="small" type="danger" @click="onClick(list[0].url)" round>GitHub</el-button>
          <el-button size="small" type="danger" @click="onClick(list[1].url)" round>Gitee</el-button>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup>
import Panel from '../panel/index.vue'
import { useNamespace } from '@/hooks'

const n = useNamespace('project')

const text = ref('前端基于 Vue3、Element-plus、Vue-router、Vux、Sass、Axios 等技术栈。后端基于 Java 的 Springboot、Mysql、Shiro、Security、Mybatis-plus 等技术栈。如果喜欢就点个星星支持一下。')

const list = ref([
  {
    url: 'https://github.com/gmingchen/agile-admin',
    stars: 'https://img.shields.io/github/stars/gmingchen/agile-admin.svg?logo=github&color=brightgreen',
    forks: 'https://img.shields.io/github/forks/gmingchen/agile-admin.svg?logo=github&color=brightgreen'
  },
  {
    url: 'https://gitee.com/shychen/agile-admin',
    stars: 'http://gitee.com/shychen/agile-admin/badge/star.svg?theme=dark',
    forks: 'http://gitee.com/shychen/agile-admin/badge/fork.svg?theme=dark'
  },
])

const release = ref('https://github.com/gmingchen/agile-admin/releases')

const handleLink = (url) => {
  window.open(url)
}

const onClick = (url) => {
  handleLink(url)
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: project#{$element-separator};
@include b(project) {
  min-width: 400px;
  @include e(title) {
    line-height: 20px;
    text-indent: 2em;
    font-size: 14px;
  }
}
</style>
