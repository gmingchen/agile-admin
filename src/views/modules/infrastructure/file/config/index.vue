<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import { clearJson } from '@/utils'
import { Whether } from '@/utils/enum'

import { configPageApi, configDeleteApi, configSetMasterApi, configExportApi } from '@/api/file'

defineOptions({
  name: 'InfrastructureFileConfig'
})

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: '',
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
  configPageApi(params).then(r => {
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
    configDeleteApi({ keys: ids }).then(r => {
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
const masterBefore = row => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定对[id=${ row.id }]进行[设置为主配置]操作`, '提示', {
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
 * @description: 设置主配置
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const masterHandle = row => {
  const params = {
    key: row.id
  }
  configSetMasterApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
      getList()
    } else {
      row.master = row.master === Whether.NO ? Whether.YES : Whether.NO
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
  configExportApi(form)
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
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'fileConfig:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'fileConfig:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'fileConfig:export'" @click="exportHandle">导出</el-button>
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
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="存储类型"
          prop="storage_dict" />
        <el-table-column
          align="center"
          label="备注"
          prop="remark" />
        <el-table-column
          align="center"
          label="是否为主配置"
          prop="master_dict">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'fileConfig:master'"
              :before-change="masterBefore.bind(this, row)"
              @change="masterHandle(row)"
              v-model="row.master"
              :active-value="Whether.YES"
              :inactive-value="Whether.NO"
              :disabled="row.master === Whether.YES" />
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
          v-permission="'fileConfig:update|fileConfig:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'fileConfig:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'fileConfig:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
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
