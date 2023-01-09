<template>
  <div class="operation-log-container">
    <el-timeline v-if="list.length">
      <el-timeline-item
        placement="top"
        v-for="item in list"
        :key="item.id"
        :timestamp="item.created_at">
        <el-card>
          <el-descriptions :column="3">
            <el-descriptions-item label="操作信息">{{item.operation}}</el-descriptions-item>
            <el-descriptions-item label="浏览器">{{item.browser}}</el-descriptions-item>
            <el-descriptions-item label="操作系统">{{item.operating_system}}</el-descriptions-item>
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
import { ref, nextTick, onBeforeMount } from 'vue'

import usePage from '@/mixins/page'

import { selfPageApi } from '@/api/operation-log'

const { page } = usePage()

const loading = ref(false)
const list = ref([])

const getList = () => {
  const params = {
    current: page.current,
    size: page.size
  }
  loading.value = true
  selfPageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => { loading.value = false })
  })
}

onBeforeMount(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.operation-log-container {
  // max-height: 600px;
}
</style>
