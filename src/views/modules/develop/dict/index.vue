<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import Sidebar from './components/sidebar.vue'
import SubAddEdit from './components/sub-add-edit.vue'

import { havePermission } from '@utils'
import { Status } from '@enums'

import { subListApi, subDeleteApi, subSetStatusApi } from '@/api/dict'

defineOptions({
  name: 'DevelopDict'
})

const refContainerSidebar = ref()
const refTable = ref()
const refSubAddEdit = ref()
const active = ref('')
const loading = ref(false)
const visible = ref(false)
const list = ref([])
const selection = ref([])

const getList = () => {
  if (active.value) {
    loading.value = true
    const params = {
      id: active.value
    }
    subListApi(params).then(r => {
      if (r) {
        list.value = r.data
      }
      nextTick(() => { loading.value = false })
    })
  }
}

const addEditHandle = (id) => {
  visible.value = true
  nextTick(() => {
    refSubAddEdit.value.init({ dictId: active, id })
  })
}

const deleteHandle = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    subDeleteApi({ keys: ids }).then(r => {
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

const statusHandle = (row) => {
  const params = {
    key: row.id,
    value: row.status
  }
  subSetStatusApi(params).then(r => {
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

const selectionHandle = (val) => {
  selection.value = val
}

const changeHandle = (row) => {
  refContainerSidebar.value.setScrollTop()
  if (row) {
    getList()
  } else {
    list.value = []
  }
}
</script>

<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="active" @change="changeHandle" />
    </template>
    <template #header v-if="havePermission('dictSub:create|dictSub:delete')">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            v-permission="'dictSub:create'"
            type="primary"
            @click="addEditHandle()"
            :disabled="!active">新增</el-button>
          <el-button
            v-permission="'dictSub:delete'"
            type="danger"
            :disabled="selection.length <= 0 || !active"
            @click="deleteHandle()">批量删除</el-button>
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
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="编码"
          prop="code" />
        <el-table-column
          align="center"
          label="元素颜色类型"
          prop="elType" />
        <el-table-column
          align="center"
          label="元素CssClass"
          prop="elClass" />
        <el-table-column
          align="center"
          label="排序"
          prop="sort" />
        <el-table-column
          align="center"
          label="是否启用"
          prop="status"
          width="100">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'dictSub:status'"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0" />
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
          v-permission="'dictSub:update|dictSub:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'dictSub:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'dictSub:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <SubAddEdit ref="refSubAddEdit" v-if="visible" @refresh="getList" />
    </template>
  </ContainerSidebar>
</template>

<style lang="scss" scoped>

</style>
