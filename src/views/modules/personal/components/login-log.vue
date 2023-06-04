<script setup>
import { latestApi } from '@/api/login-log'

const loading = ref(false)
const list = ref([])

const getList = () => {
  loading.value = true
  latestApi().then(r => {
    if (r) {
      list.value = r.data
    }
    nextTick(() => { loading.value = false })
  })
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <div class="login-log-container">
    <el-timeline v-if="list.length">
      <el-timeline-item
        placement="top"
        v-for="item in list"
        :key="item.id"
        :timestamp="item.createdAt">
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
