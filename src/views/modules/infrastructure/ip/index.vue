<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.ip" placeholder="IP" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.country" placeholder="国家" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.province" placeholder="省份" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.city" placeholder="城市" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.isp" placeholder="运营商" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'ip:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border>
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="IP" prop="ip" show-overflow-tooltip />
      <el-table-column align="center" label="国家" prop="country" show-overflow-tooltip />
      <el-table-column align="center" label="省份" prop="province" show-overflow-tooltip />
      <el-table-column align="center" label="城市" prop="city" show-overflow-tooltip />
      <el-table-column align="center" label="区域" prop="district" show-overflow-tooltip />
      <el-table-column align="center" label="运营商" prop="isp" show-overflow-tooltip />
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
  </Container>
</template>

<script setup>
import { Container, DateRangePicker, Pagination } from '@/components'
import { useNamespace } from '@/hooks'
import { clearJson, download } from '@/common/utils'
import { ipPageApi, ipExportApi} from '@/apis'

const n = useNamespace('ip')

const loading = ref(false)
const form = reactive({
  ip: '',
  country: '',
  province: '',
  city: '',
  isp: '',
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
  ipPageApi(params).then(r => {
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
  ipExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: ip#{$element-separator};
@include b(ip) {}
</style>
