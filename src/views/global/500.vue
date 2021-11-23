<template>
  <div class="no-authority-container">
    <h2 class="status-code">500</h2>
    <p class="describe">抱歉！您访问的页面出现<em>异常</em>...</p>
    <p class="suggest">请联系管理员</p>
    <!--
 <p class="timeout">
      <em>{{ endTime }}</em>秒后自动返回首页
    </p>
-->
    <el-button @click="jump(0)">返回</el-button>
    <el-button type="primary" @click="jump(1)">首页</el-button>
    <look-around class="margin_l-10" />
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import LookAround from '@/components/look-around'

export default defineComponent({
  components: { LookAround },
  setup() {
    const router = useRouter()

    const endTime = ref(10)
    const timer = ref(-1)

    watch(endTime, (newVal, _oldVal) => {
      if (newVal === 0) {
        clearTimeout(timer.value)
        router.push({ name: 'home' })
      }
    })

    // onMounted(() => {
    //   timer.value = window.setInterval(() => {
    //     endTime.value--
    //   }, 1000)
    // })

    const jump = type => {
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
@import '@/assets/sass/_variable.scss';
.no-authority-container {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  .status-code {
    margin: 20px 0;
    font-size: 10em;
    color: nth($fontColor, 1);
  }
  .describe {
    margin-bottom: 10px;
    font-size: 26px;
    & > em {
      font-style: normal;
      color: nth($warningColor, 1);
    }
  }
  .suggest {
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    color: nth($fontColor, 3);
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
.error-container {
  margin: 0 auto;
  padding-top: 100px;
  width: 800px;
  max-width: 100%;
  .other-go {
    font-size: 14px;
    li {
      padding-bottom: 5px;
      cursor: pointer;
    }
    a {
      color: nth($brandColor, 1);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
