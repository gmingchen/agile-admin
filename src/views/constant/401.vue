<template>
  <div class="no-authority-container">
    <h2 class="status-code">401</h2>
    <p class="describe">抱歉！您<em>没有权限</em>访问该页面...</p>
    <p class="suggest">如有不满请联系您的领导</p>
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
.no-authority-container {
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
    margin-bottom: 10px;
    font-size: 26px;
    & > em {
      font-style: normal;
      color: var(--el-color-warning);
    }
  }
  .suggest {
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    color: var(--el-text-color-placeholder);
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
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
