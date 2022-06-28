<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">交流</div>
    <div class="panel-content">
      <div class="flex-box text-align-center">
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

<script >
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      images: [
        {
          label: '公众号',
          url: 'http://oss.gumingchen.icu/image/official-account-qr-code.jpg'
        },
        {
          label: 'QQ讨论群',
          url: 'http://oss.gumingchen.icu/image/qq-group-qr-code.jpg'
        },
        {
          label: '微信讨论群',
          url: 'http://oss.gumingchen.icu/image/wechat-group-qr-code.jpg'
        },
        {
          label: '微信',
          url: 'http://oss.gumingchen.icu/image/wechat-qr-code-1.jpg'
        },
        {
          label: 'QQ',
          url: 'http://oss.gumingchen.icu/image/qq-qr-code.jpg'
        }
      ]
    })

    return {
      ...toRefs(data)
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
    .el-image + .el-image {
      margin-left: 10px;
    }
    p {
      color: var(--el-text-color-placeholder);
    }

  }
}
</style>
