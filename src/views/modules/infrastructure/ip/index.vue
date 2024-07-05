<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { clearJson } from '@utils'
import { Status } from '@enums'

import { pageApi, exportApi } from '@/api/ip'

defineOptions({
  name: 'InfrastructureIp'
})

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  ip: '',
  country: '',
  province: '',
  city: '',
  isp: '',
  start: '',
  end: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 */
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
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
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
          <el-input v-model="form.ip" placeholder="IP" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.country" placeholder="国家" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.province" placeholder="省份" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.city" placeholder="城市" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.isp" placeholder="运营商" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'ip:export'" @click="exportHandle">导出</el-button>
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
          prop="id" />
        <el-table-column
          align="center"
          label="IP"
          prop="ip"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="国家"
          prop="country"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="省份"
          prop="province"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="城市"
          prop="city"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="区域"
          prop="district"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="运营商"
          prop="isp"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updatedAt"
          width="160"
          show-overflow-tooltip />
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
