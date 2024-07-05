<script setup>
import { clearJson } from '@utils'

import { pageApi, exportApi } from '@/api/login-log'

defineOptions({
  name: 'LogLogin'
})

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const form = reactive({
  account: '',
  status: '',
  start: '',
  end: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])

const getList = () => {
  const { current, size } = page
  const params = {
    ...form,
    current,
    size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
 * @description: 重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const resetHandle = () => {
  clearJson(form)
  reacquireHandle()
}

/**
 * @description: 导出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const exportHandle = () => {
  exportApi(form)
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.account" placeholder="用户名/昵称/手机号" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="RESULT" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'loginLog:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="账户"
          prop="account"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="结果"
          prop="result"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="IP"
          prop="ip"
          width="140" />
        <el-table-column
          align="center"
          label="地址"
          prop="address"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="浏览器"
          prop="browser"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="操作系统"
          prop="operatingSystem"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="状态"
          prop="result"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登录时间"
          prop="createdAt"
          width="160" />
      </el-table>
    </template>
    <template #footer>
      <Page
        v-model:current="page.current"
        v-model:size="page.size"
        :total="page.total"
        @change="getList" />
    </template>
  </Container>
</template>

<style lang="scss" scoped>
</style>
