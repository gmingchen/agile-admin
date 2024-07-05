
<script setup>
import { clearJson } from '@utils'

import { pageApi, exportApi } from '@/api/operate-log'

defineOptions({
  name: 'LogOperate'
})

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const form = reactive({
  name: '',
  account: '',
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

const rowClickHandle = (row) => {
  refTable.value.toggleRowExpansion(row)
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
          <el-input v-model="form.name" placeholder="操作" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.account" placeholder="用户名/昵称/手机号" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'operateLog:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        @row-dblclick="rowClickHandle"
        row-key="id"
        border>
        <el-table-column type="expand">
          <template #default="{row}">
            <div class="padding-n-8">
              <el-descriptions :column="4" border>
                <el-descriptions-item label="操作名">{{row.name || '-'}}</el-descriptions-item>
                <el-descriptions-item label="昵称">{{row.nickname || '-'}}</el-descriptions-item>
                <el-descriptions-item label="帐号">{{row.username || '-'}}</el-descriptions-item>
                <el-descriptions-item label="操作时间">{{row.createdAt || '-'}}</el-descriptions-item>
                <el-descriptions-item label="IP">{{row.ip || '-'}}</el-descriptions-item>
                <el-descriptions-item label="地址">{{row.address || '-'}}</el-descriptions-item>
                <el-descriptions-item label="浏览器">{{row.browser || '-'}}</el-descriptions-item>
                <el-descriptions-item label="操作系统">{{row.operatingSystem || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求方法">{{row.method || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求URL">{{row.url || '-'}}</el-descriptions-item>
                <el-descriptions-item label="方法名" :span="2">{{row.methodName || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求参数" :span="2">
                  <pre>{{JSON.parse(row.requestData || '{}')}}</pre>
                </el-descriptions-item>
                <el-descriptions-item label="响应参数" :span="2">
                  <pre>{{JSON.parse(row.responseData || '{}')}}</pre>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="操作者"
          prop="username"
          show-overflow-tooltip>
          <template v-slot="{ row }">
            <div class="flex-box flex_j_c-center flex_a_i-center">
              <div class="ellipse">{{row.nickname || row.username }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作名"
          prop="name"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="URL"
          prop="url"
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
          label="操作时间"
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
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
}
::v-deep(.el-descriptions__label) {
  width: 80px;
}
</style>
