<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import Send from './components/send.vue'
import Details from './components/details.vue'

import { clearJson } from '@utils'
import { Status } from '@enums'

import { pageApi, deleteApi, exportApi } from '@/api/mail'

defineOptions({
  name: 'InfrastructureMailList'
})

const refForm = ref()
const refTable = ref()
const refSend = ref()
const refDetails = ref()

const loading = ref(false)
const visible = ref(false)
const detailsVisible = ref(false)
const form = reactive({
  templateTitle: '',
  fromMail: '',
  toMail: '',
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
const selection = ref([])

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
 * @description: 发送通知
 * @param {*}
 * @return {*}
 */
const sendHandle = () => {
  visible.value = true
  nextTick(() => {
    refSend.value.init()
  })
}

/**
 * @description: 删除
 * @param {number} id
 * @return {*}
 */
const deleteHandle = id => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

/**
 * @description: 详情弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const detailsHandle = id => {
  detailsVisible.value = true
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

/**
 * @description: table多选事件
 * @param {*} val
 * @return {*}
 * @author: 拖孩
 */
const selectionHandle = val => {
  selection.value = val
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
        <el-form-item>
          <el-input v-model="form.templateTitle" placeholder="标题" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.fromMail" placeholder="发送邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.toMail" placeholder="接收邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="STATUS" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'mail:send'"
            type="primary"
            @click="sendHandle()">发送邮件</el-button>
          <el-button
            v-permission="'mail:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'mail:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        @selection-change="selectionHandle"
        border>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="发送邮箱"
          prop="fromMail"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="接收邮箱"
          prop="fromMail"
          show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ row.toMail.join(',') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="模版编码"
          prop="templateCode"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="模版标题"
          prop="templateTitle"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right"
          v-permission="'mail:info|mail:delete'">
          <template v-slot="{ row }">
            <el-button
              v-permission="'mail:info'"
              type="primary"
              link
              @click="detailsHandle(row.id)">详情</el-button>
            <el-button
              v-permission="'mail:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Send ref="refSend" v-if="visible" @refresh="getList" />
      <Details ref="refDetails" v-if="detailsVisible" />
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
