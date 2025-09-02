<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'fileConfig:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'fileConfig:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'fileConfig:export'" @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="存储类型" prop="storage_dict" width="90" />
      <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip />
      <el-table-column align="center" label="是否为主配置" prop="master" width="120">
        <template v-slot="{row}">
          <el-switch
            v-permission="'fileConfig:master'"
            v-model="row.master"
            :before-change="onMasterBeforeChange.bind(this, row)"
            :active-value="WHETHER_ENUM.YES"
            :inactive-value="WHETHER_ENUM.NO"
            :disabled="row.master === WHETHER_ENUM.YES"
            @change="onMasterChange(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'fileConfig:update|fileConfig:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'fileConfig:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-button v-permission="'fileConfig:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
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
import { Container, DateRangePicker, Pagination } from '@/components'
import AddEdit  from './components/add-edit/index.vue'
import { useNamespace } from '@/hooks';
import { STATUS_ENUM, WHETHER_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { fileConfigPageApi, fileConfigDeleteApi, fileConfigSetMasterApi, fileConfigExportApi} from '@/apis'
import { onBeforeMount, useTemplateRef } from 'vue';

const n = useNamespace('file-config')

const addEditRef = useTemplateRef('addEditRef')

const loading = ref(false)
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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  fileConfigPageApi(params).then(r => {
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
    fileConfigDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onMasterBeforeChange = (row) => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      `确定对[id=${ row.id }]进行[设置为主配置]操作?`,
      { title: '提示', confirmButtonText: '确认', type: 'warning' }
    ).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

const onMasterChange = (row) => {
  const params = { key: row.id, }
  fileConfigSetMasterApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
      getData()
    }
  })
}

const onExport = () => {
  fileConfigExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(file-config) {}
</style>
