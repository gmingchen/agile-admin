<script setup>
import { ElMessage } from 'element-plus'

const visible = ref(true)

const qrCode = ref('https://admin.gumingchen.icu/file/image/wechat-applet-qr-code.jpg')

const list = ref([
  {
    question: '为什么会出现【小程序推广】弹窗？',
    answer: '该弹窗为了可以演示用户管理的用户，实时添加注册的新用户，达到用户管理的演示目的。'
  },
  {
    question: '这个小程序是什么样的小程序？',
    answer: '目前这个小程序是作者之前开发的一个 WIFI共享的小程序，暂时先用来演示用户管理。'
  },
  {
    question: '后续是否会更新重新开发？',
    answer: '后续会对这个小程序重新开发，目前已经有了方案，正在规划中。'
  },
  {
    question: '后续会开发什么样的内容？',
    answer: '大概是一个薅羊毛、可以赚钱的小程序，暂时先卖个关子，有兴趣的可以关注一下！'
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
