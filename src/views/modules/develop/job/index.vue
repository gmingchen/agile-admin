<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import { clearJson, havePermission } from '@utils'
import { Status } from '@enums'

import { pageApi, deleteApi, runApi, resumeApi, pauseApi } from '@/api/job'

defineOptions({
  name: 'DevelopJob'
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
 * @description: 执行
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const runHandle = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '执行' : '批量执行' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    runApi({ keys: ids }).then(r => {
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
 * @description: 启用
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const resumeHandle = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '启用' : '批量启用' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    resumeApi({ keys: ids }).then(r => {
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
 * @description: 禁用
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const pauseHandle = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '禁用' : '批量禁用' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    pauseApi({ keys: ids }).then(r => {
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

const commandHandle = (command, id) => {
  switch (command) {
    case 'run':
      runHandle(id)
      break
    case 'resume':
      resumeHandle(id)
      break
    case 'pause':
      pauseHandle(id)
      break
    case 'delete':
      deleteHandle(id)
      break
  }
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
            v-permission="'job:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'job:run'"
            type="success"
            @click="runHandle()"
            :disabled="selection.length <= 0">批量执行</el-button>
          <el-button
            v-permission="'job:resume'"
            type="success"
            @click="resumeHandle()"
            :disabled="selection.length <= 0">批量恢复</el-button>
          <el-button
            v-permission="'job:pause'"
            type="success"
            @click="pauseHandle()"
            :disabled="selection.length <= 0">批量暂停</el-button>
          <el-button
            v-permission="'job:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
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
          label="处理器名称"
          prop="bean" />
        <el-table-column
          align="center"
          label="cron表达式"
          prop="cron" />
        <el-table-column
          align="center"
          label="参数"
          prop="params" />
        <el-table-column
          align="center"
          label="备注"
          prop="remark" />
        <el-table-column
          align="center"
          label="状态"
          prop="status_dict">
          <template v-slot="{row}">
            <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
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
          v-permission="'job:update|job:run|job:resume|job:paush|job:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'job:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-dropdown
                trigger="click"
                @command="(command) => commandHandle(command, row.id)"
                v-permission="'job:run|job:resume|job:paush|job:delete'">
                <el-button class="margin_l-12" type="primary" link>更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="run" v-if="havePermission('job:run')">立即执行</el-dropdown-item>
                    <el-dropdown-item
                      command="resume"
                      v-if="havePermission('job:resume')"
                      :disabled="row.status === Status.ENABLE">启用</el-dropdown-item>
                    <el-dropdown-item
                      command="pause"
                      v-if="havePermission('job:pause')"
                      :disabled="row.status === Status.DISABLE">禁用</el-dropdown-item>
                    <el-dropdown-item command="delete" v-if="havePermission('job:delete')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
