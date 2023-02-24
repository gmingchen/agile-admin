<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button v-permission="'role:create'" type="primary" @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'role:delete'"
            type="danger"
            :disabled="selection.length <= 0"
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
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="角色名称"
          prop="name" />
        <el-table-column
          align="center"
          label="数据权限"
          prop="permission"
          width="190">
          <template v-slot="{ row }">
            <el-tag type="success">
              {{ row.permission_dict }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="remark" />
        <el-table-column
          v-if="havePermission('role:show')"
          align="center"
          label="是否显示"
          prop="show"
          width="160">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'role:show'"
              @change="showHandle(row)"
              v-model="row.show"
              :active-value="1"
              :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
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
              v-permission="'role:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'role:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import useDictionary from '@/mixins/dictionary'
import usePage from '@/mixins/page'
import { clearJson, havePermission } from '@/utils'

import { pageApi, deleteApi, setShowApi } from '@/api/role'

const { page } = usePage()
const { getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: ''
})
const list = ref([])
const selection = ref([])

const getList = () => {
  const params = {
    ...form,
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list,
      page.total = r.data.total
    }
    nextTick(() => { loading.value = false })
  })
}

const reacquireHandle = () => {
  page.current = 1
  getList()
}

const addEditHandle = (id) => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
}

const deleteHandle = (id) => {
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

const showHandle = (row) => {
  const params = {
    key: row.id,
    value: row.show
  }
  setShowApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      row.show = row.show === 1 ? 0 : 1
    }
  })
}

const selectionHandle = (val) => {
  selection.value = val
}

const pageChangeHandle = (argPage) => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getDictionary('dataPermission')
  getList()
})
</script>

<style lang="scss" scoped>

</style>
