<script setup>
import { ElMessage } from 'element-plus'

const visible = ref(true)

const qrCode = ref('https://admin.gumingchen.icu/file/static/wechat-applet-qr-code.jpg')

const list = ref([
  {
    question: '为什么会出现【小程序推广】弹窗？',
    answer: '该弹窗为了推广作者自己开发的小程序。'
  },
  {
    question: '这个小程序是什么样的小程序？',
    answer: '目前这个小程序是一个工具类小程序。'
  },
  {
    question: '这个小程序现在有哪些工具？',
    answer: '目前只有一个WIFI共享的工具，下一个上线的工具就是文字转语音。'
  },
  {
    question: '后续还会开发什么样的内容？',
    answer: '后面会开发淘宝购物优惠的相关内容！'
  }
])

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const dialogClosedHandle = () => {

}

onBeforeMount(() => {
})
</script>

<template>
  <el-dialog
    width="600px"
    title="小程序推广"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable
    destroy-on-close>
    <div class="flex flex_d-column flex_a_i-center">
      <img class="width-250 height-250" :src="qrCode">
      <ul class="padding_l-20">
        <li class="margin_t-20" v-for="(item, index) in list" :key="index">
          <p class="margin-0">{{ item.question }}</p>
          <div class="margin_t-5">{{ item.answer }}</div>
        </li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="visible = false">
          关闭
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
ul {
  flex: 1;
  font-size: 14px;
  li {
    list-style-type: decimal;
    p {
      font-weight: 600;
    }
    div {
      color: var(--el-color-primary);
    }
  }
}
</style>
