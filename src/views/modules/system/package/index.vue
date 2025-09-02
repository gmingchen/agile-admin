<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'package:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'package:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'package:export'" @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip />
      <el-table-column align="center" label="状态" prop="status" width="80">
        <template v-slot="{row}">
          <el-switch
            v-permission="'package:status'"
            :before-change="onStatusBeforeChange.bind(this, row)"
            @change="onStatusChange(row)"
            v-model="row.status"
            :active-value="STATUS_ENUM.ENABLE"
            :inactive-value="STATUS_ENUM.DISABLE" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'package:update|package:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'package:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-button v-permission="'package:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <AddEdit ref="addEditRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, Dict, DateRangePicker, Pagination } from '@/components'
import AddEdit  from './components/add-edit/index.vue'
import { useNamespace } from '@/hooks';
import { STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { packagePageApi, packageDeleteApi, packageSetStatusApi, packageExportApi} from '@/apis'
import { onBeforeMount, useTemplateRef } from 'vue';

const n = useNamespace('package')

const addEditRef = useTemplateRef('addEditRef')

const loading = ref(false)
const form = reactive({
  name: '',
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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  packagePageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => loading.value = false)
  })
}

const handleReacquire = () => {
  page.current = 1
  getData()
}

const onSearch = () => {
  handleReacquire()
}

const onReset = () => {
  clearJson(form)
  handleReacquire()
}

const onEnterKeyup = () => {
  handleReacquire()
}

const onPaginationChange = () => {
  getData()
}

const onSelectionChange = value => {
  selection.value = value
}

const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    packageDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onStatusBeforeChange = (row) => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      `确定对[id=${ row.id }]进行[${ row.status === STATUS_ENUM.ENABLE ? '禁用' : '启用' }]操作?`,
      { title: '提示', confirmButtonText: '确认', type: 'warning' }
    ).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

const onStatusChange = (row) => {
  const params = {
    key: row.id,
    value: row.status
  }
  packageSetStatusApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      row.status = row.status === STATUS_ENUM.DISABLE ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLE
    }
  })
}

const onExport = () => {
  packageExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(package) {}
</style>
