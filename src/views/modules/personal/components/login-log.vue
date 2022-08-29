<template>
  <div class="login-log-container">
    <el-timeline v-if="list.length">
      <el-timeline-item
        placement="top"
        v-for="item in list"
        :key="item.id"
        :timestamp="item.created_at">
        <el-card>
          <el-descriptions :column="2">
            <el-descriptions-item label="登录信息">{{item.message}}</el-descriptions-item>
            <el-descriptions-item label="浏览器">{{item.browser}}</el-descriptions-item>
            <el-descriptions-item label="IP">{{item.ip}}</el-descriptions-item>
            <el-descriptions-item label="操作系统">{{item.operating_system}}</el-descriptions-item>
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

import { selfPageApi } from '@/api/login-log'

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
