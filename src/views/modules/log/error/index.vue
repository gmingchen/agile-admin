<script setup>
import Details from './components/details.vue'

import { clearJson } from '@utils'

import { pageApi, exportApi } from '@/api/error-log'

defineOptions({
  name: 'LogError'
})

const refForm = ref()
const refTable = ref()
const refDetails = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  adminerId: '',
  url: '',
  exceptionClass: '',
  exceptionMethod: '',
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
 * @description: 详情弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const detailsHandle = id => {
  visible.value = true
  nextTick(() => {
    refDetails.value.init(id)
  })
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
          <el-input v-model="form.adminerId" placeholder="用户ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.url" placeholder="请求URL" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.exceptionClass" placeholder="类名" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.exceptionMethod" placeholder="方法名" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'errorLog:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        :tooltip-options="{'showArrow': true, 'appendTo': '.el-table__row'}"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="用户ID"
          prop="creator" />
        <el-table-column
          align="center"
          label="URL"
          prop="url"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="请求方法"
          prop="method"
          width="90" />
        <el-table-column
          align="center"
          label="异常信息"
          prop="exceptionMessage"
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
          label="发生时间"
          prop="createdAt"
          width="160" />
        <el-table-column
          v-permission="'errorLog:info'"
          align="center"
          label="操作"
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'errorLog:info'"
              type="primary"
              link
              @click="detailsHandle(row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Details ref="refDetails" v-if="visible" />
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
