<template>
  <div class="width-300">
    <h2>路由二</h2>
    <el-input v-model="value" placeholder="输入内容测试页面缓存" />
  </div>
</template>

<script setup>
defineOptions({ name: 'NestRouter2' })
const value = ref('')
</script>

<style lang="scss" scoped>
</style>
