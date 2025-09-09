<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.mail" placeholder="邮箱地址" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'mailAccount:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'mailAccount:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'mailAccount:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="邮箱地址" prop="mail" show-overflow-tooltip />
      <el-table-column align="center" label="用户名" prop="username" show-overflow-tooltip />
      <el-table-column align="center" label="协议" prop="protocol" show-overflow-tooltip />
      <el-table-column align="center" label="主机" prop="host" show-overflow-tooltip />
      <el-table-column align="center" label="端口" prop="port" width="80" />
      <el-table-column align="center" label="是否开启SSL" prop="ssl" width="110">
        <template v-slot="{ row }">
          <el-tag :type="row.ssl_type" v-if="row.ssl_dict">{{ row.ssl_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否为主配置" prop="master" width="120">
        <template v-slot="{row}">
          <el-switch
            v-permission="'mailAccount:master'"
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
      <el-table-column v-permission="'mailAccount:update|mailAccount:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'mailAccount:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-button v-permission="'mailAccount:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
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
import { Container,  Pagination } from '@/components'
import AddEdit from './components/add-edit/index.vue'
import { useNamespace } from '@/hooks'
import { WHETHER_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { mailAccountPageApi, mailAccountDeleteApi, mailAccountSetMasterApi, mailAccountExportApi} from '@/apis'

const n = useNamespace('mail-account')

const addEditRef = useTemplateRef('addEditRef')

const loading = ref(false)
const form = reactive({
  mail: '',
  username: '',
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
  mailAccountPageApi(params).then(r => {
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
    mailAccountDeleteApi({ keys: ids }).then(r => {
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
  mailAccountSetMasterApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
      getData()
    }
  })
}

const onExport = () => {
  mailAccountExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: mail-account#{$element-separator};
@include b(mail-account) {}
</style>
