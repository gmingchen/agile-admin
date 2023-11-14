<template>
  <div class="nest-router">
    <h1>嵌套路由</h1>
    <el-button @click="jump(1)">路由一</el-button>
    <el-button @click="jump(2)">路由二</el-button>
    <div class="padding_t-20">
      <View transition="left-in-right-out" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'NestRouter' })

const router = useRouter()
const jump = (type) => {
  router.push({ name: `nestRouter${ type }` })
}
</script>

<style lang="scss" scoped>
.nest-router {}
</style>
