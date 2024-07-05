<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import { clearJson, havePermission } from '@utils'
import { Status } from '@enums'

import { pageApi, deleteApi, setStatusApi, exportApi } from '@/api/tenant'

defineOptions({
  name: 'SystemTenant'
})

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: '',
  contactName: '',
  contactUsername: '',
  contactMobile: '',
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
 * @description: 新增/编辑弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const addEditHandle = id => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
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
 * 变化之前操作
 * @param {*} row
 */
const statusBefore = row => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ row.status === Status.ENABLE ? '禁用' : '启用' }]操作`, '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}
/**
 * @description: 状态切换
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const statusHandle = row => {
  const params = {
    key: row.id,
    value: row.status
  }
  setStatusApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      row.status = row.status === Status.DISABLE ? Status.ENABLE : Status.DISABLE
    }
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
  <Container>
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
            v-permission="'package:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'package:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-permission="'tenant:export'" @click="exportHandle">导出</el-button>
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
          width="80" />
        <el-table-column
          align="center"
          label="Logo"
          prop="logo"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.logo"
              class="height-50 width-50"
              fit="cover"
              :src="row.logo"
              preview-teleported
              :preview-src-list="[row.logo]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="联系人"
          prop="contactName" />
        <el-table-column
          align="center"
          label="联系手机号"
          prop="contactMobile" />
        <el-table-column
          align="center"
          label="帐号额度"
          prop="accountCount">
          <template v-slot="{ row }">
            <el-tag>{{ row.accountCount || row.accountCount === 0 ? row.accountCount : '不限' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="80">
          <template v-slot="{row}">
            <el-switch
              v-permission="'package:status'"
              :before-change="statusBefore.bind(this, row)"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="Status.ENABLE"
              :inactive-value="Status.DISABLE" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updatedAt"
          width="160" />
        <el-table-column
          v-permission="'package:update|package:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'package:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-button
                v-permission="'package:delete'"
                type="danger"
                link
                @click="deleteHandle(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
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
