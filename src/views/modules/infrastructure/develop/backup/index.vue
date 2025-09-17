<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <Dict class="w-177_i" v-model="form.type" :code="DICT_CODE_ENUM.BACKUP_TYPE" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="备份方式" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.OPERATIONAL_STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'backup:backup'" type="primary" @click="onBackup()">备份</el-button>
          <el-button v-permission="'backup:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'backup:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="文件名" prop="name" show-overflow-tooltip />
      <el-table-column align="center" label="数据库名称" prop="database" show-overflow-tooltip />
      <el-table-column align="center" label="物理路径" prop="path" show-overflow-tooltip />
      <el-table-column align="center" label="虚拟路径" prop="url" show-overflow-tooltip />
      <el-table-column align="center" label="方式" prop="type" width="80">
        <template v-slot="{ row }">
          <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="80">
        <template v-slot="{ row }">
          <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备份时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="执行时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'backup:info|backup:recovery|backup:delete'" align="center" label="操作" width="140" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'backup:info'" type="primary" link @click="onDetails(row.id)">详情</el-button>
            <el-button v-permission="'backup:recovery'" type="primary" link @click="onRecovery(row.id)">恢复</el-button>
            <el-button v-permission="'backup:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <Details ref="detailsRef" />
  </Container>
</template>

<script setup>
import { Container, Dict, DateRangePicker, Pagination } from '@/components'
import Details from './components/details/index.vue'
import { useNamespace } from '@/hooks'
import { STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { backupPageApi, backupDeleteApi, backupBackupApi, backupRecoveryApi, backupExportApi} from '@/apis'

const n = useNamespace('backup')

const detailsRef = useTemplateRef('detailsRef')

const loading = ref(false)
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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  backupPageApi(params).then(r => {
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

const onBackup = () => {
  ElMessageBox.confirm(
    `确定进行[备份]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    backupBackupApi().then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onRecovery = (id) => {
  ElMessageBox.confirm(
    `一旦恢复数据，备份之后的数据将无法恢复，确定继续进行[恢复]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    backupRecoveryApi({ key: id }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    backupDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onExport = () => {
  backupExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onDetails = (id) => {
  detailsRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: backup#{$element-separator};
@include b(backup) {}
</style>
