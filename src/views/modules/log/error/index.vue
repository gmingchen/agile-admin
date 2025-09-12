<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.adminerId" placeholder="用户ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.url" placeholder="请求URL" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.exceptionClass" placeholder="类名" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.exceptionMethod" placeholder="方法名" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'errorLog:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" :tooltip-options="{'showArrow': true, 'appendTo': '.el-table__row'}" border>
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="用户ID" prop="creator" />
      <el-table-column align="center" label="URL" prop="url" show-overflow-tooltip />
      <el-table-column align="center" label="请求方法" prop="method" width="90" />
      <el-table-column align="center" label="异常信息" prop="exceptionMessage" show-overflow-tooltip />
      <el-table-column align="center" label="IP" prop="ip" width="140" />
      <el-table-column align="center" label="地址" prop="address" show-overflow-tooltip />
      <el-table-column align="center" label="浏览器" prop="browser" show-overflow-tooltip />
      <el-table-column align="center" label="操作系统" prop="operatingSystem" show-overflow-tooltip />
      <el-table-column align="center" label="发生时间" prop="createdAt" width="170" />
      <el-table-column v-permission="'errorLog:info'" align="center" label="操作" width="80" fixed="right">
        <template v-slot="{ row }">
          <el-button v-permission="'errorLog:info'" type="primary" link @click="onDetails(row.id)">详情</el-button>
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
import { Container, DateRangePicker, Pagination } from '@/components'
import Details from './components/details/index.vue'
import { clearJson, download } from '@/common/utils'
import { errorLogPageApi, errorLogExportApi} from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('error-log')

const detailsRef = useTemplateRef('detailsRef')

const loading = ref(false)
const form = reactive({
  adminerId: '',
  url: '',
  exceptionClass: '',
  exceptionMethod: '',
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
  errorLogPageApi(params).then(r => {
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
  errorLogExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onDetails = (id) => {
  detailsRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: error-log#{$element-separator};
@include b(error-log) {}
</style>
