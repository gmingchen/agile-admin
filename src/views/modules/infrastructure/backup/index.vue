<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import Details from './components/details.vue'

import { clearJson } from '@/utils'
import { Status, OperationalStatus } from '@/utils/enum'

import { pageApi, deleteApi, backupApi, recoveryApi, exportApi } from '@/api/backup'

const refForm = ref()
const refTable = ref()
const refDetails = ref()

const loading = ref(false)
const detailsVisible = ref(false)
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
 * @description: 备份
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const backupHandle = () => {
  ElMessageBox.confirm(`确定进行[备份]操作`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    backupApi().then(r => {
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
 * @description: 恢复
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const recoveryHandle = (id) => {
  ElMessageBox.confirm(`一旦恢复数据，备份之后的数据将无法恢复，确定继续进行[恢复]操作`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    recoveryApi({ key: id }).then(r => {
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

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <DictSelect v-model="form.type" code="BACKUP" placeholder="备份方式" />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="OPERATIONAL" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'backup:backup'"
            type="primary"
            @click="backupHandle()">备份</el-button>
          <el-button
            v-permission="'backup:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'backup:export'" @click="exportHandle">导出</el-button>
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
          label="文件名"
          prop="name"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="数据库名称"
          prop="database"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="物理路径"
          prop="path"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="虚拟路径"
          prop="url"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="方式"
          prop="type"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备份时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="执行时间"
          prop="updatedAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="操作"
          width="160"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'backup:info'"
              type="primary"
              link
              @click="detailsHandle(row.id)">详情</el-button>
            <el-button
              v-permission="'backup:recovery'"
              type="primary"
              link
              @click="recoveryHandle(row.id)">恢复</el-button>
            <el-button
              v-permission="'backup:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
