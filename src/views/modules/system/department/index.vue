<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="名称"
            maxlength="20"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.leader"
            placeholder="负责人"
            maxlength="20"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.mobile"
            placeholder="手机号"
            maxlength="20"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status" clearable>
            <el-option
              v-for="item in statusDictionary.list"
              :key="item.value"
              :value="item.value"
              :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button
            v-permission="'department:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
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
          prop="name"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="负责人"
          prop="leader" />
        <el-table-column
          align="center"
          label="手机号"
          prop="mobile" />
        <el-table-column
          align="center"
          label="数据权限"
          prop="permission"
          width="190">
          <template v-slot="{ row }">
            <el-tag type="success">
              {{ permissionDictionary.map[row.permission] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="sort"
          width="80" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          show-overflow-tooltip>
          <template v-slot="{ row }">
            <el-switch
              v-permission="'department:status'"
              :before-change="statusBefore.bind(this, row)"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="remark"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160"  />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'department:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'department:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str, parseData2Tree } from '@/utils'

import { listApi, delApi, statusApi } from '@/api/department'

const { getDictionary } = useDictionary()

const props = {
  children: 'children'
}
const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const loading = ref(false)
const visible = ref(false)
const statusDictionary = ref({ map: {}, list: [] })
const permissionDictionary = ref({ map: {}, list: [] })
const form = reactive({
  name: '',
  leader: '',
  mobile: '',
  status: '',
  date: []
})
const list = ref([])
const selection = ref([])

/**
 * @description: 获取列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const getList = () => {
  const params = {
    ...form,
    start: form.date && form.date.length ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length ? parseDate2Str(form.date[1]) : ''
  }
  delete params.date
  loading.value = true
  listApi(params).then(r => {
    if (r) {
      list.value = parseData2Tree(r.data, 'id', 'parent_id', 'children')
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
    delApi({ key: id }).then(r => {
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
 * 状态变化之前操作
 * @param {*} row
 */
const statusBefore = row => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ statusDictionary.value.map[row.status] }]操作`, '提示', {
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
 * @description: 状态
 * @param {*} row
 * @return {*}
 * @author: gumingchen
 */
const statusHandle = row => {
  const params = {
    key: row.id,
    value: row.status
  }
  statusApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      getList()
    }
  })
}

onBeforeMount(async () => {
  statusDictionary.value = await getDictionary('status')
  permissionDictionary.value = await getDictionary('dataPermission')
  getList()
})
</script>
