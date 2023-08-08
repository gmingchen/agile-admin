<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import Review from './components/review.vue'

import { clearJson } from '@/utils'
import { ReviewStatus } from '@/utils/enum'

import { pageApi, exportApi } from '@/api/withdrawal'

const refForm = ref()
const refTable = ref()
const refReview = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  nickname: '',
  amount: 0,
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

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 */
const getList = () => {
  const { current, size } = page
  const params = {
    ...form,
    amount: form.amount || '',
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
 * @description: 审核弹窗
 * @param {*}
 * @return {*}
 */
const reviewHandle = row => {
  visible.value = true
  nextTick(() => {
    refReview.value.init(row)
  })
}

/**
 * @description: 导出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const exportHandle = () => {
  exportApi({ ...form, amount: form.amount || '' })
}

onBeforeMount(() => {
  getList()
})
onActivated(() => {})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.nickname" placeholder="昵称" clearable />
        </el-form-item>
        <el-form-item label="提现金额">
          <el-input-number
            v-model="form.amount"
            clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="REVIEW" placeholder="审核状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'withdrawal:export'" @click="exportHandle">导出</el-button>
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
          label="头像"
          prop="avatar"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.avatar"
              class="height-50 width-50"
              fit="cover"
              :src="row.avatar"
              preview-teleported
              :preview-src-list="[row.avatar]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="昵称"
          prop="nickname"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="性别"
          prop="sex"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.sex_type">{{ row.sex_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="提现金额"
          prop="amount"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="收款码"
          prop="payable"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.payable"
              class="height-50 width-50"
              fit="cover"
              :src="row.payable"
              preview-teleported
              :preview-src-list="[row.payable]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="90">
          <template v-slot="{ row }">
            <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="图片"
          prop="image"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.image.length"
              class="height-50 width-50"
              fit="cover"
              :src="row.image[0]"
              preview-teleported
              :preview-src-list="row.image" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="审核原因"
          prop="reason"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          v-permission="'withdrawal:review'"
          align="center"
          label="操作"
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-if="row.status === ReviewStatus.ING"
              v-permission="'withdrawal:review'"
              type="primary"
              link
              @click="reviewHandle(row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Review ref="refReview" v-if="visible" @refresh="getList" />
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
