<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import TenantSidebar from '@/components/tenant-sidebar/index.vue'
import Send from './components/send.vue'

import { clearJson } from '@utils'
import { Status } from '@enums'

import { pageApi, deleteApi, exportApi } from '@/api/notice'

defineOptions({
  name: 'InfrastructureNoticeList'
})

const refContainerSidebar = ref()
const refForm = ref()
const refTable = ref()
const refSend = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  tenantId: '',
  name: '',
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

const changeHandle = _val => {
  refContainerSidebar.value.setScrollTop()
  getList()
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <TenantSidebar v-model="form.tenantId" @change="changeHandle" />
    </template>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
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
            v-permission="'notice:push'"
            type="primary"
            @click="sendHandle()">发送通知</el-button>
          <el-button
            v-permission="'notice:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'notice:export'" @click="exportHandle">导出</el-button>
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
          label="模版编码"
          prop="templateCode"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="模版内容"
          prop="templateContent"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="消息内容"
          prop="content"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="发送范围"
          prop="scopeType"
          width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.scopeType_type">{{ row.scopeType_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="消息类型"
          prop="type"
          width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
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
          width="80"
          fixed="right"
          v-permission="'notice:delete'">
          <template v-slot="{ row }">
            <el-button
              v-permission="'notice:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Send ref="refSend" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page
        v-model:current="page.current"
        v-model:size="page.size"
        :total="page.total"
        @change="getList" />
    </template>
  </ContainerSidebar>
</template>
