<template>
  <div :class="n.b()">
    <el-timeline v-if="list.length">
      <el-timeline-item v-for="item in list" :key="item.id" :timestamp="item.createdAt" placement="top">
        <el-card>
          <el-descriptions :column="3">
            <el-descriptions-item label="登录信息">{{item.result}}</el-descriptions-item>
            <el-descriptions-item label="浏览器">{{item.browser}}</el-descriptions-item>
            <el-descriptions-item label="操作系统">{{item.operatingSystem}}</el-descriptions-item>
            <el-descriptions-item label="IP">{{item.ip}}</el-descriptions-item>
            <el-descriptions-item label="地址">{{item.address}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else />
  </div>
</template>

<script setup>
import { selfLoginLogLatestApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('login')

const loading = ref(false)
const list = ref([])

const getData = () => {
  loading.value = true
  selfLoginLogLatestApi().then(r => {
    if (r) {
      list.value = r.data
    }
    nextTick(() => loading.value = false)
  })
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: login#{$element-separator};
@include b(login) {}
</style>
