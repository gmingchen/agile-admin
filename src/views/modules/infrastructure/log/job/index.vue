<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.bean" placeholder="处理器名称" clearable />
        </el-form-item>
            <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.RESULT" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'jobLog:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border>
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="处理器名称" prop="bean" show-overflow-tooltip />
      <el-table-column align="center" label="参数" prop="params" show-overflow-tooltip />
      <el-table-column align="center" label="耗时（毫秒）" prop="duration" show-overflow-tooltip />
      <el-table-column align="center" label="结果" prop="result" show-overflow-tooltip />
      <el-table-column align="center" label="状态" prop="result" width="80">
        <template v-slot="{ row }">
          <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行时间" prop="createdAt" width="170" />
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
  </Container>
</template>

<script setup>
import { Container, DateRangePicker, Pagination } from '@/components'
import { DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { jobLogPageApi, jobLogExportApi} from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('job-log')

const tableRef = useTemplateRef('tableRef')

const loading = ref(false)
const form = reactive({
  bean: '',
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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  jobLogPageApi(params).then(r => {
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
  jobLogExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: job-log#{$element-separator};
@include b(job-log) {}
</style>
