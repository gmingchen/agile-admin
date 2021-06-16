<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 14:10:52
-->
<template>
  <div class="error-container">
    <div class="content-wrapper">
      <h2 class="status-code">400</h2>
      <p class="describe">抱歉！您访问的页面<em>失联</em>啦 ...</p>
      <p class="timeout">
        <em>{{ endTime }}</em>秒后自动返回首页
      </p>
      <el-button @click="jump(0)">返回上一页</el-button>
      <el-button type="primary" class="margin_l-30" @click="jump(1)">进入首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router: Router = useRouter()

    const endTime = ref(5)
    const timer = ref(-1)

    watch(endTime, (newVal, _oldVal) => {
      if (newVal === 0) {
        clearTimeout(timer.value)
        router.push({ name: 'login' })
      }
    })

    onMounted((): void => {
      timer.value = window.setInterval((): void => {
        endTime.value--
      }, 1000)
    })

    const jump = (type: number): void => {
      switch (type) {
        case 0:
          router.go(-1)
          break
        case 1:
          router.push({ name: 'home' })
          break
      }
      clearTimeout(timer.value)
    }

    return {
      endTime,
      timer,
      jump
    }
  }

})
</script>

<style lang="scss" scoped>
@import 'Sass/_mixin.scss';
@import 'Sass/_variable.scss';
.error-container {
  position: absolute;
  @include position(0, 0, 0, 0);
  overflow: hidden;
  .content-wrapper {
    position: fixed;
    @include position($t: 15%, $l: 50%);
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
    .status-code {
      margin: 20px 0;
      font-size: 10em;
      font-weight: 400;
      color: nth($fontColor, 1);
    }
    .describe {
      margin-bottom: 30px;
      font-size: 26px;
      color: nth($fontColor, 2);
      > em {
        font-style: normal;
        color: nth($warningColor, 1);
      }
    }
    .timeout {
      margin-bottom: 30px;
      font-size: 18px;
      color: nth($fontColor, 1);
      > em {
        margin: 0 10px;
        color: nth($dangerColor, 1);
      }
    }
  }
}
</style>
