<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="操作" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.account" placeholder="用户名/昵称/手机号" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'operateLog:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table ref="tableRef" v-loading="loading" :data="list" row-key="id" border @row-dblclick="onRowDblclick">
      <el-table-column type="expand">
          <template #default="{row}">
            <div class="ph-8">
              <el-descriptions :column="4" border>
                <el-descriptions-item label="操作名">{{row.name || '-'}}</el-descriptions-item>
                <el-descriptions-item label="昵称">{{row.nickname || '-'}}</el-descriptions-item>
                <el-descriptions-item label="帐号">{{row.username || '-'}}</el-descriptions-item>
                <el-descriptions-item label="操作时间">{{row.createdAt || '-'}}</el-descriptions-item>
                <el-descriptions-item label="IP">{{row.ip || '-'}}</el-descriptions-item>
                <el-descriptions-item label="地址">{{row.address || '-'}}</el-descriptions-item>
                <el-descriptions-item label="浏览器">{{row.browser || '-'}}</el-descriptions-item>
                <el-descriptions-item label="操作系统">{{row.operatingSystem || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求方法">{{row.method || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求URL">{{row.url || '-'}}</el-descriptions-item>
                <el-descriptions-item label="方法名" :span="2">{{row.methodName || '-'}}</el-descriptions-item>
                <el-descriptions-item label="请求参数" :span="2">
                  <pre>{{JSON.parse(row.requestData || '{}')}}</pre>
                </el-descriptions-item>
                <el-descriptions-item label="响应参数" :span="2">
                  <pre>{{JSON.parse(row.responseData || '{}')}}</pre>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="ID" prop="id" width="80" />
        <el-table-column align="center" label="操作者" prop="username" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div class="f_c">
              <div class="e">{{row.nickname || row.username }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作名" prop="name" show-overflow-tooltip />
        <el-table-column align="center" label="URL" prop="url" show-overflow-tooltip />
        <el-table-column align="center" label="IP" prop="ip" width="140" />
        <el-table-column align="center" label="地址" prop="address" show-overflow-tooltip />
        <el-table-column align="center" label="浏览器" prop="browser" show-overflow-tooltip />
      <el-table-column align="center" label="操作时间" prop="createdAt" width="170" />
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
  </Container>
</template>

<script setup>
import { Container, DateRangePicker, Pagination } from '@/components'
import { clearJson, download } from '@/common/utils'
import { operateLogPageApi, operateLogExportApi} from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('operate-log')

const tableRef = useTemplateRef('tableRef')

const loading = ref(false)
const form = reactive({
  name: '',
  account: '',
  start: '',
  end: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  operateLogPageApi(params).then(r => {
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

const onExport = () => {
  operateLogExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onRowDblclick = (row) => {
  tableRef.value.toggleRowExpansion(row)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: operate-log#{$element-separator};
@include b(operate-log) {}
</style>
