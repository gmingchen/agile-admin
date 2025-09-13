<template>
  <Container ref="containerRef" :class="n.b()">
    <template #sidebar>
      <TenantSidebar v-model="form.tenantId" @change="onChange" />
    </template>
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <Dict class="w-177_i" v-model="form.scopeType" :code="DICT_CODE_ENUM.NOTICE_SCOPE" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="通知范围" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.type" :code="DICT_CODE_ENUM.NOTICE_TYPE" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="通知类型" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'notice:push'" type="primary" @click="onSend()">发送通知</el-button>
          <el-button v-permission="'notice:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'notice:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="模版编码" prop="templateCode" show-overflow-tooltip />
        <el-table-column align="center" label="模版内容" prop="templateContent" show-overflow-tooltip />
        <el-table-column align="center" label="消息内容" prop="content" show-overflow-tooltip />
        <el-table-column align="center" label="通知范围" prop="scopeType" width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.scopeType_type">{{ row.scopeType_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="消息类型" prop="type" width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
          </template>
        </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column v-permission="'notice:update|notice:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'notice:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <Send ref="sendRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, TenantSidebar, Dict, DateRangePicker, Pagination } from '@/components'
import Send from './components/send/index.vue'
import { useNamespace } from '@/hooks'
import { DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { noticePageApi, noticeDeleteApi, noticeExportApi} from '@/apis'

const n = useNamespace('notice')

const containerRef = useTemplateRef('containerRef')
const sendRef = useTemplateRef('sendRef')

const loading = ref(false)
const form = reactive({
  tenantId: '',
  scopeType: '',
  type: '',
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
  noticePageApi(params).then(r => {
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

const onChange = () => {
  containerRef.value.setScrollTop()
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
    noticeDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onExport = () => {
  noticeExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onSend = () => {
  sendRef.value.open()
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: notice#{$element-separator};
@include b(notice) {}
</style>
