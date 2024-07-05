<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { clearJson, parseDate2Str, havePermission } from '@utils'
import { NoticeStatus } from '@enums'

import { pageApi, statusApi, deleteApi } from '@/api/adminer-notice'

const noticeStore = useNoticeStore()

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const form = reactive({
  type: '',
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
 * @author: gumingchen
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
 * @description: 重新获取、重置 数据
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
 * 设置已读
 * @param {*} row
 */
const readHandle = async (row) => {
  const ids = row ? [row.id] : []
  await noticeStore.read(ids)
  getList()
}

/**
 * @description: 删除
 * @param {number} id
 * @return {*}
 * @author: gumingchen
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
 * @description: table多选事件
 * @param {*} val
 * @return {*}
 * @author: gumingchen
 */
const selectionHandle = val => {
  selection.value = val
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
      <el-form-item>
        <DictSelect v-model="form.type" code="NOTICE_TYPE" placeholder="类型" />
      </el-form-item>
      <el-form-item>
        <DictSelect v-model="form.status" code="NOTICE_STATUS" placeholder="状态" />
      </el-form-item>
      <el-form-item>
        <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle">查询</el-button>
        <el-button v-repeat @click="resetHandle">重置</el-button>
        <el-button v-repeat type="primary" @click="readHandle()">全部已读</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="selection.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
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
        width="80" />
      <el-table-column
        align="center"
        label="内容"
        prop="content"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="类型"
        prop="type"
        width="120">
        <template v-slot="{ row }">
          <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="通知时间"
        prop="createdAt"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="110"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-if="row.status === NoticeStatus.UNREAD"
            type="primary"
            link
            @click="readHandle(row)">已读</el-button>
          <el-button
            type="danger"
            link
            @click="deleteHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page
      class="margin_t-10"
      v-model:current="page.current"
      v-model:size="page.size"
      :total="page.total"
      @change="getList" />
  </div>
</template>
