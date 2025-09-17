<template>
  <div :class="n.b()">
    <Panel title="交流">
      <div class="fw-wrap">
        <div class="f_f-1 fd-column f_ai-center f_jc-flex-start" v-for="(item, index) in list" :key="index">
          <div class="fs-14 ta-center">{{item.label}}</div>
          <el-image class="mt-10 h-120" :src="item.url" preview-teleported :preview-src-list="[item.url]" />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup>
import Panel from '../panel/index.vue'
import { useNamespace } from '@/hooks'

const n = useNamespace('interacted')

const list = ref([
  {
    label: '公众号',
    url: 'https://admin.gumingchen.icu/file/static/official-account-qr-code.jpg'
  },
  {
    label: '微信',
    url: 'https://admin.gumingchen.icu/file/static/wechat-qr-code-1.jpg'
  },
  {
    label: '微信群',
    url: 'https://admin.gumingchen.icu/file/static/align-admin-wechat-group.jpg'
  },
  {
    label: '摸鱼群',
    url: 'https://admin.gumingchen.icu/file/static/fish.jpg'
  },
])

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: interacted#{$element-separator};
@include b(interacted) {
  min-width: 400px;
}
</style>
