<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'
import SetDataPermission from './components/set-data-permission.vue'

import { clearJson, havePermission, parseData2Tree } from '@utils'
import { Status } from '@enums'

import { listApi, deleteApi, setStatusApi, exportApi } from '@/api/dept'

defineOptions({
  name: 'SystemDept'
})

const props = {
  children: 'children'
}

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const refSetDataPermission = ref()

const loading = ref(false)
const visible = ref(false)
const dataPermissionVisible = ref(false)
const form = reactive({
  name: '',
  leader: '',
  mobile: '',
  status: ''
})
const list = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const getList = () => {
  loading.value = true
  listApi(form).then(r => {
    if (r) {
      list.value = parseData2Tree(r.data)
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const resetHandle = () => {
  clearJson(form)
  getList()
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
  ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ key: id }).then(r => {
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
 * @description: 设置数据权限弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const setDataPermissionHandle = id => {
  dataPermissionVisible.value = true
  nextTick(() => {
    refSetDataPermission.value.init(id)
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

const commandHandle = (command, id) => {
  switch (command) {
    case 'data':
      setDataPermissionHandle(id)
      break
    case 'delete':
      deleteHandle(id)
      break
  }
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="resetHandle">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.leader" placeholder="用户名、昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="手机号" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="STATUS" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="getList()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'dept:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button v-repeat v-permission="'dept:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        :tree-props="props"
        row-key="id"
        border>
        <el-table-column
          align="left"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="负责人"
          prop="nickname">
          <template v-slot="{ row }">
            {{ row.nickname || row.username }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="手机号"
          prop="mobile" />
        <el-table-column
          align="center"
          label="数据权限"
          prop="dataScope"
          width="120">
          <template v-slot="{ row }">
            <el-tag :type="row.dataScope_type">{{ row.dataScope_dict || '未设置' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="sort" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="80">
          <template v-slot="{row}">
            <el-switch
              v-permission="'dept:status'"
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
          v-permission="'dept:update|dept:menu|dept:data|dept:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'dept:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-dropdown
                trigger="click"
                @command="(command) => commandHandle(command, row.id)"
                v-permission="'dept:menu|dept:data|dept:delete'">
                <el-button class="margin_l-12" type="primary" link>更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="data" v-if="havePermission('dept:data')">数据权限</el-dropdown-item>
                    <el-dropdown-item command="delete" v-if="havePermission('dept:delete')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
      <SetDataPermission ref="refSetDataPermission" v-if="dataPermissionVisible" @refresh="getList" />
    </template>
  </Container>
</template>

