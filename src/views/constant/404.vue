<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 14:10:52
-->
<template>
  <div class="not-found-container">
    <h2 class="status-code">404</h2>
    <p class="describe">抱歉！您访问的页面<em>走丢</em>啦...</p>
    <p class="timeout">
      <em>{{ endTime }}</em>秒后自动返回首页
    </p>
    <el-button @click="jump(0)">返回</el-button>
    <el-button type="primary" @click="jump(1)">首页</el-button>
    <el-button type="primary" @click="jump(2)">重新登录</el-button>
  </div>
</template>

<script setup>



import { useRootStore } from '@/stores/root'

const router = useRouter()
const rootStore = useRootStore()

const endTime = ref(10)
const timer = ref(-1)

watch(endTime, (newVal, _oldVal) => {
  if (newVal === 0) {
    clearTimeout(timer.value)
    router.push({ name: 'login', replace: true })
  }
})

onMounted(() => {
  timer.value = window.setInterval(() => {
    endTime.value--
  }, 1000)
})

const jump = type => {
  switch (type) {
    case 0:
      router.back(-1)
      break
    case 1:
      router.push({ name: 'redirect', replace: true })
      break
    case 2:
      rootStore.logout()
      router.push({ name: 'login' })
      break
  }
  clearTimeout(timer.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.not-found-container {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  .status-code {
    margin: 20px 0;
    font-size: 10em;
  }
  .describe {
    margin-bottom: 30px;
    font-size: 26px;
    & > em {
      font-style: normal;
      color: var(--el-color-warning);
    }
  }
  .timeout {
    margin-bottom: 30px;
    font-size: 18px;
    > em {
      margin: 0 10px;
      color: var(--el-color-warning);
    }
  }
}
</style>
