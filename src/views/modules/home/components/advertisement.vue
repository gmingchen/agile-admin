<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">广告</div>
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

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      images: [
        {
          label: '支付宝扫码领红包',
          url: 'http://oss.gumingchen.icu/image/red-envelopes.jpg'
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
