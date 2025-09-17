<template>
  <div class="nest-router width-300">
    <h1>嵌套路由</h1>
    <el-input v-model="value" placeholder="输入内容测试页面缓存" />
    <el-button @click="jump(1)">路由一</el-button>
    <el-button @click="jump(2)">路由二</el-button>
    <div class="padding_t-20">
      <View transition="left-in-right-out" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'NestRouter' })
const value = ref('')

const router = useRouter()
const jump = (type) => {
  router.push({ name: `demo-nest-router${ type }` })
}
</script>

<style lang="scss" scoped>
.nest-router {}
</style>
