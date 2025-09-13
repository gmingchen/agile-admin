<template>
  <div :class="n.b()">
    <el-timeline v-if="list.length">
      <el-timeline-item v-for="item in list" :key="item.id" :timestamp="item.createdAt" placement="top">
        <el-card>
          <el-descriptions :column="3">
            <el-descriptions-item label="操作信息">{{item.name}}</el-descriptions-item>
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
import { selfOperateLogLatestApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('operate')

const loading = ref(false)
const list = ref([])

const getData = () => {
  loading.value = true
  selfOperateLogLatestApi().then(r => {
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
$prefix: operate#{$element-separator};
@include b(operate) {}
</style>
