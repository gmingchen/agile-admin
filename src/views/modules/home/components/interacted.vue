
<script setup>
import { ref } from 'vue'

const images = ref([
  {
    label: '公众号',
    url: 'https://admin.gumingchen.icu/file/static/official-account-qr-code.jpg'
  },
  {
    label: '小程序',
    url: 'https://admin.gumingchen.icu/file/static/wechat-applet-qr-code.jpg'
  },
  {
    label: 'QQ讨论群',
    url: 'https://admin.gumingchen.icu/file/static/qq-group-qr-code.jpg'
  },
  {
    label: '微信讨论群',
    url: 'https://admin.gumingchen.icu/file/static/wechat-group-qr-code.jpg'
  },
  {
    label: '微信',
    url: 'https://admin.gumingchen.icu/file/static/wechat-qr-code-1.jpg'
  },
  {
    label: 'QQ',
    url: 'https://admin.gumingchen.icu/file/static/qq-qr-code.jpg'
  },
  {
    label: '支付宝扫码领红包',
    url: 'https://admin.gumingchen.icu/file/static/red-envelopes.jpg'
  }
])
</script>

<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">交流</div>
    <div class="panel-content">
      <div class="flex text-align-center">
        <div class="flex-item_f-1" v-for="(item, index) in images" :key="index">
          <p class="font-size-12">{{item.label}}</p>
          <el-image
            class="height-100"
            :src="item.url"
            preview-teleported
            :preview-src-list="[item.url]" />
        </div>
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
    .el-image + .el-image {
      margin-left: 10px;
    }
    p {
      color: var(--el-text-color-placeholder);
    }

  }
}
</style>
