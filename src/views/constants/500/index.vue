<template>
  <div :class="n.b()">
    <h2 :class="n.e('code')">500</h2>
    <p :class="n.e('describe')">抱歉！您访问的页面出现<em>异常</em>...</p>
    <p :class="n.e('suggest')">请联系管理员</p>
    <p :class="n.e('timeout')">
      <em>{{ endTime }}</em>秒后自动返回首页
    </p>
    <el-button @click="onBack">返回</el-button>
    <el-button type="primary" @click="onHome">首页</el-button>
    <el-button type="primary" @click="onLogout">重新登录</el-button>
  </div>
</template>

<script setup>
import { useRootStore } from '@/stores'
import { useNamespace } from '@/hooks'
import { onBeforeUnmount } from 'vue'

const n = useNamespace('error')

const router = useRouter()
const { logout } = useRootStore()

const endTime = ref(10)
const timer = ref(null)

const handleToHome = () => router.push({ name: 'redirect', replace: true })

const handleInterval = () => {
  timer.value = setInterval(() => {
    endTime.value--
    if (endTime.value === 0) {
      clearTimeout(timer.value)
      handleToHome()
    }
  }, 1000)
}

const onBack = () => router.back(-1)

const onHome = () => handleToHome()

const onLogout = async () => {
  await logout()
  router.push({ name: 'login' })
}

onMounted(handleInterval)

onBeforeUnmount(() => clearTimeout(timer.value))
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(error) {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;

  @include e(code) {
    margin: 20px 0;
    font-size: 10em;
  }
  @include e(describe) {
    margin-bottom: 10px;
    font-size: 26px;
    & > em {
      font-style: normal;
      color: var(--el-color-warning);
    }
  }
  @include e(suggest) {
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    color: var(--el-text-color-placeholder);
  }
  @include e(timeout) {
    margin-bottom: 30px;
    font-size: 18px;
    > em {
      margin: 0 10px;
      color: var(--el-color-warning);
    }
  }
}
</style>
