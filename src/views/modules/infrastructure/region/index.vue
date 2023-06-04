
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import { havePermission } from '@/utils'

import { listApi, deleteApi } from '@/api/region'

const props = { children: 'children', hasChildren: 'hasChildren' }

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()

const loading = ref(false)
const visible = ref(false)
const list = ref([])

/**
 * @description: 获取列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const getList = async (parentId = 0) => {
  const params = { parentId }
  const r = await listApi(params)
  if (r) {
    r.data.forEach(item => {
      if (item.level < 3) {
        item.hasChildren = true
      }
    })
  }
  return r
}

/**
 * @description: 首次加载获取值
 * @param {*} async
 * @return {*}
 * @author: gumingchen
 */
const init = async () => {
  loading.value = true
  list.value = []
  list.value = (await getList()).data || []
  nextTick(() => {
    loading.value = false
  })
}

/**
 * @description: 懒加载事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const loadHandle = (row, _treeNode, resolve) => {
  getList(row.id).then(r => {
    if (r) {
      resolve(r.data)
    } else {
      resolve([])
    }
  })
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
        init()
      }
    })
  }).catch(() => {
  // to do something on canceled
  })
}

onBeforeMount(() => {
  init()
})
</script>

<template>
  <Container>
    <template #header v-if="havePermission('region:create')">
      <el-form ref="refForm" :inline="true">
        <el-form-item>
          <el-button
            v-permission="'region:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        lazy
        row-key="id"
        :data="list"
        :load="loadHandle"
        :tree-props="props"
        border>
        <el-table-column
          align="left"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="区域编码"
          prop="code" />
        <el-table-column
          align="center"
          label="等级"
          prop="level"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.level_type">{{ row.level_dict }}</el-tag>
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
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'region:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'region:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="init" />
    </template>
  </Container>
</template>

